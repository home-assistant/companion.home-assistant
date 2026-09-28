---
title: Native incoming calls
id: native-calls
---

<span class='beta'>BETA</span>

An integration that implements the native call provider API can send an incoming call to your registered Android Companion app. The phone shows Android call controls for answering or declining. Once connected, the ongoing call notification lets you hang up while viewing another app.

The integration controls which phone receives the call. Installing Companion does not make every phone ring for every Home Assistant call.

## Set up your phone

1. Register a compatible Android Companion app with your Home Assistant server.
2. Enable native phone support in the integration that provides your calls.
3. Allow Companion notifications, including its Calls notification channel.
4. Grant microphone permission when answering your first call. Without microphone permission the app cannot establish the native audio session.
5. Call that registered phone from the provider and check audio in both directions.

Android 8 or newer and a device with a microphone and Android Telecom support are required. The capability is not advertised on Automotive or Meta Quest. The provider integration can discover support from the app registration; its own instructions explain how to route calls to the phone.

## During a call

Use the incoming notification to answer or decline. After answering, use the ongoing notification to end the call. Closing a dashboard window does not end a native call.

Android controls communication audio routing. Available earpiece, speaker and Bluetooth routes depend on the phone and connected accessories. Do Not Disturb and notification settings may change how an incoming call is presented.

## When a call does not arrive

Check that Home Assistant can deliver notifications to the selected app registration and that the provider has addressed the correct phone. Check network access, notification permissions, the Calls channel and Android battery restrictions. See [notification setup](../notifications/basic.md).

This feature requires an integration implementing the native call provider contract. Ordinary dashboard audio and arbitrary notification text do not become native calls automatically.

Developers can implement the [native call provider API](https://developers.home-assistant.io/docs/api/native-calls/) to connect their integration. This initial Android feature covers incoming calls; iOS and frontend dialing require separate implementations.

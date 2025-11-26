---
title: "Connection security level"
id: "connection-security-level"
---
Starting with ![iOS](/assets/iOS.svg) Companion App version 2025.11, you will have to choose between two security options in the app if you want to use a unencrypted URL to connect to Home Assistant (such as your local IP address for local connection).

## Option 1: Most secure (recommended)

This option ensures the app only connect to a unencrypted URL (for example, `http://homeassistant.local:8123`) when you are currently on your specified home network. When you are not on the specified home network, the app will display a screen blocking access and describing the requirements to connect. This also means that background activity will be blocked until a secure connection can be established.

You can specify your Wi-Fi SSID (for example, "GrandmaHome5G") to be considered your home network.
- On Android you can also set using a VPN or Ethernet access as home network.
- On macOS you can define a "Hardware address" as home network, which is useful for wired connections.

To retrieve the information above, the app needs the location access permission from your device, since network information could be used for location positioning. We understand that this is not desirable for all users, but this restriction is imposed by Apple platforms and Android. Your location will never be used for anything besides retrieving the network information. You are always in control if you want to share your location to your local Home Assistant server.

:::warning Important
The location permission must be set to **Always** and **Precise** for the app to function correctly in the background.
:::

## Option 2: Less secure

If you don’t grant location permission or disable location at the OS level but still need to access a unencrypted URL (for example, http://homeassistant.local:8123), you can choose this option. Use it only if absolutely necessary; **it is not recommended**, as it may expose your Home Assistant data to network eavesdropping, especially on public Wi-Fi.

## Why these options exist

These security options were introduced to protect your Home Assistant instance from potential security risks when using unencrypted connections.

When you connect to Home Assistant using an unencrypted URL (such as `http://homeassistant.local:8123`), all data transmitted between your device and Home Assistant is sent in plain text. This includes your login credentials, and any commands you send. On your home network, this is generally acceptable since the traffic stays within your local network. However, if you accidentally connect from a public Wi-Fi network or untrusted location, malicious actors could potentially intercept your Home Assistant data.

The **Most secure** option prevents these risks by ensuring unencrypted connections only work when you're on your home network. The **Less secure** option removes this protection, and is not recommended for most users.

For maximum security, we recommend using HTTPS connections with valid SSL certificates always, especially when accessing Home Assistant remotely.

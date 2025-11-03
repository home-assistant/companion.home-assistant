---
title: "Connection security level"
id: "connection-security-level"
---

Starting with Companion App version 2025.11, you will have to choose between 2 security options in the app if you want to use a non-encrypted URL to connect to Home Assistant (such as your local IP address for local connection).

## Option 1: Most secure

This option makes sure we only connect to a non-encrypted URL (for example, `http://homeassistant.local:8123`) when you are currently on your specified home network.

On the Android app, you can specify your WiFi SSID (for example, "GrandmaHome5G"), VPN, or Ethernet access to be considered your home network.

On iOS, you can specify your WiFi SSID (for example, "GrandmaHome5G") as your home network, but it's not yet possible (2025.11.0) to use VPN or ethernet in this configuration. If those are required, consider the drawbacks from option 2 and use it if it makes sense.

To retrieve the information above, both apps need the location access permission from your device. We understand that this is not desirable for all users, but that's a restriction imposed by Apple platforms and Android. This also doesn't mean that your location will be used for anything besides retrieving the network information. You are always in control if you want to share your location to your local Home Assistant server. Just access **Companion App Settings** > **Sensors** to define what to share and what not to share.

:::warning Important
To work properly in background, the location permission needs to also be set to allow **Always** and **Precise**.
:::

## Option 2: Less secure

In case you prefer to not allow the app to know your location but still want to access a non-encrypted URL (for example, `http://homeassistant.local:8123`), you can choose this option, which will allow its usage. Keep in mind that this is not recommended at all, since it can expose your Home Assistant access to someone observing network traffic on public Wi-Fi networks, for example.

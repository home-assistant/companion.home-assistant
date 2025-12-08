---
title: "Connection security level"
id: "connection-security-level"
---
Starting with ![iOS](/assets/iOS.svg) Companion App version 2025.11, you will have to choose between two security options in the app if you want to use a unencrypted URL to connect to Home Assistant (such as your local IP address for local connection).

## Option 1: Most secure (recommended)

This option ensures the app only connect to a unencrypted URL (for example, `http://homeassistant.local:8123`) when you are currently on your specified home network. When you are not on the specified home network, the app will display a screen blocking access and describing the requirements to connect. This also means that background activity will be blocked until a secure connection can be established.

You can specify your Wi-Fi SSID (for example, "GrandmaHome5G") to be considered your home network.
- You can change home network settings such as the Wi-Fi SSID in **Settings** > **Companion app** > **[server name]** anytime you want.
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

# FAQ

## Why am I seeing the connection security prompt?

Starting with version 2025.11, the companion app will ask you to choose a security level if your setup includes an unencrypted URL (HTTP instead of HTTPS). This prompt helps protect your Home Assistant credentials from being exposed on public networks.

If you have HTTPS for all your URLs and still saw this prompt, please update to the latest app version.

## What do "Most secure" and "Less secure" mean?

- **Most secure:** The app will only use unencrypted connections when you're on your specified home network. This requires location permission so the app can check your current Wi-Fi SSID.
- **Less secure:** The app will use unencrypted connections regardless of which network you're on. This is not recommended if you ever connect to public Wi-Fi networks.

:::warning
Choosing "Less secure" may expose your Home Assistant credentials if you connect from untrusted networks.
:::

## How do I set up my home network?

1. Grant location permission when prompted (required for the "Most secure" option).
2. Connect to your home Wi-Fi network.
3. Go to **Settings** > **Companion app** > **[your server]** > **Internal URL**.
4. Add your home Wi-Fi SSID to the list.

You can add multiple SSIDs if you have more than one home network.

## Can I specify the Hardware Address (Ethernet) instead of just the SSID?

On macOS, yes. On iOS, this is not currently available due to platform limitations.

## Does this feature work when I'm connected through a VPN?

No. The connection security level feature uses your Wi-Fi SSID to determine if you're at home. When connected via VPN, the app cannot detect your physical location through Wi-Fi.

If you rely on VPN for remote access, you'll need to configure your setup differently:

1. Set your local Home Assistant address as the **external URL** (since you access it the same way whether home or away).
2. Ensure your VPN is connected whenever you want to interact with Home Assistant remotely.

:::warning
If you set your local (HTTP) address as the external URL and forget to connect your VPN on a public network, this may expose your Home Assistant credentials.
:::

## I use VPN for all remote access. Should I enable this feature?

If you've set your local address as the external URL, the connection security level setting won't affect how the app connects: it will always use that external URL.

However, for advanced use cases, you may still want different internal and external URLs. In that case, enable the "Most secure" option to ensure your internal (possibly HTTP) URL is only used when you're actually at home.

## Will the app send my credentials if Home Assistant is unreachable?

The app will attempt to connect using your configured URLs. If the external URL is an HTTPS address, your credentials are encrypted during transmission regardless of whether the connection succeeds.

If your external URL is HTTP (not recommended for remote access), credentials would be sent unencrypted when the app attempts to connect.

## I chose "Less secure" but now want to change it. How?

Go to **Settings** > **Companion app** > **[your server]** > **Connection security level** to change your preference at any time. To define your home network, go to **Settings** > **Companion app** > **[your server]** > **Internal URL**.

## What happens if I don't grant location permission?

Without location permission, the app cannot determine which network you're on. If you choose "Most secure" without granting location access, the app will only be able to use your external (HTTPS) URL.

If you need to use an unencrypted internal URL and don't want to grant location permission, you'll need to select "Less secure"—but be aware of the security implications.

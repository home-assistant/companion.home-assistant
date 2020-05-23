---
title: Migrating to Home Assistant Companion 2019.1
sidebar_label: Migration Guide
id: migration
---

![iOS](/assets/apple.svg)

The steps below should guide you through the process of migrating from the previous app version (1.5) to 2019.1. Before going any further, please make sure you read the [breaking changes](#breaking-changes) listed below.

# Breaking Changes
-   All notifications need to be updated as the notify service is moving from `notify.ios_<device_id>` to `notify.mobile_app_<device_name>`. In the old version the `device_id` was set in the iOS app settings, after the update the `device_name` is taken from iOS settings (see iOS Settings App>General>About).
-   Your existing device tracker entity will be obsolete. The old app used `known_devices.yaml` whereas the updated app uses the `mobile_app` integration and entity storage. Your old tracker `device_tracker.device_id` will no longer update, the new tracker will be called `device_tracker.device_name`.
-   The new device tracker no longer contains attributes such as "trigger: Geographic Region entered". These have all moved to sensors that will be created via the `mobile_app` integration.
-   The new device tracker no longer supports the `device_tracker.see` service.
-   The battery level and state sensors will be change from `sensor.<device_id>_battery_level` and `sensor.<device_id>_battery_state` to `sensor.battery_level` and `sensor.battery_state`. When you set up additional devices, the new sensors for those device will be distinguished with an identifier on the end (i.e. `sensor.battery_level_2`).
-   The send manual location update button has been removed along with the footer bar. You can now send an update manually be pulling/swiping down within the app. This will refresh the page and also send a location update. You can also send a location update by tap-and-holding the app icon.
-   The `group.all_devices` group was maintained by the now legacy `device_tracker` service based on `known_devices.yaml` used by the `ios` integration. Since this is no longer used, device running 2019.1 will not be added to the `group.all_devices`. The new `device_tracker` entities can be associated with `person` entities however which can be grouped in a similar way.

# Requirements
You need to be running Home Assistant 0.95.0 or newer. The new updated iOS app requires the following integrations to be enabled in your Home Assistant instance:
-   `default_config:`

If for some reason you have disabled the default config make sure your `configuration.yaml` contains at least:
-   `mobile_app:`
-   `discovery:`

For some features the following integrations also need to be enabled:
-   `cloud:` is used for securely connecting to your Home Assistant via Nabu Casa subscription via Remote UI and cloud webhooks
-   `ios:` is used if you want advanced notifications like actionable notifications and categories

# Updating from Home Assistant Companion 1.5
First, apologies for the breaking changes and associated manual steps required. We have provided this guide to help you get through any issues as quickly as possible so you can enjoy the new app experience!

## 1 - Updating the iOS app via the App Store
Given the default settings, this may already have happened to you and your app will have auto-updated via the iOS Store. If not, manually update the app and open it.
-   You will be greeted by the new onboarding experience. If you are connected to your home Wi-Fi, the app will find your Home Assistant instance - or you can manually enter the URL.
-   You will be prompted to log on to your Home Assistant instance.
+   Please give permissions to the app.
+   Watch the app set up its integration etc.
+   Once onboarding is complete, restart Home Assistant, then once Home Assistant is back online, force-close the app and reopen. This step is necessary so the notify service can register.
+   You should now be ready to go with the new Home Assistant iOS app. To verify:
    1.  Check Home Assistant Configuration -> Integrations. You should now have an entry named "Mobile App: <device_name>" containing sensors.
    2.  Check for a new `device_tracker` entity
    3.  Check for a new `notify.mobile_app_<device_name>` service
-   Repeat for all iOS devices connected to your Home Assistant

An illustrated description of the onboarding process can be found in the [main guide](index).

## 2 - Updating notifications and device trackers
Because the app is using a new push notification backend and the new device tracker architecture, you will need to change your automations to use the new service and tracker:
-   Update your automations and configuration files (e.g. `configuration.yaml` and additional files you may have set up) to use the new service and `device_tracker` entity. This should be as simple as using search & replace with your old and new service and entity names.

## 3 - Cleanup of the old iOS integration

Your iOS devices are all updated and you're up and running with the new and shiny? Great! Now it's time to clean up and get rid of the now obsolete old entries.
1.  Use a browser to load your Home Assistant instances and go to "Configuration" (cog icon) and then "Integrations".
2.  Select the iOS integration for the device you wish to upgrade.
3.  You should see two entities listed with the sensors `sensor.<device_id>_battery_level` and `sensor.<device_id>_battery_state` where `<device_id>` relates to the id you specified in the old version of the app for the device you wish to upgrade. **If you have multiple apps/devices configured take care to only delete the entities relating to the device you are updating**. Click the cog icon next to these entities and delete the each entity in turn (the order you do this in does not matter).
4.  If this was your only device, you can now delete the iOS integration as a whole by going back one page and using the trash can icon in the top right. You can also delete the `.ios.conf` file in your configuration directory (the same directory as `configuration.yaml`) to remove all traces of the old iOS integration from the user interface.
5.  Open the `known_devices.yaml` file and remove the entry that has the same `<device_name>` as in Step 3.
6.  Restart Home Assistant. The connection between your old Home Assistant Companion 1.5 App and your Home Assistant Instance should now be fully removed.

## 4 - Common problems
-   During onboarding when entering the username and password, you may get an error message and Home Assistant logs
`[homeassistant.components.auth.indieauth] Timeout while looking up redirect_uri https://home-assistant.io/iOS`: This happens when your Home Assistant (and likely your home network) has a broken IPv6 configuration. This usually can be resolved by fixing the IPv6 on your network or disabling IPv6 on your Home Assistant host system. This is not a bug in the app.
-   If you receive a 405 error code when trying to sign in after the app auto discovered your Home Assistant instance, try manually entering the address of you Home Assistant instance instead.
-   You receive an error containing `kCLError` when trying to do a manual update (pulling down). To fix this change the location permission for the Home Assistant App to "Always" in iOS Settings>Privacy>Location Services
-   **Nabu Casa**: While Nabu Casa Cloud is fully supported by the app for connections, the setup is a bit more involved: To use Nabu Casa, set up the app while connected to the same local network as your Home Assistant instance. Because Apple changed the iOS location permissions (which now include the WiFi SSID) with iOS 13 some additional steps are required now:
    - Grant location access for Home Assistant in iOS settings
    - In the app, go to App Settings -> Connection settings and copy and paste what’s in external URL to internal URL (while on your WiFi)
    - Restart the app
    - You should now have the checkbox for “Connect via Cloud” available, activate that. At this point external URL won't be used anymore and the app will connect via Remote UI URL.
    - Starting with Home Assistant 0.103.0 `cloud:` no longer is loaded as a dependency of `mobile_app:`. If you did not have `default_config:` configured, your cloud integration might have disappeared or become disabled.-   If you get a 404 error when not using Nabu Casa. Please make sure that you are **not** including a trailing `/` when entering your URL manually or in `base_url:` entry in `configuration.yaml` if using the automatic discovery when on home  network.
    - Starting with 0.103.0, Home Assistant Cloud Remote UI gets disabled if you have an entry for a trusted proxy on `127.0.0.1` or `::1` in your configuration.yaml.
-   You receive an error stating that `mobile_app` is configured and have an entry in your Home Assistant logs similar to:

        Invalid config

        The following components and platforms could not be set up:

    And one or both of `mobile_app` or `cloud` listed. This is most common when you have Home Assistant installed on top of an operating system that isn't HassOS and contains out of date dependancies. To fix this, please check all your libraries are up to date (specifically `libc6 `).
-   Your `sensor.SSID` and `senson.BSSID` entities are not updating and/or your app does not switch to using an internal URL when on your home Wi-Fi. You can fix both of these issue by restarting your device.

## 5 - Known issues
-   All sensors created during onboarding are only called e.g. `sensor.battery_level`. If you have multiple iOS devices you may have multiple similarly named entities. If needed, you can rename the entities via Home Assistant Configuration (cog icon on sidebar) -> Integrations -> Mobile App: iOS Device Name and prefixing the sensors with the device name. This may get resolved with future updates to the `mobile_app` integration.
-   Due to issues between China and Google Cloud Services registering the notify service from China can be hit or miss. A workaround will be added in a future update, until then please try using a VPN to tunnel outside the Great Firewall.
-   iOS Location Permissions are required for the app to use Internal_URL / External_URL on iOS 13 and newer. This is due to a change in iOS which prohibits the app to access the Wi-Fi SSID name.
-   You _may_ see the following error in your logs: `The notify.ios platform was loaded but no devices exist! Please check the documentation at https://home-assistant.io/ecosystem/ios/notifications/ for more information`. This can be ignored, an update to the ios component has been submitted and a future version of Home Assistant will remove this error.

## Changes from 1.5 to 2019.1
-   Brand new push notification engine, powered by Firebase, for even more complex notifications than ever before, including critical notifications and much much more.
-   Siri Shortcuts: Now, you can interact with your Home Assistant via Siri and the Shortcuts app.
-   Apple Watch: Control your home via the Apple Watch app and monitor its status with Complications.
-   Widget: Quickly trigger actions at home via a widget. Also available via home screen icon.
-   Nabu Casa Cloud support: Cloudhooks and remote UI are here so you can (optionally) never open a port in your router again.
-   New connection engine: now you can have internal and external URLs for total customizability.
-   App settings and configuration can now be accessed from the Home Assistant side menu.
-   Pull-to-refresh will reload the view and also send updated location data to your Home Assistant.

---
title: Migrating to Home Assistant Companion 2.0
id: version-2.0.0-migration
original_id: migration
---

The steps below should guide you through the process of migrating from the previous app version (1.5) to 2.0. Before going any further, please make sure you read the [breaking changes](migration#breaking-changes) listed below.

# Breaking Changes
-   All notifications need to be updated as the notify service is moving from `notify.ios_<device_id>` to `notify.mobile_app_<device_name>`. In the old version the `device_id` was set in the iOS app settings, after the update the `device_name` is taken from iOS settings (see iOS Settings App>General>About).
-   Your existing device tracker entity will be obsolete. The old app used `known_devices.yaml` whereas the updated app uses the `mobile_app` integration and entity storage. Your old tracker `device_tracker.device_id` will no longer update, the new tracker will be called `device_tracker.device_name`.
-   The new device tracker no longer contains attributes such as "trigger: Geographic Region entered". These have all moved to sensors that will be created via the `mobile_app` integration.
-   The battery level and state sensors will be change from `sensor.<device_id>_battery_level` and `sensor.<device_id>_battery_state` to `sensor.battery_level` and `sensor.battery_state`. When you set up additional devices, the new sensors for those device will be distinguished with an identifier on the end (i.e. `sensor.battery_level_2`).

# Requirements
The new updated iOS app requires the following integrations to be enabled in your Home Assistant instance:
-   `default_config:`

If for some reason you have disabled the default config make sure your `configuration.yaml` contains at least:
-   `mobile_app:`
-   `discovery:`


For some features the following integrations also need to be enabled:
-   `cloud:` is used for securely connecting to your Home Assistant via Nabu Casa subscription via Remote UI and cloud webhooks
-   `ios:` is used if you want advanced notifications like actionable notifications and categories

## 1 - Disconnecting the iOS integration

Upgrading to version 2.0 of Home Assistant Companion requires setting up the app as new. Before you start, it is strongly recommended that you delete the previous iOS integration from Home Assistant. To this, follow these steps.

1.  Use a browser to load your Home Assistant instances and go to "Configuration" (cog icon) and then "Integrations".
2.  Select the iOS integration for the device you wish to upgrade.
3.  You should see two entities listed with the sensors `sensor.<device name>_battery_level` and `sensor.<device name>_battery_state` where `<device_name>` is the name specified in iOS settings>General>About, click the cog icon next to these and delete the each entity in turn (the order you do this in does not matter).
4.  If this was your only device, you can now delete the iOS integration as a whole by going back one page and using the trash can icon in the top right.
5.  Open the 'known_devices.yaml' file and remove the entry that has the same `<device_name>` as in Step 3.
6.  Restart Home Assistant. The connection between your old Home Assistant Companion 1.5 App and your Home Assistant Instance should now be fully removed.

## 2 - Setting up Home Assistant Companion 2.0
Once you have completed the steps above you can now continue the setup procedure as described in the [main getting started guide](index#setting-up).

## Changes from 1.5 to 2.0

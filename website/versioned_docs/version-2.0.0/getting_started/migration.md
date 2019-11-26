---
title: Migrating to Home Assistant Companion 2.0
id: version-2.0.0-migration
original_id: migration
---

The steps below should guide you through the process of migrating from the previous app version (1.5) to 2.0. Before going any further, please make sure you read the [breaking changes](migration#breaking-changes) listed below.

# Breaking Changes
- All notifications need to be updated as the notify service is moving from ```notify.ios_device_id``` to ```notify.mobile_app_device_name```. In the old version the device_id was set in the iOS app settings, after the update the device_name is taken from iOS settings.
- Your existing device tracker entity will be obsolete. The old app used known_devices.yaml whereas the updated app uses the mobile_app integration and entity storage. Your old tracker ```device_tracker.device_id``` will no longer update, the new tracker will be called ```device_tracker.device_name```.
- The new device tracker no longer contains attributes such as "trigger: Geographic Region entered". These have all moved to sensors that will be created via the mobile_app integration.

## 1 - Disconnecting the iOS integration

## 2 - Setting up Home Assistant Companion 2.0

## Changes from 1.5 to 2.0

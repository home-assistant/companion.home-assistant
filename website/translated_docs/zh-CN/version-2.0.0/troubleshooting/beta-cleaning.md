---
title:
  Beta testing: cleaning between builds
id: version-2.0.0-beta-cleaning
original_id: beta-cleaning
---

User who have been taking part in the beta testing of 2.0 have likely been through many builds and picked up several sensors which are now redundant. The following steps will allow you to carry out a *scorched earth* removal of previous builds from your Home Assistant instance and get you running again. It assumes you have only been using one device during the beta or wish to remove all traces of previous beta builds from all devices.

0. **Make a backup or snapshot of your Home assistant. Don't skip this step!**
1. Go to Integrations on the Home Assistant Configuration page.
2. Select Mobile App: <device id> (where Device ID is the name of your iPhone or iPad).
3. Delete the integration by clicking the trash can in the top right corner. If you had multiple Mobile App entries on the previous page, repeat this step for each one.
4. Return to the Home Assistant Configuration page and open the Entity Registry.
5. Delete all entries with `mobile_app` listed to the right of them.
6. Using your preferred method of editing files on Home Assistant instance, open the `.storage` folder and delete the `mobile_app` file.
7. Open known_devices.yaml and delete the (probably last) entry consisting of a 32-character unique ID, representing the device_tracker of your device.
8. Restart Home Assistant.
9. Delete the Home Assistant App from your device.
10. Reinstall the Home Assistant App from TestFlight (during beta testing) or AppStore.
11. Open the app and follow the setup process.
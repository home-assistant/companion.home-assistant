---
title: Beta testing: cleaning between builds
id: version-2.0.0-beta-cleaning
original_id: beta-cleaning
---

Users who have been taking part in the beta testing of 2.0 have likely been through many builds and picked up several sensors which are now redundant. The following steps will allow you to carry out a _scorched earth_ removal of previous builds from your Home Assistant instance and get you running again.

> In most cases, the connection between Home Assistant and the Companion App can be fully removed by deleting the relevant "Mobile App" integration from within Home Assistant. This can be found in "Configuration" and then "Integrations". After doing this you can uninstall the Companion App from your device and (if desired) reinstall. If you have an Apple Watch, it is worth checking that the Home Assistant Companion App has been uninstalled from your Watch before reinstalling.

If the above doesn't work, you can follow the steps below to fully remove all traces of the Companion App from Home Assistant. The steps assume you have only been using one device during the beta or wish to remove all traces of previous beta builds from all devices.

0.  **Make a backup or snapshot of your Home assistant. Don't skip this step!**
1.  Go to Integrations on the Home Assistant Configuration page.
2.  Select Mobile App: <Device ID> (where Device ID is the name of your iPhone or iPad).
3.  Delete the integration by clicking the trash can in the top right corner. If you had multiple Mobile App entries on the previous page, repeat this step for each one.
4.  Return to the Home Assistant Configuration page and open the Entity Registry.
5.  Delete all entries with `mobile_app` listed to the right of them.
6.  Using your preferred method of editing files on Home Assistant instance, open the `.storage` folder and delete the `mobile_app` file.
7.  Open known_devices.yaml and delete the (probably last) entry consisting of a 32-character unique ID, representing the device_tracker of your device.
8.  Restart Home Assistant.
9.  Delete the Home Assistant App from your device. If you have an Apple Watch, check in the Watch App that Home Assistant Companion has been uninstalled from that too.
10. Reinstall the Home Assistant App from TestFlight (during beta testing) or AppStore.
11. Open the app and follow the setup process.

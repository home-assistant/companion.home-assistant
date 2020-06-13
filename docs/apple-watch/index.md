---
title: "Overview"
id: "index"
---

Home Assistant has deep integration with the Apple Watch. You can display Home Assistant information as complications directly on your watch face or launch actions from the Watch app.

:::info requirements
The Apple Watch integration requires watchOS 5. In order to install watchOS 5 you must have an iPhone 5s or later with iOS 12 or later, and an Apple Watch Series 1 through 4. The first-generation Series 0 Apple Watch is not compatible with watchOS 5. You can identify your Apple Watch model [here](https://support.apple.com/HT204507).
:::

## Manual Sync Procedure
<!-- Added by request, probably remove or rewrite this later -->
By default the app will sync your complications every 30 minutes although the first update after creating a complication may take longer. There is a temporary way to manually sync, instructions below.

1. In the Home Assistant Companion app, navigate to App Configuration -> Apple Watch and stay on that screen.
2. Now launch the Home Assistant Apple Watch app.
3. Press the Back button inside Home Assistant Companion mobile app, bringing you back to the main settings screen.
4. Press "Done" in the top right to sync and update the complications on your Apple Watch.

:::tip
Data will update much more frequently if Background Fetch is turned on and if the face containing the complication is left selected.
:::

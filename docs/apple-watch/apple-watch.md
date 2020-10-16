---
title: "Overview"
id: "apple-watch"
---

Home Assistant has deep integration with the Apple Watch. You can display Home Assistant information as complications directly on your watch face or launch actions from the Watch app.

:::info requirements
The Apple Watch integration requires watchOS 5. In order to install watchOS 5 you must have an iPhone 5s or later with iOS 12 or later, and an Apple Watch Series 1 or newer. The first-generation Series 0 Apple Watch is not compatible with watchOS 5. You can identify your Apple Watch model [here](https://support.apple.com/HT204507).
:::

## Complication types

The Apple Watch has a variety of Faces and Complications. It's useful to consult the [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/watchos/overview/complications/) for an example of the different Families and how the particular Complications will display. There are 4 main types of information you can put into Complications:

- Text, which can render as a [template](https://www.home-assistant.io/docs/configuration/templating/), is displayed at various font weights and sizes depending on the template type.
- Ring and Gauge, which appear circular lines. An open variant appears as a complete circle and a closed variant has concrete start and end locations in the icon. Rings and Gauges require numeric values between `0.0` (empty) and `1.0` (full) and also support [templates](https://www.home-assistant.io/docs/configuration/templating/).
- Images can be selected from the [Material Design Icons](http://materialdesignicons.com) choices supported by the app. 

:::note app version 
Ring and Gauge features do not work in app releases prior to 2020.7.
:::

## Complication Updating

### 2020.7 and newer

Complications will update roughly on :00, :15, :30, and :45 on the hour; the exact timing is determined by the system. Editing a Complication will immediately sync it to the Watch, but you may need to launch the Watch app for the Complications to update.

The app keeps inactive Complications up-to-date to make Face-changing easier. If the Home Assistant app is not on your active Watch Face, it will update much less often and you may find it displaying older information when switching Faces.

### 2020.6 and older

<!-- Added by request, probably remove or rewrite this later -->
By default the app will sync your complications every 30 minutes although the first update after creating a complication may take longer. To try and force a manual sync, follow these steps:

1. In the Home Assistant Companion app, navigate to App Configuration -> Apple Watch and stay on that screen.
2. Now launch the Home Assistant Apple Watch app.
3. Press the Back button inside Home Assistant Companion mobile app, bringing you back to the main settings screen.
4. Press "Done" in the top right to sync and update the complications on your Apple Watch.

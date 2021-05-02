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

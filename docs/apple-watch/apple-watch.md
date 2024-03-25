---
title: "Overview"
id: "apple-watch"
---

Home Assistant has deep integration with the Apple Watch. You can display Home Assistant information as complications directly on your watch face or launch actions from the Watch app.

:::info requirements
The Apple Watch integration requires watchOS 8. In order to install watchOS 8 you must have an Apple Watch Series 3 or newer. You can identify your Apple Watch model [here](https://support.apple.com/HT204507).
:::

## Complication types

The Apple Watch has a variety of Faces and Complications. It's useful to consult the [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/) for an example of the different Families and how the particular Complications will display. There are 4 main types of information you can put into Complications:

- Text, which can render as a [template](https://www.home-assistant.io/docs/configuration/templating/), is displayed at various font weights and sizes depending on the template type.
- Ring and Gauge, which appear circular lines. An open variant appears as a complete circle and a closed variant has concrete start and end locations in the icon. Rings and Gauges require numeric values between `0.0` (empty) and `1.0` (full) and also support [templates](https://www.home-assistant.io/docs/configuration/templating/).
- Images can be selected from the [Material Design Icons](http://materialdesignicons.com) choices supported by the app. 

:::info Supported Complication types
As of watchOS 9, several (legacy) Complication types are no longer supported by Apple. The following Complication types can be used for watchOS 9 and higher: Graphic Circular, Graphic Corner, Graphic Rectangular & Modular Large. Further details on the different types can be found in the [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/).
:::

:::note app version 
Ring and Gauge features do not work in app releases prior to 2020.7.
:::

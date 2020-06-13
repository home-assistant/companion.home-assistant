---
title: "Complications"
id: "complications"
---

Complications allow you to show the value of your Home Assistant sensors on your Apple Watch face. The Home Assistant Apple Watch App contains complications for most Apple Watch faces.

## Creating Complications

Complications are created in within the Home Assistant Companion App on a paired iPhone via the Apple Watch page in the App Configuration menu.

Complications are listed by their position and grouped by face type. For some positions, there are multiple templates available, after selecting the position you can select the desired template. Complication values are set using [Jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/). In addition to setting the template for the displayed text, an icon can also be selected. The color of each text line and icon can be set independently. For an overview of the different complications and how they appear on different watch faces, see [these Apple Developers guidelines](https://developer.apple.com/design/human-interface-guidelines/watchos/app-architecture/complications/).

## Ring Complications

To set how filled the ring of an open- or closed-ring complication is, normalise the value produced by your template to `1.0`. A value of `0.0` will give an empty ring and `1.0` will give a full ring.

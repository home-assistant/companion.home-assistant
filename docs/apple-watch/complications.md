---
title: "Complications"
id: "complications"
---

Complications allow you to show the value of your Home Assistant sensors on your Apple Watch face. The Home Assistant Apple Watch App contains complications for most Apple Watch faces.

## Creating Complications

Complications are created in within the Home Assistant Companion App on a paired iPhone via the Apple Watch page in the App Configuration menu.

Complications are listed by their position and grouped by face type. For some positions, there are multiple templates available, after selecting the position you can select the desired template. Complication values are set using [Jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/). In addition to setting the template for the displayed text, an icon can also be selected. The color of each text line and icon can be set independently. For an overview of the different complications and how they appear on different watch faces, see [these Apple Developers guidelines](https://developer.apple.com/design/human-interface-guidelines/watchos/app-architecture/complications/).

## Ring Complications

To set how filled the ring of an open- or closed-ring complication is, normalize the value produced by your template to `1.0`. A value of `0.0` will give an empty ring and `1.0` will give a full ring.

## Automatic updates

Complications will update roughly at :00, :15, :30, and :45 on the hour; the exact timing is determined by the system. Editing a Complication will immediately sync it to the Watch, but you may need to launch the Watch app for the Complications to update.

The app keeps inactive Complications up-to-date to make Face-changing easier. If the Home Assistant app is not on your active Watch Face, it will update much less often and you may find it displaying older information when switching Faces.

## Manual updates

Complications can also be updated a [Notification Command](/notifications/commands.md). These are limited by the system to 50 per day, and you can see the current limits in the Apple Watch section of App Configuration.

This may take between a few seconds and a few minutes for the update to fully apply.

![iOS](/assets/iOS.svg) 2021.6 (<span class="beta">BETA</span>) is required for manual updates.

```yaml
- service: notify.mobile_app_<your_device_id_here>
  data:
    message: update_complications
```

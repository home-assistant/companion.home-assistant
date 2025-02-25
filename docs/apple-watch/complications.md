---
title: "Complications"
id: "complications"
---

:::info
All templating described below requires that the user is an administrator.
:::

Complications allow you to show the value of your Home Assistant sensors on your Apple Watch face. The Home Assistant Apple Watch App contains complications for most Apple Watch faces.

## Creating Complications

Complications are created within the Home Assistant Companion App on a paired iPhone via the Apple Watch page in the Companion App section of [Configuration](https://my.home-assistant.io/redirect/config/).

Complications are listed by their position and grouped by face type. For some positions, there are multiple templates available, after selecting the position you can select the desired template. Complication values are set using [Jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/). In addition to setting the template for the displayed text, an icon can also be selected. The color of each text line and icon can be set independently. For an overview of the different complications and how they appear on different watch faces, see [these Apple Developers guidelines](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/).

## Creating a Complication for the new "Modular" Watch face

WatchOS 9 removed the old "Modular" Watch face and renamed the "Infographic Modular" to "Modular". When creating a new complication for the new "Modular" Watch face, choose "Circular" or "Rectangular" from the "Graphic" section. The Complications in the "Modular" section no longer work.

![New Complication](https://github.com/user-attachments/assets/46541b65-48da-4228-8035-06b90da73689)

Example:

![Graphic Circular Example](https://github.com/user-attachments/assets/57a69fd3-38b7-4b48-b401-2941504515f1)

## Ring/Gauge Complications

To set how filled the ring of an open- or closed-ring complication is, normalize the value produced by your template to a number from `0.0` through `1.0`. A value of `0.0` will give an empty ring and `1.0` will give a full ring. You can accomplish this with a template like so:

```jinja2
{{ (value - minimum) / (maximum - minimum) }}
```

For example, to show a temperature sensor between a set of values:

```jinja2
{% set original = states("sensor.living_room_temperature") | float %}
{% set minimum = 16.0 %}
{% set maximum = 24.0 %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

You can also make the minimum and maximum dynamic. For example, basing it on the current forecast:

```jinja2
{% set forecast = state_attr("weather.openweathermap", "forecast") | first %}
{% set original = state_attr("weather.openweathermap", "temperature") %}
{% set minimum = forecast["templow"] %}
{% set maximum = forecast["temperature"] %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

These examples both take care to avoid returning values \<0 or >1.0, which is what the 'adjusted' variable is doing.

## Automatic updates

Complications will update roughly at :00, :15, :30, and :45 on the hour; the exact timing is determined by the system. Editing a Complication will immediately sync it to the Watch, but you may need to launch the Watch app for the Complications to update.

The app keeps inactive Complications up-to-date to make Face-changing easier. If the Home Assistant app is not on your active Watch Face, it will update much less often and you may find it displaying older information when switching Faces.

## Manual updates

Complications can also be updated using a [Notification Command](/notifications/commands.md). These are limited by the system to 50 per day, and you can see the current limits in the Apple Watch section of Companion App section of [Configuration](https://my.home-assistant.io/redirect/config/).

It may take a few seconds or a few minutes for the update to fully apply.

![iOS](/assets/iOS.svg) 2021.6 is required for manual updates.

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: update_complications
```

:::info
Manually updating via command does not yet work when using Local Push.
:::

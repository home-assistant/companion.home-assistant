---
title: "Overview"
id: "meta-quest"
---

![Android](/assets/android.svg)<br />

Home Assistant has started to offer the [minimal flavor](/core/android-flavors.md) of the Android app for the Meta Quest. The app can be found in [SideQuest](https://www.sidequestvr.com), the alternative App Store for the Meta Quest.

<a href="https://sidequestvr.com/app/6427/home-assistant" style={{ display: 'inline-block', width: '200px' }}>
    <img class="download-badge" width="175" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" alt="Download on SideQuest" />
</a>
<br /><br />


| Model | Supported? |
| ----- | --------- |
| Meta Quest | Yes |
| Meta Quest 2 | Yes |
| Meta Quest Pro | Yes |
| Meta Quest 3/3s | Yes |

The app features many of the sensors offered by the main version as the Quest runs Android. Check out the Manage Sensors screen in settings to see what sensors are currently supported. To learn about each Android sensor and how sensors work in general make sure to check the [sensors](/core/sensors.md#android-sensors) documentation.

Not all features of the Android app will work on the Meta Quest as it runs a heavily modified fork of Android. There are no google services, no widgets, no shortcuts and no standard notifications.

On this page we will be covering specific features and sensors built for the Meta Quest as they are ready, stay tuned for more updates!

### Sensor List

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
|`binary_sensor.in_use` | None | Whether the headset is in use (Updates immediately) |

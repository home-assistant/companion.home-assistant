---
title: "Android Flavors"
id: 'android-flavors'
---

The <img class='OSlogo' src='/assets/android.svg' alt='Android logo' /> Android app is being offered in 2 different flavors as either `full` or `minimal`. The `full` flavor of the app is offered via the [Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) and has the full set of features offered as it requires Google Play Services. The `full` flavor is offered for both production and [beta releases](https://play.google.com/apps/testing/io.homeassistant.companion.android).

The `minimal` flavor of the app does not require Google Play Services and can be found on the [releases](https://github.com/home-assistant/android/releases) section on GitHub as an APK. This flavor of the app does not offer location tracking nor does it have notifications. The only sensors that will not be available are: [Activity](/core/sensors.md#activity-sensor) and [Geocoded](/core/sensors.md#geocoded-location-sensor).

In addition to these 2 flavors users can also find `debug` APKs on the [actions](https://github.com/home-assistant/android/actions) section for each pull request submitted to GitHub. The `debug` version of the app can be installed side by side the production or beta version of the app. This allows users to help test upcoming features and fixes. Both the `minimal` and `full` flavors offer a `debug` version.

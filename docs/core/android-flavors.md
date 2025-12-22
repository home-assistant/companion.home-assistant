---
title: "Android Flavors"
id: 'android-flavors'
---

The ![Android](/assets/android.svg) Android app is being offered in 2 different flavors as either `full` or `minimal`. The `full` flavor of the app is offered via the [Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) and has the full set of features offered as it requires Google Play Services. The `full` flavor is offered for both production and [beta releases](https://play.google.com/apps/testing/io.homeassistant.companion.android).

The `minimal` flavor of the app does not require Google Play Services and is available in the [releases](https://github.com/home-assistant/android/releases) section on GitHub as an APK. It can also be installed from [F-Droid](https://f-droid.org/en/packages/io.homeassistant.companion.android.minimal). However, updates may be delayed because F-Droid builds new releases independently. This flavor does not support location tracking. Additionally, the following sensors are unavailable: [Activity sensors](/core/sensors.md#activity-sensors).

In addition to these 2 flavors users can also find `debug` APKs on the [actions](https://github.com/home-assistant/android/actions) section for each pull request submitted to GitHub. The `debug` version of the app can be installed side by side the production or beta version of the app. This allows users to help test upcoming features and fixes. Both the `minimal` and `full` flavors offer a `debug` version.

<details>
<summary>Certificate fingerprints</summary>
  
Below are the SHA-256 fingerprints for the signing certificate.

Play Store/GitHub releases:
`11:19:4B:A8:09:B4:2D:DF:0E:1A:7D:EC:68:42:A5:9C:7F:F1:11:9C:54:82:E9:5F:EB:FF:D5:C6:01:4D:AA:5A`

F-Droid releases:
`17:48:52:50:A0:3A:0F:2B:3F:29:2A:05:4F:59:5A:9E:79:4B:EE:F8:0C:F9:10:F7:B3:BB:B8:09:8A:BF:6D:50`

You can compare them with your downloaded apk / installed application using `apksigner verify --print-certs app-(full/minimal)-release.apk` or [AppVerifier](https://github.com/soupslurpr/AppVerifier)
</details>

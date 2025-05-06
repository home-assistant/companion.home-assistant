---
title: "Android Shortcuts"
id: 'android-shortcuts'
---

![Android](/assets/android.svg)

The Android app offers support for both dynamic and pinned [shortcuts](https://developer.android.com/guide/topics/ui/shortcuts). Shortcuts allow users to navigate to a specific dashboard page or entity directly from the home screen without needing to first launch the app. Supported devices will see a Manage Shortcuts section under Companion App in [Settings](https://my.home-assistant.io/redirect/config/). From there users must supply the Label which appears in the launcher (Google recommends 10 characters). The description must also be provided as some launchers may prefer to display it (Google recommends 25 characters).

There are currently 2 supported shortcut types: Dashboard or Entity. The default shortcut type is Dashboard and you must enter the Dashboard path (ex: `/dashboard-name/viewname`, `/lovelace/default_view` or `/lovelace-dashboardname/viewname`) in order to create the shortcut. If you selected Entity then you will be presented with a new Entity field that will contain a list of all entities from your Home Assistant server to select. Once selected you will be able to create the shortcut.

To find the Dashboard path, open the Dashboard and view in a web browser and look at the URL and copy everything after the port number.  For Example, http://homeassistant.local:8123/dashboard-mobile/0, would be a path of /dashboard-mobile/0 .

Dynamic shortcuts are supported on devices with Android 7.1+. These shortcuts need to be added from Companion App in [Settings](https://my.home-assistant.io/redirect/config/) so users can drag them on their home screen after long pressing the app icon. It is important to note that Android only supports displaying 5 dynamic shortcuts under the long press menu however, most launchers only support showing 4. All 5 shortcuts can be updated and also deleted from the app long press menu.

Pinned shortcuts are supported on devices with Android 8.0+. These shortcuts can only be created from Companion App in [Settings](https://my.home-assistant.io/redirect/config/) and can either be manually dragged or automatically added from this screen. They will not appear under the app long press menu and instead will appear directly on the home screen. There is no limit to the amount of shortcuts a user can have added. Pinned shortcuts can be updated at any time.

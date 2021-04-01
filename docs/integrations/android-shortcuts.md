---
title: "Android Shortcuts"
id: 'android-shortcuts'
---

![Android](/assets/android.svg) &nbsp;<span class="beta">BETA</span><br />

The Android app offers support for both dynamic and pinned [shortcuts](https://developer.android.com/guide/topics/ui/shortcuts). Shortcuts allow users to navigate to a specific lovelace page or entity directly from the home screen without needing to first launch the app. Supported devices will see a Manage Shortcuts section under App Configuration. From there users must supply the Label which appears in the launcher (Google recommends 10 characters). The description must also be provided as some launchers may prefer to display it (Google recommends 25 characters). Finally the lovelace path must be entered (ex: `/lovelace/settings`). To navigate to a specific entity more info screen you will want to use `entityId:<entity_id>` where `<entity_id>` is replaced with the actual entity ID (ex: `entityId:sun.sun`).

Dynamic shortcuts are supported on devices with Android 7.1+. These shortcuts need to be added from App Configuration so users can drag them on their home screen after long pressing the app icon. It is important to note that Android only supports displaying 5 dynamic shortcuts under the long press menu however, most launchers only support showing 4. All 5 shortcuts can be updated and also deleted from the app long press menu.

Pinned shortcuts are supported on devices with Android 8.0+. These shortcuts can only be created from App Configuration and can either be manually dragged or automatically added from this screen. They will not appear under the app long press menu and instead will appear directly on the home screen. There is no limit to the amount of shortcuts a user can have added. Pinned shortcuts can be updated at any time.

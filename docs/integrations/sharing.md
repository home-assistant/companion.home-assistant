---
title: "Sharing"
id: 'sharing'
---

This feature will be available in the following app versions:

| ![iOS](/assets/iOS.svg) | ![Android](/assets/android.svg) Android |
| ----------------------------- | --------------------------------------- |
| 2020.7                        | 2.5.0                                   |


The companion apps let you share to your Home Assistant server from any application that allows you to share. The apps will fire a `mobile_app.share` event with some event data for you to automate with.

Both of the apps will provide event data for either `url` or `text` depending on which application the share came from. iOS users will get event data for `entered` which will contain any text sent with the share. Android users will get event data for `caller` which will contain the app that the share event came from.

Example event data for the Android app:

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "caller": "android-app://com.android.chrome",
        "subject": "Webpage Title",
        "url": "https://www.example.xom",
        "text": "TEXT",
        "device_id": "DEVICE_ID"
    },
    "origin": "REMOTE",
    "time_fired": "2020-09-25T01:06:48.512587+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}
```

Example event data for the iOS app:

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "entered": "Text that I typed",
        "sourceDeviceID": "iphone_11_pro_debug",
        "sourceDeviceName": "iPhone 11 Pro",
        "sourceDevicePermanentID": "DEVICE_ID",
        "text": "Home Assistant automations system into multiple areas of iOS ",
        "url": "https://www.example.com"
    },
    "origin": "REMOTE",
    "time_fired": "2020-09-25T01:07:48.926946+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}
```
---
title: "Sharing"
id: 'sharing'
---

The ![android](/assets/android.svg) Android app allows you to share to your Home Assistant server from any application that allows you to share. The Android app will fire a `mobile_app.share` event with some event data for you to automate with, including what app the share came from.

Example event data when you share from Chrome to the Android app:

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "caller": "android-app://com.android.chrome",
        "subject": "Webpage Title",
        "url": "https://www.example.xom",
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

Example event when you share a text message to the Android app:

```json
{
    "event_type": "mobile_app.share",
    "data": {
        "caller": "android-app://com.google.android.apps.messaging",
        "subject": "TEXT_MESSAGE",
        "text": "TEXT_MESSAGE",
        "device_id": "DEVICE_ID"
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
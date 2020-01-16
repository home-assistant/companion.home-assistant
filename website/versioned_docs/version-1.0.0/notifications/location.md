---
title: Requesting location updates
id: version-1.0.0-location
original_id: location
---

> Do not rely on this functionality due to the time limitations mentioned below.

You can force a device to attempt to report its location by sending a special notification.

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        message: "request_location_update"
```

Assuming the device receives the notification, it will attempt to get a location update within 5 seconds and report it to Home Assistant. This is a little bit hit or miss since Apple imposes a maximum time allowed for the app to work with the notification and location updates sometimes take longer than usual due to factors such as waiting for GPS acquisition.

---
title: "Critical notifications"
id: "critical-notifications"
---
The configuration and behavior of critical notifications differ between iOS and Android.

## ![iOS](/assets/iOS.svg)
Critical notifications were introduced in iOS 12 and are designed for sending high-priority notifications that you don't want to miss - for example security system, water leak sensor, and smoke/CO2 alarm alerts.

iOS gives special priority to this type of notification. Critical alerts always appear at the top of your lock screen above all other notifications, and play a sound even if Do Not Disturb is enabled or the iPhone is muted. Because we never want you to miss a critical notification, they are allowed to bypass the app [notification rate limits](details.md) as well.

![iOS](/assets/iOS.svg)example

```yaml
automations:
  - alias: "Fire Detected iOS"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "Wake up!"
          message: "The house is on fire and the cat's stuck in the dryer!"
          data:
            push:
              sound:
                name: "default"
                critical: 1
                volume: 1.0

```
If you have previously read the [sounds documentation](sounds.md) this syntax should be mostly familiar. Note the example expands the `sound` attribute to include the `critical: 1` flag, and `volume: 1.0` to set the volume to 100 %.

Alternatively, you can use the [`interruption-level` syntax](basic.md#interruption-level) to make a notification critical.
```yaml
automations:
  - alias: "Dog barking loudly"

    trigger:
      - platform: numeric_state
        entity_id: sensor.dog_bark_decibel_meter
        above: "90"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "Snoopy is going to wake the neighbors"
          message: "The dog is barking and likely to wake the neighbors!"
          data:
            interruption-level: critical

```

For **CarPlay** users, it's also worth mentioning that critical notifications are the only ones that can appear on the car's built-in display, making them very useful if you want to know when something critical happens while you're driving.

## ![Android](/assets/android.svg)

:::info
The below options will only impact when [local push notifications](local.md) are not used. If you are on the minimal version you do not need to worry about this.
:::

For Android, notifications will appear immediately in most cases. However, in some cases (such as phone being stationary or when screen has been turned off for prolonged period of time), default notifications will not ring the phone until screen is turned on.

To override that behavior, set `priority: high` and `ttl: 0`.

By default they also do not override Do Not Disturb settings, if you would like to override this you will need to use [notification channels](basic.md#notification-channels). 

![Android](/assets/android.svg) &nbsp; Android example

```yaml
automations:
  - alias: "Fire Detected android"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "Wake up!"
          message: "The house is on fire and the cat's stuck in the dryer!"
          data:
            ttl: 0
            priority: high
```

### ![Android](/assets/android.svg) Alarm Stream
You can also force the notification to play from the alarm stream so it will make the device ring even if on vibrate/silent ringer mode. Users on Android 7 and below can still use the `channel` example below as we are just using it to override the default notification behavior for sound. In order to make a notification show up immediately and make a sound regardless of ringer mode follow one of the examples below.

Using this method to can send a normal notification:

```yaml
automations:
  - alias: "Fire Detected Android alarm stream"
    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "Wake up!"
          message: "The house is on fire and the cat's stuck in the dryer!"
          data:
            ttl: 0
            priority: high
            channel: alarm_stream
```


### ![Android](/assets/android.svg) Text To Speech Alarm Stream
Or you can use Text To Speech to speak the notification:

```yaml
automations:
  - alias: "Fire Detected TTS alarm"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            ttl: 0
            priority: high
            media_stream: alarm_stream
            tts_text: "The house is on fire and the cat's stuck in the dryer!"
```

### ![Android](/assets/android.svg) Text To Speech Alarm Stream Max Volume
Alternatively using Text To Speech you can also make the notification speak as loud as it can, and then revert back to the original volume level:

```yaml
automations:
  - alias: "Fire Detected TTS loud"

    trigger:
      - platform: state
        entity_id: sensor.smoke_alarm
        to: "smoke"

    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          data:
            ttl: 0
            priority: high
            media_stream: alarm_stream_max
            tts_text: "The house is on fire and the cat's stuck in the dryer!"
```

---
title: "Live Activities"
id: "live-activities"
---

![iOS](/assets/iOS.svg)

:::info
Live Activities require iOS 17.2 or later. They are not available on iPad (Apple system restriction) or macOS.
:::

Live Activities display real-time state from Home Assistant on the iOS Lock Screen — without the user needing to unlock their phone. Use them for anything time-sensitive: appliance countdowns, EV charging progress, delivery tracking, alarm states, or media playback.

![Washing Machine, EV Charging, Now Playing, and Package Delivery Live Activities on the Lock Screen](/assets/ios/live-activity-lockscreen-cards.png)

---

## Starting a Live Activity

Add `live_update: true` to any notification's `data` block. The companion app intercepts the payload and starts a Live Activity instead of (or in addition to) a standard notification banner. This is the same field Android uses for [Live Updates](notifications-basic#live-updates), so a single automation targets both platforms.

```yaml
automation:
  - alias: "Washing machine started"
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "Washing Machine"
          message: "Rinsing · 1 of 2"
          data:
            tag: washer_cycle
            live_update: true
            progress: 900
            progress_max: 3600
            chronometer: true
            when: 2700
            when_relative: true
            notification_icon: mdi:washing-machine
            notification_icon_color: "#2196F3"
```

A `tag` is required. It uniquely identifies the activity — subsequent pushes with the same `tag` update the existing activity in-place rather than creating a new one.

![Washing Machine Live Activity showing "Rinsing · 1 of 2" with a blue progress bar](/assets/ios/live-activity-washing-solo.png)

---

## Updating a Live Activity

Send the same payload again with the same `tag`. The Lock Screen updates silently — no banner, no sound.

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      title: "Washing Machine"
      message: "Cycle complete"
      data:
        tag: washer_cycle
        live_update: true
        progress: 3600
        progress_max: 3600
        notification_icon: mdi:washing-machine
        notification_icon_color: "#4CAF50"
```

![Washing Machine Live Activity showing "Cycle complete" with a full green progress bar](/assets/ios/live-activity-complete-solo.png)

---

## Ending a Live Activity

### Option 1 — `clear_notification` (recommended)

`clear_notification` with a `tag` ends both the Live Activity and any delivered notification with the same identifier in one action. This is the same command used on Android, so one automation handles both platforms.

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "clear_notification"
      data:
        tag: washer_cycle
```

### Option 2 — `end_live_activity` command

Use this when you want to end the Live Activity without affecting other notifications.

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "end_live_activity"
      data:
        tag: washer_cycle
```

An optional `dismissal_policy` controls how long the ended activity remains visible:

| `dismissal_policy` | Behavior |
|---|---|
| _(omitted)_ | Removed immediately |
| `default` | iOS decides how long to show it (typically a few seconds) |
| `after:<unix_timestamp>` | Removed at a specific time (capped at 24 hours from now) |

```yaml
data:
  message: "end_live_activity"
  data:
    tag: washer_cycle
    dismissal_policy: "after:<unix_timestamp>"
```

---

## Payload fields

Unless noted otherwise, Live Activity options go inside the nested `data:` block (`data.data`) of the notification payload. Standard notification fields like `title` and `message` stay at the top level (`data.title`, `data.message`), just like other mobile app notifications.

| Field | Type | Description |
|---|---|---|
| `tag` | string | **Required.** Unique identifier for the activity. Alphanumeric, hyphens, and underscores only; max 64 characters. |
| `live_update` | boolean | Set to `true` to start or update a Live Activity. Also enables Android [Live Updates](notifications-basic#live-updates) on the same payload. |
| `title` | string | Top-level notification field (`data.title`). Static header text for the notification; set at creation and cannot be changed by updates. |
| `message` | string | Top-level notification field (`data.message`). Main body text shown in the notification and on the Lock Screen. |
| `critical_text` | string | Short supplementary text shown alongside the title. |
| `progress` | integer | Current progress value (such as seconds elapsed). |
| `progress_max` | integer | Maximum progress value. Shows a progress bar when both are set. |
| `chronometer` | boolean | Show a live countdown or count-up timer. Requires `when`. |
| `when` | number | Timer reference point. Unix timestamp (absolute) or seconds (relative when `when_relative: true`). |
| `when_relative` | boolean | If `true`, treat `when` as seconds from now rather than a Unix timestamp. |
| `notification_icon` | string | [Material Design Icon](https://pictogrammers.com/library/mdi/) slug, such as `mdi:washing-machine`. |
| `notification_icon_color` | string | Hex color for the icon, such as `#2196F3`. |

---

## Cross-platform automation (iOS + Android)

Both iOS and Android use `live_update: true` as the trigger — a single YAML automation targets both platforms without any platform-specific keys. iOS ignores Android-only fields (`alert_once`, `sticky`, `visibility`) and Android ignores iOS-only fields.

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      title: "Washing Machine"
      message: "45 minutes remaining"
      data:
        tag: washer_cycle
        live_update: true           # iOS 17.2+ and Android 16+
        progress: 2700
        progress_max: 3600
        chronometer: true
        when: 2700
        when_relative: true
        notification_icon: mdi:washing-machine
        notification_icon_color: "#2196F3"
        # Android-only fields — iOS silently ignores these:
        alert_once: true
        sticky: true
```

---

## Settings

Go to **Settings → Live Activities** in the companion app to see whether Live Activities are enabled on the device and view or end any currently active activities.

---

## Example scenarios

### Plain notification with a message

```yaml
data:
  tag: status-update
  live_update: true
  title: "Home Assistant"
  message: "Everything looks good at home."
```

![Plain "Home Assistant / Everything looks good at home." Live Activity banner on the Lock Screen](/assets/ios/live-activity-plain-crop.png)

### Multiple concurrent activities

Multiple Live Activities stack on the Lock Screen under the app group header.

![Four Live Activities grouped on the Lock Screen: Home Assistant, Script Running, Security Alarm, All Fields](/assets/ios/live-activity-multi-crop.png)

### Security alert with icon and color

```yaml
data:
  tag: security-alert
  live_update: true
  title: "Security Alert"
  message: "Person detected · Camera 1"
  notification_icon: mdi:motion-sensor
  notification_icon_color: "#F44336"
```

![Security Alert Live Activity card with a red motion sensor icon](/assets/ios/live-activity-security-solo.png)

---

## Notes and limitations

**iPad:** Live Activities are not available on iPad — Apple system restriction, not a companion app limitation. The Settings screen shows "Not available on iPad" and Home Assistant receives `supports_live_activities: false` in the device registration.

**iOS 18 rate limiting:** Apple throttles Live Activity updates to approximately 15 seconds between rendered updates. Structure automations to fire on state change events rather than polling timers.

**Stale activities:** If the app is force-quit and relaunched, it automatically reattaches to any Live Activities that iOS kept alive. Activities expire after 8 hours of no updates (Apple system limit).

**Privacy:** The first time a Live Activity is started, the companion app displays a one-time disclosure noting that Lock Screen content is visible without unlocking the device.

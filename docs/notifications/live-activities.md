---
title: "Live Activities and Live Updates"
id: "live-activities"
---

**Live Activities** (iOS) and **Live Updates** (Android) keep real-time Home Assistant state visible on the Lock Screen, Dynamic Island, status bar, and always-on display — without the user needing to unlock their device.

Both platforms use the same `live_update: true` field, so a single YAML automation targets iOS and Android simultaneously. Each platform silently ignores fields it does not support.

:::info Requirements
- ![iOS](/assets/iOS.svg) **iOS:** iOS 17.2 or later. Not available on iPad or macOS.
- ![Android](/assets/android.svg) **Android:** Android 16 or later. Status bar chip appearance may vary by manufacturer.
:::

![Washing Machine, EV Charging, Now Playing, and Package Delivery Live Activities on the iOS Lock Screen](/assets/ios/live-activity-lockscreen-cards.png)

---

## Starting

Add `live_update: true` and a `tag` to any notification payload. The companion app intercepts the push and displays a Live Activity (iOS) or Live Update (Android) instead of a standard notification banner.

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

The `tag` uniquely identifies the activity. Subsequent pushes with the same `tag` update the existing activity in-place rather than creating a new one.

![iOS](/assets/iOS.svg) The activity appears on the Lock Screen and Dynamic Island.

![Android](/assets/android.svg) The notification is pinned to the top of the notification shade, the Lock Screen, and the always-on display. It also shows as a chip in the status bar. `title` must be provided.

![Android Live Update showing "Washing Machine / Rinsing · 1 of 2" on the Lock Screen](/assets/android/live_updates_washing_lockscreen.png)

:::note Samsung devices
On Samsung, you may need to enable **Live notifications for all apps** in developer options for the status bar chip to appear.
:::

---

## Updating

Send the same payload again with the same `tag`. The display updates silently — no banner, no sound.

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

![Android Live Update showing "Washing Machine / Cycle complete" on the Lock Screen](/assets/android/live_updates_complete_lockscreen.png)

---

## Ending

Send `clear_notification` with the same `tag` to end the Live Activity / Live Update and dismiss any delivered notification with that identifier — on both iOS and Android.

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "clear_notification"
      data:
        tag: washer_cycle
```

### Dismissal policy ![iOS](/assets/iOS.svg)

On iOS, if you want to control how long the ended activity stays visible on the Lock Screen rather than removing it immediately, use the `end_live_activity` command with an optional `dismissal_policy`:

| `dismissal_policy` | Behavior |
|---|---|
| _(omitted)_ | Removed immediately |
| `default` | Stays visible on the Lock Screen for up to [4 hours after ending](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities#Understand-constraints), or until the user removes it |
| `after:<unix_timestamp>` | Removed at a specific time (capped at 24 hours from now). Unix timestamp = seconds since January 1, 1970. |

Use a Home Assistant template to generate the timestamp. For example, to keep the activity visible for 5 minutes after ending:

```yaml
data:
  message: "end_live_activity"
  data:
    tag: washer_cycle
    dismissal_policy: "after:{{ (now().timestamp() + 300) | int }}"
```

---

## Payload fields

`title` and `message` are standard notification fields set at the top level (`data.title`, `data.message`). All other Live Activity / Live Update fields go inside the nested `data:` block (`data.data`).

| Field | Platform | Type | Description |
|---|---|---|---|
| `tag` | Both | string | **Required.** Unique identifier for the activity. Alphanumeric, hyphens, and underscores only; max 64 characters. |
| `live_update` | Both | boolean | Set to `true` to start or update a Live Activity / Live Update. |
| `title` | Both | string | Top-level field (`data.title`). Static header text; set at creation, cannot be changed by updates. |
| `message` | Both | string | Top-level field (`data.message`). Main body text shown in the notification and on the Lock Screen / always-on display. |
| `critical_text` | Both | string | Short supplementary text. ![Android](/assets/android.svg) Shown in the status bar chip (replaced by `chronometer` if set). |
| `progress` | Both | integer | Current progress value (such as seconds elapsed). |
| `progress_max` | Both | integer | Maximum progress value. Shows a progress bar when both `progress` and `progress_max` are set. |
| `chronometer` | Both | boolean | Show a live countdown or count-up timer. Requires `when`. ![Android](/assets/android.svg) Replaces `critical_text` in the status bar chip. |
| `when` | Both | number | Timer reference point. Unix timestamp (absolute) or seconds (relative when `when_relative: true`). |
| `when_relative` | Both | boolean | If `true`, treat `when` as seconds from now rather than a Unix timestamp. |
| `notification_icon` | Both | string | [Material Design Icon](https://pictogrammers.com/library/mdi/) slug, such as `mdi:washing-machine`. |
| `notification_icon_color` | ![iOS](/assets/iOS.svg) | string | Hex color for the icon, such as `#2196F3`. |
| `alert_once` | ![Android](/assets/android.svg) | boolean | If `true`, the notification only alerts (sound/vibration) once. |
| `sticky` | ![Android](/assets/android.svg) | boolean | If `true`, the notification is not dismissed when the user taps it. |
| `dismissal_policy` | ![iOS](/assets/iOS.svg) | string | Used with `end_live_activity`. Controls how long the ended activity stays visible. See [Ending](#option-2--end_live_activity-command-). |

---

## Example scenarios

### Plain notification with a message

```yaml
data:
  title: "Home Assistant"
  message: "Everything looks good at home."
  data:
    tag: status-update
    live_update: true
```

![Plain "Home Assistant / Everything looks good at home." Live Activity banner on the iOS Lock Screen](/assets/ios/live-activity-plain-crop.png)

### Security alert with icon and color

```yaml
data:
  title: "Security Alert"
  message: "Person detected · Camera 1"
  data:
    tag: security-alert
    live_update: true
    notification_icon: mdi:motion-sensor
    notification_icon_color: "#F44336"
```

![Security Alert Live Activity card with a red motion sensor icon](/assets/ios/live-activity-security-solo.png)

![Android Live Update showing "Security Alert / Person detected · Camera 1" on the Lock Screen](/assets/android/live_updates_security_lockscreen.png)

### Multiple concurrent activities

![iOS](/assets/iOS.svg) Multiple Live Activities stack on the Lock Screen under the app group header.

![Four Live Activities grouped on the iOS Lock Screen: Home Assistant, Script Running, Security Alarm, All Fields](/assets/ios/live-activity-multi-crop.png)

![Android](/assets/android.svg) On Android, multiple Live Updates appear as separate pinned notifications in the notification shade.

![Android notification shade showing multiple Live Updates including Washing Machine and Home Assistant](/assets/android/live_updates_notification_shade.png)

---

## Platform-specific behavior

### iOS

**Dynamic Island:** On iPhone Pro models, the Live Activity also appears as a compact island pill at the top of the screen.

:::warning iPad not supported
Live Activities are not available on iPad — this is an Apple system restriction, not a companion app limitation. The Settings screen shows "Not available on iPad" and Home Assistant receives `supports_live_activities: false` in the device registration.
:::

**Settings:** Go to **Settings → Live Activities** in the companion app to see whether Live Activities are enabled and to view or end any currently active activities.

:::note iOS limitations
- **Rate limiting:** Apple throttles Live Activity updates to approximately 15 seconds between rendered updates. Structure automations to fire on state-change events rather than polling timers.
- **Expiry:** Activities expire after [up to 8 hours](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities#Understand-constraints) (Apple system limit). After ending, the activity remains on the Lock Screen for up to 4 additional hours before the system removes it. If the app is force-quit and relaunched, it automatically reattaches to any Live Activities iOS kept alive.
- **Privacy:** The first time a Live Activity is started, the companion app displays a one-time disclosure noting that Lock Screen content is visible without unlocking the device.
:::

### Android

**Always-on display:** The Live Update appears pinned at the top of the notification shade, on the Lock Screen, and on the always-on display.

**Status bar chip:** The notification shows as a chip in the status bar. Use `critical_text` to display a short label in the chip. If `chronometer: true` is set, the timer replaces `critical_text` in the chip. If there is not enough space in the status bar, only the icon is shown.

:::note Samsung devices
On Samsung, you may need to enable **Live notifications for all apps** in developer options for the status bar chip to appear.
:::

![Status bar chip without critical text](/assets/android/live_updates_without_critical_text.png)
![Status bar chip with critical text](/assets/android/live_updates_with_critical_text.png)

![Always-on display showing progress and chronometer](/assets/android/live_updates_always_on_display.png)

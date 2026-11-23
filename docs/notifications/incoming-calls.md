---
title: "Incoming calls"
id: "incoming-calls"
---

<span class='beta'>BETA</span> ![iOS](/assets/iOS.svg) iOS only.

On iOS, a notification can ring your phone like a phone call: full screen on the lock screen, with the system Answer and Decline buttons. Use it for a video doorbell, an intercom, or a video call between two homes. Home Assistant does not carry the audio or video through the call. Answering opens a page of your Home Assistant, such as a dashboard with your intercom or video card, where the conversation happens.

## Turning it on

Incoming calls are opt-in. In the app, go to **Settings** > **Notifications** and switch on **Ring incoming calls**.

When the switch is off, an incoming call arrives as a time-sensitive notification with **Answer** and **Decline** actions. Those actions send the same events as the call screen, so the same automation works either way.

:::info
Incoming calls are not available on devices set to the China region, where Apple does not allow CallKit. They arrive as notifications there.
:::

## Sending a call

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  title: "Front door"
  message: "incoming_call"
  data:
    tag: "front-door"
    caller: "Front door"
    video: true
    url: "/lovelace/intercom"
    timeout: 45
    action_data:
      door: front
```

| Key | Required | Description |
|-----|----------|-------------|
| `tag` | yes | Identifies the call. 1 to 64 letters, digits, `-` or `_`. Use the same tag to stop the call. |
| `caller` | no | The name shown on the call screen. Defaults to the name of your Home Assistant server. Line breaks and control characters are removed, and it is cut to 64 characters. |
| `video` | no | Shows the call as a video call. Defaults to `true`. |
| `url` | no | The page opened when the call is answered: a path on your Home Assistant, such as `/lovelace/intercom`, or a full address of your own Home Assistant (its internal, external or Home Assistant Cloud address, same scheme and port). Any other address is ignored and answering just opens the app. Declining never opens it. |
| `timeout` | no | How many seconds the phone rings before the call counts as missed: between 10 and 120. Defaults to 45. |
| `action_data` | no | Sent back with every call event. |

`title`, `actions`, `push` and the other usual notification options still apply to the notification that is shown when the call cannot ring.

## Stopping a call

When the caller hangs up, or someone answered on another device, stop the ringing with the same tag, from the same Home Assistant server:

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: "clear_notification"
  data:
    tag: "front-door"
```

## Reacting to the answer

A call that rings sends one `mobile_app_notification_action` event:

| `action` | When |
|----------|------|
| `CALL_ANSWER` | The call was answered. |
| `CALL_DECLINE` | The call was declined. |
| `CALL_MISSED` | Nobody answered within `timeout`, or Focus or Do Not Disturb kept the phone from ringing. |
| `CALL_BUSY` | Another call was already ringing on the phone. |

Stopping a call with `clear_notification` sends no event. A call shown as a notification sends `CALL_ANSWER` or `CALL_DECLINE` when you choose one of its actions, but no `CALL_MISSED`: the app can't tell that a notification was ignored.

The event's `action_data` holds your own `action_data` together with the call's fields (`tag`, and `caller`, `video`, `url` and `timeout` when you set them), so one automation can tell calls apart:

```yaml
triggers:
  - trigger: event
    event_type: mobile_app_notification_action
    event_data:
      action: CALL_ANSWER
conditions:
  - condition: template
    value_template: "{{ trigger.event.data.action_data.tag == 'front-door' }}"
actions:
  - action: notify.mobile_app_<other_device_id_here>
    data:
      message: "clear_notification"
      data:
        tag: "front-door"
```

## When the phone rings

| Situation | What you get |
|-----------|--------------|
| The app is open | The call screen |
| The phone is on a Wi-Fi network where [local push](/docs/notifications/notification-local) is active | The call screen, on the lock screen too |
| Anywhere else | A time-sensitive notification with **Answer** and **Decline** |

To keep things in check, the same tag rings only once every 10 minutes and at most 3 calls ring per minute. Further calls arrive as notifications. Calls are never answered automatically and are not added to the Phone app's call history.

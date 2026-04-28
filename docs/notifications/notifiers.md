---
title: "Notifiers"
id: "notify"
---

The **Mobile App** integration will add a notify entity for your device. To send a notification you can use the **Notifications: Send a notification message** (`notify.send_message`) action. For more customizable notifications, you can use the classic [`mobile_app` notify platform](/docs/notifications/notifications-basic) instead.

## Using notifiers from the user interface

To send a notification from an automation or a script:

1. Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations).
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Notifications: Send a notification message**.
6. Under **Targets**, choose what devices you want to notify:
    - To notify a specific device, select the entity or device.
    - To notify every device assigned to a room, select an area.
    - To notify every device assigned to a floor, select a floor.
    - To notify devices sharing a tag, select a label.
7. Customize message and title.
8. Select **Save**.

## Using notifiers in YAML

In YAML, use the action `notify.send_message`. A basic example looks like this:

```yaml
action: notify.send_message
  target:
    entity_id: notify.my_device
data:
  title: "Just a reminder"
  message: "You are awesome!"
```

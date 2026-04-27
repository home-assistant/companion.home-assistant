---
title: "Notifiers"
id: "notify"
---

The **Mobile App** integration will add a notify entity for your device. To send a notification you can use the `notify.send_message` action. For further instructions on how to use the notifiers in automations, please see the [getting started with automation page](https://www.home-assistant.io/getting-started/automation/).

```yaml
action: notify.send_message
data:
  title: "Just a reminder"
  message: "You are awesome!"
  entity_id: notify.my_device
```

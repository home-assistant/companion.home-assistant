---
title: Приватность, ограничение ставок и безопасность
id: version-2.0.0-details
original_id: подробности
---

## Конфиденциальность

На удаленных серверах не хранится содержимое уведомлений. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate-limiting purposes) is kept.

## Ограничение частоты запросов

В настоящее время вам разрешено отправлять не более 150 push-уведомлений в день на устройство. Это значит, что обслуживание остается дешевым для поддержания. В будущем мы возможно добавим поддержку обновления, чтобы разрешить больше уведомлений.

The in-app Notifications settings screen displays your current rate limits for the day broken out into the following categories: Attempts, Delivered, Errors, Total, and the exact time until next daily reset. Ограничение тарифов обнуляется в полночь UTC ежедневно.

If an error occurs while sending a notification, it does not count towards your rate limit. Critical Alerts, Requesting location updates [via push notiifcation](notifications/location.md) and the special `clear_badge` notification type also do not count towards your rate limit.

## Безопасность

Весь обмен данными между Home Assistant, push инфраструктурой и Apple, зашифрован с помощью SSL.
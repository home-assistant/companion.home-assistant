---
title: Приватність, обмеження ставки та безпека
id: version-2.0.0-details
original_id: деталі
---

## Приватність

На віддалених серверах не зберігається вміст сповіщень. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate-limiting purposes) is kept.

## Обмеження ліміту

Наразі вам дозволено надсилати не більше 150 поштових повідомлень на день на пристрій. Це гарантує, що обслуговування залишається дешевим. У майбутньому ми можемо додати підтримку для оновлення, щоб дозволити більше сповіщень.

The in-app Notifications settings screen displays your current rate limits for the day broken out into the following categories: Attempts, Delivered, Errors, Total, and the exact time until next daily reset. Ліміт ставок обнулюється в північ UTC щодня.

If an error occurs while sending a notification, it does not count towards your rate limit. Critical Alerts, Requesting location updates [via push notiifcation](notifications/location.md) and the special `clear_badge` notification type also do not count towards your rate limit.

## Безпека

Весь трафік між Home Assistant, інфраструктурою push та Apple, шифрується за допомогою SSL.
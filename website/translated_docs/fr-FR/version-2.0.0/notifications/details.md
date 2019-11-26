---
title: Confidentialité, limite et sécurité
id: version-2.0.0-details
original_id: détails
---

## Confidentialité

Aucun contenu de notification n'est stocké sur des serveurs distants. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate-limiting purposes) is kept.

## Rate limiting

Actuellement, vous pouvez envoyer un maximum de 150 notifications push par jour par appareil. This is to ensure that the service remains cheap to maintain. In the future we may add support for upgrading to allow more notifications.

The in-app Notifications settings screen displays your current rate limits for the day broken out into the following categories: Attempts, Delivered, Errors, Total, and the exact time until next daily reset. The rate limit resets at midnight UTC daily.

If an error occurs while sending a notification, it does not count towards your rate limit. Critical Alerts, Requesting location updates [via push notiifcation](notifications/location.md) and the special `clear_badge` notification type also do not count towards your rate limit.

## Sécurité

Tout le trafic entre votre instance Home Assistant, l'infrastructure push et Apple est chiffré avec SSL.
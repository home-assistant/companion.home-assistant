---
title: Confidentialité, limite et sécurité
id: version-1.0.0-details
original_id: détails
---

## Confidentialité

Aucun contenu de notification n'est stocké sur des serveurs distants. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate limiting purposes) is kept.

## Rate limiting

Actuellement, vous pouvez envoyer un maximum de 150 notifications push par jour par appareil. This is to ensure that the service remains cheap to maintain. In the future we may add support for upgrading to allow more notifications. The rate limit resets at midnight UTC daily. When a notification is sent your current rate limits (including sent notifications and notifications remaining for the day) will be output to your Home Assistant logs. If an error occurs while sending a notification your rate limit will not be affected.

## Sécurité

Tout le trafic entre votre instance Home Assistant, l'infrastructure push et Apple est chiffré avec SSL.
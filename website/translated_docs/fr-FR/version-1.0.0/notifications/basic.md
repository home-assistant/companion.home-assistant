---
title: Introduction
id: version-1.0.0-basic
original_id: basique
---

La plateforme de notification iOS accepte la norme `title`, `message` et `target` en paramètres. La plateforme de notification iOS supporte les cibles comme des services. En supposant que vous n'avez pas défini un nom `name` lors de la configuration de la plate-forme, vous devriez trouver tous vos appareils iOS enregistrés et activés disponibles en tant que cibles de services préfixés par "notify.ios_" puis le nom de l'appareil que vous avez entré à l'installation.

Notes:

* `title` ne s'affiche que sur Apple Watch et appareils avec iOS 10 ou plus.

* `target` peut être utilisé pour spécifier un seul périphérique en utilisant son PushID, trouvé dans `ios.conf`. The preferred way of providing a target is through a target specific notify service.

![A push notification showing all of the basic options <code>title</code> and <code>message</code> as well as <code>subtitle</code> and actions.](assets/ios/example.png)

### Amélioration des notifications de base

#### Badge

Vous pouvez définir le badge d'icône dans les données :

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            badge: 5
```

#### Sous-titre

À partir d'iOS 10, un sous-titre est pris en charge en plus du titre :

```yaml
automation
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          subtitle: "Subtitle goes here"
```

#### Identifiant de fil / Thread-id (regroupement de notification)

À partir d'iOS 12, le regroupement de notifications est pris en charge. Toutes les notifications avec le même identifiant de fil seront regroupées dans le centre de notification. Sans un identifiant de fil, toutes les notifications de l'application seront placées dans un seul groupe.

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            thread-id: "example-notification-group"
```

### Envoi de notifications sur plusieurs téléphones

Pour envoyer des notifications à plusieurs téléphones, créez un [groupe de notification](https://www.home-assistant.io/components/notify.group/):

```yaml
notify:

  - name: NOTIFIER_NAME
    platform: group
    services:
      - service: ios_iphone_one
      - service: ios_iphone_two
```

Maintenant, vous pouvez envoyer des notifications à tous les membres du groupe en utilisant :

```yaml
  automation:
    - alias: Notify iOS app
      trigger:
        ...
      action:
        service: notify.NOTIFIER_NAME
        data:
          message: "Something happened at home!"
          data:
            push:
              badge: 5
```
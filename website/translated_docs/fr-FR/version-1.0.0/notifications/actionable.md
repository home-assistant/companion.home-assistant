---
title: Notifications activables
id: version-1.0.0-actionable
original_id: actionnable
---

Les notifications actionnables vous permettent d'attacher 1 à 4 boutons personnalisés sur une notification. Quand une des actions est sélectionnée Home Assistant sera notifiée de l'action choisie. Cela vous permet de construire des automatismes complexes.

Exemples de notifications actionnables :

* Une notification est envoyée à chaque fois qu'un mouvement est détecté dans votre maison pendant que vous êtes absent ou endormi. Vous pouvez ajouter une action pour déclencher l'alarme. Quand elle est choisie, Home Assistant est notifié que l'action `sound_alarm` a été sélectionnée. Vous pouvez ajouter une automatisation pour faire sonner l'alarme à chaque fois que cet événement est détecté.
* Quelqu'un sonne à votre porte. Vous pouvez envoyer une action pour verrouiller ou déverrouiller votre porte d'entrée. Lorsque vous appuyez sur le bouton, une notification est renvoyée à Home Assistant sur lequel vous pouvez construire des automatisations.
* Envoyez une notification lorsque votre porte de garage s'ouvre, grâce à des actions il est possible d'ouvrir et de fermer le garage.

![Les notifications actionnables permettent à l'utilisateur d'envoyer une commande à Home Assistant.](assets/ios/actions.png)

## Overview of how actionable notifications work

In advance of sending a notification:

1. Define a notification category in your Home Assistant configuration which contain 1-4 actions.
2. At launch iOS app requests notification categories from Home Assistant (can also be done manually in notification settings).

When sending a notification:

1. Send a notification with `data.push.category` set to a pre-defined notification category identifier.
2. Push notification delivered to device
3. User opens notification.
4. Action tapped
5. Identifier of action sent back to HA as the `actionName` property of the event `ios.notification_action_fired`, along with other metadata such as the device and category name.

![How the iOS device and Home Assistant work together to enable actionable notifications.](assets/NotificationActionFlow.png)

## Definitions

* Category - A category represents a type of notification that the app might receive. Think of it as a unique group of actions.
* Actions - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports.

## Category parameters

* **name** (*Required*): A friendly name for this category.
* **identifier** (*Required*): A unique identifier for the category. Must be lowercase and have no special characters or spaces.
* **actions** (*Required*): A list of actions.

## Actions parameters

* **identifier** (*Required*): A unique identifier for this action. Must be uppercase and have no special characters or spaces. Only needs to be unique to the category, not unique globally.
* **title** (*Required*): The text to display on the button. Keep it short.
* **activationMode** (*Optional*): The mode in which to run the app when the action is performed. Setting this to `foreground` will make the app open after selecting. Default value is `background`.
* **authenticationRequired** (*Optional*): If `true`, the user must unlock the device before the action is performed.
* **destructive** (*Optional*): When the value of this property is a truthy value, the system displays the corresponding button differently to indicate that the action is destructive (text color is red).
* **behavior** (*Optional*): When `textInput` the system provides a way for the user to enter a text response to be included with the notification. The entered text will be sent back to Home Assistant. Default value is `default`.
* **textInputButtonTitle** (*Optional*): The button label. *Required* if `behavior` is `textInput`.
* **textInputPlaceholder** (*Optional*): The placeholder text to show in the text input field. Only used if `behavior` is `textInput` and the device runs iOS 10.

Here's a fully built example configuration:

```yaml
ios:
  push:
    categories:
      - name: Alarm
        identifier: 'alarm'
        actions:
          - identifier: 'SOUND_ALARM'
            title: 'Sound Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
            behavior: 'default'
          - identifier: 'SILENCE_ALARM'
            title: 'Silence Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: false
            behavior: 'textInput'
            textInputButtonTitle: 'Silencio!'
            textInputPlaceholder: 'Placeholder'
```

## Building automations for notification actions

Here is an example automation to send a notification with a category in the payload:

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!"
        data:
          push:
            badge: 5
            sound: <SOUND FILE HERE>
            category: "alarm" # Needs to match the top level identifier you used in the ios configuration
          action_data: # Anything passed in action_data will get echoed back to Home Assistant.
            entity_id: light.test
            my_custom_data: foo_bar
```

Quand une action est choisie, un événement nommé `ios.notification_action_fired` sera émit sur le bus d'événement d'Home Assistant. Voici un exemple de payload.

```json
{
  "sourceDeviceName": "Robbie's iPhone 7 Plus",
  "sourceDeviceID": "robbies_iphone_7_plus",
  "actionName": "SOUND_ALARM",
  "sourceDevicePushId": "ab9f02fe-6ac6-47b8-adeb-5dd87b489156",
  "textInput": "",
  "actionData": {}
}
```

Voici un exemple d'automatisation associé au payload :

```yaml
automation:

  - alias: Sound the alarm
    trigger:
      platform: event
      event_type: ios.notification_action_fired
      event_data:
        actionName: SOUND_ALARM
    action:
      ...
```

Notes:

* `textInput` n'existera que si `behavior` a été défini à `textInput`.
* `actionData` est un dictionnaire avec des paramètres passés dans le `action_data` dictionnaire du `push` dictionnaire dans la notification originale.
* Lors de l'ajout ou de la mise à jour des catégories push, assurez-vous de mettre à jour les paramètres push dans l'application iOS Home Assistant. Cela peut être trouvé dans l'application dans **Paramètres** (icône engrenage) > **Paramètres de notification**.

## Compatibilité avec les différents appareils

* Pour les appareils qui supportent "Force Touch" / "3D Touch" - une longue pression sur la notification provoquera l'apparition des actions. Appareils tels que iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max ainsi que certains modèles d'iPad et d'Apple Watch.

* Pour les appareils qui ne supportent pas cette fonctionnalité - un glisser de gauche à droite sur la notification + appuyez sur le bouton "Afficher", les actions apparaîtront. Appareils tels que l'iPhone 6 et modèles antérieur, iPhone SE, iPhone XR et certains modèles d'iPad.
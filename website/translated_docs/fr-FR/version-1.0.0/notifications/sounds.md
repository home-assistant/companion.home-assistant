---
title: Sons
id: version-1.0.0-sounds
original_id: sons
---

Ajouter un son personnalisé à une notification vous permet d'identifier facilement la notification sans même regarder votre appareil. Home Assistant pour iOS est équipé de quelques sons de notification pré-installés mais vous pouvez également télécharger les votre.

Voici une exemple de notification qui utilise un des sons pré-installés.

```yaml
- alias: Notify iOS app
  trigger:
    ...
  action:
    service: notify.ios_<your_device_id_here>
    data:
      message: “Something happened at home!”
      data:
        push:
          sound: "US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav"
```

Notes:

* Vous devez utiliser le nom complet du fichier dans le payload (y compris l'extension).

## Sons de notification push personnalisés

L'application vous permet d'utiliser vos propres sons personnalisés dans les notifications push. Les sons doivent être formatés en fichier wav 32 bits 48000Hz. Vous définissez le nom du son dans le payload de notification. Pour ajouter des sons :

1. Connectez l'appareil à un PC ou Mac avec la dernière version d'iTunes.
2. Allez sur l'appareil dans iTunes.
3. Sélectionnez "Partage de fichiers" dans le menu de gauche.
4. Sélectionnez Home Assistant.
5. Glissez et déposez les sons correctement formatés (fichier wav 32 bits 48000Hz).
6. Cliquez sur Synchroniser en bas à droite.
7. Une fois la synchronisation terminée, déconnectez l'appareil de l'ordinateur.
8. Sur votre appareil iOS, ouvrez l'application Home Assistant.
9. Allez dans Paramètres -> Paramètres de notification.
10. Sélectionnez "Importer des sons depuis iTunes".

Assurer que vous avez correctement formaté les sons, ils sont maintenant disponibles pour être utilisé dans les notifications push.

Notes:

* **Veuillez noter que, en raison d'un bogue dans iOS 10, vous devrez peut-être redémarrer l'appareil avant que les sons de notification ne puissent être lus. Cela devrait être bientôt corrigé par Apple.**
* Le téléchargement d'un fichier avec le même nom qu'un fichier existant écrasera l'original.
* Il est possible de voir quels sons sont installé dans chaque l'appareil en inspectant le fichier `ios.conf` de votre configuration d'Home Assistant. Ils sont listés dans le tableau `pushSounds`.

### Sons de notification pré-installés

    US-EN-Alexa-Back-Door-Opened.wav
    US-EN-Alexa-Back-Door-Unlocked.wav
    US-EN-Alexa-Basement-Door-Opened.wav
    US-EN-Alexa-Basement-Door-Unlocked.wav
    US-EN-Alexa-Boyfriend-Is-Arriving.wav
    US-EN-Alexa-Daughter-Is-Arriving.wav
    US-EN-Alexa-Front-Door-Opened.wav
    US-EN-Alexa-Front-Door-Unlocked.wav
    US-EN-Alexa-Garage-Door-Opened.wav
    US-EN-Alexa-Girlfriend-Is-Arriving.wav
    US-EN-Alexa-Good-Morning.wav
    US-EN-Alexa-Good-Night.wav
    US-EN-Alexa-Husband-Is-Arriving.wav
    US-EN-Alexa-Mail-Has-Arrived.wav
    US-EN-Alexa-Motion-At-Back-Door.wav
    US-EN-Alexa-Motion-At-Front-Door.wav
    US-EN-Alexa-Motion-Detected-Generic.wav
    US-EN-Alexa-Motion-In-Back-Yard.wav
    US-EN-Alexa-Motion-In-Basement.wav
    US-EN-Alexa-Motion-In-Front-Yard.wav
    US-EN-Alexa-Motion-In-Garage.wav
    US-EN-Alexa-Patio-Door-Opened.wav
    US-EN-Alexa-Patio-Door-Unlocked.wav
    US-EN-Alexa-Smoke-Detected-Generic.wav
    US-EN-Alexa-Smoke-Detected-In-Basement.wav
    US-EN-Alexa-Smoke-Detected-In-Garage.wav
    US-EN-Alexa-Smoke-Detected-In-Kitchen.wav
    US-EN-Alexa-Son-Is-Arriving.wav
    US-EN-Alexa-Water-Detected-Generic.wav
    US-EN-Alexa-Water-Detected-In-Basement.wav
    US-EN-Alexa-Water-Detected-In-Garage.wav
    US-EN-Alexa-Water-Detected-In-Kitchen.wav
    US-EN-Alexa-Welcome-Home.wav
    US-EN-Alexa-Wife-Is-Arriving.wav
    US-EN-Daisy-Back-Door-Motion.wav
    US-EN-Daisy-Back-Door-Open.wav
    US-EN-Daisy-Front-Door-Motion.wav
    US-EN-Daisy-Front-Door-Open.wav
    US-EN-Daisy-Front-Window-Open.wav
    US-EN-Daisy-Garage-Door-Open.wav
    US-EN-Daisy-Guest-Bath-Leak.wav
    US-EN-Daisy-Kitchen-Sink-Leak.wav
    US-EN-Daisy-Kitchen-Window-Open.wav
    US-EN-Daisy-Laundry-Room-Leak.wav
    US-EN-Daisy-Master-Bath-Leak.wav
    US-EN-Daisy-Master-Bedroom-Window-Open.wav
    US-EN-Daisy-Office-Window-Open.wav
    US-EN-Daisy-Refrigerator-Leak.wav
    US-EN-Daisy-Water-Heater-Leak.wav
    US-EN-Morgan-Freeman-Back-Door-Closed.wav
    US-EN-Morgan-Freeman-Back-Door-Locked.wav
    US-EN-Morgan-Freeman-Back-Door-Opened.wav
    US-EN-Morgan-Freeman-Back-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Basement-Door-Closed.wav
    US-EN-Morgan-Freeman-Basement-Door-Locked.wav
    US-EN-Morgan-Freeman-Basement-Door-Opened.wav
    US-EN-Morgan-Freeman-Basement-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Boss-Is-Arriving.wav
    US-EN-Morgan-Freeman-Boyfriend-Is-Arriving.wav
    US-EN-Morgan-Freeman-Cleaning-Supplies-Closet-Opened.wav
    US-EN-Morgan-Freeman-Coworker-Is-Arriving.wav
    US-EN-Morgan-Freeman-Daughter-Is-Arriving.wav
    US-EN-Morgan-Freeman-Friend-Is-Arriving.wav
    US-EN-Morgan-Freeman-Front-Door-Closed.wav
    US-EN-Morgan-Freeman-Front-Door-Locked.wav
    US-EN-Morgan-Freeman-Front-Door-Opened.wav
    US-EN-Morgan-Freeman-Front-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Garage-Door-Closed.wav
    US-EN-Morgan-Freeman-Garage-Door-Opened.wav
    US-EN-Morgan-Freeman-Girlfriend-Is-Arriving.wav
    US-EN-Morgan-Freeman-Good-Morning.wav
    US-EN-Morgan-Freeman-Good-Night.wav
    US-EN-Morgan-Freeman-Liquor-Cabinet-Opened.wav
    US-EN-Morgan-Freeman-Motion-Detected.wav
    US-EN-Morgan-Freeman-Motion-In-Basement.wav
    US-EN-Morgan-Freeman-Motion-In-Bedroom.wav
    US-EN-Morgan-Freeman-Motion-In-Game-Room.wav
    US-EN-Morgan-Freeman-Motion-In-Garage.wav
    US-EN-Morgan-Freeman-Motion-In-Kitchen.wav
    US-EN-Morgan-Freeman-Motion-In-Living-Room.wav
    US-EN-Morgan-Freeman-Motion-In-Theater.wav
    US-EN-Morgan-Freeman-Motion-In-Wine-Cellar.wav
    US-EN-Morgan-Freeman-Patio-Door-Closed.wav
    US-EN-Morgan-Freeman-Patio-Door-Locked.wav
    US-EN-Morgan-Freeman-Patio-Door-Opened.wav
    US-EN-Morgan-Freeman-Patio-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav
    US-EN-Morgan-Freeman-Searching-For-Car-Keys.wav
    US-EN-Morgan-Freeman-Setting-The-Mood.wav
    US-EN-Morgan-Freeman-Smartthings-Detected-A-Flood.wav
    US-EN-Morgan-Freeman-Smartthings-Detected-Carbon-Monoxide.wav
    US-EN-Morgan-Freeman-Smartthings-Detected-Smoke.wav
    US-EN-Morgan-Freeman-Smoke-Detected-In-Basement.wav
    US-EN-Morgan-Freeman-Smoke-Detected-In-Garage.wav
    US-EN-Morgan-Freeman-Smoke-Detected-In-Kitchen.wav
    US-EN-Morgan-Freeman-Someone-Is-Arriving.wav
    US-EN-Morgan-Freeman-Son-Is-Arriving.wav
    US-EN-Morgan-Freeman-Starting-Movie-Mode.wav
    US-EN-Morgan-Freeman-Starting-Party-Mode.wav
    US-EN-Morgan-Freeman-Starting-Romance-Mode.wav
    US-EN-Morgan-Freeman-Turning-Off-All-The-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Air-Conditioner.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Bar-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Chandelier.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Family-Room-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Hallway-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Kitchen-Light.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Light.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Mood-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-TV.wav
    US-EN-Morgan-Freeman-Turning-On-The-Air-Conditioner.wav
    US-EN-Morgan-Freeman-Turning-On-The-Bar-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Chandelier.wav
    US-EN-Morgan-Freeman-Turning-On-The-Family-Room-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Hallway-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Kitchen-Light.wav
    US-EN-Morgan-Freeman-Turning-On-The-Light.wav
    US-EN-Morgan-Freeman-Turning-On-The-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Mood-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-TV.wav
    US-EN-Morgan-Freeman-Vacate-The-Premises.wav
    US-EN-Morgan-Freeman-Water-Detected-In-Basement.wav
    US-EN-Morgan-Freeman-Water-Detected-In-Garage.wav
    US-EN-Morgan-Freeman-Water-Detected-In-Kitchen.wav
    US-EN-Morgan-Freeman-Welcome-Home.wav
    US-EN-Morgan-Freeman-Wife-Is-Arriving.wav
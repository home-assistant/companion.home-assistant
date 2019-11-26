---
title: Contenu dynamique
id: version-1.0.0-dynamic-content
original_id: dynamic-content
---

With the new Content Extension feature found in iOS 10, dynamic content can now be displayed as part of a notification without opening an app.

# Map

Affichera une carte avec une épingle rouge aux coordonnées données. La carte sera centrée sur les coordonnées données.

```yaml
service: notify.ios_<your_device_id_here>
data:
  message: Something happened at home!
  data:
    push:
      category: map
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```

## Affichage d'une deuxième épingle

Vous pouvez utiliser les propriétés suivantes sous `action_data` pour afficher une deuxième épingle. Si utilisé, la première épingle sera rouge et la deuxième verte.

- **seconde_latitude**: La latitude de la deuxième épingle. **Doit être une chaîne !**
- **seconde_longitude**: La longitude de la deuxième épingle. **Doit être une chaîne !**
- **shows_line_between_points**: Une valeur booléenne indiquant si une ligne doit être dessinée entre la première et le seconde épingle.

## Configuration supplémentaire

Vous pouvez également passer les propriétés suivantes sous `action_data` pour modifier la carte de différentes manières. Tous sont censés être des valeurs booléennes sauf indication contraire :

- **shows_compass**: Un booléen indiquant si la carte affiche un contrôle de la boussole.
- **shows_points_of_interest**: Un booléen indiquant si la carte affiche des informations de point d'intérêt.
- **shows_scale**: Un booléen indiquant si la carte affiche les informations d'échelle.
- **shows_traffic**: Une valeur booléenne indiquant si la carte affiche les informations de trafic.
- **shows_user_location**: Une valeur booléenne indiquant si la carte doit essayer d'afficher l'emplacement de l'utilisateur.

![Un exemple du contenu dynamique avec la carte.](assets/ios/map.png)

# Flux de caméra

La vignette de notification sera une image fixe de la caméra. Le contenu de notification est un flux MJPEG en temps réel d'une caméra (en supposant que la caméra le supporte).

Vous pouvez utiliser les paramètres de la pièce jointe `content-type` et `hide-thumbnail` avec la caméra pour contrôler la vignette.

Vous pouvez voir un exemple [ici](https://www.youtube.com/watch?v=LmYwpxPKW0g).

Note: Cette fonctionnalité n'est disponible qu'à partir d'iOS 11.

```yaml
service: notify.ios_<your_device_id_here>
data:
  message: Motion detected in the Living Room
  data:
    attachment:
      content-type: jpeg
    push:
      category: camera
    entity_id: camera.demo_camera
```

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LmYwpxPKW0g" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>
</div>

# Combinaison avec les notifications actionnables

Comme vous pouvez voir la `category` est utilisée pour dire à l'appareil quel type d'extension de contenu utiliser. Vous pouvez utiliser les mêmes identifiants de catégorie dans votre propre personnalisation [actions](actionable.md) pour ajouter des actions à l'extension de contenu.

Par exemple, cette configuration ajoute des actions à un message de contenu de la caméra.

```yaml
ios:
  push:
    categories:
      - name: Camera With Actions
        identifier: 'camera'
        actions:
          - identifier: 'OPEN_COVER'
            title: 'Open Cover'
            activationMode: 'background'
            authenticationRequired: true
            destructive: no
          - identifier: 'CLOSE_COVER'
            title: 'Close Cover'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
```

# Dépannage

Si vous avez des problèmes avec la réception de ces notifications spéciales, essayez de redémarrer votre téléphone. Les extensions peuvent mal s'enregistrer et un redémarrage doit être fait.
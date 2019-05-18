---
title: Fichiers joints
id: version-1.0.0-attachments
original_id: pièces jointes
---

iOS 10 ajoute *les pièces jointes* aux notifications. Une pièce jointe est une image, une vidéo ou un fichier audio qui est téléchargé sur l'appareil lorsqu'une notification est reçue et affichée parallèlement à la notification. Une vignette est affichée lorsque la notification n'est pas étendue. La pièce jointe de taille complète est affichée lorsque la notification est agrandie.

> Pour étendre une notification sur les appareils 3D Touch, il suffit d'appuyer sur les notifications. Sur les appareils non 3D Touch, glissez et appuyez sur le bouton "Voir".

```yaml
- alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!"
        data:
          attachment:
            url: "https://github.com/home-assistant/home-assistant-assets/blob/master/logo-round-192x192.png?raw=true"
            content-type: png
            hide-thumbnail: false
```

Notes:

- La vignette de la notification sera le média à l'`url`.
- Le contenu de notification est le média à l'`url`.
- La pièce jointe peut être utilisée avec des catégories de notification push personnalisées.

## Exemple

Une notification push non agrandie avec une pièce jointe.

![Une notification push non agrandie avec une pièce jointe.](assets/ios/attachment.png)

La même notification mais étendue pour afficher la taille complète de la pièce jointe

![La même notification mais étendue pour afficher la taille complète de la pièce jointe](assets/ios/expanded_attachment.png)

## Types de médias supportés

Si la pièce jointe n'apparaît pas, veuillez vous assurer qu'elle est dans l'un des formats suivants :

### Pièces jointes audio

Taille maximale du fichier : 5 Mo

Formats autorisés : AIFF, WAV, MP3, MPEG4 Audio

### Pièces jointes image

Taille maximale du fichier : 10 Mo

Formats autorisés : JPEG, GIF, PNG

### Pièces jointes vidéo

Taille maximale du fichier : 50 Mo

Formats autorisés : MPEG, MPEG2, MPEG4, AVI

## Configuration

- **url** (*Requis*): L'URL du contenu à utiliser comme pièce jointe. L'url *doit* être accessible depuis internet, ou alors l'appareil doit être sur le même réseau que le contenu.
- **content-type** (*Optionnel*): Par défaut, l'extension de l'URL sera vérifiée pour déterminer le fichier type. S'il n'y a pas d'extension/il ne peut pas être déterminé, vous pouvez fournir manuellement une extension de fichier.
- **hide-thumbnail** (*Optionnel*): Si défini à `true` la vignette ne s'affiche pas sur la notification. Le contenu ne sera visible qu'en agrandissant.
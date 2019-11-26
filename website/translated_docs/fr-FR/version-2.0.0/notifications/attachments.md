---
title: Pièces jointes standard
id: version-2.0.0-attachments
original_id: pièces jointes
---

Notifications may contain an image, video, or audio file attachment that is displayed alongside the notification. A thumbnail is shown on the notification preview and the full size attachment is displayed after the notification is expanded.

Une pièce jointe est une image, une vidéo ou un fichier audio qui est téléchargé sur l'appareil lorsqu'une notification est reçue et affichée parallèlement à la notification. Une vignette est affichée lorsque la notification n'est pas étendue. La pièce jointe de taille complète est affichée lorsque la notification est agrandie.

> Pour étendre une notification sur les appareils 3D Touch, il suffit d'appuyer sur les notifications. Sur les appareils non 3D Touch, glissez et appuyez sur le bouton "Voir".

```yaml
- alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
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

An unexpanded push notification with an image attachment:

![Une notification push non agrandie avec une pièce jointe.](assets/ios/attachment.png)

The same notification but expanded to show the full size image attachment:

![La même notification mais étendue pour afficher la taille complète de la pièce jointe](assets/ios/expanded_attachment.png)

## Types de médias supportés

Please ensure your attachment meets the criteria below, otherwise it will not show.

| Attachment Type | Maximum file size | Allowed Formats             |
|:---------------:| ----------------- | --------------------------- |
|      Image      | 10 MB             | JPEG, GIF, PNG              |
|      Video      | 50 MB             | MPEG, MPEG2, MPEG4, AVI     |
|      Audio      | 5 MB              | AIFF, WAV, MP3, MPEG4 Audio |

## Configuration

- **url** (*Requis*): L'URL du contenu à utiliser comme pièce jointe. L'url *doit* être accessible depuis internet, ou alors l'appareil doit être sur le même réseau que le contenu.
- **content-type** (*Optionnel*): Par défaut, l'extension de l'URL sera vérifiée pour déterminer le fichier type. S'il n'y a pas d'extension/il ne peut pas être déterminé, vous pouvez fournir manuellement une extension de fichier.
- **hide-thumbnail** (*Optionnel*): Si défini à `true` la vignette ne s'affiche pas sur la notification. Le contenu ne sera visible qu'en agrandissant.
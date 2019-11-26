---
title: Стандартні вкладення
id: version-2.0.0-attachments
original_id: вкладення
---

Notifications may contain an image, video, or audio file attachment that is displayed alongside the notification. A thumbnail is shown on the notification preview and the full size attachment is displayed after the notification is expanded.

Додаток - це зображення, відео або аудіофайл, який завантажується на пристрій, коли надходить сповіщення та відображається поруч із повідомленням. Мініатюра відображається, коли повідомлення не розширюється. Додаток у повному розмірі відображається після розширення повідомлення.

> Щоб розширити сповіщення на пристрої 3D Touch, просто примусово торкніться будь-якого сповіщення. На пристроях без 3D-Touch проведіть та торкніться кнопки "Перегляд".

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

Примітки:

- Мініатюра сповіщення буде носієм в `url`.
- Вміст сповіщення - це носій в `url`.
- Додаток може використовуватися з категоріями push notification.

## Приклад

An unexpanded push notification with an image attachment:

![Нерозширене push notification з вкладенням.](assets/ios/attachment.png)

The same notification but expanded to show the full size image attachment:

![Таке ж сповіщення, але розширене, щоб показати вкладення в повному розмірі](assets/ios/expanded_attachment.png)

## Підтримувані типи зображень

Please ensure your attachment meets the criteria below, otherwise it will not show.

| Attachment Type | Maximum file size | Allowed Formats             |
|:---------------:| ----------------- | --------------------------- |
|      Image      | 10 MB             | JPEG, GIF, PNG              |
|      Video      | 50 MB             | MPEG, MPEG2, MPEG4, AVI     |
|      Audio      | 5 MB              | AIFF, WAV, MP3, MPEG4 Audio |

## Конфігурація

- **url** (*Required*): URL-адресу вмісту, яку слід використовувати як вкладення. Цей URL *обов'язково* має бути доступним з Інтернету, або пристрою, що приймає, повинен знаходитися в тій самій мережі, де розміщеній вміст.
- **content-type** (*Optional*): Типово, розширення URL-адреси буде перевірено, щоб визначити тип файлу. Якщо розширення не існує / його неможливо визначити, ви можете вручну надати розширення файлу.
- **hide-thumbnail** (*Optional*): Якщо встановлено значення `true`, у повідомленні не відображатиметься мініатюра. Вміст буде доступним лише для розширення.
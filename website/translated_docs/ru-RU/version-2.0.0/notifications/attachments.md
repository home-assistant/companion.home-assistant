---
title: Стандартные вложения
id: version-2.0.0-attachments
original_id: вложения
---

Notifications may contain an image, video, or audio file attachment that is displayed alongside the notification. A thumbnail is shown on the notification preview and the full size attachment is displayed after the notification is expanded.

Вложение - это изображение, видео или аудио файл, который загружается на устройство, когда уведомление получено и отображается вместе с уведомлением. При отсутствии расширения уведомления отображается миниатюра. Размер вложения отображается при раскрывании уведомления.

> Чтобы раскрыть уведомление на устройствах 3D Touch просто нажмите с удержанием на любом уведомлении. На устройствах без 3D Touch пролистните и нажмите кнопку "Просмотр".

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

Примечания:

- Миниатюра уведомления будет в медиа `url`.
- Содержание уведомления - это медиа в `url`.
- Вложение может быть использовано с пользовательскими категориями push-уведомлений.

## Пример

An unexpanded push notification with an image attachment:

![Неожиданное уведомление push с вложением.](assets/ios/attachment.png)

The same notification but expanded to show the full size image attachment:

![Тот же уведомление, но расширенно, чтобы показать полное вложение](assets/ios/expanded_attachment.png)

## Поддерживаемые типы медиафайлов

Please ensure your attachment meets the criteria below, otherwise it will not show.

| Attachment Type | Maximum file size | Allowed Formats             |
|:---------------:| ----------------- | --------------------------- |
|      Image      | 10 MB             | JPEG, GIF, PNG              |
|      Video      | 50 MB             | MPEG, MPEG2, MPEG4, AVI     |
|      Audio      | 5 MB              | AIFF, WAV, MP3, MPEG4 Audio |

## Настройки

- **url** (*Обязательно*): URL содержимого для использования в качестве вложения. Этот URL *должен* быть доступен из Интернета, или принимающее устройство должно быть в той же сети, что и содержимое хоста.
- **тип содержимого** (*Необязательный*): По умолчанию расширение URL будет проверено для определения типа файла. Если расширение не существует/оно не может быть определено, вы можете вручную предоставить расширение файла.
- **hide-thumbnail** (*Optional*): Если установлено значение `true`, эскиз не будет отображаться в уведомлении. Содержание будет просматриваться только за счет расширения.
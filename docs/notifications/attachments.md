---
title: "Standard Attachments"
id: notification-attachments
---

Notifications may contain an image, video, or audio file attachment that is displayed alongside the notification. See [table for supported media](#supported-media-types) for a breakdown of support by platform.

## Downloading

An attachment is an image, video, or audio file which is downloaded to the device when a notification is received and shown alongside the notification. A thumbnail is shown when the notification is not expanded. The full size attachment is shown when the notification is expanded.

There are several locations to which you can save and you can use the [`camera.snapshot`](https://www.home-assistant.io/integrations/camera#service-snapshot) service to save snapshots.

:::note
Attachments are required to be accessible from the internet, but not necessarily without authentication. See sources below.
:::

### `media_source` (recommended)

The [`media_source` integration](https://www.home-assistant.io/integrations/media_source) has the advantage that access requires authentication headers (which Home Assistant provides to the companion app). This means the content is not publicly available.

You can use relative URLs in the format `/media/local/direct.jpg` with this integration.

:::info
A file stored in `/media/file.jpg` on-disk is represented by `/media/local/file.jpg` in the notification. Note the addition of the `local` part of the path.
:::

### `www` folder

You will want to store the image in the `www` folder located in your Home Assistant [config directory](https://www.home-assistant.io/docs/configuration/). This will then expose the image to the internet so that you may use it in your notifications and receive them anywhere.

You can use URLs in the format `/local/file.jpg` with this integration.

:::info
A file stored in `/www/file.jpg` on-disk is represented by `/local/file.jpg` in the notification. Note the change of the `local` part of the path.
:::

## Automatic snapshots

![Android](/assets/android.svg) Android users can also use `/api/camera_proxy/camera.name` where `camera.name` is replaced by the entity ID of the camera you wish to use.

![iOS](/assets/apple.svg) iOS users can use the [camera stream in dynamic attachments](dynamic-content.md#camera-stream).

:::tip
To expand a notification on 3D Touch devices simply force touch any notification. On non-3D Touch devices swipe and tap the "View" button.
:::

## Image entities

Images from image entities can use `/api/image_proxy/image.name` where `image.name` is replaced by the entity ID of the image entity you wish to use.

## Supported media types

Please ensure your attachment meets the criteria below, otherwise it will not show.

| Attachment Type  | Maximum file size | Allowed Formats | Supported Platform  |
| :-------: | --------------- | ------------------|------------------------- |
|    Image    | 10 MB    | JPEG, GIF, PNG          | ![Android](/assets/android.svg) Android & ![iOS](/assets/iOS.svg) |
|   Video   | 50 MB   | MPEG, MPEG2, MPEG4, AVI   | ![Android](/assets/android.svg) Android & ![iOS](/assets/iOS.svg) |
|   Audio    | 5 MB  | AIFF, WAV, MP3, MPEG4 Audio          | ![iOS](/assets/iOS.svg) |

![iOS](/assets/iOS.svg) version 2021.5 or later will attempt to re-download larger files when opening the content if they exceeded the size.

## Parameters

You can use the following keys to add attachments. See supported media types above. All of the URLs provided must be accessible via the internet.

| Key | Example values |
| -- | -- |
| `video` | `/media/local/video.mp4`<br /><br />`https://example.com/video.mp4` |
| `image` | `/media/local/photo.jpg`<br /><br />`https://example.com/image.jpg` |
| `audio` | `/media/local/audio.mp3`<br /><br />`https://example.com/audio.mp3` |

When present, values will be used in the order of the table above. For example, you can specify an `audio` and `image` and iOS will pick up the audio while Android will pick up the image.

:::info ![Android](/assets/android.svg) &nbsp; Notes:
*   If you are setting the [`icon_url`](basic.md#notification-icon) and `image` property then only the image will be displayed on the device.
*   If you are setting the `image` and `video` property then only the video will be displayed on the device.
*   Video will be shown as a series of frames captured from the video file. It will not work well with videos that are < 10s long.
*   GIF will only be animated in notification shade on Android 14+
:::

## Example service call

```yaml
automation:
  - alias: Notify Mobile app attachment
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Something happened at home!"
          data:
            # an example of an absolute url
            image: "https://www.home-assistant.io/images/default-social.png"
            # example of a relative url
            image: "/media/local/image.png"
            # the same works for video
            video: "/media/local/video.mp4"
            # and for audio
            audio: "/media/local/audio.mp3"
```

## Example of visuals

An unexpanded push notification with an image attachment:

![An unexpanded push notification with an attachment.](/assets/ios/attachment.png)

The same notification but expanded to show the full size image attachment:

![The same notification but expanded to show the full size attachment](/assets/ios/expanded_attachment.png)

## Configuration
![iOS](/assets/iOS.svg)Specific<br />

 [See table for supported media](#supported-media-types)

 You can customize the attachment on the notifications using the following format:

 ```yaml
- service: notify.mobile_app_<your_device_id_here>
  data:
    message: "Something happened at home!"
    data:
      attachment:
        # hide the thumbnail, only show when long-pressing/3d-touching notification
        hide-thumbnail: true
 ```

-   **url** (*Optional*): The URL of content to use as the attachment. This URL *must* be accessible from the Internet, or the receiving device must be on the same network as the hosted content. This overrides any `image`, `video` or `audio` values.
-   **content-type** (*Optional*): By default, the extension of the URL will be checked to determine the filetype if a `url` is provided, or inferred from the use of the `image`, `video` and `audio` keys. If there is no extension/it can't be determined you can manually provide a file extension.
-   **hide-thumbnail** (*Optional*): If set to `true` the thumbnail will not show on the notification. The content will only be viewable by expanding.
-   **lazy** (*Optional*): Requires ![iOS](/assets/iOS.svg) v2021.5 or later. If set to `true` the attachment will not be downloaded immediately and will only be loaded when viewing the notification. Use this to avoid downloading obviously-too-large attachments, but if they are only _occasionally_ too large, you shouldn't provide this key as the app can attempt both.

![Android](/assets/android.svg) Android Specific

 [See table for supported media](#supported-media-types)

- `GIF` filetype will only be animated in notification shade on Android 14+

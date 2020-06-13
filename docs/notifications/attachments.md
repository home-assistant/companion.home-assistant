---
title: "Standard Attachments"
id: notification-attachments
---

Notifications may contain an image, video, or audio file attachment that is displayed alongside the notification. A thumbnail is shown on the notification preview and the full size attachment is displayed after the notification is expanded.

An attachment is an image, video, or audio file which is downloaded to the device when a notification is received and shown alongside the notification. A thumbnail is shown when the notification is not expanded. The full size attachment is shown when the notification is expanded.

It is important to note that the attachments are required to be accessible from the internet. If you plan to use [`camera.snapshot`](https://www.home-assistant.io/integrations/camera#service-snapshot), you will want to store the image in the `www` folder located in your Home Assistant [config directory](https://www.home-assistant.io/docs/configuration/). This will then expose the image to the internet so that you may use it in your notifications and receive them anywhere. The proper format for the URL is: `https://MyCustomHADomain/local/path/to/file.jpg`. Make sure to replace `MyCustomHADomain` with how you would access Home Assistant remotely in a browse, you will either use your [Nabu Casa remote URL](https://www.nabucasa.com/config/remote/) or the [base URL](https://www.home-assistant.io/integrations/http#base_url). Also, replace `path/to/file.jpg` with the actual file name and location you used in your [`camera.snapshot`](https://www.home-assistant.io/integrations/camera#service-snapshot) service call. Another acceptable format for the above is `/local/path/to/file.jpg`.
![](/assets/android.svg) Android users can also use `/api/camera_proxy/camera.name` where `camera.name` is replaced by the entity ID of the camera you wish to use.
![](/assets/apple.svg) iOS users can use the [camera stream in dynamic attachments](dynamic-content.md#camera-stream).

:::tip
To expand a notification on 3D Touch devices simply force touch any notification. On non-3D Touch devices swipe and tap the "View" button.
:::

![iOS](/assets/apple.svg) iOS Example

```yaml
automation:
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

Notes ![iOS](/assets/apple.svg):
*   The thumbnail of the notification will be the media at the `url`.
*   The notification content is the media at the `url`.
*   Attachment can be used with custom push notification categories.

![android](/assets/android.svg) Android Example

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "Something happened at home!"
        data:
          image: "https://github.com/home-assistant/home-assistant-assets/blob/master/logo-round-192x192.png?raw=true"
```

Notes ![android](/assets/android.svg):
*   If you are setting the [`icon_url`](basic.md#notification-icon) and `image` property then only the image will be displayed on the device.


## Example

An unexpanded push notification with an image attachment:

![An unexpanded push notification with an attachment.](/assets/ios/attachment.png)

The same notification but expanded to show the full size image attachment:

![The same notification but expanded to show the full size attachment](/assets/ios/expanded_attachment.png)

## Supported media types

Please ensure your attachment meets the criteria below, otherwise it will not show.

| Attachment Type  | Maximum file size | Allowed Formats                                                                                              |
| :-------: | --------------- | -------------------------------------------------------------------------------------------------------- |
|    Image    | 10 MB             | JPEG, GIF, PNG                                                                     |
|   Video    | 50 MB             | MPEG, MPEG2, MPEG4, AVI                                                            |
|   Audio    | 5 MB  | AIFF, WAV, MP3, MPEG4 Audio |


## Configuration
![iOS](/assets/apple.svg) iOS Specific

-   **url** (*Required*): The URL of content to use as the attachment. This URL *must* be accessible from the Internet, or the receiving device must be on the same network as the hosted content.
-   **content-type** (*Optional*): By default, the extension of the URL will be checked to determine the filetype. If there is no extension/it can't be determined you can manually provide a file extension.
-   **hide-thumbnail** (*Optional*): If set to `true` the thumbnail will not show on the notification. The content will only be viewable by expanding.

![android](/assets/android.svg) Android Specific

-   **image** (*Required*): The URL of the image to use as the attachment. This URL *must* be accessible from the Internet.

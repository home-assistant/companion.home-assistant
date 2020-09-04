---
title: "Universal Links, NFC & QR Tags"
id: 'universal-links'
---

Support for these features is active under development and may not be fully released yet.

| Feature   | <img class='OSlogo' src='/assets/apple.svg' alt='Apple logo' /> iOS | <img class='OSlogo' src='/assets/android.svg' alt='Android logo' /> Android |
| --------- | ----------------------------- | --------------------------------------- |
| NFC Tags  | 2020.5                        | 2.2.0                                   |
| QR Tags   | 2020.5                        | 2.2.0                                   |
| Old-Style | 2019.1                        | Not Supported                           |

## NFC Tags & QR Codes

A Home Assistant NFC tag or QR code contains a URL in the following format:

`https://www.home-assistant.io/tag/<tag id>`

- <img class='OSlogo' src='/assets/apple.svg' alt='Apple logo' /> On iOS, bringing your device near an NFC tag or scanning a QR code will show a notification which, when tapped, will launch the app and fire an event.
- <img class='OSlogo' src='/assets/android.svg' alt='Android logo' /> On Android, bringing your device near a Home Assistant NFC tag or scanning a QR code will fire an event.

The event which fires is the same on both iOS and Android: `tag_scanned`. Example Automation:

```yaml
# for https://www.home-assistant.io/tag/50A3C7C8-1FE7-4BE8-8DC9-06E07D41B63D
automation:
- alias: Unlock the Door
  trigger:
    platform: event
    event_type: tag_scanned
    event_data:
      tag_id: 50A3C7C8-1FE7-4BE8-8DC9-06E07D41B63D
  action:
    # ...
```

Both apps support reading and writing NFC tags. You can use a randomly-generated tag value (like the above) or a custom one.

:::info
Some NFC tags are read-only and cannot be used as a Home Assistant NFC tag. Others may only allow one write before they turn read-only.
:::

## <img class='OSlogo' src='/assets/apple.svg' alt='Apple logo' /> Old-Style Universal Links

Universal links are a alternative to the [URL Handler](integrations/url-handler.md) and [X-Callback-URL](integrations/x-callback-url.md).

The app has registered all URLs under `https://www.home-assistant.io/ios/` as valid Universal Links. However, at this time, there is only one Universal Link that the app understands:

`https://www.home-assistant.io/ios/nfc/?url=<a URL you could use with the existing URL handler>`

What this allows for is NFC support. You can write a NFC tag with a NDEF URL like the above and whenever your device sees that NFC tag, a notification will appear for you to open the app with.

Once you open the app, it will do whatever action you told it to in the URL.

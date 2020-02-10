---
title: Universal Links
id: version-2.0.0-universal-links
original_id: universal-links
---

![iOS](assets/apple.svg)

Universal links are a alternative to the [URL Handler](integrations/url-handler.md) and [X-Callback-URL](integrations/x-callback-url.md).

The app has registered all URLs under `https://www.home-assistant.io/ios/` as valid Universal Links. However, at this time, there is only one Universal Link that the app understands:

`https://www.home-assistant.io/ios/nfc/?url=<a URL you could use with the existing URL handler>`

What this allows for is NFC support. You can write a NFC tag with a NDEF URL like the above and whenever your device sees that NFC tag, a notification will appear for you to open the app with.

Once you open the app, it will do whatever action you told it to in the URL.

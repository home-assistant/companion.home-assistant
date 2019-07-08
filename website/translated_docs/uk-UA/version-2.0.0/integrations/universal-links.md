---
title: Універсальні посилання
id: version-2.0.0-universal-links
original_id: universal-links
---

Universal links are a alternative to the [URL Handler](integrations/url-handler.md) and [X-Callback-URL](integrations/x-callback-url.md).

The app has registered all URLs under `https://www.home-assistant.io/ios/` as valid Universal Links. However, at this time, there is only one Universal Link that the app understands:

`https://www.home-assistant.io/ios/nfc/?url=<a URL you could use with the existing URL handler>`

What this allows for is NFC support. Ви можете написати тег NFC з URL-адресою NDEF, як описано вище, і всякий раз, коли ваш пристрій бачить цей тег NFC, з'явиться повідомлення, з яким ви відкриєте програму.

Після того, як ви відкриєте програму, вона зробить будь-яку дію, яку ви сказали їй в URL-адресі.
---
title: "iOS controls"
id: ios-controls
---

![iOS](/assets/iOS.svg)<br />
Controls are small buttons and switches that you can add to Control Center on your iPhone or iPad. With the Home Assistant controls, you can open the app, run a script, or turn a light on or off without unlocking your device or opening the app first.

Controls require iOS 18 or later. You can also place them on the Lock Screen, or assign one to the Action button on iPhone models that have it.

![Android](/assets/android.svg) On Android, use [Quick Settings tiles](android-quick-settings.md) and [device controls](android-device-controls.md) instead.

## Adding a control

1. Open Control Center by swiping down from the top-right corner of the screen.
2. Tap **+** in the top-left corner, then tap **Add a Control**.
3. Scroll to the **Home Assistant** section, or search for `Home Assistant`.
4. Tap the control you want to add.
5. If the control needs to know what to act on, such as a light or a script, tap it again while Control Center is in edit mode and choose the options you want.
6. Tap an empty area to leave edit mode.

Most controls let you change the icon and set a **Display Text** to replace the default label.

## Available controls

### Open Home Assistant <span class='beta'>BETA</span>

The **Open Home Assistant** control opens the Home Assistant app. This control has no options. It is listed first in the **Home Assistant** section.

The same action is available in the Shortcuts app as **Open Home Assistant**. For more actions, see [Apple App Intents](siri-shortcuts.md).

### Assist

Opens [Assist](https://www.home-assistant.io/voice_control/) inside the app, so you can talk to or type to Home Assistant. Choose the **Pipeline** (the voice assistant) that you want to use.

### Light

Turns a light on or off, and shows whether it is currently on. Choose the **Light**, and optionally an **Icon for on state** and an **Icon for off state**.

### Switch

Turns a switch on or off, and shows whether it is currently on. Choose the **Switch** and an optional **Icon**.

### Cover

Opens or closes a cover, such as a garage door or blinds, and shows whether it is currently open. Choose the **Cover**, and optionally an **Icon for open state** and an **Icon for closed state**.

### Fan

Turns a fan on or off, and shows whether it is currently on. Choose the **Fan**, and optionally an **Icon for on state** and an **Icon for off state**.

### Automation

Runs an [automation](https://www.home-assistant.io/docs/automation/). Choose the **Automation** and an optional **Icon**. Turn on **Notify when run** to get a notification after the automation has run.

### Script

Runs a [script](https://www.home-assistant.io/integrations/script/). Choose the **Script** and an optional **Icon**. Turn on **Notify when run** to get a notification after the script has run.

### Scene

Activates a [scene](https://www.home-assistant.io/integrations/scene/). Choose the **Scene** and an optional **Icon**. Turn on **Notify when run** to get a notification after the scene has been activated.

### Button

Presses a button entity in Home Assistant. Choose the **Button** and an optional **Icon**.

### Open page

The **Open Page** control opens the app on a specific dashboard or sidebar page. Choose the **Page** and an optional **Icon**.

### Open entity

The **Open Entity** control opens the app and shows the details of an entity. Choose the **Entity** and an optional **Icon**.

### Open camera

The **Open Camera** control opens the app and shows the live view of a camera. Choose the **Camera** and an optional **Icon**.

## Apple Watch

On Apple Watch with watchOS 26 or later, you can add the **Assist** control to the watch's Control Center. It opens Assist using the pipeline configured for the watch. For more about the watch app, see [Apple Watch](../apple-watch/apple-watch.md).

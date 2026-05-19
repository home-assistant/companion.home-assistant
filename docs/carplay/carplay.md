---
title: "Overview"
id: "carplay"
---

![iOS](/assets/iOS.svg)

Home Assistant offers a CarPlay experience. This will allow you to interact with various entities safely while driving your vehicle.

### Setup

In order to use this integration you will need an iPhone as well as a vehicle with a head unit that supports CarPlay. Once you are signed in with your iPhone, you should be all set to use the Home Assistant icon on the CarPlay home screen.

By default you won't see any relevant information in CarPlay, you need to open ***Companion App Settings → CarPlay***, and create your configuration. You can choose what tabs to display.

### Tabs

CarPlay has 4 tabs:

- **Quick Access:** In your CarPlay configuration, you can decide what entities, Assist pipelines, and Assist prompts to display on the **Quick access** tab.

- **Areas:** Brings easy access to your entities from the area in your home.
- **Control:** Lets you access entities grouped by their domain.
- **Servers:** Allows you to switch between servers.

![CarPlay](/assets/ios/CarPlay.png)

### Assist in Quick Access

On iOS 26.4 or later, you can add Assist to the **Quick Access** tab. This lets you start an Assist session from CarPlay, speak a request, and hear the response through your vehicle.

Before adding Assist to CarPlay, make sure you have an Assist pipeline configured in Home Assistant. If you want spoken responses in CarPlay, the selected pipeline must also have text-to-speech configured.

To add Assist:

1. On your iPhone, open **Companion App Settings -> CarPlay**.
2. Open your **Quick Access** configuration.
3. Add a new item and select **Assist**.
4. Select the Assist pipeline you want to use.
5. Save the item.

The Assist item will appear in the **Quick Access** tab in CarPlay. Tap it to start listening, then finish recording when you are done speaking. The response will be processed and played as audio.

If your iPhone is running an older iOS version, Assist options may appear as **Assist (iOS 26.4+)** and cannot be added to CarPlay.

### Assist prompts

Assist prompts are predefined Assist requests that you can add as buttons in the **Quick Access** tab. Use them for requests you repeat often while driving, such as checking whether a door is open or announcing that you are arriving home soon.

To add an Assist prompt:

1. On your iPhone, open **Companion App Settings -> CarPlay**.
2. Open your **Quick Access** configuration.
3. Add a new item and select **Assist prompt**.
4. Enter the **Title** that should appear in CarPlay.
5. Enter the **Prompt** that should be sent to Assist.
6. Select the Assist pipeline that should handle the prompt.
7. Save the item.

When you tap an Assist prompt in CarPlay, the prompt is sent to the selected pipeline and the response is played as audio. Make sure the selected pipeline has text-to-speech configured.

While an Assist prompt is open in CarPlay, you can replay the saved prompt or use the microphone button to start a new spoken Assist request.

### Audio playback troubleshooting

Some vehicles may not play spoken Assist responses when CarPlay is using the default streaming playback mode. If Assist works but you do not hear the response in your vehicle, change the TTS playback mode:

1. On your iPhone, open **Companion App Settings -> CarPlay**.
2. Open **Advanced -> Assist**.
3. Change **TTS Playback** from **Stream** to **Download and play**.

Use **Download and play** only if **Stream** does not play audio reliably in your vehicle.

### Supported Actionable Domains

- `button`
- `cover`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`

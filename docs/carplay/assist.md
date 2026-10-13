---
title: "Assist"
id: "assist"
---

![iOS](/assets/iOS.svg)

Assist is the voice assistant built into Home Assistant. It lets you control your home by speaking normally, instead of finding the right button. In CarPlay, Assist records what you say, sends it to your Home Assistant server, and plays the answer through your vehicle's speakers.

:::info
Assist runs on your Home Assistant server. Before you can use it in the car, you need an _Assist pipeline_ set up in Home Assistant. A pipeline is the combination of speech-to-text, a conversation agent, and text-to-speech that turns your voice into an action and the answer back into speech. See [Assist](https://www.home-assistant.io/voice_control/) in the Home Assistant documentation.
:::

## Requirements

- iOS 26.4 or later.

  On older versions, Assist is not offered in the car, and Assist items you already added are hidden from **Quick access**. On your iPhone, the options appear as **Assist (iOS 26.4+)** and **Assist prompt (iOS 26.4+)** and cannot be selected.

- An Assist pipeline in Home Assistant that has both speech-to-text and text-to-speech configured.

  When you add Assist from the car, pipelines missing either one are not offered. If you have none, the car shows **No Assist pipelines with both speech-to-text and text-to-speech available**.

  Your iPhone lists every pipeline, so you can add one that is missing speech-to-text or text-to-speech. In that case, turn on the matching [on-device setting](#assist-settings) so your iPhone fills the gap. Otherwise, Assist cannot hear you or cannot speak its answer in the car.

## Adding Assist to Quick access

Assist appears in CarPlay as an item in the **Quick access** tab, so you can add it once and use it on every drive.

### From the car display

1. On the car display, open the **Quick access** tab.
2. Select **Add item**.
3. If you have more than one server, select your server.
4. Select **Assist**.
5. Select the pipeline you want to use, or select **Preferred** to always follow whichever pipeline is set as preferred in Home Assistant.

The item is added straight away.

### From your iPhone

1. In the Home Assistant app on your iPhone, go to **Settings** > **CarPlay**.
2. Select **Add item** > **Assist**.
3. Select the pipeline you want to use. Pipelines are grouped by server, and each server also offers **Preferred**.

   The item is added as soon as you select a pipeline.

4. Optionally, select the item afterwards to change its **Display text** or **Icon color**. The microphone icon is fixed and cannot be changed.

## Using Assist while driving

1. On the car display, open the **Quick access** tab and select your Assist item.
2. Recording starts right away and the screen shows **Listening...**. Speak your request, such as "Turn off the kitchen lights".
3. When you stop speaking, recording stops by itself. The screen shows **Processing...** while your server works out what to do, then **Responding...** while the answer plays through your speakers.

If Assist asks you a follow-up question, it starts listening again on its own, so you can answer without touching the screen. Otherwise, the screen shows **Tap to record** when Assist is done.

When Assist is done, or if something goes wrong, the screen shows up to three buttons:

- **Microphone**: start a new request.
- **Replay**: send the saved prompt again. Only shown for Assist prompts.
- **Question mark**: open **Audio Playback Help** if you cannot hear the response.

### If Assist shows an error

If something goes wrong, the screen shows **Error** with a red icon and plays an alert tone. Select the microphone button to try again.

Common reasons are:

- Assist did not recognize any speech.
- Your server did not respond within 30 seconds.
- The pipeline has no speech-to-text, and **On-device STT** is turned off. See [Assist settings](#assist-settings).

## Assist prompts

An Assist prompt is a request you write in advance and save as a button. Selecting it sends that exact request without you having to say anything, which is useful for things you ask often. For example:

- `Is the garage door open?`
- `Tell everyone I will be home in ten minutes.`
- `Set the living room to movie mode.`

### Adding an Assist prompt

Assist prompts have to be typed, so they can only be created on your iPhone. If you select **Assist prompt** in the car, CarPlay tells you to create it on your iPhone instead.

1. In the Home Assistant app on your iPhone, go to **Settings** > **CarPlay**.
2. Select **Add item** > **Assist prompt**.
3. Select the **Pipeline** that should handle it. Choose one that has text-to-speech configured, so the answer can be spoken.
4. Enter the **Title** that should appear in the car, such as `Garage check`.
5. Enter the **Prompt** that should be sent to Assist, such as `Is the garage door open?`.
6. Select **Add**. The button becomes available once all three fields are filled in.

### Using an Assist prompt

Select the prompt in the **Quick access** tab. The saved text is sent to Assist straight away, so the screen starts at **Processing...**, and the answer plays through your speakers. From that screen you can select the replay button to send the same prompt again, or the microphone button to ask something new.

## Assist settings

Assist can use Apple's own speech recognition and speech synthesis on your iPhone instead of relying on your server for them. The two settings are independent, and they do different things:

- **On-device STT** changes where your speech is recognized. Your voice is transcribed on your iPhone, and only the resulting text is sent to your server. Not all languages are supported.
- **On-device TTS** changes where the response is spoken. The text your server returns is turned into speech on your iPhone, so no audio is downloaded from your server. Your voice is still sent to your server for recognition unless **On-device STT** is also turned on.

These settings are shared between the app and CarPlay, so changing one changes both.

### Changing them from the car

1. On the car display, select **Settings** > **Assist Settings**.
2. Select an option to turn it on. A check mark means it is on.
   - **On-device STT**: transcribe your speech on your iPhone. When it is on, a **Language** row appears so you can pick the language.
   - **On-device TTS**: speak the response using an Apple voice on your iPhone. When it is on, a **Voice** row appears so you can pick the voice.

:::note
The car offers the voices that match your iPhone's language, to keep the list short and safe to browse while driving. The full list of voices is available on your iPhone.
:::

### Changing them on your iPhone

1. In the Home Assistant app on your iPhone, go to **Settings** > **CarPlay** > **Assist Settings**.
2. Under **More**, turn on **On-device STT** or **On-device TTS**, then pick a **Language** or **Voice**.

:::info
The same screen also shows **Mute voice responses** and **Assist start mode**. Neither applies to CarPlay. Because the car is a voice-first interface, Assist responses always play out loud there, and Assist always starts by listening.
:::

## If you cannot hear the response

Some vehicles do not play spoken Assist responses when CarPlay streams the audio. If Assist clearly works but you hear nothing, change how the audio is played. See [Assist responses are not audible](troubleshooting.md#assist-responses-are-not-audible).

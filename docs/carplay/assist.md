---
title: "Assist"
id: "assist"
---

![iOS](/assets/iOS.svg)

Assist is the voice assistant built into Home Assistant. It lets you control your smart home with natural language. When used with iOS CarPlay, Assist lets you start an Assist session, speak a request, and hear the response through your vehicle's audio system.

## Adding Assist to the Quick Access tab

### Prerequisites

- iOS 26.4 or later
  - If your iPhone is running an older iOS version, Assist options may appear as **Assist (iOS 26.4+)** and cannot be added to CarPlay.


- Have an [Assist pipeline configured in Home Assistant](https://www.home-assistant.io/voice_control/voice_remote_cloud_assistant/). 
- If you want spoken responses in CarPlay, the selected pipeline must also have text-to-speech configured. 


To add Assist:

1. On your iPhone, open **Companion App Settings** > **CarPlay**.
2. Open your **Quick Access** configuration.
3. Add a new item and select **Assist**.
4. Select the Assist pipeline you want to use.
5. Save the item.
    Result: The Assist item will appear in the **Quick Access** tab in CarPlay. 

### Using Assist from Quick Access

1. Open Quick Access.
2. Tap Assist to start listening, then finish recording when you are done speaking. 
3. The response will be processed and played as audio.


### Adding Assist prompts

Assist prompts are predefined Assist requests that you can add as buttons in the **Quick Access** tab. Use them for requests you repeat often while driving, such as checking whether a door is open or announcing that you are arriving home soon.
### Prerequisites

- iOS 26.4 or later
- Have Assist added to CarPlay
- Make sure the selected pipeline has text-to-speech configured.


### To add an Assist prompt to CarPlay

1. On your iPhone, open **Companion App Settings** > **CarPlay**.
2. Open your **Quick Access** configuration.
3. Add a new item and select **Assist prompt**.
4. Enter the **Title** that should appear in CarPlay.
5. Enter the **Prompt** that should be sent to Assist.
6. Select the Assist pipeline that should handle the prompt.
7. Save the item.

### Using an Assist prompt in CarPlay

1. Tap your prompt.
    - When you tap an Assist prompt in CarPlay, the prompt is sent to the selected pipeline, and the response is played as audio.
2. While an Assist prompt is open in CarPlay, you can replay the saved prompt or use the microphone button to start a new spoken Assist request.

### Troubleshooting the audio playback

Some vehicles may not play spoken Assist responses when CarPlay is using the default streaming playback mode. If Assist works but you do not hear the response in your vehicle, change the TTS playback mode:

1. On your iPhone, open **Companion App Settings** > **CarPlay**.
2. Open **Advanced** > **Assist**.
3. Change **TTS Playback** from **Stream** to **Download and play**.
    - Use **Download and play** only if **Stream** does not play audio reliably in your vehicle.

---
title: "Sounds"
id: "notification-sounds"
---

Adding a custom sound to a notification allows you to easily identify the notification without even looking at your device. How to set a custom sound, depends on the operating system.

 - ![Android](/assets/android.svg) On Android, notification sounds are linked to [notification channels/categories](basic.md#notification-channels). On your device, edit the channel settings to change the notification sound to another system sound or choose your own.
 - ![iOS](/assets/iOS.svg) Home Assistant for iOS comes with some notification sounds pre-installed, but you can also upload your own.

:::info
The information below describes using custom notification sounds on iOS. For Android, go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Notification channels to change the sounds and refer to your device settings.
:::

Here is an example notification that uses one of the pre-installed sounds.

```yaml
automation:
- alias: "Notify Mobile App sound"
  trigger:
    ...
  action:
    - action: notify.mobile_app_<your_device_id_here>
      data:
        message: “Your Roommate arrived”
        data:
          push:
            sound: "US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav"
```

> You must use the full filename (including extension) in the payload.

## Custom push notification sounds

The iOS app allows you to use your own custom sounds in push notifications. The sounds must be formatted as 32bit float 48000Hz wav files. Make sure you know the filename of the sound as you will need to reference it in the `sound` field of the notification payload. To add sounds follow either of the two following methods:

> *   You may need to restart your entire device before notification sounds can be played.
> *   Uploading a file with the same name as an existing one will overwrite the original.

### Via iTunes

1.  Connect the device to a PC or Mac running the latest version of iTunes.
2.  Go to the device in iTunes.
3.  Select "File Sharing" in the left-hand menu.
4.  Select Home Assistant.
5.  Drag and drop properly formatted sounds (32bit float 48000Hz wav files).
6.  Click Sync in the lower right.
7.  Once the sync is complete, disconnect the device from the computer.
8.  On your iOS device, open the Home Assistant app.
9.  Go to [Configuration](https://my.home-assistant.io/redirect/config/) -> Companion App -> Notifications -> Sounds.
10. Tap the "Import sounds from iTunes File Sharing" button.

Assuming that you correctly formatted the sounds they are now available to use in push notifications.

### Via Cloud Storage:

For this method you need to have a cloud storage app (such as [Dropbox](https://www.dropbox.com), [Google Drive](https://www.google.com/drive/), [iCloud](https://www.icloud.com/), [OneDrive](https://www.microsoft.com/microsoft-365/onedrive/online-cloud-storage) etc.).

1.  If you don't already have the iOS app for your cloud storage setup, find the appropriate app in the App Store, install and log in to it.
2.  Upload your desired notification sounds to a convenient location on your cloud storage.
3.  In the Home Assistant companion app, open the [Configuration](https://my.home-assistant.io/redirect/config/) menu from the sidebar and go to the Companion App section.
4.  Under Settings, tap Notifications and then Sounds.
5.  Tap "Import custom sound".
6.  Navigate to the folder containing the sound or sounds you wish to add. Note you can switch between cloud providers using the Locations button in the upper-left corner.
7.  Tap Select and then the files you wish to add. When you've selected all the files you want tap Done.
8.  Restart your device.

## Importing sounds from iOS

Apart from the tri-tone—the default text tone, which can be accessed with `sound: default`—the iOS system sounds are not imported into the Home Assistant companion app. These can however be imported through the following steps:

1.  In the Home Assistant companion app, open the Companion App page from the Home Assistant [Configuration menu](https://my.home-assistant.io/redirect/config/).
2.  Under Settings, tap Notifications and then Sounds.
3.  Tap the "System" tab and then "Import system sounds".
4.  After a few seconds you should be informed the files have been successfully imported.
5.  Restart your device.
6.  iOS sounds can now be used.

<details><summary>For a full list of sounds imported from iOS, click here.</summary>
This list is representative for iOS 12, the actual list of imported sounds may vary depending on the configuration of your device and iOS version.
<p>

```text
3rdParty_DirectionDown_Haptic.caf
3rdParty_DirectionUp_Haptic.caf
3rdParty_Failure_Haptic.caf
3rdParty_Retry_Haptic.caf
3rdParty_Start_Haptic.caf
3rdParty_Stop_Haptic.caf
3rdParty_Success_Haptic.caf
access_scan_complete.caf
AccessSanComplete_Haptic
acknowledgment_received.caf
acknowledgment_sent.caf
alarm.caf
Alarm_Haptic.caf
Alarm_Nightstand_Haptic.caf
Alert_3rdParty_Haptic.caf
Alert_3rdParty_Salient_Haptic.caf
Alert_ActivityFriendsGoalAttained_Haptic.caf
Alert_ActivityGoalAttained_Haptic.caf
Alert_ActivityGoalAttained_Salient_Haptic.caf
Alert_ActivityGoalBehind_Haptic.caf
Alert_ActivityGoalBehind_Salient_Haptic.caf
Alert_ActivityGoalClose_Haptic.caf
Alert_BatteryLow_10p_Haptic.caf
Alert_BatteryLow_5p_Haptic.caf
Alert_BatteryLow_5p_Salient_Haptic.caf
Alert_Calendar_Haptic.caf
Alert_Calendar_Salient_Haptic.caf
Alert_Health_Haptic.caf
Alert_Mail_Haptic.caf
Alert_Mail_Salient_Haptic.caf
Alert_MapsDirectionsInApp_Haptic.caf
Alert_Messages_1_Haptic.caf
Alert_Messages_1_Salient_Haptic.caf
Alert_Messages_2_Haptic.caf
Alert_Messages_3_Haptic.caf
Alert_PassbookBalance_Haptic.caf
Alert_PassbookGeofence_Haptic.caf
Alert_PassbookGeofence_Salient_Haptic.caf
Alert_PhotostreamActivity_Haptic.caf
Alert_ReminderDue_Haptic.caf
Alert_ReminderDue_Salient_Haptic.caf
Alert_SpartanConnected_LowLatency_Haptic.caf
Alert_SpartanConnecting_Haptic.caf
Alert_SpartanConnecting_LowLatency_Haptic.caf
Alert_SpartanDisconnected_LowLatency_Haptic.caf
Alert_Voicemail_Haptic.caf
Alert_Voicemail_Salient_Haptic.caf
Alert_WalkieTalkie_Haptic.caf
Anticipate.caf
AutoUnlock_Haptic.caf
BatteryMagsafe_Haptic.caf
Beat_Haptic.caf
begin_record.caf
Bloom.caf
BuddyMigrationStart_Haptic.caf
BuddyPairingFailure_Haptic.caf
BuddyPairingRemoteConnection_Haptic.caf
BuddyPairingRemoteTap_Haptic.caf
BuddyPairingSuccess_Haptic.caf
busy_tone_ansi.caf
busy_tone_cept.caf
call_waiting_tone_ansi.caf
call_waiting_tone_cept.caf
Calypso.caf
camera_shutter_burst.caf
camera_shutter_burst_begin.caf
camera_shutter_burst_end.caf
camera_timer_countdown.caf
camera_timer_final_second.caf
CameraCountdownImminent_Haptic.caf
CameraCountdownTick_Haptic.caf
CameraShutter_Haptic.caf
Choo_Choo.caf
connect_power.caf
ct-busy.caf
ct-call-waiting.caf
ct-congestion.caf
ct-error.caf
ct-keytone2.caf
ct-path-ack.caf
Descent.caf
Detent_Haptic.caf
DoNotDisturb_Haptic.caf
dtmf-0.caf
dtmf-1.caf
dtmf-2.caf
dtmf-3.caf
dtmf-4.caf
dtmf-5.caf
dtmf-6.caf
dtmf-7.caf
dtmf-8.caf
dtmf-9.caf
dtmf-pound.caf
dtmf-star.caf
end_call_tone_cept.caf
end_record.caf
engage_power.caf
engage_power_short.caf
ET_BeginNotification_Haptic.caf
ET_BeginNotification_Salient_Haptic.caf
ET_RemoteTap_Receive_Haptic.caf
ET_RemoteTap_Send_Haptic.caf
Fanfare.caf
focus_change_app_icon.caf
focus_change_keyboard.caf
focus_change_large.caf
focus_change_small.caf
go_to_sleep_alert.caf
GoToSleep_Haptic.caf
HealthNotificaiton.caf
HourlyChime_Haptic.caf
HummingbirdCompletion_Haptic.caf
HummingbirdNotification_Haptic.caf
jbl_ambiguous.caf
jbl_begin.caf
jbl_cancel.caf
jbl_confirm.caf
jbl_no_match.caf
key_press_click.caf
key_press_delete.caf
key_press_modifier.caf
keyboard_press_clear.caf
keyboard_press_delete.caf
keyboard_press_normal.caf
Ladder.caf
lock.caf
long_low_short_high.caf
low_power.caf
mail-sent.caf
MessagesIncoming_Haptic.caf
MessagesOutgoing_Haptic.caf
middle_9_short_double_low.caf
Minuet.caf
multiway_invitation.caf
MultiwayInvitation.caf
MultiwayJoin.caf
MultiwayLeave.caf
navigation_pop.caf
navigation_push.caf
NavigationGenericManeuver_Haptic.caf
NavigationGenericManeuver_Salient_Haptic.caf
NavigationLeftTurn_Haptic.caf
NavigationLeftTurn_Salient_Haptic.caf
NavigationRightTurn_Haptic.caf
NavigationRightTurn_Salient_Haptic.caf
new-mail.caf
News_Flash.caf
nfc_scan_complete.caf
Noir.caf
Notification_Haptic.caf
Notification_Salient_Haptic.caf
OnOffPasscodeFailure_Haptic.caf
OnOffPasscodeUnlock_Haptic.caf
OnOffPasscodeUnlockCampanion_Haptic.caf
OrbExit_Haptic.caf
OrbLayers_Haptic.caf
payment_failure.caf
payment_success.caf
PhoneAnswer_Haptic.caf
PhoneHangUp_Haptic.caf
PhoneHold_Haptic.caf
photoShutter.caf
PhotosZoomDetent_Haptic.caf
Preview_AudioAndHaptic.caf
QB_Dictation_Haptic.caf
QB_Dictation_Off_Haptic.caf
ReceivedMessage.caf
RemoteCameraShutterBurstBegin_Haptic.caf
RemoteCameraShutterBurstEnd_Haptic.caf
ringback_tone_ansi.caf
ringback_tone_aus.caf
ringback_tone_cept.caf
ringback_tone_hk.caf
ringback_tone_uk.caf
RingerChanged.caf
Ringtone_2_Ducked_Haptic-sashimi.caf
Ringtone_2_Haptic-sashimi.caf
Ringtone_UK_Haptic.caf
Ringtone_US_Haptic.caf
RingtoneDucked_UK_Haptic.caf
RingtoneDucked_US_Haptic.caf
SalientNotification_Haptic.caf
SedentaryTimer_Haptic.caf
SedentaryTimer_Salient_Haptic.caf
SentMessage.caf
shake.caf
Sherwood_Forest.caf
short_double_high.caf
short_double_low.caf
short_low_high.caf
SIMToolkitCallDropped.caf
SIMToolkitGeneralBeep.caf
SIMToolkitNegativeACK.caf
SIMToolkitPositiveACK.caf
SIMToolkitSMS.caf
SiriAutoSend_Haptic.caf
SiriStart_Haptic.caf
SiriStopFailure_Haptic.caf
SiriStopSuccess_Haptic.caf
sms-received1.caf
sms-received1.caf
sms-received2.caf
sms-received3.caf
sms-received4.caf
sms-received5.caf
sms-received6.caf
SOSEmergencyContactTextPrompt_Haptic.caf
SOSFallDetection_Haptic-Newton.caf
Spell.caf
Stockholm_Haptic.caf
StockholmActive_Haptic.caf
StockholmActiveSingleCycle_Haptic.caf
StockholmFailure_Haptic.caf
StopwatchLap_Haptic.caf
StopwatchReset_Haptic.caf
StopwatchStart_Haptic.caf
StopwatchStop_Haptic.caf
Suspense.caf
Swish.caf
SwTest1_Haptic.caf
SystemStartup_Haptic.caf
Telegraph.caf
Timer_Haptic.caf
TimerCancel_Haptic.caf
TimerPause_Haptic.caf
TimerStart_Haptic.caf
TimerWheelHoursDetent_Haptic.caf
TimerWheelMinutesDetent_Haptic.caf
Tink.caf
Tiptoes.caf
Tock.caf
tweet_sent.caf
Typewriters.caf
UISwipe_Haptic.caf
UISwitch_Off_Haptic.caf
UISwitch_On_Haptic.caf
Update.caf
ussd.caf
vc~ended.caf
vc~invitation-accepted.caf
vc~ringing.caf
vc~ringing_watch.caf
VoiceOver_Click_Haptic.caf
WalkieTalkieActiveEnd_Haptic.caf
WalkieTalkieActiveStart_Haptic.caf
WalkieTalkieReceiveEnd_Haptic.caf
WalkieTalkieReceiveStart_Haptic.caf
warsaw.caf
Warsaw_Haptic.caf
wheels_of_time.caf
WorkoutComplete_Haptic.caf
WorkoutCompleteAutoDetect.caf
WorkoutCountdown_Haptic.caf
WorkoutPaceAbove.caf
WorkoutPaceBelow.caf
WorkoutPaused_Haptic.caf
WorkoutPressStart_Haptic.caf
WorkoutResumed_Haptic.caf
WorkoutResumedAutoDetect.caf
WorkoutSaved_Haptic.caf
WorkoutSelect_Haptic.caf
WorkoutStartAutoDetect.caf
```
</p>
</details>

## Pre-installed notification sounds

<details><summary>For a full list of sounds installed with the app, click here.</summary>
<p>

```text
US-EN-Alexa-Back-Door-Opened.wav
US-EN-Alexa-Back-Door-Unlocked.wav
US-EN-Alexa-Basement-Door-Opened.wav
US-EN-Alexa-Basement-Door-Unlocked.wav
US-EN-Alexa-Boyfriend-Is-Arriving.wav
US-EN-Alexa-Daughter-Is-Arriving.wav
US-EN-Alexa-Front-Door-Opened.wav
US-EN-Alexa-Front-Door-Unlocked.wav
US-EN-Alexa-Garage-Door-Opened.wav
US-EN-Alexa-Girlfriend-Is-Arriving.wav
US-EN-Alexa-Good-Morning.wav
US-EN-Alexa-Good-Night.wav
US-EN-Alexa-Husband-Is-Arriving.wav
US-EN-Alexa-Mail-Has-Arrived.wav
US-EN-Alexa-Motion-At-Back-Door.wav
US-EN-Alexa-Motion-At-Front-Door.wav
US-EN-Alexa-Motion-Detected-Generic.wav
US-EN-Alexa-Motion-In-Back-Yard.wav
US-EN-Alexa-Motion-In-Basement.wav
US-EN-Alexa-Motion-In-Front-Yard.wav
US-EN-Alexa-Motion-In-Garage.wav
US-EN-Alexa-Patio-Door-Opened.wav
US-EN-Alexa-Patio-Door-Unlocked.wav
US-EN-Alexa-Smoke-Detected-Generic.wav
US-EN-Alexa-Smoke-Detected-In-Basement.wav
US-EN-Alexa-Smoke-Detected-In-Garage.wav
US-EN-Alexa-Smoke-Detected-In-Kitchen.wav
US-EN-Alexa-Son-Is-Arriving.wav
US-EN-Alexa-Water-Detected-Generic.wav
US-EN-Alexa-Water-Detected-In-Basement.wav
US-EN-Alexa-Water-Detected-In-Garage.wav
US-EN-Alexa-Water-Detected-In-Kitchen.wav
US-EN-Alexa-Welcome-Home.wav
US-EN-Alexa-Wife-Is-Arriving.wav
US-EN-Daisy-Back-Door-Motion.wav
US-EN-Daisy-Back-Door-Open.wav
US-EN-Daisy-Front-Door-Motion.wav
US-EN-Daisy-Front-Door-Open.wav
US-EN-Daisy-Front-Window-Open.wav
US-EN-Daisy-Garage-Door-Open.wav
US-EN-Daisy-Guest-Bath-Leak.wav
US-EN-Daisy-Kitchen-Sink-Leak.wav
US-EN-Daisy-Kitchen-Window-Open.wav
US-EN-Daisy-Laundry-Room-Leak.wav
US-EN-Daisy-Master-Bath-Leak.wav
US-EN-Daisy-Master-Bedroom-Window-Open.wav
US-EN-Daisy-Office-Window-Open.wav
US-EN-Daisy-Refrigerator-Leak.wav
US-EN-Daisy-Water-Heater-Leak.wav
US-EN-Morgan-Freeman-Back-Door-Closed.wav
US-EN-Morgan-Freeman-Back-Door-Locked.wav
US-EN-Morgan-Freeman-Back-Door-Opened.wav
US-EN-Morgan-Freeman-Back-Door-Unlocked.wav
US-EN-Morgan-Freeman-Basement-Door-Closed.wav
US-EN-Morgan-Freeman-Basement-Door-Locked.wav
US-EN-Morgan-Freeman-Basement-Door-Opened.wav
US-EN-Morgan-Freeman-Basement-Door-Unlocked.wav
US-EN-Morgan-Freeman-Boss-Is-Arriving.wav
US-EN-Morgan-Freeman-Boyfriend-Is-Arriving.wav
US-EN-Morgan-Freeman-Cleaning-Supplies-Closet-Opened.wav
US-EN-Morgan-Freeman-Coworker-Is-Arriving.wav
US-EN-Morgan-Freeman-Daughter-Is-Arriving.wav
US-EN-Morgan-Freeman-Friend-Is-Arriving.wav
US-EN-Morgan-Freeman-Front-Door-Closed.wav
US-EN-Morgan-Freeman-Front-Door-Locked.wav
US-EN-Morgan-Freeman-Front-Door-Opened.wav
US-EN-Morgan-Freeman-Front-Door-Unlocked.wav
US-EN-Morgan-Freeman-Garage-Door-Closed.wav
US-EN-Morgan-Freeman-Garage-Door-Opened.wav
US-EN-Morgan-Freeman-Girlfriend-Is-Arriving.wav
US-EN-Morgan-Freeman-Good-Morning.wav
US-EN-Morgan-Freeman-Good-Night.wav
US-EN-Morgan-Freeman-Liquor-Cabinet-Opened.wav
US-EN-Morgan-Freeman-Motion-Detected.wav
US-EN-Morgan-Freeman-Motion-In-Basement.wav
US-EN-Morgan-Freeman-Motion-In-Bedroom.wav
US-EN-Morgan-Freeman-Motion-In-Game-Room.wav
US-EN-Morgan-Freeman-Motion-In-Garage.wav
US-EN-Morgan-Freeman-Motion-In-Kitchen.wav
US-EN-Morgan-Freeman-Motion-In-Living-Room.wav
US-EN-Morgan-Freeman-Motion-In-Theater.wav
US-EN-Morgan-Freeman-Motion-In-Wine-Cellar.wav
US-EN-Morgan-Freeman-Patio-Door-Closed.wav
US-EN-Morgan-Freeman-Patio-Door-Locked.wav
US-EN-Morgan-Freeman-Patio-Door-Opened.wav
US-EN-Morgan-Freeman-Patio-Door-Unlocked.wav
US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav
US-EN-Morgan-Freeman-Searching-For-Car-Keys.wav
US-EN-Morgan-Freeman-Setting-The-Mood.wav
US-EN-Morgan-Freeman-Smartthings-Detected-A-Flood.wav
US-EN-Morgan-Freeman-Smartthings-Detected-Carbon-Monoxide.wav
US-EN-Morgan-Freeman-Smartthings-Detected-Smoke.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Basement.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Garage.wav
US-EN-Morgan-Freeman-Smoke-Detected-In-Kitchen.wav
US-EN-Morgan-Freeman-Someone-Is-Arriving.wav
US-EN-Morgan-Freeman-Son-Is-Arriving.wav
US-EN-Morgan-Freeman-Starting-Movie-Mode.wav
US-EN-Morgan-Freeman-Starting-Party-Mode.wav
US-EN-Morgan-Freeman-Starting-Romance-Mode.wav
US-EN-Morgan-Freeman-Turning-Off-All-The-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Air-Conditioner.wav
US-EN-Morgan-Freeman-Turning-Off-The-Bar-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Chandelier.wav
US-EN-Morgan-Freeman-Turning-Off-The-Family-Room-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Hallway-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Kitchen-Light.wav
US-EN-Morgan-Freeman-Turning-Off-The-Light.wav
US-EN-Morgan-Freeman-Turning-Off-The-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-Mood-Lights.wav
US-EN-Morgan-Freeman-Turning-Off-The-TV.wav
US-EN-Morgan-Freeman-Turning-On-The-Air-Conditioner.wav
US-EN-Morgan-Freeman-Turning-On-The-Bar-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Chandelier.wav
US-EN-Morgan-Freeman-Turning-On-The-Family-Room-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Hallway-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Kitchen-Light.wav
US-EN-Morgan-Freeman-Turning-On-The-Light.wav
US-EN-Morgan-Freeman-Turning-On-The-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-Mood-Lights.wav
US-EN-Morgan-Freeman-Turning-On-The-TV.wav
US-EN-Morgan-Freeman-Vacate-The-Premises.wav
US-EN-Morgan-Freeman-Water-Detected-In-Basement.wav
US-EN-Morgan-Freeman-Water-Detected-In-Garage.wav
US-EN-Morgan-Freeman-Water-Detected-In-Kitchen.wav
US-EN-Morgan-Freeman-Welcome-Home.wav
US-EN-Morgan-Freeman-Wife-Is-Arriving.wav
```
</p>
</details>

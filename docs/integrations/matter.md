---
title: "Matter devices"
id: 'matter'
---

## Share a Matter device <span class='beta'>BETA</span>

A Matter device that is already added to Home Assistant can also be controlled from another platform, such as Apple Home or Google Home, at the same time. In Home Assistant, go to **Settings** > **Devices & services** > **Devices**, open the device, and select **Share device**. Home Assistant opens a commissioning window and shows a QR code and a pairing code for the other platform.

In the companion app, you do not need to copy the code or scan the QR code with another device. The dialog shows a button that hands the device to the other platform directly, with the name it has in Home Assistant.

![iOS](/assets/iOS.svg)<br />

Select **Add to Apple Home** to add the device to Apple Home.

![Android](/assets/android.svg)

Select **Add to Google Home or another app** and pick the app in the Android Matter share sheet. The sheet can also show a pairing code to enter in an app yourself. This needs the `full` flavor of the app and a Matter server that reports the commissioning window's discriminator.

The commissioning window closes after a few minutes. If sharing fails, close the dialog and share the device again.

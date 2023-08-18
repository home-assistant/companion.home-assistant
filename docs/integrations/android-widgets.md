---
title: "Android Widgets"
id: 'android-widgets'
---

The ![Android](/assets/android.svg) Android app allows the user to create widgets on the home screen so the user can perform a variety of actions like execute a service call, display the state of an entity or even render a template. You can add the widget like you normally would for any app depending on your devices launcher. The widget will not work when Data Saver is enabled, you will also need to ensure that background data for the app is enabled. If you notice that a widget is no longer working try to recreate it. Widgets can also be edited by navigating to [Settings](https://my.home-assistant.io/redirect/config/) > Companion App > Manage Widgets, if you are on Android 12 you can also edit the widget by long pressing it and clicking on the edit icon.

Widgets can also be added from the Manage Widgets settings page, as long as the device supports it.

## Available widgets

### Camera

This widget will update every hour or when it is tapped. The widget will just contain the latest snapshot from the selected camera.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Camera Widget to an open space on the home screen
4.  Enter the Entity ID of the camera you wish to use
5.  Save the widget

### Entity State

This widget will be updated when the entity state changes or when it is manually refreshed. This widget will allow the user to select any entity they wish to get the state and an attribute from as well as setting the text size and adding a custom separator between the state and attributes.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Entity State widget to an open space on the home screen
4.  Enter the Entity ID you wish to view the state of
5.  If needed select the attribute checkbox and select the attribute you wish to add to the state
6.  If needed adjust the widget text size
7.  If needed add a custom separator to sit between the state and attribute
8.  <span class='beta'>BETA</span> If supported choose the tap action for the widget: toggle the entity or refresh the state manually (if not supported a tap will refresh)
9.  Supply a name for the widget
10.  Save the widget


### Media Player

This widget will let the user control any media player on their home screen and will be updated when the media player state changes or when the album art is tapped. There are a couple of options available to hide or show the seek and skip buttons.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Media Player widget to an open space on the home screen
4.  Enter the Entity ID you wish to control. You can also enter multiple Entity ID's, prioritized from left to right.
5.  If needed hide the Seek/Skip buttons, the media source label, or show the Volume buttons
6.  Supply a label for the widget
7.  Save the widget

### Service Call

This widget will make the service call when it is tapped. The user will see a green check mark if the call was successful and red if not. Red would indicate either the widget was not setup properly, the Home Assistant server is unavailable or some other error that would be indicated in the Home Assistant log.

You may set the checkbox "Require authentication". If it is set, device credentials (i.e. PIN, pattern, biometrics ...) are required before the service call is initiated.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Service Call widget to an open space on the home screen
4.  Select the service call you wish to perform
5.  Fill in the required service data for the selected service call
6.  Supply a name and icon for the widget
7.  Save the widget


### Template

This widget will display any text that you wish to show in a widget using [Home Assistants templating feature](https://www.home-assistant.io/docs/configuration/templating/). This is an advanced feature but allows the user to display a wide variety of data. The template will be updated instantly on relevant states changes. When editing the widget, the template will be shown below the text field so you can preview what it would look like.

You may also use HTML to format the text displayed such as adding a new line (`<br>`), making something bold (`<b>`) or large (`<big>`) or changing the color (`<font color='#03a9f4'>`).

If the template in the widget isn't updating instantly, you're most likely hitting [rate limits](https://www.home-assistant.io/integrations/template/#rate-limiting-updates). Try optimizing your template to get faster updates, or tap on the widget to update it manually. You can also use the preview in [`Developer Tools > Template`](https://my.home-assistant.io/redirect/developer_template/) to test your template updates.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Template widget to an open space on the home screen
4.  Fill in the template data and observe the rendering below
5.  Save the widget

## Theming

Most widgets allow selecting a theme to use. The available themes depend on your device and the specific widget. Possible options are:

 - *Dynamic color*: uses the colors from your device and wallpaper to make the widget fit in with your home screen and device. This theme is only available on supported devices running Android 12 or newer.
 - *Light/dark theme*: uses your device theme to make the widget fit in with your apps.
 - *Transparent*: removes the widget background and allows you to set a text/icon color, to make the widget stand out less.

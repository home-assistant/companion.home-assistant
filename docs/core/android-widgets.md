---
title: "Android Widgets"
id: 'android-widgets'
---

The ![android](/assets/android.svg) Android app allows the user to create widgets on the home screen so the user can call any Home Assistant service call or display an entities state (updates every 30 minutes or when tapped). You can add the widget like you normally would for any app depending on your devices launcher. The widget will not work when Data Saver is enabled, you will also need to ensure that background data for the app is enabled. If you notice that a widget is no longer working try to recreate it.

## Entity State

This widget will update every 30 minutes or when it is tapped.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Entity State widget to an open space on the home screen
4.  Enter the Entity ID you wish to view the state of
5.  If needed select the attribute checkbox and select the attribute you wish to add to the state
6.  Supply a name for the widget
7.  Save the widget


## Service Call

This widget will make the service call when it is tapped. The user will see a green checkmark if the call was successful and red if not. Red would indicate either the widget was not setup properly, the Home Assistant server is unavailable or some other error that would be indicated in the Home Assistant log.

1.  Long press on any open space in the home screen
2.  Scroll down to Home Assistant in the widget list
3.  Drag the Service Call widget to an open space on the home screen
4.  Select the service call you wish to perform
5.  Fill in the required service data for the selected service call
6.  Supply a name and icon for the widget
7.  Save the widget

---
title: "Overview"
id: "wear-os"
---

![Android](/assets/android.svg)

You can access Home Assistant directly from your Wear OS watch, even when not connected to your phone using a WiFi or cellular connection on the watch or when using an iPhone. 

The app does not support all Home Assistant features. Keep an eye out on this page as the app is enhanced with new features!

## Home Screen

The following list of domains are currently supported to toggle/execute once you log in and select them:

* `button`
* `cover`
* `fan`
* `input_boolean`
* `input_button`
* `light`
* `lock`
* `scene`
* `script`
* `switch`

### Favorites

Users can go to Settings in the Wear OS app and set favorite entities which will appear at the top of the list. These entities will be present before the rest of the entities are loaded so that they can be executed immediately upon launching the app. If you delete an entity from your Home Assistant instance there is also a setting option to clear the favorites to remove the stale entity.

The favorites can also be managed from the phone app by going to App Configuration > Wear OS app > Manage Favorites. The phone app also allows you to drag and drop the entities to change the order in which they appear on the home screen.

### Areas

If any devices or entities have been added to areas in Home Assistant, these areas will be shown in the Wear OS app below the favorites. Tapping on an area will show all primary entities in that area. Any domains with primary entities not added to an area will be shown near the bottom of the list as 'More entities'. Configuration and diagnostic entities and hidden entities are only shown in 'All entities', at the bottom of the list.

### More details

Long pressing any entity opens the more details screen. This screen contains more information on the state and when the entity was last updated. The following options are given on the details screen, depending on what is supported for the entity:

- `fan`: Speed control
- `light`: Brightness control and Color temperature control

### Settings

The settings screen can be found at the bottom of the home screen. This is where you will be able to add favorites on the watch as well as configuring tiles. You will also find options to enable haptic feedback and/or a toast confirmation to know when you selected an entity. These settings will reflect on the home screen and the shortcuts tile.

## Tiles

Right now, two tiles are supported:

* The shortcuts tile shows up to 7 shortcuts, which can be chosen from the settings section in the Wear OS app. You will be able to select the same set of entities you can access from the home screen.
* The template tile shows a rendered template. The template can only be set from the android companion app. Note: it is not possible to scroll in a tile, the template should fit on the watch screen.

### Styling the template tile

You may use HTML to format the text displayed. The following tags are currently supported:

* Adding a new line: `<br>`
* Changing the text style: `<b>bold</b>`, `<i>italic</i>` or `<u>underline</u>`
* Changing the text size: `<big>large</big>` or `<small>tiny</small>`
* Changing the color: `<font color='#03a9f4'>colored text</font>`
* Using headers: `<h1>title</h1>`, `<h2>subtitle</h2>`, etc.

## Complications

An entity state complication can be displayed on your watchface. The complication is of the 'short text' type and will display the current state of the selected entity. Depending on the watch face it will also show the entity name and icon. When you add an entity to a watch face, you can select the entity to display. To change the selected entity, just change the complication and select the entity state complication again.

The complications are updated automatically whenever the screen is turned on and roughly every 15 minutes. You can force a complication to update by tapping it on the watch face.

Hint: use a [template sensor](https://www.home-assistant.io/integrations/template/#state-based-template-binary-sensors-buttons-numbers-selects-and-sensors) for full flexibility.

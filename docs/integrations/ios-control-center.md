---
title: "iOS Control Center"
id: ios-control-center
---

# iOS Control Center

On iOS 18 or later, you can add Home Assistant controls to Control Center to access your home without opening the app.

## Adding a control

1. Open Control Center.
2. Touch and hold an empty area to enter edit mode.
3. Tap **Add a Control** and search for **Home Assistant**.
4. Select a control.
5. Tap the added control while still in edit mode to configure it.

## Cover controls

The **Cover** control lets you open and close a cover, such as a blind, shutter, or window. In its configuration, select your Home Assistant server and cover. You can also customize the display text and the icons for the open and closed states.

### Choosing the label <span class="beta">BETA</span>

The **Show next action** option determines what the cover control displays:

- **Off** (default): Shows the current state, such as **Open** or **Closed**.
- **On**: Shows **Close** when the cover is open and **Open** when it is closed.

This option applies separately to each cover control. It only changes the label; tapping the control still opens or closes the cover.

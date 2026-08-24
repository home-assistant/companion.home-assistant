---
title: "Toolbar"
id: "toolbar"
---

![macOS](/assets/macOS.svg)

On macOS, the Home Assistant app shows a toolbar above the main Home Assistant user interface. It gives you quick access to navigation and common actions, and you can customize it, including adding buttons for your own entities.

![macOS toolbar](/assets/macos/toolbar.png)

### Default buttons

Out of the box the toolbar includes:

1. **Back** and **Forward:** Navigate through your frontend history.
2. **Reload:** Reload the current page.
3. **Copy** and **Paste:** Copy the current selection, or paste into the frontend.
4. **Open in browser:** Open the current server in your default browser.
5. **Server picker:** Switch between servers. This button only appears when you have more than one server configured.

### Customizing the toolbar

Right-click the toolbar and choose **Customize Toolbar…**.

From the customization panel you can drag buttons to add, remove, or reorder them, and drag in spacers to arrange the layout. Your changes are saved automatically.

In addition to the default buttons, the customization panel offers:

- iOS Gesture actions as buttons: The same actions you can assign to [gestures](../integrations/gestures.md), for example, **Show sidebar**, **Quick search**, **Search entities**, **Search devices**, **Search commands**, **Assist**, **Show servers list**, **Next/Previous server**, **Show settings**, and **Open debug**.
- Your added entities: Any entities you have added to the toolbar (see below).

### Adding entities

Entities are added to the toolbar from the frontend, not from settings:

1. In Home Assistant, open the entity's more info dialog.
2. Select the **Add to** button.
3. Choose **Mac Toolbar**.

The entity appears as a toolbar button using its icon. Clicking the button opens that entity's more info dialog. Entities are added per server, so a button remembers the server it came from.

### Managing added entities

To review the entities you have added, go to **Settings** > **Companion app** > **Toolbar**. This screen lists your added entities and lets you remove them.

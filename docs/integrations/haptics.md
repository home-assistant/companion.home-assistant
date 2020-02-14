---
title: Haptics
id: 'haptics'
---

![iOS](/assets/apple.svg)

Home Assistant Companion for iOS features haptics, which provide physical feedback when interacting with the UI. Areas you will feel haptic feedback include toggles (lights, switches, input_booleans) and input_selects. Certain scenarios such as invalid service call errors will also generate haptic feedback.

iPhone models that support haptic feedback include the iPhone 7 and 7 Plus, iPhone 8 and 8 Plus, the iPhone X, XR, XS, XS Max, iPhone 11 and 11 Pro.

## Disabling Haptics
Home Assistant Companion respects the OS-level setting for disabling haptics. In iOS Settings, navigate to "Sounds & Haptics" and then toggle off "System Haptics" at the bottom of the screen. See the [Apple Support document](https://support.apple.com/guide/iphone/change-the-sounds-and-vibrations-iph07c867f28/ios) for more information.

## Developers: Integrating Haptics into Custom Cards
WIP: Instructions on integrating haptics supports into custom cards will go here. You can fire an event when your custom card is interacted with that the iOS app will listen for and re-interpret into haptic feedback.

Home Assistant Companion supports all seven haptic strength levels as defined by [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/feedback/).

| Haptic | Description |
| ------ | ------ |
| `success` | Indicates that a task or action has completed. |
| `warning` | Indicates that a task or action has produced a warning of some kind. |
| `failure` | Indicates that a task or action has failed. |
| `light` | Provides a physical metaphor that complements the visual experience. |
| `medium` | Provides a physical metaphor that complements the visual experience. |
| `heavy` | Provides a physical metaphor that complements the visual experience. |
| `selection` | Indicates that the selection is actively changing. |

**Custom Cards that use haptics:**
*   [Button Card](https://github.com/custom-cards/button-card) by RomRider
*   [Radial Menu](https://github.com/custom-cards/radial-menu) by Ian Richardson
*   [Harmony Card](https://github.com/sbryfcz/harmony-card) by Sam Bryfczynski


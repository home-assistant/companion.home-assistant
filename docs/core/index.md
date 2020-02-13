---
title: Feature overview
id: 'core'
---

The Home Assistant Companion App provides a convenient way to view and control your Home Assistant instance however it also extends the power of your instance by allowing your device to act as a data source. The Home Assistant Companion App adds numerous [sensors](sensors.md) (such as battery and network status among others), creates a `device_tracker` entity to allow [location](location.md) updates to be sent from the device and also provides [action shortcuts](actions.md) to trigger scripts or automations.

Not all features are supported by Android at the moment but eventually most features will be supported.  Look for the ![android](/assets/android.svg) Android logo to see what is currently supported.

## ![iOS](/assets/apple.svg) iOS and ![android](/assets/android.svg) Android Feature Comparison:

<table>
  <thead>
    <tr>
      <th><strong>Integrations</strong></th>
      <th><img alt="android" src="/assets/android.svg" /></th>
      <th><img alt="iOS" src="/assets/apple.svg" /></th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="../integrations/app-events.md">App Events</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../integrations/haptics.md">Haptic Feedback</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../integrations/theming.md">Theming</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../integrations/url-handler.md">URL Handler</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../integrations/universal-links.md">Universal Links</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../integrations/x-callback-url.md">X-Callback-URL</a></td>
      <td></td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>Location Updates</strong></th>
      <th><img alt="android" src="/assets/android.svg" /></th>
      <th><img alt="iOS" src="/assets/apple.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="location.md#overview">App Opened</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#overview">App Refreshed</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#overview">Background</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#location-tracking-in-home-assistant-zones">Enter/Exit Zone</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#ibeacons">iBeacon</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/location.md">Request Location Updates</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#location-tracking-when-outside-a-home-assistant-zone">Significant Location Change</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#overview">URL Handler</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="location.md#overview">X-Callback-URL</a></td>
      <td></td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>Notifications</strong></th>
      <th><img alt="android" src="/assets/android.svg" /></th>
      <th><img alt="iOS" src="/assets/apple.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="../notifications/actionable.md">Actionable</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#badge">Badge</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#notification-click-action">Click Action</a></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#notification-color">Color</a></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="../notifications/critical.md">Critical Alerts</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/dynamic-content.md">Dynamic Attachments</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/attachments.md">Image</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md">Message</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#controlling-how-a-notification-is-displayed-when-in-the-foreground">Presentation</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#replacing-notifications">Replaceable Notifications</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/location.md">Request Location Updates</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/sounds.md">Sound</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#sticky-notification">Sticky</a></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#subtitle">Subtitle</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md#thread-id-grouping-notifications">Threads</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/basic.md">Title</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="../notifications/attachments.md">Video</a></td>
      <td></td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>Sensors</strong></th>
      <th><img alt="android" src="/assets/android.svg" /></th>
      <th><img alt="iOS" src="/assets/apple.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="sensors.md#activity-sensor">Activity Sensor</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#pedometer-sensors">Average Active Pace</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#battery-sensors">Battery Level</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#battery-sensors">Battery State</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#connection-type-sensor">BSSID</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#connection-type-sensor">Connection Type</a></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#pedometer-sensors">Distance</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#pedometer-sensors">Floors Ascended</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#pedometer-sensors">Floors Descended</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#geocoded-location-sensor">Geocoded Location</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#last-update-trigger-sensor">Last Update Trigger</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#cellular-provider-sensor">Sim 1</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#cellular-provider-sensor">Sim 2</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md">SSID</a></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="sensors.md#pedometer-sensors">Steps</a></td>
      <td></td>
      <td>✅</td>
    </tr>
  </tbody>
</table>

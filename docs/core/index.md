---
title: Feature overview
id: 'core'
---

The Home Assistant Companion App provides a convenient way to view and control your Home Assistant instance however it also extends the power of your instance by allowing your device to act as a data source. The Home Assistant Companion App adds numerous [sensors](sensors.md) (such as battery and network status among others), creates a `device_tracker` entity to allow [location](location.md) updates to be sent from the device and also provides [action shortcuts](actions.md) to trigger scripts or automations.

Not all features are supported by Android at the moment but eventually most features will be supported.  Look for the ![Android](/assets/android.svg) Android logo to see what is currently supported.

## Feature Comparison:

<table className="core-table">
  <thead>
    <tr>
      <th><strong>Integrations</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> Full</th>
      <th><img alt="Android" src="/assets/android.svg" /> Minimal</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
      </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/core/actions">Actions</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-device-controls">Android Device Controls</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-quick-settings">Android Quick Settings</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-shortcuts">Android Shortcuts</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-webview">Android WebView</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/android-widgets">Android Widgets</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/app-events">App Events</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/haptics">Haptic Feedback</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/siri-shortcuts">Siri Shortcuts</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/sharing">Sharing</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/theming">Theming</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/url-handler">URL Handler</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/universal-links">Universal Links</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/integrations/x-callback-url">X-Callback-URL</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>Location Updates</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> Full</th>
      <th><img alt="Android" src="/assets/android.svg" /> Minimal</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/core/location#overview">App Opened</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">App Refreshed</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">Background</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#location-tracking-in-home-assistant-zones">Enter/Exit Zone</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#ibeacons">iBeacon</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#sending-an-intent">Intent</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-commands#request-location-updates">Notification</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#location-tracking-when-outside-a-home-assistant-zone">Significant Location Change</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">URL Handler</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/location#overview">X-Callback-URL</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>Notifications</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> Full</th>
      <th><img alt="Android" src="/assets/android.svg" /> Minimal</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/notifications/actionable-notifications">Actionable</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#alert-once">Alert Once</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#badge">Badge</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-channels">Channels</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-cleared">Cleared</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-color">Color</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-commands">Commands</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/critical-notifications">Critical Alerts</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/dynamic-content">Dynamic Attachments</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#grouping">Grouping</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-message-html-formatting">HTML Formatting</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-icon">Icon</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-attachments">Image</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-channel-importance">Importance</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-led-color">LED Color</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-local">Local Push</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic">Message</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#opening-a-url">Opening a URL</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#persistent-notification">Persistent</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#presentation-options">Presentation Options</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#clearing">Replaceable Notifications</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-commands#request-location-updates">Request Location Updates</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-sounds">Sound</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-status-bar-icon">Status Bar Icon</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#sticky-notification">Sticky</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#subtitle--subject">Subject / Subtitle</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#text-to-speech-notifications">Text to Speech</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-timeout">Timeout</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic">Title</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notifications-basic#notification-vibration-pattern">Vibration Pattern</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/notifications/notification-attachments">Video</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th><strong>Sensors</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> Full</th>
      <th><img alt="Android" src="/assets/android.svg" /> Minimal</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /></th>
      <th><img alt="macOS" src="/assets/macOS.svg" /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/docs/core/sensors#active-sensor">Active Sensor</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">Active Camera</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">Active Microphone</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#activity-sensors">Activity Sensors</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#android-auto-sensor">Android Auto Sensor</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#android-os-sensors">Android OS Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-data-sensors">App Data Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-importance-sensor">App Importance Sensor</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-memory-sensor">App Memory Sensor</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#app-usage-sensors">App Usage Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#audio-sensors">Audio Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">Average Active Pace</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#battery-sensors">Battery Level</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#battery-sensors">Battery State</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#bluetooth-sensors">Bluetooth Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#connection-type-sensor">BSSID</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">Camera in Use</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#connection-type-sensor">Connection Type</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#current-time-zone-sensor">Current Time Zone</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#current-version-sensor">Current Version</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">Displays</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">Distance</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#do-not-disturb-sensor">Do Not Disturb</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#doze-sensor">Doze</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#dynamic-color-sensor">Dynamic Color</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">Floors Ascended</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">Floors Descended</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#frontmost-app-sensor">Frontmost App</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#geocoded-location-sensor">Geocoded Location</a></td>
      <td>✅</td>
      <td></td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#high-accuracy-mode">High Accuracy Mode</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#high-accuracy-update-interval">High Accuracy Update Interval</a></td>
      <td>✅</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#interactive-sensor">Interactive</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#keyguard-sensors">Keyguard Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#last-reboot-sensor">Last Reboot</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#last-update-trigger-sensor">Last Update Trigger</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#last-used-app-sensor">Last Used App</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#light-sensor">Light</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">Microphone in Use</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#mobile-data-sensors">Mobile Data Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#notification-sensors">Notification Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#phone-sensors">Phone Sensors</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#power-save-sensor">Power Save</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pressure-sensor">Pressure</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">Primary Display ID & Name</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#proximity-sensor">Proximity</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#public-ip-sensor">Public IP</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#next-alarm-sensor">Next Alarm</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#cellular-provider-sensor">Sim 1</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#cellular-provider-sensor">Sim 2</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors">SSID</a></td>
      <td></td>
      <td></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#pedometer-sensors">Steps</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#storage-sensor">Storage</a></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#traffic-stats-sensor">Traffic Stats</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="/docs/core/sensors#work-profile-sensor">Work Profile</a></td>
      <td>✅</td>
      <td>✅</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

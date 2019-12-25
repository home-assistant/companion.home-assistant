---
title: iOS Requirements
id: ios_requirements
---


## Installation & System Requirements

The Home Assistant Companion App can be downloaded from the [iOS App Store](https://apps.apple.com/app/home-assistant-companion/id1099568401) 
![iOS App Store QR Code](assets/qr_ios_store.png)

The iOS App requires iOS 10 or greater, this means the oldest devices supported are the iPhone 5, 4<sup>th</sup> generation iPad and the 6<sup>th</sup> generation iPod touch. For some features like Critical Notifications a newer version of iOS is required, iOS 13 is recommended for the full featureset to be available.

## iOS 13 Specific Requirements

Because Apple changed application policies regarding access of location data and other system information in iOS 13, the Home Assistant app permissions have changed slightly. Some or most of these permissions need to be granted via the iOS settings app:

-  **Internal / External URL**: Access to the WiFi SSID is now linked to the location access permission. If you require different Internal / External URLs for your app, you need to grant the app location access.
-  **Mobile Data**: If you want the app to work on the go, you may need to grant it access to mobile data.
-  **Background updates**: You may need to give the app permission to run in the background so it can send location and sensor data to your Home Assistant.
-  **Location: always**: It is no longer possible for an app to ask for permission to access location data _always_, thus you will need to give this permission via the iOS settings app.
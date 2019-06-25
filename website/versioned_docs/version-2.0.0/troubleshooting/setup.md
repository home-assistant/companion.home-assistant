---
title: Troubleshooting
id: version-2.0.0-setup
original_id: setup
---

Below is a list of common issues and troubleshooting advice to address them. For more support please [look at the more help page](more-help.md)

#1 why is my notify not there? Restart ha, force close companion, go to settings, notification settings and check push id?

#### I don't see a `notify` target in my `dev-services` panel
Once you have [set up](../getting_started/index.md) the Companion App, a `notify` service will be created providing you granted notification permissions during setup. If you can't see this [force quit](https://support.apple.com/HT201330) the Companion App and restart your Home Assistant instance. The service should now be listed in the `dev-services` panel. If not, check the the notification settings within the app (swipe right to bring up the sidebar, the tap "App Configuration", then "Notifications"). If the "Push ID" box is empty, tap the Reset button below it.

#2 ssl error with cloud enabled and remote ui off -> enter external url

#3 how to find and rename sensors via integration page and entities

#4 ssl error with letsencrypt and using `https://ip/` -> set up via hostname for ssl, use either split brain dns on your router or nat reflection (if possible). Use nginx otherwise with http internally or use ha cloud

Logon error when using authentication on proxy -> don't

Themes: use frontend.set_theme to switch between themes

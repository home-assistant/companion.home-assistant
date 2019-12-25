---
title: Companion App Requirements
id: requirements
---

# Requirements
You need to be running Home Assistant 0.95.0 or newer. The new updated iOS app requires the following integrations to be enabled in your Home Assistant instance:
-   `default_config:`

If for some reason you have disabled the default config make sure your `configuration.yaml` contains at least:
-   `mobile_app:`
-   `discovery:`

For some features the following integrations also need to be enabled:
-   `cloud:` is used for securely connecting to your Home Assistant via Nabu Casa subscription via Remote UI and cloud webhooks
-   `ios:` is used if you want advanced notifications like actionable notifications and categories

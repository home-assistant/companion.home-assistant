---
title: Errors
---

Here's a list of all the error codes you may experience with further documentation about why this happens and what to do about it.

# Setup and Connectivity

## "Invalid Client ID or Redirect URI"  or  "OS Error while looking up redirect_uri"
Check your `home-assistant.log` file for any errors about `indieauth`. If it also mentions a OS Error, you most likely have a broken IPv6 implementation. You can confirm this by running `curl -v6 https://home-assistant.io/iOS/beta-auth` from the machine you run Home Assistant on. If you receive a error about not being able to connect to the server, your IPv6 stack is broken and you should disable it.

## "Setup failed for dependencies: `zeroconf`"
This error is usually caused by one of the two following issues:
*   You are running two Home Assistant instances with identical names. The solution is to rename one of them.
*   You are missing `default_config:` from your `configuration.yaml` file. It is possible to only add `zeroconf:` to `configuration.yaml` but adding `default_config:` will add [several useful integrations](https://www.home-assistant.io/components/default_config/) along with `zeroconf:`.

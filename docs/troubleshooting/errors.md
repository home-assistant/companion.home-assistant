---
title: Errors
---

Here's a list of all the error codes you may experience with further documentation about why this happens and what to do about it.

# Setup and Connectivity

## "Invalid Client ID or Redirect URI"  or  "OS Error while looking up redirect_uri"
Check your `home-assistant.log` file for any errors about `indieauth`. If it also mentions a OS Error, you most likely have a broken IPv6 implementation. You can confirm this by running `curl -v6 https://home-assistant.io/iOS/beta-auth` from the machine you run Home Assistant on. If you receive a error about not being able to connect to the server, your IPv6 stack is broken and you should disable it.

## Setup failed for dependencies: zeroconf
This error is usually caused when you are running two Home Assistant instances with identical names. The solution is to rename one of them.

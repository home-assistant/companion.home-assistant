---
title: Errors
---

Here's a list of all the error codes you may experience with further documentation about why this happens and what to do about it.

# Setup and Connectivity

## "Invalid Client ID or Redirect URI"  or  "OS Error while looking up redirect_uri"
Check your `home-assistant.log` file for any errors about `indieauth`. If it also mentions a OS Error, you most likely have a broken IPv6 implementation. You can confirm this by running `curl -v6 https://home-assistant.io/iOS/beta-auth` from the machine you run Home Assistant on. If you receive a error about not being able to connect to the server, your IPv6 stack is broken and you should disable it.

## SSL error while looking up redirect_uri https://home-assistant.io/iOS
This error means that your Home Assistant can't negotiate the encrypted connection to https://home-assistant.io. This issue has been seen on installations running on top of MacOS where the installer notice about certificates was skipped and ignored. From the Python 3.7.5 ReadMe:


>Certificate verification and OpenSSL
>This package includes its own private copy of OpenSSL 1.1.1.   The trust certificates in system and user keychains managed by the Keychain Access application and the security command line utility are not used as defaults by the Python `ssl` module.  A sample command script is included in `/Applications/Python 3.7` to install a curated bundle of default root certificates from the third-party certifi package (https://pypi.org/project/certifi/).  Double-click on `Install Certificates` to run it.
>The bundled pip has its own default certificate store for verifying download connections.
## "Setup failed for dependencies: `zeroconf`"
This error is usually caused by one of the two following issues:
*   You are running two Home Assistant instances with identical names. The solution is to rename one of them.
*   You are missing `default_config:` from your `configuration.yaml` file. It is possible to only add `zeroconf:` to `configuration.yaml` but adding `default_config:` will add [several useful integrations](https://www.home-assistant.io/components/default_config/) along with `zeroconf:`.

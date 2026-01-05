---
title: Errors
id: 'errors'
---

Here's a list of all the error codes you may experience with further documentation about why this happens and what to do about it.

## Setup and Connectivity

### "Invalid Client ID or Redirect URI"  and  "OS Error while looking up redirect_uri"
Check your `home-assistant.log` file for any errors about `indieauth`. If it also mentions a OS Error, you most likely have a broken IPv6 implementation. You can confirm this by running `curl -v6 https://home-assistant.io/iOS/beta-auth` from the machine you run Home Assistant on. If you receive a error about not being able to connect to the server, your IPv6 stack is broken and you should disable it.

### "Invalid Client ID or Redirect URI"  and  "Timeout while while looking up redirect_uri"
Check your `home-assistant.log` file for any errors about `indieauth`. If it also mentions a Timeout, you may have a problem with your DNS not behaving as expected. You can confirm this by running `dig home-assistant.io` and `nslookup home-assistant.io` from the machine you run Home Assistant on. If you see any errors there could be a dns problem.

Fixing this varies depending on your setup - but it's worth trying the google dns servers `8.8.8.8` and `1.1.1.1`. If you are running a hassOS setup you can do this with `ha dns options --servers dns://8.8.8.8 --servers dns://1.1.1.1`.

### SSL error while looking up redirect_uri [https://home-assistant.io/iOS](https://home-assistant.io/iOS)
This error means that your Home Assistant can't negotiate the encrypted connection to [https://home-assistant.io](https://home-assistant.io). This issue has been seen on installations running on top of MacOS where the installer notice about certificates was skipped and ignored. From the Python 3.7.5 ReadMe:

>Certificate verification and OpenSSL
>This package includes its own private copy of OpenSSL 1.1.1.   The trust certificates in system and user keychains managed by the Keychain Access application and the security command line utility are not used as defaults by the Python `ssl` module.  A sample command script is included in `/Applications/Python 3.7` to install a curated bundle of default root certificates from the third-party [certifi](https://pypi.org/project/certifi/) package.  Double-click on `Install Certificates` to run it.
>The bundled pip has its own default certificate store for verifying download connections.

### "Setup failed for dependencies: `zeroconf`"
This error is usually caused by one of the two following issues:
*   You are running two Home Assistant instances with identical names. The solution is to rename one of them.
*   You are missing `default_config:` from your `configuration.yaml` file. It is possible to only add `zeroconf:` to `configuration.yaml` but adding `default_config:` will add [several useful integrations](https://www.home-assistant.io/integrations/default_config/) along with `zeroconf:`.

### Response status code was unacceptable: 400
This occurs when the data sent during set up does not meet Home Assistant's expectations. This most commonly occurs in two circumstances:

* When you are running a version of Home Assistant older than the minimum requirement (currently 0.104.0)
* You have unexpected characters in your device's name. While setting up the Mobile App integration, we attempt to remove non-standard characters and emoji (as of Home Assistant 0.112). However, it is worth simplifying your device name to remove such characters if you are getting this error.

### URLSessionTask failed with error
This error is usually caused by one of the two following issues:
*   You have denied local network access to the app. To solve the issue on iOS, open the Home Assistant entry in the system settings and verify that local network is enabled.
*   You have configured an incorrect external url in your instance. E.g. when forwarding external port 443 to your instance's port (normally 8123), you don't have to append a port to your URL.
* You are [logged into Home Assistant Cloud](https://support.nabucasa.com/hc/articles/25649130769949) without a subscription and trying to access your instance with a reverse proxy. Just log out from your Home Assistant Cloud account.

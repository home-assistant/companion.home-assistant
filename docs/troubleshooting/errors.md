---
title: Errors
---

Here's a list of all the error codes you may experience with further documentation about why this happens and what to do about it.

# Setup and Connectivity

## "Invalid Client ID or Redirect URI"  or  "OS Error while looking up redirect_uri"
Check your `home-assistant.log` file for any errors about `indieauth`. If it also mentions a OS Error, you most likely have a broken IPv6 implementation. You can confirm this by running `curl -v6 https://home-assistant.io/iOS` from the machine you run Home Assistant on. If you receive an error about not being able to connect to the server, your Home Assistant Host has a broken IPv6 setup you either need to fix or disable.

## SSL error while looking up redirect_uri <https://home-assistant.io/iOS> or <https://home-assistant.io/Android>
This error means that your Home Assistant can't negotiate the encrypted connection to <https://home-assistant.io>. This issue has been seen on installations running on top of MacOS where the installer notice about certificates was skipped and ignored. From the Python 3.7.5 ReadMe:

>Certificate verification and OpenSSL
>This package includes its own private copy of OpenSSL 1.1.1.   The trust certificates in system and user keychains managed by the Keychain Access application and the security command line utility are not used as defaults by the Python `ssl` module.  A sample command script is included in `/Applications/Python 3.7` to install a curated bundle of default root certificates from the third-party certifi package (<https://pypi.org/project/certifi/>).  Double-click on `Install Certificates` to run it.
>The bundled pip has its own default certificate store for verifying download connections.

## "Setup failed for dependencies: `zeroconf`"
This error is usually caused by one of the two following issues:
*   You are running two Home Assistant instances with identical names. The solution is to rename one of them.
*   You are missing `default_config:` from your `configuration.yaml` file. It is possible to only add `zeroconf:` to `configuration.yaml` but adding `default_config:` will add [several useful integrations](https://www.home-assistant.io/components/default_config/) along with `zeroconf:`.

## "You receive an error: Invalid config
You have added `mobile_app:` or `default_config` to your configuration.yaml and have an entry in your Home Assistant logs similar to:

        Invalid config
        The following components and platforms could not be set up:

    And one or both of `mobile_app` or `cloud` listed. This is most common when you have Home Assistant installed on top of an operating system that isn't HassOS and contains out of date dependancies. To fix this, please check all your libraries are up to date (specifically `libc6 `).

## You receive an http 405 error code when trying to sign in
If this happened after the app auto discovered your Home Assistant instance, try manually entering the address of you Home Assistant instance instead. You likely have no or a wrong address in `base_url`.



# Nabu Casa
## Starting with Home Assistant 0.103.0 `cloud:` no longer is loaded as a dependency of `mobile_app:`.
If you did not have `default_config:` configured, your cloud integration might have disappeared or become disabled.

## You get a 404 error when not using Nabu Casa.
Please make sure that you are **not** including a trailing `/` when entering your URL manually or in `base_url:` entry in `configuration.yaml` if using the automatic discovery when on home network.

## Remote UI disabled because of Trusted Proxy on 127.0.0.1 or ::1
Starting with 0.103.0, Home Assistant Cloud Remote UI gets disabled if you have an entry for a trusted proxy on `127.0.0.1` or `::1` in your configuration.yaml.

## Setting up Remote UI on iOS
Because Apple changed the iOS location permissions (which now include the WiFi SSID) with iOS 13 some additional steps are required now:
    - Grant location access for Home Assistant in iOS settings
    - In the app, go to App Settings -> Connection settings and copy and paste what’s in external URL to internal URL (while on your WiFi)
    - Restart the app
    - You should now have the checkbox for “Connect via Cloud” available, activate that. At this point external URL won't be used anymore and the app will connect via Remote UI URL.



# iOS Errors
## You receive an error containing `kCLError` when trying to do a manual update (pulling down).
To fix this change the location permission for the Home Assistant App to "Always" in iOS Settings>Privacy>Location Services

## Your `sensor.SSID` and `sensor.BSSID` entities are not updating and/or your app does not switch to using an internal URL when on your home Wi-Fi. 
You can fix both of these issue by restarting your device.

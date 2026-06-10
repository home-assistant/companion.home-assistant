---
title: iOS developer account migration
id: 'ios-developer-account-migration'
---

The Home Assistant ![iOS](/assets/iOS.svg)app will move from the Nabu Casa Apple Developer account to the Open Home Foundation Apple Developer account.

## What this means for you

After the Home Assistant app has migrated from the Nabu Casa Apple Developer account to the Open Home Foundation Apple Developer account, you may need to sign in again in the iOS app for each Home Assistant server you have configured.

This can happen because iOS stores app credentials in Apple's keychain, and keychain data is tied to the app's Apple Developer account. When an app moves to a different developer account, previously stored credentials are not available to the new app identity.

In practice, this means you may be asked to enter your Home Assistant username and password again, server by server.

## TestFlight users

During the account migration, the current TestFlight channel will be closed.

After the migration is complete, a new TestFlight invite link will be published.

We will announce the new link on our social channels and in the documentation.

## How to prepare before migration

To make the migration smoother, prepare your credentials now.

1. For each Home Assistant server in your app, confirm that you know the username and password.
2. Save your credentials in a password manager so you can quickly sign in again if needed.
3. If you do not know your credentials, contact the administrator of your Home Assistant server.
4. If your Home Assistant setup was done by an installer, contact the installer and ask for your login details before migration.

## What to do after migration

If the iOS app asks you to authenticate again:

1. Open the app and select the server that needs sign-in.
2. Enter the username and password for that server.
3. Repeat for each server configured in your app.

:::info
If you use different credentials for different Home Assistant servers, make sure you use the matching account for each server.
:::

## Need help?

If you cannot sign in after migration, contact your Home Assistant administrator first. If you still need help, continue with the steps in [More help](./more-help.md).

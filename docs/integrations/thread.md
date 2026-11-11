---
title: "Thread"
id: 'thread'
---

Home Assistant can act as a [Thread](https://www.home-assistant.io/integrations/thread/) border router. To commission Matter over Thread devices from your phone, or to let Home Assistant join an existing Thread network, the Thread network credentials need to be shared between Home Assistant and your phone.

The ![Android](/assets/android.svg) Android app integrates with the Thread credential storage provided by Google Play services[^1] to share credentials in both directions. This requires the full flavor of the app (installed from the Play Store); builds without Google Play services (for example from F-Droid) can't manage Thread credentials.

## Sharing credentials

Credentials can be shared in both directions from the Thread configuration panel in Home Assistant (**Settings** > **Devices & services** > **Thread**):

- **Send credentials to Home Assistant** reads your phone's preferred Thread network credentials from Google Play services (after you consent) and adds them to Home Assistant. This allows Home Assistant to join the Thread network your phone already uses, for example one created by a Google border router.
- **Send credentials to phone** <span class='beta'>BETA</span> stores the Thread network credentials of your Home Assistant border router on your phone. Whether these credentials become the phone's _preferred_ network is decided by Android, not by the app — see below.

The app additionally offers **Settings** > **Companion app** > **Troubleshooting** > **Sync Thread credentials**, which reconciles the credentials between the device and Home Assistant.

## How Android stores Thread credentials

Google Play services keeps a Thread credential store on each device. Knowing how this store behaves explains most surprises:

- **Credentials are owned by the app that added them.** Only the owning app can read, update, or remove its credentials; other apps receive a `PERMISSION_DENIED` error[^2]. The one exception is the preferred network credentials, which any app can request with your consent[^3]. The Home Assistant app therefore can't see — let alone remove — credentials added by other apps such as Google Home.
- **The store is bound to the device, not to your Google Account or your home.** Each Android device keeps its own credential store[^4].
- **Credentials are backed up to your Google Account.** Since late 2024, Google stores the credentials in your Google Account "to simplify the setup of new devices and make a backup"[^5]. You can disable this with the **Save credentials** option in the **Thread networks** system settings panel. The _preferred_ status is not documented as part of this backup and has been observed not to follow the account across devices[^6].

## The preferred network

Android automatically selects one stored credential set as the device's _preferred_ Thread network, which is used when commissioning new Matter over Thread devices. The behavior is documented by Google as follows:

- The first border router added to the store determines the preferred credentials for the device[^7].
- The preferred credentials persist on the device even if that border router is later removed[^7].
- There is no API to change or remove the preferred status. Apps can only read the preferred credentials or check whether given credentials match them[^8]. This also means the Home Assistant app cannot promote its own network to preferred if another network already is[^9].

In addition, Android devices sync automatically with Google border routers (such as a Nest Hub) that are set up in your home[^1], so a phone can end up with a preferred network without you having shared one explicitly.

Because of the first-added-wins rule, a stale network can stay preferred forever — for example after you removed the border router that created it[^10].

Recent versions of Google Play services add a **Thread networks** panel to the Android system settings (search for "Thread" in the settings app). It lets you browse the networks known to the device and see which one is preferred, and hosts the **Save credentials** toggle — but it doesn't allow selecting a different preferred network or removing one[^11].

## Changing the preferred network

There is no supported way to change the preferred network directly[^9]. The known workarounds are:

1. **Adding another user on the phone**: each Android user has its own Google Play services storage, so a newly created user starts with an empty Thread credential store. Share the credentials from Home Assistant while using that user and they become its preferred network, without touching your main user's data[^12].
2. **Clearing Google Play services data**: removing the stored data of the Google Play services app deletes all Thread credentials, including the preferred selection[^13]. After that, the first credential added again becomes preferred. To make sure your Home Assistant network wins this race, temporarily power off Google border routers (they re-add their network automatically) and share the credentials from Home Assistant right after clearing[^14].

:::caution
Clearing Google Play services data affects far more than Thread: among others, it removes your Google Wallet cards and can reset device settings[^13]. Only use this as a last resort.
:::

Also note that using **Reset border router** in the Home Assistant Thread integration creates a new Thread network with a new border agent ID. The app can then no longer update the previously shared credentials in place; it has to remove them and add the new network, which does not make the new network preferred[^15].

[^1]: [Thread Network SDK for Android](https://developers.home.google.com/thread), Google Home Developers.
[^2]: [`ThreadNetworkClient` reference](https://developers.home.google.com/reference/com/google/android/gms/threadnetwork/ThreadNetworkClient): "If the Thread network credentials were not added by your app, the returned Task will fail with an ApiException with status code PERMISSION_DENIED."
[^3]: [Thread Network SDK for Android](https://developers.home.google.com/thread): "the preferred credentials are always available for any app upon user consent."
[^4]: [Googler answer in the Google Nest community](https://www.googlenestcommunity.com/t5/Smart-Home-Developer-Forum/Thread-Network-Key-for-adding-other-thread-devices-on-google-nest-hub-max/m-p/568559): "The credential's storage is currently not scoped by the user's Smart Home (Structure). Each Android device will have its BAID storage."
[^5]: [Manage Thread credentials on your Android device](https://support.google.com/android/answer/16335330), Google Help.
[^6]: [Observation in home-assistant/android#4146](https://github.com/home-assistant/android/issues/4146#issuecomment-3029427505): two devices on the same Google Account list different networks and preferred status.
[^7]: [Thread Network SDK for Android](https://developers.home.google.com/thread): "The first TBR that is added to the Google Play services storage determines the Preferred Credentials for this mobile device" and "Even if the first TBR is later excluded, the Preferred Credentials will persist on the Android device."
[^8]: [`ThreadNetworkClient` reference](https://developers.home.google.com/reference/com/google/android/gms/threadnetwork/ThreadNetworkClient): the API only exposes `getPreferredCredentials` and `isPreferredCredentials`; there is no method to set or clear preferred credentials.
[^9]: [Maintainer comment in home-assistant/android#3832](https://github.com/home-assistant/android/issues/3832#issuecomment-1698488155): "the app is not able to change the preferred network, only the system can."
[^10]: [Maintainer comment in home-assistant/android#3582](https://github.com/home-assistant/android/issues/3582#issuecomment-1634569792): "Unfortunately there is no way [to] change the preferred Thread network on Android devices currently."
[^11]: [Comments in home-assistant/android#4146](https://github.com/home-assistant/android/issues/4146#issuecomment-3029427505) [describing the panel](https://github.com/home-assistant/android/issues/4146#issuecomment-3030689091).
[^12]: [User report in home-assistant/android#4146](https://github.com/home-assistant/android/issues/4146#issuecomment-4365212285), independently confirmed in [home-assistant/android#5837](https://github.com/home-assistant/android/issues/5837#issuecomment-3690557249).
[^13]: [Workaround description in home-assistant/android#4146](https://github.com/home-assistant/android/issues/4146#issuecomment-1911707074).
[^14]: [User report in home-assistant/android#4146](https://github.com/home-assistant/android/issues/4146#issuecomment-3977392953).
[^15]: [Analysis in home-assistant/android#4146](https://github.com/home-assistant/android/issues/4146#issuecomment-1919989504), with a related [Google issue tracker entry](https://issuetracker.google.com/issues/286158210).

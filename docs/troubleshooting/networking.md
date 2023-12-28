---
title: Companion App Networking
id: 'networking'
---
Having your Home available anywhere and everywhere you go is important, whether you forgot to turn off the stove or you want to check the camera views because of an alert.

Because we want your smart home to be private and secure on the web, many parts of the puzzle need to align just right so everything works as you expect. This guide aims to help you understand the requirements, some of the complexities and our recommended typical solutions to setting up network access to your Home Assistant instance:

## The basics: How the app talks to your Home Assistant
In order for the app to talk to HA, it needs to know its address. Just within your home network you might know that your Home Assistant is on an IP like `192.168.1.4` and listening on port 8123. If you use Home Assistant OS and haven't changed any of the defaults, Home Assistant will also be reachable at <http://homeassistant.local:8123>.
This is all fine and will work perfectly well as long as you never take your phone or tablet outside your home, but what if you do?
The easiest way is to subscribe to Nabu Casa Cloud for a monthly [fee](https://www.nabucasa.com/pricing/). This fee helps support further development of Home Assistant. Nabu Casa Cloud acts as a "smart" proxy on the internet, tunnelling your frontend in an encrypted manner from your home to your phone, regardless where you are and without requiring opening your home network to inbound traffic from the internet.
If you don't want to use Nabu Casa Cloud (which is fine, but you should still subscribe and enjoy the warm feeling of supporting Home Assistant), you need HA to be accessible from the internet. This requires opening a port on your router and getting a name for your Home Assistant on the internet. While it is possible to have your HA use Port 8123 internally and have your router do a port-forwarding from say the default https port of 443 to 8123, we recommend you NOT do this for reasons of simplicity which we will explain later. You also need a name for your Home Assistant as homeassistant.local is a private domain suffix that does not exist on the internet.

## Dynamic DNS
Most non-business internet connections have at least one of two drawbacks: Your internet service provider typically does not give you a static IP (meaning the public IP address your modem/router is assigned will change every once in a while or even every 24 hours) and some ISPs don't even give you a "real" IP address as they do not have enough addresses to give out. This last scenario is very common on cable providers and especially in Asia/Pacific. If your ISP says they use Carrier-grade NAT (CG-NAT) or something like Dual Stack lite (DS-lite) you likely will have this problem. If you're impacted please see the CG-NAT and IPv6 addendum.
For dynamic, public IP addresses the solution is simple: Typically users choose a dynamic dns service such as [duckdns.org](https://github.com/home-assistant/addons/blob/master/duckdns/README.md) which will create a unique name (e.g. `my-home.duckdns.org`) that is supported to be updated via your router to always point to your public address. If you have created the port-forward of TCP 8123 on your router's public interface to TCP 8123 on your internal Home Assistant IP (say `192.168.1.4`), your Home Assistant is now available on the web. You could declare victory at this point and stop but don't - because everything at this point is unencrypted and we want you to enjoy HA in a private, secure manner.
## Hairpin NAT
At this point of setting up we need to check one capability of your router: Hairpin NAT (otherwise known as NAT reflection or NAT loopback). What this means is the ability of your router to mirror a request from its inside (LAN) interface to its outside (WAN) address back to an internal IP address (in this case, your Home Assistant), thus reflecting or hairpinning the traffic. It's easy to check if this works: Just open a browser on your phone or PC while connected to your home network and opening `http://my-home.duckdns.org:8123` - if it works, you have hairpin NAT working and can go on to the next section. Most current routers will support NAT hairpinning out of the box, there are however some routers (especially if you got your router from your ISP) that do not have this ability or have it disabled. If this is the case, you need to check if you can enable it on your router or, if you can't, you will need to set up Split Brain DNS.

## Securing the connection
We'll stay with our DuckDNS example. Using `http://my-home.duckdns.org:8123` works, but anyone could be reading your traffic. Let's change that! The DuckDNS add-on will create a free, trusted and valid LetsEncrypt SSL certificate to use on your Home Assistant. Just follow the installation instructions [here](https://github.com/home-assistant/addons/tree/master/duckdns) and [here](https://github.com/home-assistant/addons/blob/master/duckdns/README.md) and you will have secure, public access to your Home Assistant. What's great about using the DuckDNS add-on is that it uses the LetsEncrypt DNS challenge, whereby during requesting the certificate it proves "ownership" of the domain by creating a temporary DNS record. If you use a different DNS provider other than DuckDNS, you can use the [LetsEncrypt](https://github.com/home-assistant/addons/tree/master/letsencrypt) add-on for `Home Assistant` which supports proving ownership of the name either via the DNS or the http challenge. The latter requires port-forwarding TCP Port 80 on your router to your internal Home Assistant IP on TCP Port 80.

With Hairpin NAT working and SSL on your DNS domain you can now access Home Assistant securely both on the internet and at home and you should add `external_url: my-home.duckdns.org:8123` to the `homeassistant:` section of your configuration.yaml. This is not strictly necessary but will help with auto-detection during onboarding of the iOS app, as the app will know where and how to reach your Home Assistant.

## Split Brain DNS
So what's this split brain DNS (also known as split horizon DNS, split-DNS) thing and why would I need it? If your router doesn't do hairpin NAT, you still need to access your Home Assistant via the public DNS name, e.g. `my-home.duckdns.org`. Why is that? Because valid encryption via https and SSL certificates only works for public DNS names. What this means is that the certificate name on your server needs to match the DNS name you enter in your browser or app. This is fine with hairpin NAT available but becomes an issue when it's not. In this case you need to "split" the answer your browser/app gets when it looks up the IP address behind `my-home.duckdns.org` - you need one answer for devices on your home network that points to the internal IP address of your Home Assistant (e.g. `192.168.1.4`) and another answer for when you're out and about (e.g. `104.25.25.31`).
The easiest solution to this is to use the [AdGuard Home](https://github.com/hassio-addons/addon-adguard-home) add-on for Home Assistant. This can also be set up on some routers (e.g. pfSense or UniFi Security Gateways) but we'll continue on using our example guide with the tools provided via Home Assistant: So you've now installed the AdGuard Home add-on and changed the DNS server on your router DHCP settings to the address of your Home Assistant. You should now go to the AdGuard Home setting page in your [Add-ons panel](https://my.home-assistant.io/redirect/supervisor/) and there go to `Settings` -> `Filters` and select: `DNS rewrites`

Here you click `Add DNS rewrite` and enter your `my-home.duckdns.org` and the internal IP `192.168.1.4` of your Home Assistant, followed by clicking on `save`. What happens now is that all DNS queries for the address `my-home.duckdns.org` from inside your home network will be answered by AdGuard via its own rewrite table, thus pointing toward the internal address of your Home Assistant instead of asking public DNS servers on the web which will all answer with the public IP of your router.
Even if you don't need split brain DNS, you may also want to set this up as it will enable you to access Home Assistant via it's public name even when your internet connection is down and hairpin NAT won't work. One less dependency on the Cloud!

## Setting up the app
If you've followed all our advice, your app should find your Home Assistant instance automatically during onboarding when connected to your home wifi network. You can also go through onboarding anywhere you're connected to the internet by manually entering `https://my-home.duckdns.org:8123` and the setup will finish with that address in the `External URL` field in the app connection settings. There should be no need to enter an internal URL as the same address will work regardless of where your phone is connected.

If you want to (or have to) use Nabu Casa Cloud or a different URL depending on the network you're connected to, there are more steps required:

-   In system settings, set the location access permission for Home Assistant to 'Always' on iOS or 'Allow all the time' on Android. This is required because iOS 13 and newer and all Android versions will only let apps with such permission have access to the wifi SSID which is used by the app to determine whether to use internal or external URLs.
-   Once permission is given, add your Home Assistant address to internal URL (if you come from the top of this article, this could be `http://homeassistant.local:8123`)
-  ![iOS](/assets/iOS.svg) If you've set up Nabu Casa Cloud in your Home Assistant the checkbox to "Connect via Cloud" should now become available. Once you activate the checkbox, external URL will become deactivated.
-  ![Android](/assets/android.svg) Manually change your Home Assistant's external URL to your Nabu Casa Cloud URL.

:::note Using the BSSID instead of SSID
![Android](/assets/android.svg) You can also enter a wifi network BSSID in the app's settings in case you have multiple access points with the same SSID, and only want to use the internal URL when connected to a specific access point. To do so, add a new SSID with the name `BSSID:` followed by the BSSID (for example: `BSSID:1A:2B:3C:4D:5E:6F`).
:::

## Addendum: CG-NAT
If your ISP doesn't give you a public IPv4 address you're down to basically only two solutions: You can call your ISP and ask if they can give you a real address or if there is an upgrade for your connection available (oddly enough, asking nicely will work with many ISPs out there) or use Nabu Casa Cloud.

## Addendum: IPv6
Since IPv6 has been rolling out for the last 20 years, chances are that along with an IPv4 address your home network will also have been provided with IPv6 addresses from your ISP. So your Home Assistant host may have it's IPv4 address of `192.168.1.4` as well as an IPv6 address of `2001:db8:1042::51c1:28d8:3bdc:6724`. Here's where our advice for not changing the TCP port you forward to Home Assistant comes in:
-   Home Assistant will listen for traffic on `192.168.1.4:8123` *and* `[2001:db8:1042::51c1:28d8:3bdc:6724]:8123`
-   If you really want to future proof your setup, you will have two DNS records for `my-home.duckdns.org`: An A-record pointing to your routers public IPv4 address which will be port-forwarded to your HA hosts internal address and an AAAA-record, which points directly to the IPv6 address of your HA host. Now when you access your HA remotely either protocol could be used, since all you're entering will be `https://my-home.duckdns.org:8123`. If you had changed the Port on your Router to the https default 443, the connection would now fail if you suddenly ended up with a working IPv6 setup as nothing is listening on `[2001:db8:1042::51c1:28d8:3bdc:6724]:443`.

## Addendum: Reverse Proxy via NGINX
There are cases when having Home Assistant serve https is impossible or incompatible with some of your devices. This can be especially true with ESP-based low power IoT hardware that communicates via RestAPI and just doesn't have the horsepower to do the SSL encryption. One example is the [konnected.io Integration](https://www.home-assistant.io/integrations/konnected/) which requires Home Assistant to be reachable via http.
So to accomodate this and still have encryption for external access, we use a reverse proxy like [NGINX](https://www.home-assistant.io/docs/ecosystem/nginx/). What a reverse proxy does is to act as an intermediate for your clients (Browser or App). The client talks to the reverse proxy securely via https and the proxy passes through this traffic to Home Assistant over an unencrypted http connection. Staying with our Home Assistant example, we'll assume you have already set up DuckDNS and LetsEncrypt. You should now install the [NGINX Home Assistant SSL proxy](https://www.home-assistant.io/addons/nginx_proxy/) add-on for Home Assistant and configure it according to the docs.

In your configuration.yaml file the following changes are needed:
```
homeassistant:
  external_url: https://my-home.duckdns.org # Note we no longer have a :8123 Port here

http:
  use_x_forwarded_for: true     # To ensure HA understands that client requests come via reverse proxy
  trusted_proxies:
    - 172.30.32.0/23            # In Home Assistant we need to add the Docker subnet
    - 127.0.0.1                 # Add the localhost IPv4 address
    - ::1                       # Add the localhost IPv6 address
  # Comment or remove the SSL certificate lines:
  # ssl_certificate: /ssl/fullchain.pem
  # ssl_key: /ssl/privkey.pem
```
Once that's done your router's port-forwarding should be `TCP 443` to your Home Assistant internal IP `192.168.1.4 Port 443`. Do NOT create a forward to `192.168.1.4 Port 8123` as that is now unencrypted http and should only be accessible from your local network.
You can now access your Home Assistant via `https://my-home.duckdns.org` both internally and externally while having `http://192.168.1.4:8123` available to be used as unencrypted endpoint for things like `konnected.io`.
Note: If you don't use the NGINX Home Assistant add-on but instead roll your own, please ensure that websockets support is enabled.

### TLS Client Authentication

![Android](/assets/android.svg)

If your Home Assistant requires TLS Client Authentication (because it is behind a reverse proxy configured to perform TLS Client Authentication), the app will ask for a certificate.
Please refer to your device and Android version documentation to install the certificate, an example for Pixel phones is available here [Add & remove certificates](https://support.google.com/pixelphone/answer/2844832?hl=en).

Wear OS does not support authentication with installed certificates. The app cannot transfer the certificate to the Wear OS app automatically, therefore you are asked to provide a certificate during the Wear OS app onboarding. If a new certificate is required, you have to start the onboarding process again by logging out from the Wear OS app.

---
title: Demande de mise à jour de localisation
id: version-2.0.0-location
original_id: géolocalisation
---

<p class="note warning">
**Ne vous fiez pas à cette fonctionnalité en raison des délais mentionnés ci-dessous.**
</p>

Vous pouvez forcer un appareil à essayer de signaler son emplacement en envoyant une notification spéciale.

```yaml
automation
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "request_location_update"
```

Si l'appareil reçoit la notification, il tentera d'obtenir une mise à jour de l'emplacement dans les 5 secondes et le signalera à Home Assistant. C'est quitte ou double puisque Apple impose un temps maximum pour que l'application fonctionne avec la notification et les mises à jour de localisation prennent parfois plus de temps que d'habitude en raison de facteurs tels que l'attente de l'acquisition GPS.
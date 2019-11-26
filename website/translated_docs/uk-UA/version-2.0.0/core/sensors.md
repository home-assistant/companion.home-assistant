---
title: Датчики
id: version-2.0.0-sensors
original_id: sensors
---

Along with providing [location services](location.md), the companion app also adds several additional sensors to Home Assistant. **It is important to know that these sensors are only updated when a location is pushed to Home Assistant or the web view is refreshed**. The sensors provided by the companion app are:

| Sensor                       | Атрибути                                  | Опис                                                                                                                                                          |
| ---------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sensor.activity`            | `confidence`, `types`                     | Поточний тип діяльності, обчислений iOS. Необхідно дозволи для руху.                                                                                          |
| `sensor.average_active_pace` | None                                      | Усереднений темп, обчислений iOS з даних крокоміра. Одиниці виміру: метри в секунду, м/с                                                                      |
| `sensor.battery_level`       | `Battery State`                           | Поточний рівень заряду акумулятора пристрою. Поточний стан батареї доступний з атрибута `Battery State` цього датчика.                                        |
| `sensor.battery_state`       | `Battery Level`                           | Поточний стан заряджання (або `Charging`, `Not Charging` або `Full`) пристрою. Поточний рівень заряду акумулятора доступний з атрибуту `Level` цього датчика. |
| `sensor.bssid`               | None                                      | MAC-адреса точки бездротового доступу, до якої підключено ваш телефон. Якщо вимкнено Wi-Fi, цей датчик повідомить `Not Connected`.                            |
| `sensor.connection_type`     | `Стільникові технології`                  | Поточне з'єднання даних використовується телефоном.                                                                                                           |
| `sensor.distance`            | None                                      | Орієнтовна відстань пройдена користувачем з півночі за місцевим часом. Одиниці виміру: метри, м                                                               |
| `sensor.floors_ascended`     | None                                      | Орієнтовна кількість поверхів вгору під час ходи з півночі за місцевим часом.                                                                                 |
| `sensor.floors_descended`    | None                                      | Орієнтовна кількість поверхів вниз під час ходи. Від                                                                                                          |
| `sensor.geocoded_location`   | [Дивись нижче](#geocoded-location-sensor) | Прорахована адреса на основі даних GPS.                                                                                                                       |
| `sensor.last_update_trigger` | None                                      | Причина останнього оновлення даних про місцезнаходження та датчиків від пристрою до Home Assistant                                                            |
| `sensor.sim_1`               | [Дивись нижче](#cellular-provider-sensor) | Ім'я оператора стільникового зв'язку.                                                                                                                         |
| `sensor.sim_2`               | [Дивись нижче](#cellular-provider-sensor) | Ім'я оператора стільникового зв'язку.                                                                                                                         |
| `sensor.ssid`                | None                                      | Читаєме людиною ім'я мережі Wi-Fi, до якого в даний момент підключено пристрій. Якщо вимкнено Wi-Fi, цей датчик повідомить `Not Connected`.                   |
| `sensor.steps`               | None                                      | Кількість кроків, зроблених користувачем.                                                                                                                     |

Такі атрибути, як `Cellular Technology`, можна отримати за допомогою шаблону, як:

    {{ states.sensor.connection_type.attributes['Cellular Technology'] }}
    

## Датчик активності

`sensor.activity` надає поточну рухову активність, обчислену iOS, а також впевненість у обчисленнях. Діяльність, відома iOS і надана `sensor.activity`, це:

* `Стаціонарні`
* `Walking`
* `Running`
* `Automotive`
* `Cycling`

If iOS is unable to calculate an activity from motion data, `Unknown` will be given.

It is possible for multiple activities to be returned, such as `Cycling` and `Stationary` (if you are cycling but at a stop light), the state of the sensor is simply the first of these return by iOS (not necessarily the most likely). A complete list of calculated activities is given by the `types` attribute. See [this post](https://nshipster.com/cmmotionactivity/#traveling-without-moving) by [@Mattt](https://twitter.com/mattt) over at [nshipster](https://nshipster.com/) for a description of how different scenarios yield multiple activities.

The `confidence` attribute corresponds how accurate iOS believes the report of the current activity is. Possible values are:

* `Low`
* `Medium`
* `High`

## Battery Sensors

The Battery State sensor (`sensor.battery_state`) provides information on the current status of the devices battery. The three possible values are `Charging`, `Not Charging`, or `Full` when the device is 100% charged.

The Battery Level sensor (`sensor.battery_level`) reports the current battery level of the device from 0-100%. The charge level is reflected in the sensor icon.

## Connection Type Sensor

The following connection types are known by the companion app:

* `Wi-Fi`
* `Cellular`
* `No Connection`

A more specific description of the data connection can be found in the `Cellular Technology` attribute of the sensor (which only appears when on cellular). Possible values for this attribute are:

* `4G`
* `3G`
* `2G`
* `Cellular`
* `No Connection`

If the connection type is not recognized, either `Unknown` or `Unknown Technology` will be returned.

## Last Update Trigger Sensor

This sensor displays exactly what caused the last update of location and sensor data from the device to Home Assistant.

| State                       | Опис                                                                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manual                      | A manual update is triggered when the user pulls to refresh.                                                                                                |
| Initial                     | Sensors are updated upon initial app launch.                                                                                                                |
| Significant Location Update | Triggers when there has been a significant change in the device’s location, such as 500 meters or more. See [location](location.md) for additional details. |
| Geographic Region Entered   | Triggered when entering any user-specified Home Assistant [zone](https://www.home-assistant.io/components/zone/) (also known as geofencing).                |
| Geographic Region Exited    | Triggered when exiting any user-specified Home Assistant [zone](https://www.home-assistant.io/components/zone/) (also known as geofencing).                 |
| Push Notification           | [Requesting location updates](notifications/location.md) via push notification.                                                                             |
| Background Fetch            | When the app refreshes sensor information in the background.                                                                                                |
| iBeacon Region Entered      | Triggered when an iBeacon is seen that corresponds to a known zone.                                                                                         |

## Geocoded Location Sensor

Датчик місцезнаходження [geocoded](https://.wikipedia.org/wiki/Geocoding) надає зручний для користувача опис поточних координат користувачів, які часто містять назву місця, його адресу та іншої відповідної інформації. Цей датчик повідомляє багато докладно атрибутів, які дозволяють створювати корисні [template sensors](https://www.home-assistant.io/components/template/).

Геокодування обробляється безпосередньо iOS [MapKit](https://developer.apple.com/documentation/mapkit) та [Core Location](https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names) севісом.

| Атрибути                | Опис                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `Місцерозташування`     | Координати широти та довготи позначки місця.                         |
| `Ім’я`                  | Назва позначки місця.                                                |
| `Країна`                | Назва країни, пов’язаної з позначкою місця.                          |
| `ISOCountryCode`        | Скорочена назва країни.                                              |
| `TimeZone`              | Часовий пояс, пов'язаний з позначкою місця.                          |
| `AdministrativeArea`    | Держава або провінція, пов'язані з позначкою місця.                  |
| `SubAdministrativeArea` | Додаткова інформація про адміністративну область для позначки місця. |
| `PostalCode`            | Поштовий код, пов'язаний із позначкою місця.                         |
| `Locality`              | Місто, пов’язане з позначкою місця.                                  |
| `SubLocality`           | Додаткова інформація на рівні міста для позначки місця.              |
| `Thoroughfare`          | Адреса вулиці, пов’язана з позначкою місця.                          |
| `SubThoroughfare`       | Додаткова інформація на рівні вулиці для позначки місця.             |
| `AreasOfInterest`       | Релевантні області інтересів, пов'язані з позначкою місця.           |
| `Ocean`                 | Назва океану, пов'язаного з позначкою місця.                         |
| `InlandWater`           | Назва внутрішнього водного об'єкта, пов'язаного з позначкою місця.   |

## Pedometer Sensors

Датчики крокоміра забезпечують дані підрахунку кроків від вбудованого в процесор пристрою руху. Вони підтримують щоденну активність ходи і обнуляються опівночі. Ці датчики вимагають включення дозволів на рух.

| Sensor                       | Опис                                                     |
| ---------------------------- | -------------------------------------------------------- |
| `sensor.steps`               | Кількість кроків, зроблених користувачем.                |
| `sensor.distance`            | Орієнтовна відстань (в метрах), що проходить користувач. |
| `sensor.average_active_pace` | Середній темп користувача, виміряний в секундах на метр. |
| `sensor.floors_ascended`     | Орієнтовна кількість поверхів вгору ходою.               |
| `sensor.floors_descended`    | Орієнтовна кількість поверхів вниз під час ходи.         |

## Cellular Provider Sensor

Датчик стільникового зв'язку відображає інформацію про постачальника послуг стільникового зв'язку користувача, наприклад, його унікальний ідентифікатор і чи дозволяє він здійснювати VoIP дзвінки у своїй мережі. `sensor.sim_1` відповідає встановленій фізичній SIM-карті, а `sensor.sim_2` відповідає eSIM (це відображається лише у випадку, якщо eSIM увімкнено).

| Атрибути                   | Опис                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `Carrier Name`             | Ім'я провайдера домашньої стільникової мережі користувача.                                      |
| `Current Radio Technology` |                                                                                                 |
| `ISO Country Code`         | Код країни ISO для оператора стільникового зв'язку користувача.                                 |
| `Mobile Country Code`      | Код країни мобільного зв'язку (MCC) для постачальника послуг стільникового зв'язку користувача. |
| `Mobile Network Code`      | The mobile network code for the user’s cellular service provider.                               |
| `Carrier ID`               |                                                                                                 |
| `Allows VoIP`              | Indicates if the carrier allows making VoIP calls on its network.                               |
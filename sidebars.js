/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: {
    'Getting Started': [
      'getting_started/getting-started',
      'getting_started/migration'],
    'Core Features': [
      'core/core',
      'core/actions',
      'core/android-flavors',
      'core/location',
      'core/sensors'],
    'Notifications': [
      'notifications/notifications-basic',
      'notifications/notification-sounds',
      'notifications/notification-details',
      {
        'type':'category',
        'label':'Attachments',
        'items': [
          'notifications/notification-attachments',
          'notifications/dynamic-content'
        ]
      },
      'notifications/actionable-notifications',
      'notifications/location-notification',
      'notifications/critical-notifications'],
    'Integrations': [
      'integrations/integrations',
      'integrations/android-widgets',
      'integrations/app-events',
      'integrations/haptics',
      'integrations/sharing',
      'integrations/siri-shortcuts',
      'integrations/theming',
      'integrations/universal-links',
      'integrations/url-handler',
      'integrations/x-callback-url'],
    'Apple Watch': [
      'apple-watch/apple-watch',
      'apple-watch/watch-actions',
      'apple-watch/complications'
      ],
    'Troubleshooting': [
        'troubleshooting/faqs',
        'troubleshooting/errors',
        'troubleshooting/networking',
        'troubleshooting/resetting',
        'troubleshooting/troubleshooting-integrations',
        'troubleshooting/more-help'
        ]
  },
};

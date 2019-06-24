/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
// const users = [
//   {
//     caption: 'User1',
//     // You will need to prepend the image path with your baseUrl
//     // if it is not '/', like: '/test-site/img/image.jpg'.
//     image: '/img/undraw_open_source.svg',
//     infoLink: 'https://www.facebook.com',
//     pinned: true,
//   },
// ];

const siteConfig = {
  title: 'Home Assistant Companion Docs', // Title for your website.
  tagline: 'Everything you need to know to use Home Assistant Companion',
  editUrl: 'https://github.com/home-assistant/companion.home-assistant/edit/master/docs/',
  url: 'https://companion.home-assistant.io', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'companion.home-assistant',
  organizationName: 'home-assistant',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'getting_started/index', label: 'Getting Started'},
    {doc: 'core/index', label: 'Core Features'},
    {doc: 'notifications/basic', label: 'Notifications'},
    {doc: 'integrations/index', label: 'Integrations'},
    {doc: 'troubleshooting/setup', label: 'Troubleshooting'}
  ],

  // If you have users set above, you add it here:
  // users,

  /* path to images for header/footer */
  headerIcon: 'img/logo-white.svg',
  footerIcon: 'img/logo-white.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#03A9F4',
    secondaryColor: '#4FC3F7',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Home Assistant`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  // scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/default-social.png',
  twitterImage: 'img/default-social.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  docsUrl: '',
  gaTrackingId: 'UA-57927901-7',
  scrollToTop: true,
  translationRecruitingLink: 'https://crwd.in/home-assistant-companion-docs',
  twitter: true,
  twitterUsername: 'home_assistant',
  docsSideNavCollapsible: false,
  algolia: {
    apiKey: '07eb926ba58945e17a895f6ca531e3c2',
    indexName: 'companion-home-assistant',
    algoliaOptions: {} // Optional, if provided by Algolia
  }
};

module.exports = siteConfig;

module.exports = {
  title: 'Home Assistant Companion Docs',
  tagline: 'Everything you need to know to use Home Assistant Companion',
  url: 'https://companion.home-assistant.io',
  baseUrl: '/',
  favicon: 'img/brand/favicon.png',
  organizationName: 'home-assistant', // Usually your GitHub org/user name.
  projectName: 'companion.home-assistant', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Companion Apps',
      logo: {
        alt: 'Home Assistant',
        src: 'img/brand/logo.svg',
        srcDark: 'img/brand/logo.svg',
      },
      items: [
        { to: '/docs/getting_started', label: 'Docs', position: 'left' },
        { to: '/download', label: 'Download', position: 'left' },
        { to: '/docs/gallery/android', label: 'Gallery', position: 'left' },
        { to: '/docs/troubleshooting/more-help', label: 'Support', position: 'left' },
        {
          href: 'https://www.github.com/home-assistant/iOS',
          label: 'GitHub (iOS)',
          position: 'right',
        },
        {
          href: 'https://www.github.com/home-assistant/android',
          label: 'GitHub (Android)',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        alt: "Home Assistant",
        src: "img/brand/logo-white.svg",
        height: "30px",
        href: "https://www.home-assistant.io",
      },
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://community.home-assistant.io/c/mobile-apps/40'
            },
            {
              label: 'Discord',
              href: 'https://discord.com/channels/330944238910963714/1284965926336335993',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/home-assistant',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/home_assistant',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/homeassistantio/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Home Assistant. Built with Docusaurus.`,
    },
    image: 'img/default-social.png'
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/home-assistant/companion.home-assistant/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-57927901-7'
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],
};

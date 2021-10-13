import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const features = [
  {
    title: <>Document Structure</>,
    description: (
      <>
        <p>
          <b><a href='/docs/getting_started/getting-started'>Getting Started</a></b> Getting to know your new best friend.
          <br />
          <b><a href='/docs/core/core'>Core Features</a></b> The best bits of the Companion App.
          <br />
          <b><a href='/docs/notifications/notifications-basic'>Notifications</a></b>
          {' '}Remain constantly informed, even when away from home.
          <br />
          <b><a href='docs/integrations/integrations'>Integrations</a></b>
          {' '}All the ways you can integrate Home Assistant into Android and iOS.
          <br />
          <b><a href='/docs/apple-watch/apple-watch'>Apple Watch</a></b>
          {' '}Actions and complications all from your Watch app.
          <br />
          <b><a href='/docs/wear-os/wear-os'>Wear OS</a></b>
          {' '}Control your home from your Wear OS device <span class="beta">BETA</span>
          <br />
          <b><a href='/docs/troubleshooting/faqs'>Troubleshooting</a></b>
          {' '}If you need some help, this is a great place to start.
        </p>
      </>
    ),
  },
  {
    title: <>Get The Apps</>,
    description: (
      <>
        <a href='https://play.google.com/store/apps/details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' style={{ display: 'inline-block' }}>
          <img width="200" class="download-badge" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
        </a>
        <br />
        <a href="https://apps.apple.com/us/app/home-assistant/id1099568401?itsct=apps_box_badge&amp;itscg=30200" style={{ display: 'inline-block', width: '200px' }}>
          <img class="download-badge" width="175" src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1492214400&h=3ef4307fa479838e52fe9bd8bd17913b" alt="Download on the App Store" />
        </a>

        <h2>Source Code</h2>
        <ul>
          <li><a href="https://github.com/home-assistant/iOS">
            Home Assistant for iOS
          </a>
          </li>
          <li><a href="https://github.com/home-assistant/android">
            Home Assistant  for Android
          </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: <>Popular Sections</>,
    description: (
      <>
        <ul style={{ flex: "1" }}>
          <li><a href='/docs/getting_started/getting-started'>
            Getting Started
          </a></li>
          <li><a href='/docs/notifications/actionable-notifications'>
            Actionable notifications
          </a></li>
          <li><a href='/docs/integrations/url-handler'>
            URL Handler
          </a></li>
        </ul>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <h2>{title}</h2>
      {description}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Home Assistant App docs">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={clsx('col col--5')}>
              <img className={styles.heroLogo} alt="Home Assistant Logo" src="/img/logo-white.svg" />
            </div>
            <div className={clsx('col col--5')}>
              <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
              <p className={styles.heroTagline}>{siteConfig.tagline}</p>
              <div className={styles.buttons}>
                <Link
                  className={clsx(
                    'button button--outline button--secondary button--lg',
                    styles.getStarted,
                  )}
                  to={useBaseUrl('docs/getting_started/getting-started')}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

    </Layout>
  );
}

export default Home;

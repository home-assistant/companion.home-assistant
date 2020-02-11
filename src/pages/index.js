import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
            {' '}All the ways you can integrate Home Assistant into iOS, watchOS and other apps.
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
        <a href="https://apps.apple.com/us/app/home-assistant/id1099568401?mt=8" style={{display:'inline-block', overflow: 'hidden', background: 'url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2017-04-15&kind=iossoftware&bubble=apple_music) no-repeat center', width: '155px', height: '40px'}}></a>
        <br />
        <a href='https://play.google.com/store/apps/  details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
        <img alt='Get it on Google Play' width="155" src='https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png'/>
        </a>
        <h2>Source Code</h2>
        <ul>
          <li><a href="https://github.com/home-assistant/home-assistant-iOS">
              Home Assistant for iOS
            </a>
          </li>
            <li><a href="https://github.com/home-assistant/home-assistant-Android">
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
        <li><a href='/docs/getting_started/migration'>
            Migrating to version 2019.1
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

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <h2>{title}</h2>
      {description}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Home Assistant App docs">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting_started/getting-started')}>
              Get Started
            </Link>
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

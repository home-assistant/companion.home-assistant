import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';


function Hello() {
  return (
    <Layout
      title="Download"
      description="Welcome to the Home Assistant App docs">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Download the Home Assistant Apps</h1>
          <p className="hero__subtitle">Get the apps now!</p>
          <div className={clsx(styles.buttons, 'download-badges')} >
            <a href="https://apps.apple.com/us/app/home-assistant/id1099568401?itsct=apps_box_badge&amp;itscg=30200">
              <img width="163" src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1492214400&h=3ef4307fa479838e52fe9bd8bd17913b" alt="Download on the App Store" />
            </a>
            <a href='https://play.google.com/store/apps/details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
              <img width="200" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
            </a>
            <a href="https://sidequestvr.com/app/6427/home-assistant">
              <img width="175" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" alt="Download on SideQuest" />
            </a>
          </div>
        </div>
      </header>


    </Layout>
  );
}
export default Hello;

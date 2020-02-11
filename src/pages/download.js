import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';


function Hello() {
  return (
    <Layout
      title="Download"
      description="Welcome to the Home Assistant App docs">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Download the Home Assistant Apps</h1>
          <p className="hero__subtitle">Get the apps now!</p>
          <div className={styles.buttons}>
          <a href="https://apps.apple.com/us/app/home-assistant/id1099568401?mt=8" style={{display:'inline-block', overflow: 'hidden', background: 'url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2017-04-15&kind=iossoftware&bubble=apple_music) no-repeat center', width: '155px', height: '40px'}}></a>
          <a href='https://play.google.com/store/apps/  details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
            <img alt='Get it on Google Play' width="155" src='https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png'/>
          </a>
          </div>
        </div>
      </header>


    </Layout>
  );
}
export default Hello;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + (siteConfig.docsUrl ? siteConfig.docsUrl + '/' : '' ) + (language ? language + '/' : '') + doc + ".html";
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}


const PopularTopicsSection = ({ language }) => (
  <div className="introSection lightBackground">
    <Container>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 420 }}>
          <h2>Documentation Structure</h2>
          <p>
            <b><a href={docUrl('getting_started/index', language)}>Getting Started</a>.</b>
            {' '}Getting to know your new best friend.
          </p>
          <p>
            <b><a href={docUrl('core/index', language)}>Core Features</a>.</b>
            {' '}The best bits of the Companion App.
          </p>
          <p>
            <b><a href={docUrl('notifications/basic', language)}>Notifications</a>.</b>
            {' '}Remain constantly informed, even when away from home.
          </p>
          <p>
            <b><a href={docUrl('integrations/index', language)}>Integrations</a>.</b>
            {' '}All the ways you can integrate Home Assistant into iOS, watchOS and other apps.
          </p>
          <p>
            <b><a href={docUrl('misc/index', language)}>Miscellaneous</a>.</b>
            {' '}Some of the cool advanced feature of the Companion App.
          </p>
          <p>
            <b><a href={docUrl('troubleshooting/setup', language)}>Troubleshooting</a>.</b>
            {' '}If you need some help, this is a great place to start.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Popular topics</h2>
          <ul style={{ flex: "1" }}>
          <li><a href={docUrl("getting_started/migration", language)}>
              Migrating to version 2019.1
          </a></li>
          <li><a href={docUrl("notifications/actionable", language)}>
              Actionable notifications
            </a></li>
            <li><a href={docUrl("integrations/url-handler", language)}>
              URL Handler
            </a></li>
          </ul>
          <h2>Downloads</h2>
          <a href="https://apps.apple.com/us/app/home-assistant/id1099568401?mt=8" style={{display:'inline-block', overflow: 'hidden', background: 'url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2017-04-15&kind=iossoftware&bubble=apple_music) no-repeat center', width: '160px', height: '40px'}}></a>
          <a href='https://play.google.com/store/apps/details?id=io.homeassistant.companion.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
          <img alt='Get it on Google Play' width="160" src='https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png'/>
          </a>

          <h2>Source Code</h2>
          <ul>
          <li><a href="https://github.com/home-assistant/home-assistant-iOS">
              Home Assistant Companion for iOS
            </a></li>
            <li><a href="https://github.com/home-assistant/home-assistant-Android">
              Home Assistant Companion for Android
            </a></li>
          </ul>

        </div>
      </div>
    </Container>
  </div>
);


class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <div>
    <h2 className="projectTitle">
      Home Assistant Companion
      <small>Documentation</small>
    </h2>
  </div>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('logo-responsive.svg')} />
        <div className="inner">
          <ProjectTitle />
          {/* <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html', language)}>Example Link</Button>
            <Button href={docUrl('doc2.html', language)}>Example Link 2</Button>
          </PromoSection> */}
        </div>
      </SplashContainer>
    );
  }
}


// const IntroSection = ({ language }) => (
//   <div className="videoSection">
//     <Container>
//       <div style={{maxWidth: 600, margin: 'auto'}}>
//         <div className="videoWrapper">
//           <iframe
//             width={560}
//             height={315}
//             src="https://www.youtube.com/embed/Cfasc9EgbMU"
//             frameBorder={0}
//             allowFullScreen
//           />
//         </div>
//       </div>
//     </Container>
//   </div>
// )

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer indexPage">
        <PopularTopicsSection language={language} />
        {/*<IntroSection language={language} />*/}
        </div>
      </div>
    );
  }
}

module.exports = Index;

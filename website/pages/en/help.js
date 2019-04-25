/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const translate = require('../../server/translate.js').translate;

class Help extends React.Component {
  render() {
    const {config: siteConfig} = this.props;
    const supportLinks = [
      {
        title: <translate>Browse the docs</translate>,
        content: `Learn more about Home Assistant Companion using the [official documentation](${
          siteConfig.baseUrl
        }${siteConfig.docsUrl ? `${siteConfig.docsUrl}/` : ''}${
          this.props.language
        }/getting_started).`,
      },
      {
        title: <translate>Discord</translate>,
        content:
          'You can join the conversation on [Discord](https://discord.gg/3YAkN5) on one of our three text channels: `#android` for Android help, `#ios` for iOS help and `#devs_mobile` for contributing help.',
      },
      {
        title: <translate>Forums</translate>,
        content:
          'Connect with fellow Companion users on our [forums](https://community.home-assistant.io/c/mobile-apps).',
      },
      {
        title: <translate>GitHub</translate>,
        content:
          'At our [GitHub repo](https://github.com/home-assistant/home-assistant-iOS) Browse and submit [issues](https://github.com/home-assistant/home-assistant-iOS/issues) or [pull requests](https://github.com/home-assistant/home-assistant-iOS/pulls) for bugs you find or any new features you may want implemented. Be sure to also check out our [contributing information](https://github.com/home-assistant/home-assistant-iOS/blob/master/CONTRIBUTING.md).',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h1>
                <translate>Need help?</translate>
              </h1>
            </header>
            <p>
              <translate desc="statement made to reader">
                If you need help with Home Assistant Companion, you can try one of the
                mechanisms below.
              </translate>
            </p>
            <GridBlock contents={supportLinks} layout="fourColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

Help.title = 'Help';

module.exports = Help;

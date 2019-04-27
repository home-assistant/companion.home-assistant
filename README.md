[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/f1545d94-366e-4ece-a718-0c6f903662ab/deploy-status)](https://app.netlify.com/sites/home-assistant-companion-docs/deploys)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/home-assistant-companion-docs/localized.svg)](https://crowdin.com/project/home-assistant-companion-docs)

# Home Assistant Companion Documentation

This is the source for the [Home Assistant Companion documentation](https://companion.home-assistant.io).

## Updating the docs

Documentation is build using [Docusaurus](https://docusaurus.io/docs/en/doc-markdown.html).

### Preparing environment

Running the documentation locally requires [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) to be installed. Inside a cloned fork of this repository, run:

```bash
$ script/setup
```

This will install [docusaurus](https://www.npmjs.com/package/docusaurus) amongst other things.

### Running docs locally

```bash
$ script/server
```

It will start a server at [localhost:3000](http://localhost:3000). You will need to navigate to the `next` version of the docs to see your changes applied. To do so click on the version number in the header and select `next` -> `Documentation`.

### Adding a page

- Create new page in `docs/`
- Add new doc to `website/sidebars.json`

You will need to restart the server when creating a new file or make changes to `sidebars.json`. If you're updating a document, you will only need to refresh your browser to get the latest changes.

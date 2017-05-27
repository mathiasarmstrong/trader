# Status

[![Circle CI](https://circleci.com/gh/ampush/canis-majoris.svg?style=svg&circle-token=49c694e4c8d47f5bd46d194d1fbe73d5b1292a5c)](https://circleci.com/gh/ampush/canis-majoris)

[Current Coverage](https://2094-52922234-gh.circle-artifacts.com/0/tmp/circle-artifacts.PkrQDIx/test-coverage/index.html)

# Quick Links

[Angular Material Icons Directory](https://design.google.com/icons/)

# Table of Contents

<!-- TOC depthFrom:1 depthTo:4 withLinks:1 updateOnSave:0 orderedList:0 -->

- [Status](#status)
- [Quick Links](#quick-links)
- [Table of Contents](#table-of-contents)
- [Setup Instructions](#setup-instructions)
    - [Special Node Dependencies](#special-node-dependencies)
    - [Adding and Removing Dependencies](#adding-and-removing-dependencies)
    - [NPM Scripts](#npm-scripts)
- [Commit Message Format](#commit-message-format)
- [Appendix](#appendix)
    - [Tern-JS](#tern-js)
    - [Optional bash functions](#optional-bash-functions)
    - [Defining Routes `something.route.js`](#defining-routes-somethingroutejs)
        - [data.sidebar.ampLevels](#datasidebaramplevels)
        - [breadcrumb](#breadcrumb)
        - [Example](#example)
    - [File/Folder Structure and Naming](#filefolder-structure-and-naming)
        - [FOLDERS](#folders)
        - [FILES](#files)
        - [function/constructor/variable/constant names:](#functionconstructorvariableconstant-names)
    - [Design Documents](#design-documents)

<!-- /TOC -->

# Setup Instructions

[More information](https://github.com/thewoolleyman/npm-shrinkwrap-helper)

## Cloning the Repo and setting remotes

```bash
git clone git@github.com:ampush/canis-majoris.git
git remote rename origin upstream
# Don't add your own
git remote add brien git@github.com:brien-givens/canis-majoris.git
git remote add jered git@github.com:mathiasarmstrong/canis-majoris.git
git remote add pablo git@github.com:polpenaloza/canis-majoris.git
git remote add dj git@github.com:djdaniels90/canis-majoris.git
# For the one you own
git remote add origin <git-repo-url>
```

## Setting up git hooks

```bash
chmod -R +x scripts/
npm install
npm run deploy-hooks
```

## Special Node Dependencies

**If you are using Sublime Text and Sublimelinter**

-   `npm install -g eslint eslint-config-angular eslint-plugin-angular`
-   Must be installed globally for sublime linter

## Adding and Removing Dependencies

1.  Ensure you have no pending changes to commit or push
2.  `rm -rf node_modules`
3.  `npm install` (this will install using the current shrinkwrap)
4.  `rm npm-shrinkwrap.js`
5.  add or remove new dependencies in package.json
6.  `npm prune` (if any removals)
7.  `npm install` (if any additions)
8.  `npm shrinkwrap --dev`

## NPM Scripts

**_npm run serve_**

-   compile the app with development config
-   start the server
-   open a new window

**_npm run serve:mock_**

-   compile the app with development config
-   start the server
-   open a new window and mock the API calls

**_npm run serve:prod_**

-   compile the app with production config
-   start the server
-   open a new window
-   mock the API calls

**_npm run start_**

-   compile the app with development config,
-   start the server

**_npm run start:mock_**

-   compile the app with development config,
-   start the server
-   mock the API calls

**_npm run start:prod_**

-   compile the app with production config
-   start the server

**_npm run build_**

-   compile the app into /.tmp with development config

**_npm run build:prod_**

-   compile the app into /dist with production config

**_npm run spec_**

-   compile the app with test config
-   run a single test

**_npm run spec:auto_**

-   compile the app with test config
-   run a test
-   rerun tests on changes to the app

# Commit Message Format

`[feature|fix]`(`[application area]`): `[short message]` `[ticket number]`

-   a short message in sentence case
-   ticket number from Jira

    > ex: _fix(omni-search): Add scrolling to omnisearch AE-928_

**Tag your commit with one of the following:**

1.  Fix - for a bug fix.
2.  New - implemented a new feature.
3.  Update - for a backwards-compatible enhancement.
4.  Breaking - for a backwards-incompatible enhancement or feature.
5.  Docs - changes to documentation only.
6.  Build - changes to build process only.
7.  Upgrade - for a dependency upgrade.

# Appendix

## Tern-JS

The project also incorporates a tailored **tern-project configuration**. This adds smart autocompletion based on our own inline documentation and AST. ./jasmine.js and ./jasminematchers.js are the type definitions for the matcher and jasmine libraries we use.

## Optional bash functions

_Suggestion: add to .zshrc or .bashrc file and look at [bash best practices](https://github.com/progrium/bashstyle) if you want to add more_

    serve(){
      npm run serve "$@"
    }

    serve:mock(){
      npm run serve:mock "$@"
    }

    serve:prod(){
      npm run serve:prod "$@"
    }

    build(){
      npm run build "$@"
    }

    clean(){
      npm run clean "$@"
    }

    build:prod(){
      npm run build:prod "$@"
    }

    start(){
      npm run start "$@"
    }

    start:mock(){
      npm run start:mock "$@"
    }

    start:prod(){
      npm run start:prod "$@"
    }

    spec:auto(){
      npm run spec:auto "$@"
    }

    spec(){
      npm run spec "$@"
    }

    lint(){
      npm run lint "$@"
    }

    lint:js(){
      npm run lint:js "$@"
    }

    lint:sass(){
      npm run lint:sass "$@"
    }

    lint:pug(){
      npm run lint:pug "$@"
    }

## Defining Routes `something.route.js`

Multiple properties on the route definition that are important to certain aspects of our FE application.
1. sidebar.ampLevels; and,
2. breadcrumb

### data.sidebar.ampLevels

Is an array of strings that denote what amp 'layer' the page is associated with.  This is relevant for the display of links in the sidebar.
Amp Levels can be defined on the fly; however, currently, we have three: 'ampush', 'initiative', 'partner'. Amp Levels are defined in the route as well as the sidebar btn config objects.

### breadcrumb

TODO: Needs explanation (Jered?)

### Example

```javascript
$stateProvider
  .state('ampushInitiative.ruleCreate', {
    data: {
      sidebar: {
        ampLevels: ['initiative']
      }
    },
    breadcrumb: 'Create Rule',
    url: '/rule/create',
    resolve: {}, // normal resolve
    params: {}, // normal params
    views: { // normal views
      'context@layout': {
        templateUrl: 'lib/rule/create-edit/rule-create-edit.html',
        controller: 'RuleCreateEditController',
        controllerAs: 'ruleCtrl'
      }
    }
  })
```

## File/Folder Structure and Naming

### FOLDERS

-   some-folder-name/
-   panda/

### FILES

-   some-file.{type}.js
-   some-file.controller.js
-   some-file.controller.spec.js
-   some-mod.module.js

### function/constructor/variable/constant names:

-   If it is a constructor the name should be **CamelCased**.
-   If it's a normal function the name should be **lowerCamelCased**
-   constants should be **CONSTANT_CASED**
-   variables should be **lowerCamelCased**
-   JSON API response/request expectations shall be **snake_case**

```pre
src/
main platform root     ├── lib
sub application root   │   ├── **targeting-elements**
sub application state  │   │   └── **targeting.route.js**
                       │   ├── **common** (common components not bowerized)
common service         │   │   ├── **auth**
common web-component   │   │   ├── **header**
                       │   │   │   └── header.pug
raw angular services   │   │   └── **ng-services**
.                      │   ├── **login**
.                      │   ├── **on-boarding**
.                      │   ├── **reporting**
.                      │   ├── index.pug
.                      │   ├── main.config.js
.                      │   ├── main.module.js
.                      │   ├── main.route.js
.                      │   ├── main.run.js
.                      │   └── main.scss
application config**   ├── app.config.js
application const*     ├── app.constants.js
.                      ├── favicon.ico
.                      └── tests.js
```

> (\*) Application configuration constants. Should not be changed arbitrarily. Certain rules in app.config are derived from app.constants.  The decorator compatible config is also stored here.
> (\*\*) Application configuration, can be altered and might be altered by webpack tasks for release/deploy/builds

## Design Documents

-   [Ampush Platform](<./design-docs/Ampush Platform.md>)
-   [Onboard](./design-docs/Onboard.md)
-   [Notifications](./design-docs/Notifications.md)

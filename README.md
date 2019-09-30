# Yolog JSON Plugin

[![npm (scoped)](https://img.shields.io/npm/v/@jitesoft/yolog-json-plugin)](https://www.npmjs.com/package/@jitesoft/yolog-json-plugin)
[![Known Vulnerabilities](https://dev.snyk.io/test/npm/@jitesoft/yolog-json-plugin/badge.svg)](https://dev.snyk.io/test/npm/@jitesoft/yolog-json-plugin)
[![pipeline status](https://gitlab.com/jitesoft/open-source/javascript/yolog-plugins/json/badges/master/pipeline.svg)](https://gitlab.com/jitesoft/open-source/javascript/yolog-plugins/json/commits/master)
[![coverage report](https://gitlab.com/jitesoft/open-source/javascript/yolog-plugins/json/badges/master/coverage.svg)](https://gitlab.com/jitesoft/open-source/javascript/yolog-plugins/json/commits/master)
[![npm](https://img.shields.io/npm/dt/@jitesoft/yolog-json-plugin)](https://www.npmjs.com/package/@jitesoft/yolog-json-plugin)
[![Back project](https://img.shields.io/badge/Open%20Collective-Tip%20the%20devs!-blue.svg)](https://opencollective.com/jitesoft-open-source)

Plugin for the [`@jitesoft/yolog`](https://www.npmjs.com/package/@jitesoft/yolog) logger create logs in json format.  
When running in the browser, all the data will be printed to the console, while, when using the nodejs version
the data can either be pushed to a file or to the stdout/stderr of the application.

## Usage:

Install with your favorite package manager!

```bash
npm i @jitesoft/yolog-json-plugin --save
yarn add @jitesoft/yolog-json-plugin
```

Import and use just as with any other yolog plugin!

```js
import logger from '@jitesoft/yolog';
import JSONPlugin from '@jitesoft/yolog-json-plugin';
logger.addPlugin(new JSONPlugin('https://webhook/uri'));
```

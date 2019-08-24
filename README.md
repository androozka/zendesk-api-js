# @androozka/zendesk-api-js

![travis_ci](https://travis-ci.org/androozka/zendesk-api-js.svg?branch=master)
[![codecov](https://codecov.io/gh/androozka/zendesk-api-js/branch/master/graph/badge.svg)](https://codecov.io/gh/androozka/zendesk-api-js)
![david_dm](http://david-dm.org/androozka/zendesk-api.js/status.svg)
[![install size](https://packagephobia.now.sh/badge?p=@androozka/zendesk-api-js)](https://packagephobia.now.sh/result?p=@androozka/zendesk-api-js)
[![npm downloads](https://img.shields.io/npm/dt/@androozka/zendesk-api-js)](http://npm-stat.com/charts.html?package=@androozka/zendesk-api-js)
![twitter follow](https://img.shields.io/twitter/follow/androozka?label=Follow&style=social)

A JS library for interacting with the Zendesk API.

## Features

- Generates objects for Zendesk API requests
- Send as parameter to axios

## Installing

### Using npm

```bash
$ npm install @androozka/zendesk-api-js
```

### Using yarn

```bash
$ yarn add @androozka/zendesk-api-js
```

## Usage

### Suggested libraries

```javascript
const base64 = require('js-base64').Base64;
const axios = require('axios');
```

### Zendesk account information

```javascript
const instance = ''; // Name of Zendesk instance
const email = ''; // Email address of Zendesk user
const token = ''; // Generated Zendesk token

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${base64.encode(`${email}/token:${token}`)}`
};
```

### Choose framework version

```javascript
const zaf_v2 = zdApi.v2(instance, headers);
```

### Selecting API endpoints

```javascript
const { support, sunshine } = zaf_v2;
```

## Examples

### Add tags to a ticket

```javascript
const list = { tags: ['tag_1', 'tag_2', ... ] }
const { data } = await axios(support.tags.add('tickets', 123, list));
```

# @androozka/zendesk-api-js

A JS library for interacting with the Zendesk API.

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

### Setting up

#### Additional Dependencies

```javascript
const base64 = require('js-base64').Base64;
const axios = require('axios');
```

#### Required information

```javascript
const instance = ''; // Name of Zendesk instance
const email = ''; // Email address of Zendesk user
const token = ''; // Generated Zendesk token

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${base64.encode(`${email}/token:${token}`)}`
};
```

#### Choosing Framework version

```javascript
const zaf_v2 = zdApi.v2(instance, headers);
```

#### Selecting API endpoints

```javascript
const { support, sunshine } = zaf_v2;
```

### Examples

#### Add 2 tags to a ticket

```javascript
const list = { tags: ['tag_1', 'tag_2', ... ]}
const ({ data } = await axios(support.tags.add('tickets', 123, list)));
```

# @androozka/zendesk-api-js

![npm](https://img.shields.io/npm/v/@androozka/zendesk-api-js)
[![Build Status](https://travis-ci.com/androozka/zendesk-api-js.svg?branch=master)](https://travis-ci.com/androozka/zendesk-api-js)
[![codecov](https://codecov.io/gh/androozka/zendesk-api-js/branch/master/graph/badge.svg)](https://codecov.io/gh/androozka/zendesk-api-js)
[![David](https://img.shields.io/david/androozka/zendesk-api-js)](https://david-dm.org/androozka/zendesk-api-js)
[![install size](https://packagephobia.now.sh/badge?p=@androozka/zendesk-api-js)](https://packagephobia.now.sh/result?p=@androozka/zendesk-api-js)
[![npm downloads](https://img.shields.io/npm/dt/@androozka/zendesk-api-js)](http://npm-stat.com/charts.html?package=@androozka/zendesk-api-js)
![Twitter Follow](https://img.shields.io/twitter/follow/androozka?label=Follow&style=social)

A JS library for interacting with the Zendesk API.

## Features

- Generates Zendesk API request objects 😎
- Send prepared object directly to axios 🤯
- Mirrors [Zendesk's API documentation](https://developer.zendesk.com/rest_api/docs/zendesk-apis/resources) 👀

## Installing

### Using npm

```bash
npm install @androozka/zendesk-api-js
```

### Using yarn

```bash
yarn add @androozka/zendesk-api-js
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
const zaf_v2 = zdApi.v2({ instance, headers });
```

### Selecting API endpoints

```javascript
const { support, sunshine } = zaf_v2;
```

## Examples

### Add tags to a ticket

```javascript
const data = { tags: ['tag_1', 'tag_2', ... ] }
const req = support.tags.add({ type: 'tickets', id: 123, data });
const res = await axios(req);
```

## API Coverage Status

### Support API

- [x] **Search**
- [x] **Users**
- [x] **Tickets**
- [x] **Ticket Metrics**
- [x] **Tags**

#### Under Construction

- [ ] Views
- [ ] Organizations
- [ ] Groups
- [ ] Ticket Forms
- [ ] Ticket Fields
- [ ] User Fields
- [ ] Organization Fields
- [ ] Brands
- [ ] User Identities
- [ ] User Passwords
- [ ] End Users
- [ ] Group Memberships
- [ ] Custom Agent Roles
- [ ] Organization Subscriptions
- [ ] Organization Memberships
- [ ] Requests
- [ ] Ticket Audits
- [ ] Ticket Comments
- [ ] Ticket Skips
- [ ] Ticket Metric Events
- [ ] Ticket Activities
- [ ] Ticket Import
- [ ] Attachments
- [ ] Satisfaction Ratings
- [ ] Satisfaction Reasons
- [ ] Suspended Tickets
- [ ] Sessions
- [ ] Triggers
- [ ] Automations
- [ ] SLA Policies
- [ ] Targets
- [ ] Target Failures
- [ ] Macros
- [ ] Dynamic Content
- [ ] Locales
- [ ] Schedules
- [ ] Sharing Agreements
- [ ] Support Addresses
- [ ] Job Statuses
- [ ] Skill-based Routing
- [ ] Incremental Skill-based Routing
- [ ] Workspaces
- [ ] Apps
- [ ] App Installation Locations
- [ ] App Locations
- [ ] OAuth Clients
- [ ] OAuth Tokens
- [ ] OAuth Tokens for Grant Types
- [ ] Authorized Global Clients
- [ ] Account Settings
- [ ] Audit Logs
- [ ] Bookmarks
- [ ] Push Notification Devices
- [ ] Resource Collections
- [ ] Channel Framework
- [ ] Twitter Channel

### APIs Up Next

- Sunshine API
- Help Center API
- Chat API
- Talk API
- Sell API
- Answer Bot API
- Status API
- Reseller API
- NPS API

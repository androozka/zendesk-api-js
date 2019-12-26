# @androozka/zendesk-api-js

![npm](https://img.shields.io/npm/v/@androozka/zendesk-api-js?logo=npm)
[![Travis (.com)](https://img.shields.io/travis/com/androozka/zendesk-api-js?logo=travis)](https://travis-ci.com/androozka/zendesk-api-js)
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

_**Note**: Only v2 framework, [v1 deprecated](https://support.zendesk.com/hc/en-us/articles/360002106888-Removal-of-Zendesk-Apps-framework-v1)_

## Installing

```bash
# using npm
npm install @androozka/zendesk-api-js

# using yarn
yarn add @androozka/zendesk-api-js
```

## Usage

### Getting Started

```javascript
const axios = require('axios'); // Suggested library
const zdApi = require('@androozka/zendesk-api-js');
```

### Zendesk Info

```javascript
const options = {
  instance: '', // Zendesk subdomain
  email: '', // User account to perform requests
  password: '', // Password for user account
  token: '' // Generated Zendesk token
};
/* Note: Either "password" or "token" is required */
```

### Initalize

```javascript
// Load entire library
const { support, sunshine } = zdApi.init(options);

// Load entire API
const { tickets, groups } = zdApi.support.init(options);

// Load specific endpoint
const { list, create } = zdApi.support.tickets.init(options);
```

## Examples

### Add tags to a ticket

```javascript
try {
  const { tags } = zdApi.support.init(options);
  const data = { tags: ['tag_1', 'tag_2', ... ] }

  const req = tags.add({ type: 'tickets', id: 123, data });

  const res = await axios(req);
} catch (error) {
  // ...
}
```

## API Coverage Status

### Support API

Search, Users, End Users, Groups, Group Memberships, Custom Agent Roles, Organizations, Organization Subscriptions, Organization Memberships, Tickets, Ticket Import, Suspended Tickets, Ticket Comments, Ticket Metrics, Ticket Activities, Tags, Views, Ticket Forms, Ticket Fields, User Fields, Organization Fields

### Sunshine API

Custom Object Types, Custom Object Records

### Under Construction

#### Support

- [ ] Brands
- [ ] User Identities
- [ ] User Passwords
- [ ] Requests
- [ ] Ticket Audits
- [ ] Ticket Skips
- [ ] Ticket Metric Events
- [ ] Attachments
- [ ] Satisfaction Ratings
- [ ] Satisfaction Reasons
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

const endpoint = require('../../../src/v2/support');

const instance = 'instance';
const headers = {};

const check = (type, compare = 'object') => expect(typeof type).toBe(compare);

describe('support api', () => {
  let support;

  beforeEach(() => (support = endpoint({ instance, headers })));
  afterEach(() => (support = null));

  test('end_users', () => check(support.end_users));
  test('groups', () => check(support.groups));
  test('organizations', () => check(support.organizations));
  test('organization_fields', () => check(support.organization_fields));
  test('search', () => check(support.search, 'function'));
  test('tags', () => check(support.tags));
  test('ticket_comments', () => check(support.ticket_comments));
  test('ticket_fields', () => check(support.ticket_fields));
  test('ticket_forms', () => check(support.ticket_forms));
  test('ticket_metrics', () => check(support.ticket_metrics));
  test('tickets', () => check(support.tickets));
  test('users', () => check(support.users));
});

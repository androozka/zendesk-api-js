const endpoint = require('../../../../../src/v2/api/support/routes/ticketMetrics');

describe('Ticket Metrics', () => {
  const instance = 'instance';
  const headers = {};
  let ticketMetrics;

  beforeAll(() => (ticketMetrics = endpoint(instance, headers)));
  afterAll(() => (ticketMetrics = null));

  test('List Ticket Metrics', () => {
    expect(ticketMetrics.list()).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/ticket_metrics.json`,
      headers
    });
  });

  test('Show Ticket Metrics', () => {
    expect(ticketMetrics.show('tickets', 123)).toEqual({
      method: 'GET',
      url: `https://instance.zendesk.com/api/v2/tickets/123/metrics.json`,
      headers
    });

    expect(ticketMetrics.show('ticket_metrics', 123)).toEqual({
      method: 'GET',
      url: `https://instance.zendesk.com/api/v2/ticket_metrics/123.json`,
      headers
    });
  });
});

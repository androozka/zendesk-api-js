const endpoint = require('../../../../../../src/api/v2/routes/support/ticketMetrics');

const instance = 'instance';
const headers = {};

describe('ticket metrics', () => {
  let ticketMetrics, ticket_metric_id, ticket_id;

  beforeAll(() => {
    ticketMetrics = endpoint({ instance, headers });
    ticket_metric_id = 123;
    ticket_id = 123;
  });

  afterAll(() => {
    ticketMetrics = null;
    ticket_metric_id = 0;
    ticket_id = 0;
  });

  test('list ticket metrics', () => {
    expect(ticketMetrics.list()).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/ticket_metrics.json`,
      headers
    });
  });

  test('show ticket metrics', () => {
    expect(ticketMetrics.show({ ticket_metric_id })).toEqual({
      method: 'GET',
      url: `https://instance.zendesk.com/api/v2/ticket_metrics/${ticket_metric_id}.json`,
      headers
    });

    expect(ticketMetrics.show({ type: 'tickets', ticket_id })).toEqual({
      method: 'GET',
      url: `https://instance.zendesk.com/api/v2/tickets/${ticket_id}/metrics.json`,
      headers
    });
  });
});

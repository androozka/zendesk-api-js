const endpoint = require('../../../../src/v2/support/ticket_metrics');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('ticket metrics', () => {
  let ticketMetrics;

  beforeAll(() => (ticketMetrics = endpoint({ instance, headers })));
  afterAll(() => (ticketMetrics = null));

  describe('list ticket metrics', () => {
    it('should process w/ valid input', () => {
      expect(ticketMetrics.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_metrics.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketMetrics.list('invalid')).toThrowError();
    });
  });

  describe('show ticket metrics', () => {
    it('should process w/ valid input', () => {
      expect(ticketMetrics.show({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/metrics.json`,
        headers
      });

      expect(ticketMetrics.show({ ticket_metric_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_metrics/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketMetrics.show()).toThrowError();
      expect(() => ticketMetrics.show({})).toThrowError();
      expect(() => ticketMetrics.show('invalid')).toThrowError();
      expect(() => ticketMetrics.show({ ticket_id: 0 })).toThrowError();
      expect(() => ticketMetrics.show({ ticket_metric_id: 0 })).toThrowError();
      expect(() =>
        ticketMetrics.show({ ticket_id: 0, ticket_metric_id: 0 })
      ).toThrowError();
    });
  });
});

const endpoint = require('../../../src/api/support/ticket_metrics');
const { prepare } = require('../../../src/utils/options');

describe('object types', () => {
  let endPoint, options, url, headers;

  beforeEach(() => {
    options = {
      instance: 'instance',
      email: 'user@email.com',
      token: 'token'
    };
    endPoint = endpoint(options);
    ({ url, headers } = prepare(options));
  });

  afterEach(() => {
    options = null;
    endPoint = null;
    url = null;
    headers = null;
  });

  describe('init', () => {
    it('should setup endpoint object', () => {
      const ep = endpoint(options);
      expect(ep).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('list ticket metrics', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_metrics.json`,
        headers
      });
    });
  });

  describe('show ticket metrics', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/metrics.json`,
        headers
      });

      expect(endPoint.show({ ticket_metric_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_metrics/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({ ticket_id: 0 })).toThrowError();
      expect(() => endPoint.show({ ticket_metric_id: 0 })).toThrowError();
      expect(() =>
        endPoint.show({ ticket_id: 0, ticket_metric_id: 0 })
      ).toThrowError();
    });
  });
});

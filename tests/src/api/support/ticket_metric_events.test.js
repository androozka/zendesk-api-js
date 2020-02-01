const endpoint = require('../../../../src/api/support/ticket_metric_events');
const { prepare } = require('../../../../src/utils/options');

describe('Ticket Metric Events', () => {
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
      expect(endpoint(options)).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('List ticket metric events', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list({ unix_time: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/ticket_metric_events.json?start_time=123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list({})).toThrowError();
      expect(() => endPoint.list({ unix_time: 'invalid' })).toThrowError();
    });
  });
});

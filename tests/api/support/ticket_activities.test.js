const endpoint = require('../../../src/api/support/ticket_activities');
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

  describe('list activities', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/activities.json`,
        headers
      });
    });
  });

  describe('show activity', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ activity_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/activities/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ activity_id: 'invalid' })).toThrowError();
    });
  });
});

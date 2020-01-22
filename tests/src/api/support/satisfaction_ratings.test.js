const endpoint = require('../../../../src/api/support/satisfaction_ratings');
const { prepare } = require('../../../../src/utils/options');

describe('ticket skips', () => {
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

  describe('list satisfaction ratings', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/satisfaction_ratings.json`,
        headers
      });

      expect(endPoint.list({ params: 'score=good' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/satisfaction_ratings.json?score=good`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list({ params: 123 })).toThrowError();
    });
  });

  describe('show satisfaction rating', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/satisfaction_ratings/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create satisfaction rating', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ ticket_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/satisfaction_rating.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create({ ticket_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.create({ ticket_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });
});

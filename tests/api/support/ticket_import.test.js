const endpoint = require('../../../src/api/support/ticket_import');
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

  describe('ticket import (single)', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.single({ data: { ticket: {} } })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/imports/tickets.json`,
        headers,
        data: { ticket: {} }
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.single()).toThrowError();
      expect(() => endPoint.single('invalid')).toThrowError();
      expect(() => endPoint.single({})).toThrowError();
      expect(() => endPoint.single({ ticket: 'invalid' })).toThrowError();
    });
  });

  describe('ticket bulk import', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.bulk({ data: { tickets: [{}, {}] } })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/imports/tickets/create_many.json`,
        headers,
        data: { tickets: [{}, {}] }
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.bulk()).toThrowError();
      expect(() => endPoint.bulk('invalid')).toThrowError();
      expect(() => endPoint.bulk({})).toThrowError();
      expect(() => endPoint.bulk({ tickets: 'invalid' })).toThrowError();
    });
  });
});

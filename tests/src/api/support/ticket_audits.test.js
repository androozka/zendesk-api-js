const endpoint = require('../../../../src/api/support/ticket_audits');
const { prepare } = require('../../../../src/utils/options');

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
      expect(endpoint(options)).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('list all ticket audits', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list_all()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_audits.json`,
        headers
      });

      expect(endPoint.list_all({ params: 'cursor=example' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_audits.json?cursor=example`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list_all('invalid')).toThrowError();
      expect(() => endPoint.list_all({ params: 0 })).toThrowError();
    });
  });

  describe('list audits for a ticket', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/audits.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list({})).toThrowError();
      expect(() => endPoint.list({ ticket_id: 'invalid' })).toThrowError();
    });
  });

  describe('show audit', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ ticket_id: 123, id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/audits/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ ticket_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.show({ ticket_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('change a comment from public to private', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.change({ ticket_id: 123, id: 456, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/audits/456/make_private.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.change()).toThrowError();
      expect(() => endPoint.change('invalid')).toThrowError();
      expect(() => endPoint.change({})).toThrowError();
      expect(() => endPoint.change({ ticket_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.change({ ticket_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.change({ ticket_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });
});

const endpoint = require('../../../../src/api/support/ticket_comments');
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
      const ep = endpoint(options);
      expect(ep).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('list comments', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/comments.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ ticket_id: 'invalid' })).toThrowError();
    });
  });

  describe('list email ccs for a comment', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.emailCCs({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/comments.json?include=users`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.emailCCs()).toThrowError();
      expect(() => endPoint.emailCCs('invalid')).toThrowError();
      expect(() => endPoint.emailCCs({ ticket_id: 'invalid' })).toThrowError();
    });
  });

  describe('redact string in comment', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.redact({ ticket_id: 123, id: 456, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/comments/456/redact.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.redact()).toThrowError();
      expect(() => endPoint.redact('invalid')).toThrowError();
      expect(() => endPoint.redact({ ticket_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.redact({ ticket_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.redact({ ticket_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('make comment private', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.makePrivate({ ticket_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/comments/456/make_private.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.makePrivate()).toThrowError();
      expect(() => endPoint.makePrivate('invalid')).toThrowError();
      expect(() =>
        endPoint.makePrivate({ ticket_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.makePrivate({ ticket_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});

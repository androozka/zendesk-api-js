const endpoint = require('../../../../src/v2/support/ticket_comments');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('ticket comments', () => {
  let ticketComments;

  beforeEach(() => (ticketComments = endpoint({ instance, headers })));
  afterEach(() => (ticketComments = null));

  describe('list comments', () => {
    it('should process w/ valid input', () => {
      expect(ticketComments.list({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/comments.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketComments.list()).toThrowError();
      expect(() => ticketComments.list('invalid')).toThrowError();
      expect(() =>
        ticketComments.list({ ticket_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('list email ccs for a comment', () => {
    it('should process w/ valid input', () => {
      expect(ticketComments.emailCCs({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/comments.json?include=users`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketComments.emailCCs()).toThrowError();
      expect(() => ticketComments.emailCCs('invalid')).toThrowError();
      expect(() =>
        ticketComments.emailCCs({ ticket_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('redact string in comment', () => {
    it('should process w/ valid input', () => {
      expect(
        ticketComments.redact({ ticket_id: 123, id: 456, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/comments/456/redact.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketComments.redact()).toThrowError();
      expect(() => ticketComments.redact('invalid')).toThrowError();
      expect(() =>
        ticketComments.redact({ ticket_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketComments.redact({ ticket_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketComments.redact({ ticket_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('make comment private', () => {
    it('should process w/ valid input', () => {
      expect(ticketComments.makePrivate({ ticket_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/comments/456/make_private.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketComments.makePrivate()).toThrowError();
      expect(() => ticketComments.makePrivate('invalid')).toThrowError();
      expect(() =>
        ticketComments.makePrivate({ ticket_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketComments.makePrivate({ ticket_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});

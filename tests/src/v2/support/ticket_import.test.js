const endpoint = require('../../../../src/v2/support/ticket_import');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('end users', () => {
  let ticket_import;

  beforeEach(() => (ticket_import = endpoint({ instance, headers })));
  afterEach(() => (ticket_import = null));

  describe('ticket import (single)', () => {
    it('should process w/ valid input', () => {
      expect(ticket_import.single({ data: { ticket: {} } })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/imports/tickets.json`,
        headers,
        data: { ticket: {} }
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticket_import.single()).toThrowError();
      expect(() => ticket_import.single('invalid')).toThrowError();
      expect(() => ticket_import.single({})).toThrowError();
      expect(() => ticket_import.single({ ticket: 'invalid' })).toThrowError();
    });
  });

  describe('ticket bulk import', () => {
    it('should process w/ valid input', () => {
      expect(ticket_import.bulk({ data: { tickets: [{}, {}] } })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/imports/tickets/create_many.json`,
        headers,
        data: { tickets: [{}, {}] }
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticket_import.bulk()).toThrowError();
      expect(() => ticket_import.bulk('invalid')).toThrowError();
      expect(() => ticket_import.bulk({})).toThrowError();
      expect(() => ticket_import.bulk({ tickets: 'invalid' })).toThrowError();
    });
  });
});

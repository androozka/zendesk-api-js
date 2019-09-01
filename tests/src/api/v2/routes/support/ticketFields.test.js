const endpoint = require('../../../../../../src/api/v2/routes/support/ticketFields');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('ticket fields', () => {
  let ticketFields;

  beforeEach(() => (ticketFields = endpoint({ instance, headers })));
  afterEach(() => (ticketFields = null));

  describe('list ticket fields', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_fields.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.list('invalid')).toThrowError();
    });
  });

  describe('show ticket field', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.show()).toThrowError();
      expect(() => ticketFields.show('invalid')).toThrowError();
      expect(() => ticketFields.show({})).toThrowError();
      expect(() => ticketFields.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create ticket field', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/ticket_fields.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.create()).toThrowError();
      expect(() => ticketFields.create('invalid')).toThrowError();
      expect(() => ticketFields.create({})).toThrowError();
      expect(() => ticketFields.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update ticket field', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/ticket_fields/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.update()).toThrowError();
      expect(() => ticketFields.update('invalid')).toThrowError();
      expect(() => ticketFields.update({})).toThrowError();
      expect(() => ticketFields.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        ticketFields.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete ticket field', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/ticket_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.delete()).toThrowError();
      expect(() => ticketFields.delete('invalid')).toThrowError();
      expect(() => ticketFields.delete({})).toThrowError();
      expect(() => ticketFields.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('list ticket field options', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.listOptions({ field_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/123/options.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.listOptions()).toThrowError();
      expect(() => ticketFields.listOptions('invalid')).toThrowError();
      expect(() => ticketFields.listOptions({})).toThrowError();
      expect(() =>
        ticketFields.listOptions({ field_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('show a ticket field option', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.showOption({ field_id: 123, id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/123/options/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.showOption()).toThrowError();
      expect(() => ticketFields.showOption('invalid')).toThrowError();
      expect(() => ticketFields.showOption({})).toThrowError();
      expect(() =>
        ticketFields.showOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketFields.showOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create or update a ticket field option', () => {
    it('should process w/ valid input', () => {
      expect(
        ticketFields.createOrUpdateOption({ field_id: 123, id: 456, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/ticket_fields/123/options/456.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.createOrUpdateOption()).toThrowError();
      expect(() => ticketFields.createOrUpdateOption('invalid')).toThrowError();
      expect(() => ticketFields.createOrUpdateOption({})).toThrowError();
      expect(() =>
        ticketFields.createOrUpdateOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketFields.createOrUpdateOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketFields.createOrUpdateOption({
          field_id: 123,
          id: 456,
          data: 'invalid'
        })
      ).toThrowError();
    });
  });

  describe('delete ticket field option', () => {
    it('should process w/ valid input', () => {
      expect(ticketFields.deleteOption({ field_id: 123, id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/ticket_fields/123/options/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketFields.deleteOption()).toThrowError();
      expect(() => ticketFields.deleteOption('invalid')).toThrowError();
      expect(() => ticketFields.deleteOption({})).toThrowError();
      expect(() =>
        ticketFields.deleteOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        ticketFields.deleteOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});

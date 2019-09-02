const endpoint = require('../../../../src/v2/support/ticket_forms');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('ticket forms', () => {
  let ticketForms;

  beforeEach(() => (ticketForms = endpoint({ instance, headers })));
  afterEach(() => (ticketForms = null));

  describe('list ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_forms.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.list('invalid')).toThrowError();
    });
  });

  describe('create ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/ticket_forms.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.create()).toThrowError();
      expect(() => ticketForms.create({})).toThrowError();
      expect(() => ticketForms.create('invalid')).toThrowError();
      expect(() => ticketForms.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('show ticket form', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.show()).toThrowError();
      expect(() => ticketForms.show({})).toThrowError();
      expect(() => ticketForms.show('invalid')).toThrowError();
      expect(() => ticketForms.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show many ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/show_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.show_many()).toThrowError();
      expect(() => ticketForms.show_many({})).toThrowError();
      expect(() => ticketForms.show_many('invalid')).toThrowError();
      expect(() => ticketForms.show_many({ ids: 0 })).toThrowError();
    });
  });

  describe('update ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.update()).toThrowError();
      expect(() => ticketForms.update({})).toThrowError();
      expect(() => ticketForms.update('invalid')).toThrowError();
      expect(() => ticketForms.update({ id: 0 })).toThrowError();
      expect(() => ticketForms.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        ticketForms.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete ticket form', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/ticket_forms/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.delete()).toThrowError();
      expect(() => ticketForms.delete({})).toThrowError();
      expect(() => ticketForms.delete('invalid')).toThrowError();
      expect(() => ticketForms.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('reorder ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.reorder()).toThrowError();
      expect(() => ticketForms.reorder({})).toThrowError();
      expect(() => ticketForms.reorder('invalid')).toThrowError();
      expect(() => ticketForms.reorder({ data: 'invalid' })).toThrowError();
    });
  });

  describe('clone an already existing ticket form', () => {
    it('should process w/ valid input', () => {
      expect(ticketForms.clone({ id: 123 })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/ticket_forms/123/clone.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticketForms.clone()).toThrowError();
      expect(() => ticketForms.clone({})).toThrowError();
      expect(() => ticketForms.clone('invalid')).toThrowError();
      expect(() => ticketForms.clone({ id: 'invalid' })).toThrowError();
    });
  });
});

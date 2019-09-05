const endpoint = require('../../../../src/v2/support/suspended_tickets');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('end users', () => {
  let suspended_tickets;

  beforeEach(() => (suspended_tickets = endpoint({ instance, headers })));
  afterEach(() => (suspended_tickets = null));

  describe('list suspended tickets', () => {
    it('should process w/ valid input', () => {
      expect(suspended_tickets.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => suspended_tickets.list('invalid')).toThrowError();
    });
  });

  describe('show suspended ticket', () => {
    it('should process w/ valid input', () => {
      expect(suspended_tickets.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => suspended_tickets.show()).toThrowError();
      expect(() => suspended_tickets.show('invalid')).toThrowError();
      expect(() => suspended_tickets.show({})).toThrowError();
      expect(() => suspended_tickets.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('recover suspended ticket', () => {
    it('should process w/ valid input', () => {
      expect(suspended_tickets.recover({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/123/recover.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => suspended_tickets.recover()).toThrowError();
      expect(() => suspended_tickets.recover('invalid')).toThrowError();
      expect(() => suspended_tickets.recover({})).toThrowError();
      expect(() => suspended_tickets.recover({ id: 'invalid' })).toThrowError();
    });
  });

  describe('recover multiple suspended tickets', () => {
    it('should process w/ valid input', () => {
      expect(suspended_tickets.recover_many({ ids: '1,2,3' })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/recover_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => suspended_tickets.recover_many()).toThrowError();
      expect(() => suspended_tickets.recover_many('invalid')).toThrowError();
      expect(() => suspended_tickets.recover_many({})).toThrowError();
      expect(() => suspended_tickets.recover_many({ ids: 0 })).toThrowError();
    });
  });

  describe('delete suspended ticket', () => {
    it('should process w/ valid input', () => {
      expect(suspended_tickets.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => suspended_tickets.delete()).toThrowError();
      expect(() => suspended_tickets.delete('invalid')).toThrowError();
      expect(() => suspended_tickets.delete({})).toThrowError();
      expect(() => suspended_tickets.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('delete multiple suspended tickets', () => {
    it('should process w/ valid input', () => {
      expect(suspended_tickets.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/destroy_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => suspended_tickets.delete_many()).toThrowError();
      expect(() => suspended_tickets.delete_many('invalid')).toThrowError();
      expect(() => suspended_tickets.delete_many({})).toThrowError();
      expect(() => suspended_tickets.delete_many({ ids: 0 })).toThrowError();
    });
  });
});

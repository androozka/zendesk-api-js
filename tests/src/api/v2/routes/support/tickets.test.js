const endpoint = require('../../../../../../src/api/v2/routes/support/tickets');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('tickets', () => {
  let tickets;

  beforeEach(() => (tickets = endpoint({ instance, headers })));
  afterEach(() => (tickets = null));

  describe('list tickets', () => {
    it('should process w/ valid input', () => {
      expect(tickets.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets.json`,
        headers
      });

      expect(tickets.list({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/tickets.json`,
        headers
      });

      expect(tickets.list({ type: 'users_requested', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tickets/requested.json`,
        headers
      });

      expect(tickets.list({ type: 'users_ccd', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tickets/ccd.json`,
        headers
      });

      expect(tickets.list({ type: 'users_assigned', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tickets/assigned.json`,
        headers
      });

      expect(tickets.list({ type: 'recent' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/recent.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.list('invalid')).toThrowError();
      expect(() => tickets.list({ type: 'invalid' })).toThrowError();
      expect(() =>
        tickets.list({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
      expect(() => tickets.list({ type: 'tickets', id: 123 })).toThrowError();
    });
  });

  describe('list by external id', () => {
    it('should process w/ valid input', () => {
      expect(tickets.list_by_external_id({ external_id: '123' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets.json?external_id=123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.list_by_external_id()).toThrowError();
      expect(() => tickets.list_by_external_id({})).toThrowError();
      expect(() =>
        tickets.list_by_external_id({ external_id: 123 })
      ).toThrowError();
    });
  });

  describe('show', () => {
    it('should process w/ valid input', () => {
      expect(tickets.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.show()).toThrowError();
      expect(() => tickets.show({})).toThrowError();
      expect(() => tickets.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show many', () => {
    it('should process w/ valid input', () => {
      expect(tickets.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/show_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.show_many()).toThrowError();
      expect(() => tickets.show_many({})).toThrowError();
      expect(() => tickets.show_many({ ids: 0 })).toThrowError();
    });
  });

  describe('create', () => {
    it('should process w/ valid input', () => {
      expect(tickets.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.create()).toThrowError();
      expect(() => tickets.create('invalid')).toThrowError();
      expect(() => tickets.create({})).toThrowError();
      expect(() => tickets.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create many', () => {
    it('should process w/ valid input', () => {
      expect(tickets.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.create_many()).toThrowError();
      expect(() => tickets.create_many('invalid')).toThrowError();
      expect(() => tickets.create_many({})).toThrowError();
      expect(() => tickets.create_many({ data: 123 })).toThrowError();
    });
  });

  describe('update', () => {
    it('should process w/ valid input', () => {
      expect(tickets.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.update()).toThrowError();
      expect(() => tickets.update({})).toThrowError();
      expect(() => tickets.update({ data: {} })).toThrowError();
      expect(() => tickets.update({ id: 'invalid', data: {} })).toThrowError();
      expect(() => tickets.update({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('update many', () => {
    it('should process w/ valid input', () => {
      expect(tickets.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/update_many.json`,
        headers,
        data: {}
      });

      expect(tickets.update_many({ ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/update_many.json?ids=1,2,3`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.update_many()).toThrowError();
      expect(() => tickets.update_many('invalid')).toThrowError();
      expect(() => tickets.update_many({})).toThrowError();
      expect(() => tickets.update_many({ data: 'invalid' })).toThrowError();
      expect(() => tickets.update_many({ ids: 0, data: {} })).toThrowError();
    });
  });

  describe('mark as spam', () => {
    it('should process w/ valid input', () => {
      expect(tickets.mark_as_spam({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/mark_as_spam.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.mark_as_spam()).toThrowError();
      expect(() => tickets.mark_as_spam('invalid')).toThrowError();
      expect(() => tickets.mark_as_spam({})).toThrowError();
      expect(() => tickets.mark_as_spam({ id: 0 })).toThrowError();
      expect(() => tickets.mark_as_spam({ id: 'invalid' })).toThrowError();
    });
  });

  describe('mark as spam bulk', () => {
    it('should process w/ valid input', () => {
      expect(tickets.mark_as_spam_bulk({ ids: '1,2,3' })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/mark_many_as_spam.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.mark_as_spam_bulk()).toThrowError();
      expect(() => tickets.mark_as_spam_bulk('invalid')).toThrowError();
      expect(() => tickets.mark_as_spam_bulk({})).toThrowError();
      expect(() => tickets.mark_as_spam_bulk({ id: 0 })).toThrowError();
      expect(() => tickets.mark_as_spam_bulk({ id: 'invalid' })).toThrowError();
    });
  });

  describe('merge', () => {
    it('should process w/ valid input', () => {
      expect(tickets.merge({ id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/merge.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.merge()).toThrowError();
      expect(() => tickets.merge('invalid')).toThrowError();
      expect(() => tickets.merge({})).toThrowError();
      expect(() => tickets.merge({ id: 'invalid' })).toThrowError();
      expect(() => tickets.merge({ id: 0 })).toThrowError();
      expect(() => tickets.merge({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('related', () => {
    it('should process w/ valid input', () => {
      expect(tickets.related({ id: 123 })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/related.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.related()).toThrowError();
      expect(() => tickets.related('invalid')).toThrowError();
      expect(() => tickets.related({})).toThrowError();
      expect(() => tickets.related({ id: 'invalid' })).toThrowError();
      expect(() => tickets.related({ id: 0 })).toThrowError();
      expect(() =>
        tickets.related({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete', () => {
    it('should process w/ valid input', () => {
      expect(tickets.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.delete()).toThrowError();
      expect(() => tickets.delete('invalid')).toThrowError();
      expect(() => tickets.delete({})).toThrowError();
      expect(() => tickets.delete({ id: 'invalid' })).toThrowError();
      expect(() => tickets.delete({ id: 0 })).toThrowError();
      expect(() => tickets.delete({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('delete bulk', () => {
    it('should process w/ valid input', () => {
      expect(tickets.delete_bulk({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/tickets/destroy_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.delete_bulk()).toThrowError();
      expect(() => tickets.delete_bulk('invalid')).toThrowError();
      expect(() => tickets.delete_bulk({})).toThrowError();
      expect(() => tickets.delete_bulk({ ids: 0 })).toThrowError();
    });
  });

  describe('deleted', () => {
    it('should process w/ valid input', () => {
      expect(tickets.deleted()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/deleted_tickets.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.deleted('invalid')).toThrowError();
      expect(() => tickets.deleted({})).toThrowError();
    });
  });

  describe('restore', () => {
    it('should process w/ valid input', () => {
      expect(tickets.restore({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/123/restore.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.restore()).toThrowError();
      expect(() => tickets.restore('invalid')).toThrowError();
      expect(() => tickets.restore({})).toThrowError();
      expect(() => tickets.restore({ id: 0 })).toThrowError();
    });
  });

  describe('restore bulk', () => {
    it('should process w/ valid input', () => {
      expect(tickets.restore_bulk({ ids: '1,2,3' })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/restore_many?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.restore_bulk()).toThrowError();
      expect(() => tickets.restore_bulk('invalid')).toThrowError();
      expect(() => tickets.restore_bulk({})).toThrowError();
      expect(() => tickets.restore_bulk({ ids: 0 })).toThrowError();
    });
  });

  describe('delete permanently', () => {
    it('should process w/ valid input', () => {
      expect(tickets.delete_permanently({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.delete_permanently()).toThrowError();
      expect(() => tickets.delete_permanently('invalid')).toThrowError();
      expect(() => tickets.delete_permanently({})).toThrowError();
      expect(() => tickets.delete_permanently({ id: 0 })).toThrowError();
      expect(() =>
        tickets.delete_permanently({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete permanently bulk', () => {
    it('should process w/ valid input', () => {
      expect(tickets.delete_permanently_bulk({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/destroy_many?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.delete_permanently_bulk()).toThrowError();
      expect(() => tickets.delete_permanently_bulk('invalid')).toThrowError();
      expect(() => tickets.delete_permanently_bulk({})).toThrowError();
      expect(() => tickets.delete_permanently_bulk({ ids: 0 })).toThrowError();
      expect(() =>
        tickets.delete_permanently_bulk({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('collaborators', () => {
    it('should process w/ valid input', () => {
      expect(tickets.collaborators({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/collaborators.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.collaborators()).toThrowError();
      expect(() => tickets.collaborators('invalid')).toThrowError();
      expect(() => tickets.collaborators({})).toThrowError();
      expect(() => tickets.collaborators({ id: 0 })).toThrowError();
      expect(() => tickets.collaborators({ id: 'invalid' })).toThrowError();
    });
  });

  describe('followers', () => {
    it('should process w/ valid input', () => {
      expect(tickets.followers({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/followers.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.followers()).toThrowError();
      expect(() => tickets.followers('invalid')).toThrowError();
      expect(() => tickets.followers({})).toThrowError();
      expect(() => tickets.followers({ id: 0 })).toThrowError();
      expect(() => tickets.followers({ id: 'invalid' })).toThrowError();
    });
  });

  describe('email ccs', () => {
    it('should process w/ valid input', () => {
      expect(tickets.email_ccs({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/email_ccs.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.email_ccs()).toThrowError();
      expect(() => tickets.email_ccs('invalid')).toThrowError();
      expect(() => tickets.email_ccs({})).toThrowError();
      expect(() => tickets.email_ccs({ id: 0 })).toThrowError();
      expect(() => tickets.email_ccs({ id: 'invalid' })).toThrowError();
    });
  });

  describe('incidents', () => {
    it('should process w/ valid input', () => {
      expect(tickets.incidents({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/incidents.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.incidents()).toThrowError();
      expect(() => tickets.incidents('invalid')).toThrowError();
      expect(() => tickets.incidents({})).toThrowError();
      expect(() => tickets.incidents({ id: 0 })).toThrowError();
      expect(() => tickets.incidents({ id: 'invalid' })).toThrowError();
    });
  });

  describe('problems', () => {
    it('should process w/ valid input', () => {
      expect(tickets.problems()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/problems.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.problems('invalid')).toThrowError();
      expect(() => tickets.problems({})).toThrowError();
    });
  });

  describe('autocomplete problems', () => {
    it('should process w/ valid input', () => {
      expect(tickets.autocomplete_problems({ name: 'name' })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/problems/autocomplete.json?text=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tickets.autocomplete_problems()).toThrowError();
      expect(() => tickets.autocomplete_problems('invalid')).toThrowError();
      expect(() => tickets.autocomplete_problems({})).toThrowError();
      expect(() => tickets.autocomplete_problems({ id: 0 })).toThrowError();
      expect(() =>
        tickets.autocomplete_problems({ id: 'invalid' })
      ).toThrowError();
    });
  });
});

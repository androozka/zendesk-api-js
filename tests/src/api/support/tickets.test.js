const endpoint = require('../../../../src/api/support/tickets');
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

  describe('list tickets', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets.json`,
        headers
      });

      expect(endPoint.list({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/tickets.json`,
        headers
      });

      expect(endPoint.list({ type: 'users_requested', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tickets/requested.json`,
        headers
      });

      expect(endPoint.list({ type: 'users_ccd', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tickets/ccd.json`,
        headers
      });

      expect(endPoint.list({ type: 'users_assigned', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tickets/assigned.json`,
        headers
      });

      expect(endPoint.list({ type: 'recent' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/recent.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ type: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.list({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
      expect(() => endPoint.list({ type: 'tickets', id: 123 })).toThrowError();
    });
  });

  describe('list by external id', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list_by_external_id({ external_id: '123' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets.json?external_id=123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list_by_external_id()).toThrowError();
      expect(() => endPoint.list_by_external_id({})).toThrowError();
      expect(() =>
        endPoint.list_by_external_id({ external_id: 123 })
      ).toThrowError();
    });
  });

  describe('show', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show many', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/show_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show_many()).toThrowError();
      expect(() => endPoint.show_many({})).toThrowError();
      expect(() => endPoint.show_many({ ids: 0 })).toThrowError();
    });
  });

  describe('create', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create many', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_many()).toThrowError();
      expect(() => endPoint.create_many('invalid')).toThrowError();
      expect(() => endPoint.create_many({})).toThrowError();
      expect(() => endPoint.create_many({ data: 123 })).toThrowError();
    });
  });

  describe('update', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ data: {} })).toThrowError();
      expect(() => endPoint.update({ id: 'invalid', data: {} })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update many', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/update_many.json`,
        headers,
        data: {}
      });

      expect(endPoint.update_many({ ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/update_many.json?ids=1,2,3`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_many()).toThrowError();
      expect(() => endPoint.update_many('invalid')).toThrowError();
      expect(() => endPoint.update_many({})).toThrowError();
      expect(() => endPoint.update_many({ data: 'invalid' })).toThrowError();
      expect(() => endPoint.update_many({ ids: 0, data: {} })).toThrowError();
    });
  });

  describe('mark as spam', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.mark_as_spam({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/mark_as_spam.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.mark_as_spam()).toThrowError();
      expect(() => endPoint.mark_as_spam('invalid')).toThrowError();
      expect(() => endPoint.mark_as_spam({})).toThrowError();
      expect(() => endPoint.mark_as_spam({ id: 0 })).toThrowError();
      expect(() => endPoint.mark_as_spam({ id: 'invalid' })).toThrowError();
    });
  });

  describe('mark as spam bulk', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.mark_as_spam_bulk({ ids: '1,2,3' })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/mark_many_as_spam.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.mark_as_spam_bulk()).toThrowError();
      expect(() => endPoint.mark_as_spam_bulk('invalid')).toThrowError();
      expect(() => endPoint.mark_as_spam_bulk({})).toThrowError();
      expect(() => endPoint.mark_as_spam_bulk({ id: 0 })).toThrowError();
      expect(() =>
        endPoint.mark_as_spam_bulk({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('merge', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.merge({ id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/merge.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.merge()).toThrowError();
      expect(() => endPoint.merge('invalid')).toThrowError();
      expect(() => endPoint.merge({})).toThrowError();
      expect(() => endPoint.merge({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.merge({ id: 0 })).toThrowError();
      expect(() => endPoint.merge({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('related', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.related({ id: 123 })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/related.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.related()).toThrowError();
      expect(() => endPoint.related('invalid')).toThrowError();
      expect(() => endPoint.related({})).toThrowError();
      expect(() => endPoint.related({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.related({ id: 0 })).toThrowError();
      expect(() =>
        endPoint.related({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.delete({ id: 0 })).toThrowError();
      expect(() =>
        endPoint.delete({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete bulk', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_bulk({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/tickets/destroy_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_bulk()).toThrowError();
      expect(() => endPoint.delete_bulk('invalid')).toThrowError();
      expect(() => endPoint.delete_bulk({})).toThrowError();
      expect(() => endPoint.delete_bulk({ ids: 0 })).toThrowError();
    });
  });

  describe('deleted', () => {
    it('should process without input', () => {
      expect(endPoint.deleted()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/deleted_tickets.json`,
        headers
      });
    });
  });

  describe('restore', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.restore({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/123/restore.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.restore()).toThrowError();
      expect(() => endPoint.restore('invalid')).toThrowError();
      expect(() => endPoint.restore({})).toThrowError();
      expect(() => endPoint.restore({ id: 0 })).toThrowError();
    });
  });

  describe('restore bulk', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.restore_bulk({ ids: '1,2,3' })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/restore_many?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.restore_bulk()).toThrowError();
      expect(() => endPoint.restore_bulk('invalid')).toThrowError();
      expect(() => endPoint.restore_bulk({})).toThrowError();
      expect(() => endPoint.restore_bulk({ ids: 0 })).toThrowError();
    });
  });

  describe('delete permanently', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_permanently({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_permanently()).toThrowError();
      expect(() => endPoint.delete_permanently('invalid')).toThrowError();
      expect(() => endPoint.delete_permanently({})).toThrowError();
      expect(() => endPoint.delete_permanently({ id: 0 })).toThrowError();
      expect(() =>
        endPoint.delete_permanently({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete permanently bulk', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_permanently_bulk({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/destroy_many?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_permanently_bulk()).toThrowError();
      expect(() => endPoint.delete_permanently_bulk('invalid')).toThrowError();
      expect(() => endPoint.delete_permanently_bulk({})).toThrowError();
      expect(() => endPoint.delete_permanently_bulk({ ids: 0 })).toThrowError();
      expect(() =>
        endPoint.delete_permanently_bulk({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('collaborators', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.collaborators({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/collaborators.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.collaborators()).toThrowError();
      expect(() => endPoint.collaborators('invalid')).toThrowError();
      expect(() => endPoint.collaborators({})).toThrowError();
      expect(() => endPoint.collaborators({ id: 0 })).toThrowError();
      expect(() => endPoint.collaborators({ id: 'invalid' })).toThrowError();
    });
  });

  describe('followers', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.followers({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/followers.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.followers()).toThrowError();
      expect(() => endPoint.followers('invalid')).toThrowError();
      expect(() => endPoint.followers({})).toThrowError();
      expect(() => endPoint.followers({ id: 0 })).toThrowError();
      expect(() => endPoint.followers({ id: 'invalid' })).toThrowError();
    });
  });

  describe('email ccs', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.email_ccs({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/email_ccs.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.email_ccs()).toThrowError();
      expect(() => endPoint.email_ccs('invalid')).toThrowError();
      expect(() => endPoint.email_ccs({})).toThrowError();
      expect(() => endPoint.email_ccs({ id: 0 })).toThrowError();
      expect(() => endPoint.email_ccs({ id: 'invalid' })).toThrowError();
    });
  });

  describe('incidents', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.incidents({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/incidents.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.incidents()).toThrowError();
      expect(() => endPoint.incidents('invalid')).toThrowError();
      expect(() => endPoint.incidents({})).toThrowError();
      expect(() => endPoint.incidents({ id: 0 })).toThrowError();
      expect(() => endPoint.incidents({ id: 'invalid' })).toThrowError();
    });
  });

  describe('problems', () => {
    it('should process without input', () => {
      expect(endPoint.problems()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/problems.json`,
        headers
      });
    });
  });

  describe('autocomplete problems', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.autocomplete_problems({ name: 'name' })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/problems/autocomplete.json?text=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.autocomplete_problems()).toThrowError();
      expect(() => endPoint.autocomplete_problems('invalid')).toThrowError();
      expect(() => endPoint.autocomplete_problems({})).toThrowError();
      expect(() => endPoint.autocomplete_problems({ id: 0 })).toThrowError();
      expect(() =>
        endPoint.autocomplete_problems({ id: 'invalid' })
      ).toThrowError();
    });
  });
});

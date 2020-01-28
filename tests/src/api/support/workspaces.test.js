const endpoint = require('../../../../src/api/support/workspaces');
const { prepare } = require('../../../../src/utils/options');

describe('Workspaces', () => {
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

  describe('List Workspaces', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/workspaces.json`,
        headers
      });

      expect(endPoint.list({ params: 'per_page=2' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/workspaces.json?per_page=2`,
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

  describe('Show Workspace', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/workspaces/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Create Workspace', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/workspaces.json`,
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

  describe('Update Workspace', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/workspaces/123.json`,
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

  describe('Delete Workspace', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/workspaces/123.json`,
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

  describe('Bulk Delete Workspaces', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_bulk({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/workspaces/destroy_many.json?ids=1,2,3`,
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

  describe('Reorder Workspaces', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/workspaces/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.reorder()).toThrowError();
      expect(() => endPoint.reorder('invalid')).toThrowError();
      expect(() => endPoint.reorder({})).toThrowError();
      expect(() => endPoint.reorder({ data: 'invalid' })).toThrowError();
    });
  });
});

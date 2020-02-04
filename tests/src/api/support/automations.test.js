const endpoint = require('../../../../src/api/support/automations');
const { prepare } = require('../../../../src/utils/options');

describe('Automations', () => {
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

  describe('List Automations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/automations.json`,
        headers
      });
    });
  });

  describe('Show Automation', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/automations/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('List Active Automations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.active()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/automations/active.json`,
        headers
      });
    });
  });

  describe('Create Automation', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/automations.json`,
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

  describe('Update Automation', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/automations/123.json`,
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

  describe('Update Many Automations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/automations/update_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_many()).toThrowError();
      expect(() => endPoint.update_many('invalid')).toThrowError();
      expect(() => endPoint.update_many({})).toThrowError();
      expect(() => endPoint.update_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('Delete Automation', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/automations/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Bulk Delete Automations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_bulk({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/automations/destroy_many.json?ids=1,2,3`,
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

  describe('Search Automations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.search({ query: 'close' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/automations/search.json?query=close`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.search()).toThrowError();
      expect(() => endPoint.search('invalid')).toThrowError();
      expect(() => endPoint.search({})).toThrowError();
      expect(() => endPoint.search({ query: 0 })).toThrowError();
    });
  });
});

const endpoint = require('../../../src/api/support/views');
const { prepare } = require('../../../src/utils/options');

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

  describe('list views', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views.json`,
        headers
      });

      expect(endPoint.list({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list('invalid')).toThrowError();
    });
  });

  describe('update many views', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/views/update_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_many()).toThrowError();
      expect(() => endPoint.update_many({})).toThrowError();
      expect(() => endPoint.update_many('invalid')).toThrowError();
      expect(() => endPoint.update_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list active views', () => {
    it('should process without input', () => {
      expect(endPoint.active()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/active.json`,
        headers
      });
    });
  });

  describe('list views - compact', () => {
    it('should process without input', () => {
      expect(endPoint.compact()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/compact.json`,
        headers
      });
    });
  });

  describe('show view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/views.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({ id: 'invalid' })).toThrowError();
    });
  });

  describe('update view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/views/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update('invalid')).toThrowError();
      expect(() => endPoint.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/views/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('delete many views', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_many({ data: {} })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/views/destroy_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_many()).toThrowError();
      expect(() => endPoint.delete_many({})).toThrowError();
      expect(() => endPoint.delete_many('invalid')).toThrowError();
      expect(() => endPoint.delete_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('execute view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.execute({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/execute.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.execute()).toThrowError();
      expect(() => endPoint.execute({})).toThrowError();
      expect(() => endPoint.execute('invalid')).toThrowError();
      expect(() => endPoint.execute({ id: 'invalid' })).toThrowError();
    });
  });

  describe('list tickets from a view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.tickets({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/tickets.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.tickets()).toThrowError();
      expect(() => endPoint.tickets({})).toThrowError();
      expect(() => endPoint.tickets('invalid')).toThrowError();
      expect(() => endPoint.tickets({ id: 'invalid' })).toThrowError();
    });
  });

  describe('get view counts', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.count_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/count_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.count_many()).toThrowError();
      expect(() => endPoint.count_many({})).toThrowError();
      expect(() => endPoint.count_many('invalid')).toThrowError();
      expect(() => endPoint.count_many({ ids: 0 })).toThrowError();
    });
  });

  describe('get view count', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.count({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/count.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.count()).toThrowError();
      expect(() => endPoint.count({})).toThrowError();
      expect(() => endPoint.count('invalid')).toThrowError();
      expect(() => endPoint.count({ id: 'invalid' })).toThrowError();
    });
  });

  describe('export view', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.export({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/export.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.export()).toThrowError();
      expect(() => endPoint.export({})).toThrowError();
      expect(() => endPoint.export('invalid')).toThrowError();
      expect(() => endPoint.export({ id: 'invalid' })).toThrowError();
    });
  });

  describe('search views', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.search({ query: 'query' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/search.json?query=query`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.search()).toThrowError();
      expect(() => endPoint.search({})).toThrowError();
      expect(() => endPoint.search('invalid')).toThrowError();
      expect(() => endPoint.search({ query: '' })).toThrowError();
    });
  });

  describe('previewing views', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.preview({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/views/preview.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.preview()).toThrowError();
      expect(() => endPoint.preview({})).toThrowError();
      expect(() => endPoint.preview('invalid')).toThrowError();
      expect(() => endPoint.preview({ data: 'invalid' })).toThrowError();
    });
  });

  describe('preview count', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.preview_count({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/views/preview/count.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.preview_count()).toThrowError();
      expect(() => endPoint.preview_count({})).toThrowError();
      expect(() => endPoint.preview_count('invalid')).toThrowError();
      expect(() => endPoint.preview_count({ data: 'invalid' })).toThrowError();
    });
  });
});

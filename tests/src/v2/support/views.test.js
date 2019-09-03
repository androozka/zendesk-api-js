const endpoint = require('../../../../src/v2/support/views');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('views', () => {
  let views;

  beforeEach(() => (views = endpoint({ instance, headers })));
  afterEach(() => (views = null));

  describe('list views', () => {
    it('should process w/ valid input', () => {
      expect(views.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views.json`,
        headers
      });

      expect(views.list({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.list('invalid')).toThrowError();
    });
  });

  describe('update many views', () => {
    it('should process w/ valid input', () => {
      expect(views.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/views/update_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.update_many()).toThrowError();
      expect(() => views.update_many({})).toThrowError();
      expect(() => views.update_many('invalid')).toThrowError();
      expect(() => views.update_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list active views', () => {
    it('should process w/ valid input', () => {
      expect(views.active()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/active.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.active('invalid')).toThrowError();
    });
  });

  describe('list views - compact', () => {
    it('should process w/ valid input', () => {
      expect(views.compact()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/compact.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.compact('invalid')).toThrowError();
    });
  });

  describe('show view', () => {
    it('should process w/ valid input', () => {
      expect(views.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.show()).toThrowError();
      expect(() => views.show({})).toThrowError();
      expect(() => views.show('invalid')).toThrowError();
      expect(() => views.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create view', () => {
    it('should process w/ valid input', () => {
      expect(views.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/views.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.create()).toThrowError();
      expect(() => views.create({})).toThrowError();
      expect(() => views.create('invalid')).toThrowError();
      expect(() => views.create({ id: 'invalid' })).toThrowError();
    });
  });

  describe('update view', () => {
    it('should process w/ valid input', () => {
      expect(views.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/views/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.update()).toThrowError();
      expect(() => views.update({})).toThrowError();
      expect(() => views.update('invalid')).toThrowError();
      expect(() => views.update({ id: 'invalid' })).toThrowError();
      expect(() => views.update({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('delete view', () => {
    it('should process w/ valid input', () => {
      expect(views.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/views/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.delete()).toThrowError();
      expect(() => views.delete({})).toThrowError();
      expect(() => views.delete('invalid')).toThrowError();
      expect(() => views.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('delete many views', () => {
    it('should process w/ valid input', () => {
      expect(views.delete_many({ data: {} })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/views/destroy_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.delete_many()).toThrowError();
      expect(() => views.delete_many({})).toThrowError();
      expect(() => views.delete_many('invalid')).toThrowError();
      expect(() => views.delete_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('execute view', () => {
    it('should process w/ valid input', () => {
      expect(views.execute({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/execute.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.execute()).toThrowError();
      expect(() => views.execute({})).toThrowError();
      expect(() => views.execute('invalid')).toThrowError();
      expect(() => views.execute({ id: 'invalid' })).toThrowError();
    });
  });

  describe('list tickets from a view', () => {
    it('should process w/ valid input', () => {
      expect(views.tickets({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/tickets.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.tickets()).toThrowError();
      expect(() => views.tickets({})).toThrowError();
      expect(() => views.tickets('invalid')).toThrowError();
      expect(() => views.tickets({ id: 'invalid' })).toThrowError();
    });
  });

  describe('get view counts', () => {
    it('should process w/ valid input', () => {
      expect(views.count_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/count_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.count_many()).toThrowError();
      expect(() => views.count_many({})).toThrowError();
      expect(() => views.count_many('invalid')).toThrowError();
      expect(() => views.count_many({ ids: 0 })).toThrowError();
    });
  });

  describe('get view count', () => {
    it('should process w/ valid input', () => {
      expect(views.count({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/count.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.count()).toThrowError();
      expect(() => views.count({})).toThrowError();
      expect(() => views.count('invalid')).toThrowError();
      expect(() => views.count({ id: 'invalid' })).toThrowError();
    });
  });

  describe('export view', () => {
    it('should process w/ valid input', () => {
      expect(views.export({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/123/export.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.export()).toThrowError();
      expect(() => views.export({})).toThrowError();
      expect(() => views.export('invalid')).toThrowError();
      expect(() => views.export({ id: 'invalid' })).toThrowError();
    });
  });

  describe('search views', () => {
    it('should process w/ valid input', () => {
      expect(views.search({ query: 'query' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/views/search.json?query=query`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.search()).toThrowError();
      expect(() => views.search({})).toThrowError();
      expect(() => views.search('invalid')).toThrowError();
      expect(() => views.search({ query: '' })).toThrowError();
    });
  });

  describe('previewing views', () => {
    it('should process w/ valid input', () => {
      expect(views.preview({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/views/preview.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.preview()).toThrowError();
      expect(() => views.preview({})).toThrowError();
      expect(() => views.preview('invalid')).toThrowError();
      expect(() => views.preview({ data: 'invalid' })).toThrowError();
    });
  });

  describe('preview count', () => {
    it('should process w/ valid input', () => {
      expect(views.preview_count({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/views/preview/count.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => views.preview_count()).toThrowError();
      expect(() => views.preview_count({})).toThrowError();
      expect(() => views.preview_count('invalid')).toThrowError();
      expect(() => views.preview_count({ data: 'invalid' })).toThrowError();
    });
  });
});

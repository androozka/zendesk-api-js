const endpoint = require('../../../src/api/support/ticket_forms');
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

  describe('list ticket forms', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_forms.json`,
        headers
      });
    });
  });

  describe('create ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/ticket_forms.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('show ticket form', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/123.json`,
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

  describe('show many ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/show_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show_many()).toThrowError();
      expect(() => endPoint.show_many({})).toThrowError();
      expect(() => endPoint.show_many('invalid')).toThrowError();
      expect(() => endPoint.show_many({ ids: 0 })).toThrowError();
    });
  });

  describe('update ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update('invalid')).toThrowError();
      expect(() => endPoint.update({ id: 0 })).toThrowError();
      expect(() => endPoint.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete ticket form', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/ticket_forms/123.json`,
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

  describe('reorder ticket forms', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.reorder()).toThrowError();
      expect(() => endPoint.reorder({})).toThrowError();
      expect(() => endPoint.reorder('invalid')).toThrowError();
      expect(() => endPoint.reorder({ data: 'invalid' })).toThrowError();
    });
  });

  describe('clone an already existing ticket form', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.clone({ id: 123 })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/ticket_forms/123/clone.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.clone()).toThrowError();
      expect(() => endPoint.clone({})).toThrowError();
      expect(() => endPoint.clone('invalid')).toThrowError();
      expect(() => endPoint.clone({ id: 'invalid' })).toThrowError();
    });
  });
});

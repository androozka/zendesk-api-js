const endpoint = require('../../../src/api/sunshine/object_types');
const { prepare } = require('../../../src/utils/options');

describe('object types', () => {
  let object_types, options, url, headers;

  beforeEach(() => {
    options = {
      instance: 'instance',
      email: 'user@email.com',
      token: 'token'
    };
    object_types = endpoint(options);
    ({ url, headers } = prepare(options));
  });

  afterEach(() => {
    options = null;
    object_types = null;
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

  describe('list object types', () => {
    it('should process without input', () => {
      expect(object_types.list()).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/types`,
        headers
      });
    });
  });

  describe('show object type', () => {
    it('should process valid input', () => {
      expect(object_types.show({ key: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => object_types.show()).toThrowError();
      expect(() => object_types.show({})).toThrowError();
      expect(() => object_types.show('invalid')).toThrowError();
      expect(() => object_types.show({ key: 123 })).toThrowError();
    });
  });

  describe('create object type', () => {
    it('should process valid input', () => {
      const data = {};
      expect(object_types.create({ data })).toEqual({
        method: 'POST',
        url: `${url}/api/sunshine/objects/types`,
        headers,
        data
      });
    });

    it('should fail with invalid input', () => {
      expect(() => object_types.create()).toThrowError();
      expect(() => object_types.create({})).toThrowError();
      expect(() => object_types.create({ data: 'invalid' })).toThrowError();
      expect(() => object_types.create({ data: 123 })).toThrowError();
    });
  });

  describe('update object type', () => {
    it('should process valid input', () => {
      expect(object_types.update({ key: 'valid', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers,
        data: {}
      });
    });

    it('should fail with invalid input', () => {
      expect(() => object_types.update()).toThrowError();
      expect(() => object_types.update({})).toThrowError();
      expect(() => object_types.update({ key: 123 })).toThrowError();
      expect(() => object_types.update({ key: 'valid' })).toThrowError();
      expect(() =>
        object_types.update({ key: 'valid', data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete object type', () => {
    it('should process valid input', () => {
      expect(object_types.delete({ key: 'valid' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => object_types.delete()).toThrowError();
      expect(() => object_types.delete({})).toThrowError();
      expect(() => object_types.delete({ key: 123 })).toThrowError();
    });
  });
});

const endpoint = require('../../../../src/api/sunshine/object_types');
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
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/types`,
        headers
      });
    });
  });

  describe('show object type', () => {
    it('should process valid input', () => {
      expect(endPoint.show({ key: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({ key: 123 })).toThrowError();
    });
  });

  describe('create object type', () => {
    it('should process valid input', () => {
      const data = {};
      expect(endPoint.create({ data })).toEqual({
        method: 'POST',
        url: `${url}/api/sunshine/objects/types`,
        headers,
        data
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
      expect(() => endPoint.create({ data: 123 })).toThrowError();
    });
  });

  describe('update object type', () => {
    it('should process valid input', () => {
      expect(endPoint.update({ key: 'valid', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers,
        data: {}
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ key: 123 })).toThrowError();
      expect(() => endPoint.update({ key: 'valid' })).toThrowError();
      expect(() =>
        endPoint.update({ key: 'valid', data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete object type', () => {
    it('should process valid input', () => {
      expect(endPoint.delete({ key: 'valid' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ key: 123 })).toThrowError();
    });
  });
});

const endpoint = require('../../../../src/api/sunshine/relationship_types');
const { prepare } = require('../../../../src/utils/options');

describe('relationship types', () => {
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

  describe('list relationship types', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/relationships/types`,
        headers
      });
    });
  });

  describe('show relationship type', () => {
    it('should process valid input', () => {
      expect(endPoint.show({ key: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/relationships/types/valid`,
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

  describe('create relationship type', () => {
    it('should process valid input', () => {
      const data = {};
      expect(endPoint.create({ data })).toEqual({
        method: 'POST',
        url: `${url}/api/sunshine/relationships/types`,
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

  describe('delete relationship type', () => {
    it('should process valid input', () => {
      expect(endPoint.delete({ key: 'valid' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/relationships/types/valid`,
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

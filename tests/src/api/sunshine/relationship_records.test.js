const endpoint = require('../../../../src/api/sunshine/relationship_records');
const { prepare } = require('../../../../src/utils/options');

describe('relationship records', () => {
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

  describe('list relationship records', () => {
    it('should process valid input', () => {
      expect(endPoint.list({ relationship_type: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/relationships/records?type=valid`,
        headers
      });

      expect(endPoint.list({ id: 123, relationship_type: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records/123/relationships/valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list({})).toThrowError();
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ relationship_type: 123 })).toThrowError();
      expect(() => endPoint.list({ id: 123 })).toThrowError();
      expect(() =>
        endPoint.list({ relationship_type: 'valid', id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create relationship record', () => {
    it('should process valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/sunshine/relationships/records`,
        headers,
        data: {}
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('delete relationship record', () => {
    it('should process valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/relationships/records/123`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });
});

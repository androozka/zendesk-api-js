const endpoint = require('../../../../src/api/sunshine/object_records');
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

  describe('list object records', () => {
    it('should process valid input', () => {
      expect(endPoint.list({ object_type: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records?type=valid`,
        headers
      });

      expect(endPoint.list({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records?ids=1,2,3`,
        headers
      });

      expect(endPoint.list({ id: 123, relationship_type: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records/123/related/valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list({})).toThrowError();
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ type: 123 })).toThrowError();
      expect(() => endPoint.list({ ids: 123 })).toThrowError();
      expect(() => endPoint.list({ id: 123 })).toThrowError();
      expect(() =>
        endPoint.list({ id: 123, relationship_type: 123 })
      ).toThrowError();
    });
  });

  describe('show object record', () => {
    it('should process valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records/123`,
        headers
      });

      expect(
        endPoint.show({ object_type: 'valid', external_id: 'valid' })
      ).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records?type=valid&external_id=valid`,
        headers
      });

      expect(
        endPoint.show({ object_type: 'valid', external_ids: 'valid' })
      ).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/records?type=valid&external_ids=valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.show({ object_type: 123 })).toThrowError();
      expect(() => endPoint.show({ object_type: 'valid' })).toThrowError();
      expect(() =>
        endPoint.show({ object_type: 'valid', external_id: 123 })
      ).toThrowError();
      expect(() =>
        endPoint.show({ object_type: 'valid', external_ids: 123 })
      ).toThrowError();
    });
  });

  describe('create object record', () => {
    it('should process valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/sunshine/objects/records`,
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

  describe('update object record', () => {
    it('should process valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PATCH',
        url: `${url}/api/sunshine/objects/records/123`,
        headers,
        data: {}
      });

      expect(endPoint.update({ data: {} })).toEqual({
        method: 'PATCH',
        url: `${url}/api/sunshine/objects/records`,
        headers,
        data: {}
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update('invalid')).toThrowError();
      expect(() => endPoint.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
      expect(() => endPoint.update({ data: 'invalid' })).toThrowError();
    });
  });

  describe('delete object record', () => {
    it('should process valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/records/123`,
        headers
      });

      expect(endPoint.delete({ external_id: 'valid', type: 'valid' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/records?external_id=valid&type=valid`,
        headers
      });
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.delete({ external_id: 123 })).toThrowError();
      expect(() =>
        endPoint.delete({ external_id: 'valid', type: 123 })
      ).toThrowError();
    });
  });
});

const endpoint = require('../../../../src/v2/sunshine/object_types');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('object types', () => {
  let objectTypes;

  beforeEach(() => (objectTypes = endpoint({ instance, headers })));
  afterEach(() => (objectTypes = null));

  describe('list object types', () => {
    it('should process, ignores additional input', () => {
      expect(objectTypes.list()).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/types`,
        headers
      });
    });
  });

  describe('show object type', () => {
    it('should process w/ valid input', () => {
      expect(objectTypes.show({ key: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => objectTypes.show()).toThrowError();
      expect(() => objectTypes.show({})).toThrowError();
      expect(() => objectTypes.show('invalid')).toThrowError();
      expect(() => objectTypes.show({ key: 123 })).toThrowError();
    });
  });

  describe('create object type', () => {
    it('should process w/ valid input', () => {
      const data = {
        key: 'valid',
        schema: {
          properties: {},
          required: ['valid']
        },
        end_users_can_read: false
      };

      expect(objectTypes.create({ data })).toEqual({
        method: 'POST',
        url: `${url}/api/sunshine/objects/types`,
        headers,
        data
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => objectTypes.create()).toThrowError();
      expect(() => objectTypes.create({})).toThrowError();
      expect(() => objectTypes.create('invalid')).toThrowError();
      expect(() => objectTypes.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update custom role', () => {
    it('should process w/ valid input', () => {
      expect(objectTypes.update({ key: 'valid', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => objectTypes.update()).toThrowError();
      expect(() => objectTypes.update({})).toThrowError();
      expect(() => objectTypes.update('invalid')).toThrowError();
      expect(() => objectTypes.update({ key: 0 })).toThrowError();
      expect(() =>
        objectTypes.update({ key: 'valid', data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete custom role', () => {
    it('should process w/ valid input', () => {
      expect(objectTypes.delete({ key: 'valid' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/sunshine/objects/types/valid`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => objectTypes.delete()).toThrowError();
      expect(() => objectTypes.delete({})).toThrowError();
      expect(() => objectTypes.delete('invalid')).toThrowError();
      expect(() => objectTypes.delete({ key: 123 })).toThrowError();
    });
  });
});

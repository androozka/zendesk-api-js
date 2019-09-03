const endpoint = require('../../../../src/v2/support/organization_fields');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('organizations', () => {
  let organization_fields;

  beforeEach(() => (organization_fields = endpoint({ instance, headers })));
  afterEach(() => (organization_fields = null));

  describe('list organization fields', () => {
    it('should process w/ valid input', () => {
      expect(organization_fields.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organization_fields.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organization_fields.list('invalid')).toThrowError();
    });
  });

  describe('show organization field', () => {
    it('should process w/ valid input', () => {
      expect(organization_fields.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organization_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organization_fields.show()).toThrowError();
      expect(() => organization_fields.show({})).toThrowError();
      expect(() => organization_fields.show('invalid')).toThrowError();
      expect(() => organization_fields.show({ id: 0 })).toThrowError();
      expect(() => organization_fields.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create organization fields', () => {
    it('should process w/ valid input', () => {
      expect(organization_fields.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organization_fields.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organization_fields.create()).toThrowError();
      expect(() => organization_fields.create({})).toThrowError();
      expect(() => organization_fields.create('invalid')).toThrowError();
      expect(() =>
        organization_fields.create({ ids: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update organization fields', () => {
    it('should process w/ valid input', () => {
      expect(organization_fields.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organization_fields/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organization_fields.update()).toThrowError();
      expect(() => organization_fields.update({})).toThrowError();
      expect(() => organization_fields.update('invalid')).toThrowError();
      expect(() =>
        organization_fields.update({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete organization fields', () => {
    it('should process w/ valid input', () => {
      expect(organization_fields.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organization_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organization_fields.delete()).toThrowError();
      expect(() => organization_fields.delete({})).toThrowError();
      expect(() => organization_fields.delete('invalid')).toThrowError();
      expect(() => organization_fields.delete({ id: 0 })).toThrowError();
      expect(() =>
        organization_fields.delete({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('reorder organization field', () => {
    it('should process w/ valid input', () => {
      expect(organization_fields.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organization_fields/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organization_fields.reorder()).toThrowError();
      expect(() => organization_fields.reorder({})).toThrowError();
      expect(() => organization_fields.reorder('invalid')).toThrowError();
      expect(() =>
        organization_fields.reorder({ data: 'invalid' })
      ).toThrowError();
    });
  });
});

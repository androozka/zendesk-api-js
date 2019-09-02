const endpoint = require('../../../../src/v2/support/user_fields');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('ticket fields', () => {
  let user_fields;

  beforeEach(() => (user_fields = endpoint({ instance, headers })));
  afterEach(() => (user_fields = null));

  describe('list user fields', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/user_fields.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.list('invalid')).toThrowError();
    });
  });

  describe('show user field', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/user_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.show()).toThrowError();
      expect(() => user_fields.show('invalid')).toThrowError();
      expect(() => user_fields.show({})).toThrowError();
      expect(() => user_fields.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create user fields', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/user_fields.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.create()).toThrowError();
      expect(() => user_fields.create('invalid')).toThrowError();
      expect(() => user_fields.create({})).toThrowError();
      expect(() => user_fields.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update user fields', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/user_fields/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.update()).toThrowError();
      expect(() => user_fields.update('invalid')).toThrowError();
      expect(() => user_fields.update({})).toThrowError();
      expect(() => user_fields.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        user_fields.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete user field', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/user_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.delete()).toThrowError();
      expect(() => user_fields.delete('invalid')).toThrowError();
      expect(() => user_fields.delete({})).toThrowError();
      expect(() => user_fields.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('reorder user field', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/user_fields/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.reorder()).toThrowError();
      expect(() => user_fields.reorder('invalid')).toThrowError();
      expect(() => user_fields.reorder({})).toThrowError();
      expect(() => user_fields.reorder({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list user field options', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.listOptions({ field_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/user_fields/123/options.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.listOptions()).toThrowError();
      expect(() => user_fields.listOptions('invalid')).toThrowError();
      expect(() => user_fields.listOptions({})).toThrowError();
      expect(() =>
        user_fields.listOptions({ field_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('show a user field option', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.showOption({ field_id: 123, id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/123/options/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.showOption()).toThrowError();
      expect(() => user_fields.showOption('invalid')).toThrowError();
      expect(() => user_fields.showOption({})).toThrowError();
      expect(() =>
        user_fields.showOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_fields.showOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create or update a user field option', () => {
    it('should process w/ valid input', () => {
      expect(
        user_fields.createOrUpdateOption({ field_id: 123, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/user_fields/123/options.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.createOrUpdateOption()).toThrowError();
      expect(() => user_fields.createOrUpdateOption('invalid')).toThrowError();
      expect(() => user_fields.createOrUpdateOption({})).toThrowError();
      expect(() =>
        user_fields.createOrUpdateOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_fields.createOrUpdateOption({ field_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete user field option', () => {
    it('should process w/ valid input', () => {
      expect(user_fields.deleteOption({ field_id: 123, id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/user_fields/123/options/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_fields.deleteOption()).toThrowError();
      expect(() => user_fields.deleteOption('invalid')).toThrowError();
      expect(() => user_fields.deleteOption({})).toThrowError();
      expect(() =>
        user_fields.deleteOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_fields.deleteOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});

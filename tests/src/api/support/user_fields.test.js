const endpoint = require('../../../../src/api/support/user_fields');
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

  describe('list user fields', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/user_fields.json`,
        headers
      });
    });
  });

  describe('show user field', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/user_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create user fields', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/user_fields.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update user fields', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/user_fields/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update('invalid')).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete user field', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/user_fields/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('reorder user field', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/user_fields/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.reorder()).toThrowError();
      expect(() => endPoint.reorder('invalid')).toThrowError();
      expect(() => endPoint.reorder({})).toThrowError();
      expect(() => endPoint.reorder({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list user field options', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.listOptions({ field_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/user_fields/123/options.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.listOptions()).toThrowError();
      expect(() => endPoint.listOptions('invalid')).toThrowError();
      expect(() => endPoint.listOptions({})).toThrowError();
      expect(() =>
        endPoint.listOptions({ field_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('show a user field option', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.showOption({ field_id: 123, id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/123/options/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.showOption()).toThrowError();
      expect(() => endPoint.showOption('invalid')).toThrowError();
      expect(() => endPoint.showOption({})).toThrowError();
      expect(() => endPoint.showOption({ field_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.showOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create or update a user field option', () => {
    it('should process w/ valid input', () => {
      expect(
        endPoint.createOrUpdateOption({ field_id: 123, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/user_fields/123/options.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.createOrUpdateOption()).toThrowError();
      expect(() => endPoint.createOrUpdateOption('invalid')).toThrowError();
      expect(() => endPoint.createOrUpdateOption({})).toThrowError();
      expect(() =>
        endPoint.createOrUpdateOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.createOrUpdateOption({ field_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete user field option', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.deleteOption({ field_id: 123, id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/user_fields/123/options/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.deleteOption()).toThrowError();
      expect(() => endPoint.deleteOption('invalid')).toThrowError();
      expect(() => endPoint.deleteOption({})).toThrowError();
      expect(() =>
        endPoint.deleteOption({ field_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.deleteOption({ field_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});

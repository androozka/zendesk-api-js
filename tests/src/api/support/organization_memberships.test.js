const endpoint = require('../../../../src/api/support/organization_memberships');
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

  describe('list memberships', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organization_memberships.json`,
        headers
      });

      expect(endPoint.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/organization_memberships.json`,
        headers
      });

      expect(endPoint.list({ organization_id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/456/organization_memberships.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.list({ organization_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.list({ user_id: 123, organization_id: 456 })
      ).toThrowError();
    });
  });

  describe('show membership', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organization_memberships/123.json`,
        headers
      });

      expect(endPoint.show({ id: 123, user_id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/456/organization_memberships/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ user_id: 'invalid' })).toThrowError();
    });
  });

  describe('create membership', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organization_memberships.json`,
        headers,
        data: {}
      });

      expect(endPoint.create({ user_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/organization_memberships.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.create({ user_id: 'invalid', data: {} })
      ).toThrowError();
    });
  });

  describe('bulk create memberships', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organization_memberships/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_many()).toThrowError();
      expect(() => endPoint.create_many('invalid')).toThrowError();
      expect(() => endPoint.create_many({})).toThrowError();
      expect(() => endPoint.create_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('delete membership', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organization_memberships/123.json`,
        headers
      });

      expect(endPoint.delete({ id: 123, user_id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/456/organization_memberships/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.delete({ id: 123, user_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('bulk delete memberships', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organization_memberships/destroy_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_many()).toThrowError();
      expect(() => endPoint.delete_many('invalid')).toThrowError();
      expect(() => endPoint.delete_many({})).toThrowError();
      expect(() => endPoint.delete_many({ ids: 0 })).toThrowError();
    });
  });

  describe('set membership as default', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.default({ id: 123, membership_id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/organization_memberships/456/make_default.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.default()).toThrowError();
      expect(() => endPoint.default('invalid')).toThrowError();
      expect(() => endPoint.default({})).toThrowError();
      expect(() => endPoint.default({ ids: 0 })).toThrowError();
    });
  });
});

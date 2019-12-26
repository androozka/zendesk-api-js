const endpoint = require('../../../../src/api/support/suspended_tickets');
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

  describe('list suspended tickets', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets.json`,
        headers
      });
    });
  });

  describe('show suspended ticket', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets/123.json`,
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

  describe('recover suspended ticket', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.recover({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/123/recover.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.recover()).toThrowError();
      expect(() => endPoint.recover('invalid')).toThrowError();
      expect(() => endPoint.recover({})).toThrowError();
      expect(() => endPoint.recover({ id: 'invalid' })).toThrowError();
    });
  });

  describe('recover multiple suspended tickets', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.recover_many({ ids: '1,2,3' })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/recover_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.recover_many()).toThrowError();
      expect(() => endPoint.recover_many('invalid')).toThrowError();
      expect(() => endPoint.recover_many({})).toThrowError();
      expect(() => endPoint.recover_many({ ids: 0 })).toThrowError();
    });
  });

  describe('delete suspended ticket', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/123.json`,
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

  describe('delete multiple suspended tickets', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/destroy_many.json?ids=1,2,3`,
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
});

const endpoint = require('../../../../src/api/support/schedules');
const { prepare } = require('../../../../src/utils/options');

describe('Schedules', () => {
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

  describe('List all schedules', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules.json`,
        headers
      });
    });
  });

  describe('Show a schedule', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Create a schedule', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/business_hours/schedules.json`,
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

  describe('Update a schedule', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/business_hours/schedules/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ data: {} })).toThrowError();
      expect(() => endPoint.update({ id: 'invalid', data: {} })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('Delete a schedule', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/business_hours/schedules/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.delete({ id: 0 })).toThrowError();
      expect(() =>
        endPoint.delete({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('Update intervals for a schedule', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update_intervals({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/business_hours/schedules/123/workweek.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_intervals()).toThrowError();
      expect(() => endPoint.update_intervals({})).toThrowError();
      expect(() => endPoint.update_intervals({ data: {} })).toThrowError();
      expect(() =>
        endPoint.update_intervals({ id: 'invalid', data: {} })
      ).toThrowError();
      expect(() =>
        endPoint.update_intervals({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('List holidays for a schedule', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list_holidays({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules/123/holidays.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list_holidays()).toThrowError();
      expect(() => endPoint.list_holidays({})).toThrowError();
      expect(() => endPoint.list_holidays({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Show a holiday', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show_holiday({ id: 123, holiday_id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/business_hours/schedules/123/holidays/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show_holiday()).toThrowError();
      expect(() => endPoint.show_holiday({})).toThrowError();
      expect(() => endPoint.show_holiday({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.show_holiday({ id: 123, holiday_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('Create a holiday', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_holiday({ id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/business_hours/schedules/123/holidays.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_holiday()).toThrowError();
      expect(() => endPoint.create_holiday('invalid')).toThrowError();
      expect(() => endPoint.create_holiday({})).toThrowError();
      expect(() => endPoint.create_holiday({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.create_holiday({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('Update a holiday', () => {
    it('should process w/ valid input', () => {
      expect(
        endPoint.update_holiday({ id: 123, holiday_id: 456, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/business_hours/schedules/123/holidays/456.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_holiday()).toThrowError();
      expect(() => endPoint.update_holiday({})).toThrowError();
      expect(() => endPoint.update_holiday({ data: {} })).toThrowError();
      expect(() =>
        endPoint.update_holiday({ id: 'invalid', data: {} })
      ).toThrowError();
      expect(() =>
        endPoint.update_holiday({ id: 123, holiday_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.update_holiday({ id: 123, holiday_id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('Delete a holiday', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_holiday({ id: 123, holiday_id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/business_hours/schedules/123/holidays/456.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_holiday()).toThrowError();
      expect(() => endPoint.delete_holiday('invalid')).toThrowError();
      expect(() => endPoint.delete_holiday({})).toThrowError();
      expect(() => endPoint.delete_holiday({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.delete_holiday({ id: 123, holiday_id: 'invalid' })
      ).toThrowError();
    });
  });
});

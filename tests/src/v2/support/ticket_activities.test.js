const endpoint = require('../../../../src/v2/support/ticket_activities');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('end users', () => {
  let ticket_activities;

  beforeEach(() => (ticket_activities = endpoint({ instance, headers })));
  afterEach(() => (ticket_activities = null));

  describe('list activities', () => {
    it('should process w/ valid input', () => {
      expect(ticket_activities.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/activities.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticket_activities.list('invalid')).toThrowError();
    });
  });

  describe('show activity', () => {
    it('should process w/ valid input', () => {
      expect(ticket_activities.show({ activity_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/activities/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => ticket_activities.show()).toThrowError();
      expect(() => ticket_activities.show('invalid')).toThrowError();
      expect(() => ticket_activities.show({})).toThrowError();
      expect(() =>
        ticket_activities.show({ activity_id: 'invalid' })
      ).toThrowError();
    });
  });
});

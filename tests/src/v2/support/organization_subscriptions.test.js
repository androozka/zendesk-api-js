const endpoint = require("../../../../src/v2/support/organization_subscriptions");

const instance = "instance";
const url = `https://${instance}.zendesk.com`;
const headers = {
  "Content-Type": "application/json",
  Authorization: "Basic <64bit_encoded_credentials>"
};

describe("organization subscriptions", () => {
  let organizationSubscriptions;

  beforeEach(
    () => (organizationSubscriptions = endpoint({ instance, headers }))
  );
  afterEach(() => (organizationSubscriptions = null));

  describe("list subscriptions", () => {
    it("should process w/ valid input", () => {
      expect(organizationSubscriptions.list()).toEqual({
        method: "GET",
        url: `${url}/api/v2/organization_subscriptions.json`,
        headers
      });

      expect(organizationSubscriptions.list({ user_id: 123 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/users/123/organization_subscriptions.json`,
        headers
      });

      expect(organizationSubscriptions.list({ organization_id: 456 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/organizations/456/subscriptions.json`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationSubscriptions.list("invalid")).toThrowError();
      expect(() =>
        organizationSubscriptions.list({ user_id: "invalid" })
      ).toThrowError();
      expect(() =>
        organizationSubscriptions.list({ organization_id: "invalid" })
      ).toThrowError();
      expect(() =>
        organizationSubscriptions.list({ user_id: 123, organization_id: 456 })
      ).toThrowError();
    });
  });

  describe("show subscriptions", () => {
    it("should process w/ valid input", () => {
      expect(organizationSubscriptions.show({ id: 123 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/organization_subscriptions/123.json`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationSubscriptions.show()).toThrowError();
      expect(() => organizationSubscriptions.show("invalid")).toThrowError();
      expect(() => organizationSubscriptions.show({})).toThrowError();
    });
  });

  describe("create subscription", () => {
    it("should process w/ valid input", () => {
      expect(organizationSubscriptions.create({ data: {} })).toEqual({
        method: "POST",
        url: `${url}/api/v2/organization_subscriptions.json`,
        headers,
        data: {}
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationSubscriptions.create()).toThrowError();
      expect(() => organizationSubscriptions.create("invalid")).toThrowError();
      expect(() => organizationSubscriptions.create({})).toThrowError();
      expect(() =>
        organizationSubscriptions.create({ data: "invalid" })
      ).toThrowError();
    });
  });

  describe("delete subscription", () => {
    it("should process w/ valid input", () => {
      expect(organizationSubscriptions.delete({ id: 123 })).toEqual({
        method: "DELETE",
        url: `${url}/api/v2/organization_subscriptions/123.json`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationSubscriptions.delete()).toThrowError();
      expect(() => organizationSubscriptions.delete("invalid")).toThrowError();
      expect(() => organizationSubscriptions.delete({})).toThrowError();
      expect(() =>
        organizationSubscriptions.delete({ id: "invalid" })
      ).toThrowError();
    });
  });
});

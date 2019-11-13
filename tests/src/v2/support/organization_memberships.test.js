const endpoint = require("../../../../src/v2/support/organization_memberships");

const instance = "instance";
const url = `https://${instance}.zendesk.com`;
const headers = {
  "Content-Type": "application/json",
  Authorization: "Basic <64bit_encoded_credentials>"
};

describe("organization memberships", () => {
  let organizationMemberships;

  beforeEach(() => (organizationMemberships = endpoint({ instance, headers })));
  afterEach(() => (organizationMemberships = null));

  describe("list memberships", () => {
    it("should process w/ valid input", () => {
      expect(organizationMemberships.list()).toEqual({
        method: "GET",
        url: `${url}/api/v2/organization_memberships.json`,
        headers
      });

      expect(organizationMemberships.list({ user_id: 123 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/users/123/organization_memberships.json`,
        headers
      });

      expect(organizationMemberships.list({ organization_id: 456 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/organizations/456/organization_memberships.json`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.list("invalid")).toThrowError();
      expect(() =>
        organizationMemberships.list({ user_id: "invalid" })
      ).toThrowError();
      expect(() =>
        organizationMemberships.list({ organization_id: "invalid" })
      ).toThrowError();
      expect(() =>
        organizationMemberships.list({ user_id: 123, organization_id: 456 })
      ).toThrowError();
    });
  });

  describe("show membership", () => {
    it("should process w/ valid input", () => {
      expect(organizationMemberships.show({ id: 123 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/organization_memberships/123.json`,
        headers
      });

      expect(organizationMemberships.show({ id: 123, user_id: 456 })).toEqual({
        method: "GET",
        url: `${url}/api/v2/users/456/organization_memberships/123.json`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.show()).toThrowError();
      expect(() => organizationMemberships.show("invalid")).toThrowError();
      expect(() => organizationMemberships.show({})).toThrowError();
      expect(() =>
        organizationMemberships.show({ user_id: "invalid" })
      ).toThrowError();
    });
  });

  describe("create membership", () => {
    it("should process w/ valid input", () => {
      expect(organizationMemberships.create({ data: {} })).toEqual({
        method: "POST",
        url: `${url}/api/v2/organization_memberships.json`,
        headers,
        data: {}
      });

      expect(
        organizationMemberships.create({ user_id: 123, data: {} })
      ).toEqual({
        method: "POST",
        url: `${url}/api/v2/users/123/organization_memberships.json`,
        headers,
        data: {}
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.create()).toThrowError();
      expect(() => organizationMemberships.create("invalid")).toThrowError();
      expect(() => organizationMemberships.create({})).toThrowError();
      expect(() =>
        organizationMemberships.create({ data: "invalid" })
      ).toThrowError();
      expect(() =>
        organizationMemberships.create({ user_id: "invalid", data: {} })
      ).toThrowError();
    });
  });

  describe("bulk create memberships", () => {
    it("should process w/ valid input", () => {
      expect(organizationMemberships.create_many({ data: {} })).toEqual({
        method: "POST",
        url: `${url}/api/v2/organization_memberships/create_many.json`,
        headers,
        data: {}
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.create_many()).toThrowError();
      expect(() =>
        organizationMemberships.create_many("invalid")
      ).toThrowError();
      expect(() => organizationMemberships.create_many({})).toThrowError();
      expect(() =>
        organizationMemberships.create_many({ data: "invalid" })
      ).toThrowError();
    });
  });

  describe("delete membership", () => {
    it("should process w/ valid input", () => {
      expect(organizationMemberships.delete({ id: 123 })).toEqual({
        method: "DELETE",
        url: `${url}/api/v2/organization_memberships/123.json`,
        headers
      });

      expect(organizationMemberships.delete({ id: 123, user_id: 456 })).toEqual(
        {
          method: "DELETE",
          url: `${url}/api/v2/users/456/organization_memberships/123.json`,
          headers
        }
      );
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.delete()).toThrowError();
      expect(() => organizationMemberships.delete("invalid")).toThrowError();
      expect(() => organizationMemberships.delete({})).toThrowError();
      expect(() =>
        organizationMemberships.delete({ id: "invalid" })
      ).toThrowError();
      expect(() =>
        organizationMemberships.delete({ id: 123, user_id: "invalid" })
      ).toThrowError();
    });
  });

  describe("bulk delete memberships", () => {
    it("should process w/ valid input", () => {
      expect(organizationMemberships.delete_many({ ids: "1,2,3" })).toEqual({
        method: "DELETE",
        url: `${url}/api/v2/organization_memberships/destroy_many.json?ids=1,2,3`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.delete_many()).toThrowError();
      expect(() =>
        organizationMemberships.delete_many("invalid")
      ).toThrowError();
      expect(() => organizationMemberships.delete_many({})).toThrowError();
      expect(() =>
        organizationMemberships.delete_many({ ids: 0 })
      ).toThrowError();
    });
  });

  describe("set membership as default", () => {
    it("should process w/ valid input", () => {
      expect(
        organizationMemberships.default({ id: 123, membership_id: 456 })
      ).toEqual({
        method: "PUT",
        url: `${url}/api/v2/users/123/organization_memberships/456/make_default.json`,
        headers
      });
    });

    it("should throw error w/ invalid input", () => {
      expect(() => organizationMemberships.default()).toThrowError();
      expect(() => organizationMemberships.default("invalid")).toThrowError();
      expect(() => organizationMemberships.default({})).toThrowError();
      expect(() => organizationMemberships.default({ ids: 0 })).toThrowError();
    });
  });
});

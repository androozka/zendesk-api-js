const endpoint = require("../../../src/v2/support");

const instance = "instance";
const headers = {};

const check = (type, compare = "object") => expect(typeof type).toBe(compare);

describe("support api", () => {
  let support;

  beforeEach(() => (support = endpoint({ instance, headers })));
  afterEach(() => (support = null));

  test("custom_agent_roles", () => check(support.custom_agent_roles));
  test("end_users", () => check(support.end_users));
  test("group_memberships", () => check(support.group_memberships));
  test("groups", () => check(support.groups));
  test("organizations", () => check(support.organizations));
  test("organization_fields", () => check(support.organization_fields));
  test("organization_subscriptions", () =>
    check(support.organization_subscriptions));
  test("organization_memberships", () =>
    check(support.organization_memberships));
  test("search", () => check(support.search, "function"));
  test("suspended_tickets", () => check(support.suspended_tickets));
  test("tags", () => check(support.tags));
  test("ticket_activities", () => check(support.ticket_activities));
  test("ticket_comments", () => check(support.ticket_comments));
  test("ticket_fields", () => check(support.ticket_fields));
  test("ticket_forms", () => check(support.ticket_forms));
  test("ticket_import", () => check(support.ticket_import));
  test("ticket_metrics", () => check(support.ticket_metrics));
  test("tickets", () => check(support.tickets));
  test("user_fields", () => check(support.user_fields));
  test("user_passwords", () => check(support.user_passwords));
  test("users", () => check(support.users));
  test("views", () => check(support.views));
});

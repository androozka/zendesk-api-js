module.exports = ({ instance, headers }) => ({
  custom_agent_roles: require("./custom_agent_roles")({ instance, headers }),
  end_users: require("./end_users")({ instance, headers }),
  group_memberships: require("./group_memberships")({ instance, headers }),
  groups: require("./groups")({ instance, headers }),
  organizations: require("./organizations")({ instance, headers }),
  organization_fields: require("./organization_fields")({ instance, headers }),
  organization_memberships: require("./organization_memberships")({
    instance,
    headers
  }),
  organization_subscriptions: require("./organization_subscriptions")({
    instance,
    headers
  }),
  search: require("./search")({ instance, headers }),
  suspended_tickets: require("./suspended_tickets")({ instance, headers }),
  tags: require("./tags")({ instance, headers }),
  ticket_activities: require("./ticket_activities")({ instance, headers }),
  ticket_comments: require("./ticket_comments")({ instance, headers }),
  ticket_fields: require("./ticket_fields")({ instance, headers }),
  ticket_forms: require("./ticket_forms")({ instance, headers }),
  ticket_import: require("./ticket_import")({ instance, headers }),
  ticket_metrics: require("./ticket_metrics")({ instance, headers }),
  tickets: require("./tickets")({ instance, headers }),
  user_fields: require("./user_fields")({ instance, headers }),
  user_passwords: require("./user_passwords")({ instance, headers }),
  users: require("./users")({ instance, headers }),
  views: require("./views")({ instance, headers })
});

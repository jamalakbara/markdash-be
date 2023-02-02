export const metricParentOverview = [
  "spend",
  "impressions",
  "frequency",
  "cpm",
  "cpc",
  "clicks",
  "actions",
  "action_values",
  "ctr",
  "cost_per_action_type"
]

export const metricChildOverview = [
  {
    parent: "actions",
    child: "link_click",
    name: "link_click",
  },
  {
    parent: "actions",
    child: "landing_page_view",
    name: "landing_page_view",
  },
  {
    parent: "actions",
    child: "omni_purchase",
    name: "purchase",
  },
  {
    parent: "actions",
    child: "add_to_cart",
    name: "add_to_cart",
  },
  {
    parent: "action_values",
    child: "omni_purchase",
    name: "purchase_values",
  },
  {
    parent: "action_values",
    child: "add_to_cart",
    name: "add_to_cart_values",
  },
  {
    parent: "cost_per_action_type",
    child: "landing_page_view",
    name: "cost_per_landing_page_view",
  },
  {
    parent: "cost_per_action_type",
    child: "omni_purchase",
    name: "cost_per_purchase",
  },
  {
    parent: "cost_per_action_type",
    child: "add_to_cart",
    name: "cost_per_atc",
  },
]
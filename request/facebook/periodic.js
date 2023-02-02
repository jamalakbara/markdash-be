export const metricParent = [
  "spend",
  "cpm",
  "cpc",
  "clicks",
  "actions",
  "action_values",
]

export const metricChild = [
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
]
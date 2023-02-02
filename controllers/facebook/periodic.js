import { metricParent, metricChild } from "../../request/facebook/periodic.js"
import axios from "axios"

export const getPeriodic = (req, res) => {
  const {
    ad_account_id,
    access_token,
    date_start,
    date_end,
    date_start_compared,
    date_end_compared
  } = req.body

  // declare fields
  const fields = metricParent.join(",")

  // declare time range
  let time_range
  if (!date_start_compared){
    time_range = JSON.stringify(
      {
        since: date_start,
        until: date_end
      }
    )
  }
  else{
    time_range_compared = JSON.stringify(
      {
        since: date_start_compared,
        until: date_end_compared
      }
    )
  }

  const defaultFilter = [
    {
      field: "action_type",
      operator: "IN",
      value: [
        'link_click',
        'landing_page_view',
        'add_to_cart',
        'omni_purchase',
      ]
    }
  ]

  let filtering = JSON.stringify(defaultFilter)

  let request_url = `${process.env.FB_URI}/${process.env.FB_VER}/${ad_account_id}/insights`
  request_url     += `?fields=${fields}`
  request_url     += `&level=account`
  request_url     += `&access_token=${access_token}`
  request_url     += `&time_range=${time_range}`
  request_url     += `&filtering=${filtering}`
  request_url     += `&action_attribution_windows=["7d_click","1d_view"]`
  request_url     += `&use_account_attribution_setting=true`
  request_url     += `&time_increment=1`
  request_url     += `&limit=400`

  axios.get(request_url)
    .then(response => {

      res.status(200).json(response.data)
    })
    .catch(error => res.status(400).json(error))
}
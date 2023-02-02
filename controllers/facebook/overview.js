// const axios = require('axios').default
import axios from "axios"
import { metricParentOverview,metricChildOverview } from "../../request/facebook/overview.js"

export const getOverview = async (req, res) => {
  const {
    ad_account_id,
    access_token,
    date_start,
    date_end,
    date_start_compared,
    date_end_compared
  } = req.body
  
  // declare fields
  const fields = metricParentOverview.join(",")

  // declare time range
  let time_range
  if (!date_start_compared){
    time_range = JSON.stringify(
      [
        {
          since: date_start,
          until: date_end
        }
      ]
    )
  }
  else{
    time_range = JSON.stringify(
      [
        {
          since: date_start,
          until: date_end
        },
        {
          since: date_start_compared,
          until: date_end_compared
        },
      ]
    )
  }

  const defaultFilter = [
    {
      field: "action_type",
      operator: "IN",
      value: [
        'omni_view_content', 
        'omni_add_to_cart', 
        'landing_page_view', 
        'link_click', 
        'omni_purchase', 
        'omni_initiated_checkout', 
        'post_engagement', 
        'lead', 
        'post_engagement', 
        'onsite_conversion.post_save', 
        'post_reaction', 
        'comment', 
        'post', 
        'outbound_click', 
        'video_view', 
        'offsite_conversion.fb_pixel_custom', 
        'omni_complete_registration', 
        'submit_application_total', 
        'onsite_conversion.messaging_first_reply', 
        'onsite_conversion.messaging_block', 
        'onsite_conversion.messaging_conversation_started_7d'
      ]
    }
  ]

  let filtering = JSON.stringify(defaultFilter)

  let request_url = `${process.env.FB_URI}/${process.env.FB_VER}/${ad_account_id}/insights`
  request_url     += `?fields=${fields}`
  request_url     += `&level=account`
  request_url     += `&access_token=${access_token}`
  request_url     += `&time_ranges=${time_range}`
  // request_url     += `&filtering=${filtering}`
  request_url     += `&action_attribution_windows=["7d_click","1d_view"]`
  request_url     += `&use_account_attribution_setting=true`
  // request_url     += `&use_unified_attribution_setting=true`

  await axios.get(request_url)
    .then(response => {

      let current_data, compared_data, percentage_data

      const raw_data = response.data

      // res.status(200).json(raw_data)
      // return

      const date = `${date_start} - ${date_end}`
      const date_compared = date_start_compared ? `${date_start_compared} - ${date_end_compared}` : ''
      
      let facebook_data = {}
      
      raw_data["data"].forEach(dt => {
        const periode = `${dt.date_start} - ${dt.date_stop}`
        facebook_data = {
          ...facebook_data,
          [periode]: {
            ...dt
          }
        }
      })
      
      current_data = _format_overview(facebook_data, metricChildOverview, date)
      
      if (date_start_compared){
        compared_data = _format_overview(facebook_data, metricChildOverview, date_compared)
      }

      res.status(200).json({
        data: {
          current: current_data,
          previous: compared_data
        }
      })
    })
    .catch(error => res.status(400).json(error))
}

const _format_overview = (facebook_data, metrics, date) => {
  let data
  let value = 0

  metrics.forEach(metric => {
    if (metric.parent in facebook_data[date]){
      const action_data = facebook_data[date][metric.parent]

      let find_value = action_data.find(dt => dt.action_type === metric.child);
      value = find_value ? find_value.value : 0
      
    }
    else{
      value = 0
    }

    data = {
      ...data,
      ...facebook_data[date],
      [metric.name]: value,
    }

    delete data.actions
    delete data.action_values
    delete data.cost_per_action_type
    delete data.date_start
    delete data.date_stop
  })

  return data
}
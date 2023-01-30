// const axios = require('axios').default
import axios from "axios"

export const getFacebook = (req, res) => {
  res.send('this works')
}

export const getData = (req, res) => {
  const {
    ad_account_id,
    access_token
  } = req.body

  axios.get(`${process.env.FB_URI}/${process.env.FB_VER}/${ad_account_id}/insights?fields=impressions,ad_id,ad_name&access_token=${access_token}&level=ad`)
    .then(response => {
      const data = response.data
      res.send(data)
    })
    .catch(error => console.log(error))
}
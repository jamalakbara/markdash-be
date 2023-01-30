import express from 'express'

import { getOverview, getFacebook } from '../controllers/facebook.js'

const router = express.Router()

router.get('/', getFacebook)

router.post('/overview', getOverview)

export default router
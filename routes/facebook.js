import express from 'express'

import { getOverview } from '../controllers/facebook/overview.js'
import { getPeriodic } from '../controllers/facebook/periodic.js'

const router = express.Router()

router.post('/overview', getOverview)
router.post('/periodic', getPeriodic)

export default router
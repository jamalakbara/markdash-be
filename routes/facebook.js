import express from 'express'

import { getData, getFacebook } from '../controllers/facebook.js'

const router = express.Router()

router.get('/', getFacebook)

router.post('/data', getData)

export default router
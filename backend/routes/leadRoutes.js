import express from 'express'
import { leadController } from '../controllers/leadController.js'
import { validateLead } from '../middlewares/validator.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

// All routes are protected
router.use(authenticate)

router.get('/', leadController.getAllLeads)
router.get('/:id', leadController.getLeadById)
router.post('/', validateLead, leadController.createLead)
router.put('/:id', validateLead, leadController.updateLead)
router.patch('/:id/status', leadController.updateLeadStatus)
router.delete('/:id', leadController.deleteLead)

export default router
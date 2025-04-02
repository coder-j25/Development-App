import express from 'express'
import testimonialController from "../controllers/testimonialControllers.js"



const router = express.Router()

router.route('/testimonials/:username?').get(testimonialController.getAllTestimonials)
router.route('/addTestimonial').post(testimonialController.addTestimonial)
router.route('/deletetestimonial').post(testimonialController.deleteTestimonial)
router.route('/updatetestimonial').patch(testimonialController.updateTestimonial)







export default router
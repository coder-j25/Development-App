import mongoose from 'mongoose'



const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    testimony: {
        type: String,
    },
    username: {
        type: String,
        required: true
    }
})



const Testimonial = mongoose.model('testimonial', testimonialSchema)

export default Testimonial
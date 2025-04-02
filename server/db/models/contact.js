import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    note: {
        type: String
    }
})

const Contact = mongoose.model('contact', contactSchema)

export default Contact
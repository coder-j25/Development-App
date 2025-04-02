import Testimonial from "../db/models/testimonials.js"

const testimonialControllers = {


    addTestimonial: (req, res) => {
                console.log("addTestimonial", req.body)
                let { name, testimony, username } = req.body
                let data = {
                    name,
                    testimony,
                    username
                }
                let newTestimonial = new Testimonial(data)
        
                newTestimonial.save()
                    .then(() => {
                        Testimonial.find()
                            .then((testimonials) => {
                                res.json(testimonials)
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            },

    getAllTestimonials: (req, res, next) => {
        // If user is admin
       if (req.params.username && req.params.username === 'admin') {
            Testimonial.find()
                .then((testimonials) => {
                    res.json(testimonials)
                })
                .catch(err => console.log(err))
        }
        // If user is not admin
        else if (req.params.username && req.params.username !== 'admin') {
            Testimonial.find({username: req.params.username})
            .then((testimonials) => {
                res.json(testimonials)
            })
            .catch(err => console.log(err))
        }
        // If user is not logged in/all results
        else {
            Testimonial.find()
            .then((testimonials) => {
                res.json(testimonials)
            })
            .catch(err => console.log(err))
        } 
},

    deleteTestimonial: (req, res) => {
        let { _id } = req.body
        Testimonial.findByIdAndDelete({ _id })
            .then(() => {
                Testimonial.find()
                    .then((testimonials) => {
                        res.json(testimonials)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    },
    updateTestimonial: (req, res) => {
        let { name, testimony,  _id } = req.body
        let udatedTestimonial = { name, testimony, _id }

        Testimonial.findByIdAndUpdate({ _id }, udatedTestimonial)
            .then(() => {
                Testimonial.find()
                    .then((testimonials) => {
                        res.json(testimonials)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}





export default testimonialControllers
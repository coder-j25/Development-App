import jwt from 'jsonwebtoken'
import passport from 'passport'
import 'dotenv/config'



import Contact from "../db/models/contact.js"



const authControllers = {
    register: (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            const response = { auth: false }
            if (err) {
                console.log(err)
                response.err = err
                return res.status(500).json(response)
            }
            if (!user) {
                response.info = info
                return res.status(200).json(response)
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
                response.token = token
                response.auth = true
                response.userInfo = user
                return res.status(200).json(response)

            }


        })(req, res, next)

    },
    login: (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            const response = { auth: false }
            if (err) {
                response.info = info
                res.status(500).json(response)
            }
            if (!user) {
                response.info = info
                res.status(200).json(response)
            } else {
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).json(response)
                    } else {
                        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
                        response.token = token
                        response.auth = true
                        response.userInfo = user
                        return res.status(200).json(response)
                    }
                })
            }
        })(req, res, next)
    },
    validateAuth: (req, res) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log("validateAuth err", err)
                return res.status(401).json({ auth: false, message: 'an error occured' })
            } if (!user) {
                console.log("validateAuth !user", err)
                return res.status(401).json({ auth: false, message: 'unathorized' })
            } else {
                console.log("validateAuth else", err)
                return res.status(200).json({ auth: true, userInfo: { id: user._id, username: user.username, email: user.email } })
            }
        })(req, res)
    },
    addContact: (req, res) => {
        let { fullName, phone, email, note } = req.body
        let data = {
            fullName,
            phone,
            email,
            note,

        }
        let newContact = new Contact(data)

        newContact.save()
            .then(() => {
                Contact.find()
                    .then((contacts) => {
                        res.json(contacts)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
}


export default authControllers
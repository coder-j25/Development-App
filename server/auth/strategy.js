import LocalStrategy from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import bcryptjs from 'bcryptjs'
import User from '../db/models/user.js'
import 'dotenv/config'

const strategy = (passport) => {
    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, (username, password, done) => {
        User.findOne({ username })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username or password' })
                }
                if (!bcryptjs.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect username or password' })
                } else {
                    return done(null, user)
                }
            }).catch(err => done(err))
    }))



    passport.use('register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {

        // console.log("req.body", req.body)


        let {
            firstName,
            lastName,
            email,
        } = req.body
        console.log(firstName, lastName, email)
        User.findOne({ $or: [{ email }, { username }] })
            .then((foundUser) => {

                if (foundUser) {

                    if (foundUser.username === username && foundUser.email === email) {
                        return done(null, false, { message: 'Username and email are taken' })
                    } else if (foundUser.username === username) {
                        return done(null, false, { message: 'Username is taken' })
                    } else if (foundUser.email === email) {
                        return done(null, false, { message: 'Email is taken' })
                    }
                } else {
                    const hash = bcryptjs.hashSync(password, 10)
                    let userData = { firstName, lastName, email, username, password: hash }
                    let newUser = new User(userData)
                    newUser.save()
                        .then((user) => done(null, user, { message: 'Register Successful' }))
                        .catch((err) => done(err))
                }
            })
    }))

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromBodyField('token'),
        secretOrKey: process.env.JWT_SECRET
    }, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then((user) => {
                if (user) {
                    return done(null, user)
                }
            }).catch(err => done(err, false))
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((_id, done) => {
        User.findOne({ _id }).then(user => {
            return done(null, user)
        }).catch(err => console.log(err))
    })

}


export default strategy

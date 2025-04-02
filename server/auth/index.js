import passport from 'passport'
import session from 'express-session'
import config from '../config.js'
import strategy from './strategy.js'


const auth = (app) =>{
    app.use(session(config.sessionsConfig))
    app.use(passport.initialize())
    app.use(passport.session())
    strategy(passport)
}
export default auth




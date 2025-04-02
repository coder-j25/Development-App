import MongoStore from 'connect-mongo'
import 'dotenv/config'

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    corsConfig:{
        orgin: "http://localhost:3000",
        optionSuccessStatus: 200,
        credentials: true
    },
    sessionsConfig: {
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUnintialized: true,
        store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
        cookie: {secure: false},
        key:'express.sid'
    }
}
export default config
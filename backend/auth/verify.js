const sessions = require('../models/session')

module.exports = async function (req, res, next) {
    // console.log(req.session.user)
    // res.status(404).send('njeng!')
    try {
        const bruh = req.sessionID
        const expiration = new Date(req.session.cookie._expires)
        if (!expiration) {
            console.log('expiration does not exist!')
            return res.status(400).json({ message: `expiration does not exist! : ${bruh}`, login: false })
        }

        if (expiration < new Date()) {
            console.log('expiration is due!')
            req.session.destroy((err) => {
                if (err) console.log(err)
                console.log('expired session is destroyed')
            })
            return res.status(400).json({ message: `session is expired!:${bruh}`, login: false })
        }


        const dbId = await sessions.exists({ _id: bruh })
        if (!dbId) return res.status(400).json({ message: `session doesnt exist! : ${bruh}`, login: false })
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'session is expired!', login: false })
    }
}

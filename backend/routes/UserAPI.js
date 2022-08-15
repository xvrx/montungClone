const route = require('express').Router()
const UserModel = require('../models/UserModel.js')
const UserIDModel = require('../models/UserIDModel.js')


// create Store in DB
//  localhost:2000/api/user


route.get('/', (req, res) => {
    if (req.session.login) {
        console.log(req)
        UserModel.find({})
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((err) => {
                res.status(401).send("error when fetching!", err)
            })
    } else {
        res.status(400).send('login dlu njeng')
    }
})


route.get('/verify', async (req, res) => {
    if (req.session.login == true) {
        try {
            const user = req?.session?.user
            console.log('verified :', user)
            const bruh = await UserIDModel.findOne({ nip: user }).exec()
            res.status(200).json({
                stat: true,
                data: bruh
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ stat: false, message: 'failed to match any user!' })
        }
    } else { res.status(400).json({ stat: false, message: 'credential is not available!' }) }

})


route.post('/destroy', (req, res) => {
    if (req.session.login) {
        req.session.destroy((err) => {
            if (err) throw err;
            res.json({ stat: true })
        })
    } else {
        res.status(400).send('login dlu njeng')
    }
})




route.post('/', async (req, res) => {
    const attempt = req.body
    if (!attempt.user) return res.status(404).json({ title: 'Invalid User', desc: 'please input a valid user credential!' })
    if (!attempt.key) return res.status(404).json({ title: 'Invalid User', desc: 'please input a valid user credential!' })
    try {
        const result = await UserModel.findOne({ user: attempt.user }).exec();
        if (result === null || result === undefined) return res.status(404).json({ title: 'Invalid User', desc: 'wrong username/password!' })
        // activity logger
        console.log(`${result.user} logged in at ${new Date()}`)

        if (result.user === attempt.user && result.key === attempt.key) {
            req.session.login = true
            req.session.user = req.body.user
            // fetch role
            try {
                const bruh = await UserIDModel.findOne({ nip: req.body.user }).exec()
                req.session.role = bruh.role
                req.session.nama = bruh.nama
                res.status(200).json({ status: true })
            } catch (error) {
                console.log(error)
                res.status(400).send('user not found!')
            }
        } else { res.status(404).json({ title: 'Invalid User', desc: 'wrong username/password!' }) }

    } catch (error) {
        console.log(error)
        if (error.toString().includes('ECONNREFUSED')) return res.status(404).json({ title: 'DB Error', desc: 'contact the admin to turn on the DB!' })
        return res.status(404).json({ title: 'DB Error', desc: 'contact the admin to turn on the DB!' })
    }
})


route.post('/profilepic', async (req, res) => {
    res.status(200).send('bruh moment')
})

module.exports = route
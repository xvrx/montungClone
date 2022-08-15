const route = require('express').Router()
const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const verifiee = require('../auth/auth')

route.get('/', async (req, res) => {
    UserModel.find({})
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(401).send("error when fetching!", err)
        })
})

route.post('/', async (req, res) => {
    let user = req.body
    if (!user.nip) return res.status(400).send('please enter user ID!')
    if (!user.password) return res.status(400).send('please enter user Password!')
    try {
        if (user.password.length <= 24) {
            const salted = await bcrypt.genSalt(7)
            const hashed = await bcrypt.hash(user.password, salted)
            const bruh = await new UserModel({
                nip: user.nip,
                password: hashed
            })
            await bruh.save()
            res.status(201).json({ message: 'data posted!', result: bruh._id })
        } else { res.status(401).send('password should not be more than 24 characters!') }

    } catch (error) {
        if (error.code == 11000) return res.status(401).send('NIP or password has already existed!')
        console.log(error);
    }
})

module.exports = route
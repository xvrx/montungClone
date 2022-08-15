const route = require('express').Router()
const MasterFile = require('../models/Masterfile')
const verify = require('../auth/verify.js')
const mongoose = require('mongoose')

const pajakConn = mongoose.createConnection('mongodb://localhost:27017');

route.get('/:npwp', verify, async (req, res) => {
    // console.log(req.params.npwp)
    try {
        if (req.params.npwp.length === 15) {
            const masterfileConn = pajakConn.useDb('pajak')
            const masterModel = masterfileConn.model('masterfile', MasterFile)
            const found = await masterModel.findOne({ NPWP: req.params.npwp }).exec()
            if (found === null) { res.status(400).json({ message: 'no npwp found!' }) } else { res.status(200).json({ found }) }

        } else { return res.status(400).json('req.params is not 15 chars') }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'youre retarded!' })
    }
})


module.exports = route
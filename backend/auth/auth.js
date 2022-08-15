// middleware that runs in each request if it is involved
// const jwt = require('jsonwebtoken')


module.exports = async function (req, res, next) {

    // refer to the value of header which name is 'auth-token'
    const attempt = req.header('auth-token')
    // if it doesnt exist, then send error
    if (!attempt) return res.status(401).send("invalid session!")
    //  if it is, proceed to verify the token embedded in auth-token header
    try {
        verified = jwt.verify(attempt, process.env.SECRETNIGGAS)
        // req.user = verified
    } catch (error) {
        res.status(400).send('invalid token, please log in with the right credentials!')
    }
    next()
}

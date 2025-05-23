const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
    const body = request.body
    const username = body.username
    const password = body.password

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcryptjs.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'Invalid username or password'
      })
    }
  
    const tokenUser = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(tokenUser, process.env.SECRET)
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
})


module.exports = loginRouter
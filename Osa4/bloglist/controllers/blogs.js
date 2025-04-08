const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { request } = require('../app')
const Blog = require('../models/blog')
const { blogs } = require('../tests/test_helper')
const logger = require('../utils/logger')
const errorHandler = require('../utils/middleware')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id:1 })
  response.json(blogs)
})

const getToken = request => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async(request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getToken(request), process.env.SECRET)
  if(decodedToken === null){
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.hasOwnProperty('title') || !body.hasOwnProperty('url')){
    logger.info('Bad request')
    response.status(400).json({message: "Bad request"})
  }else{
    let likeAmount = 0
    if(body.hasOwnProperty('likes')){
      logger.info(body.likes + ' likes!')
      likeAmount = body.likes
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likeAmount,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async(request, response) =>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async(request, response) => {
  const blog  = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  }else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, updateBlog)
  response.status(201).json(blogUpdated)
})

module.exports = blogsRouter
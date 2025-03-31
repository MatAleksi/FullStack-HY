const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async(request, response) => {
  const body = request.body
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
      likes: likeAmount
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async(request, response) =>{
  const blogs = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async(request, response) => {
  const blog  = await Blog.findById(request.params.id)
  response.json(blog)
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
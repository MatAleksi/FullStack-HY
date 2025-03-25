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
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) =>{
  const blogs = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
module.exports = blogsRouter
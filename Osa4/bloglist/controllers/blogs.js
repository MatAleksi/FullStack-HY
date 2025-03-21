const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', (request, response) => {
    logger.info('test')
    Blog.find({})
      .then(blogs => {
        logger.info(blogs)
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const body = request.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
})

module.exports = blogsRouter
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('Blogs are returned as JSON', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Blogs are identified with id', async() => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const list = response.body.map(r => r.id)
    assert.strictEqual(list.length, response.body.length)
    assert.strictEqual(response.body[0]._id, undefined)
})

describe('Adding blogs', () => {
    test('Blog can be added', async() => {
        const newBlog = {
            title: 'aaa',
            author: 'bbb',
            url: 'aba.com',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const list = response.body.map(r => r.title)
        assert.strictEqual('aaa', list[2])    
    })

    test('Amount of blogs grows by one', async() =>{
        const newBlog = {
            title: 'aaa',
            author: 'bbb',
            url: 'aba.com',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length+1)
    })
})
after(async () => {
    await mongoose.connection.close()
})
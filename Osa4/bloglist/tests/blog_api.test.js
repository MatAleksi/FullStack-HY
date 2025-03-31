const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')
const logger = require('../utils/logger')

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

    test('Correct blog is added', async() =>{
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
        const blog = response.body[2]
        assert.strictEqual(blog.title, newBlog.title)
        assert.strictEqual(blog.author, newBlog.author)
        assert.strictEqual(blog.url, newBlog.url)
    })

    test('If likes is given no value, it becomes 0', async() => {
        const newBlog = {
            title: 'aaa',
            author: 'bbb',
            url: 'aba.com',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const list = response.body.map(r => r.likes)
        assert.strictEqual(0, list[2])
    })

    test('If title field is missing return 400', async() => {
        const newBlog = {
            author: 'bbb',
            url: 'aba.com',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const list = response.body.map(r => r.likes)
        assert.strictEqual(list.length, initialBlogs.length)
    })

    test('If title url is missing return 400', async() => {
        const newBlog = {
            title: 'aba',
            author: 'bbb',
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const list = response.body.map(r => r.likes)
        assert.strictEqual(list.length, initialBlogs.length)
    })
})

describe('Deleting blogs', () => {
    test('Length of bloglist goes down by one', async() => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const list = response.body.map(r => r.id)
        await api
            .delete(`/api/blogs/${list[0]}`)
            .expect(204)
        const response2 = await api.get('/api/blogs')
        assert.strictEqual(initialBlogs.length-1, response2.body.length)
    })
    test('Correct blog is deleted', async() => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const list = response.body.map(r => r.id)
        await api
            .delete(`/api/blogs/${list[0]}`)
            .expect(204)
        const response2 = await api.get('/api/blogs')
        assert.notStrictEqual(initialBlogs[0].id, list[0])
    })
})

describe('Updating blogs', () => {   
    test('Updated blog updates', async() => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const list = response.body.map(r => r.id)
        const id = list[0]
        const newBlog = {
            title: 'aaaaa',
            author: 'bbbbb',
            url: 'bababa.com',
            likes: 1
        }
        await api
            .put(`/api/blogs/${id}`)
            .send(newBlog)
            .expect(201)
        const updatedBlog = await api
            .get(`/api/blogs/${id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(newBlog.title, updatedBlog.body.title)
        assert.strictEqual(newBlog.author, updatedBlog.body.author)
        assert.strictEqual(newBlog.url, updatedBlog.body.url)
        assert.strictEqual(newBlog.likes, updatedBlog.body.likes)
    })
    
})

after(async () => {
    await mongoose.connection.close()
})
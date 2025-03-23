const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testBlogs = require('./testblogs')

const blog = testBlogs.oneBlog
const blogs = testBlogs.blogs

describe('Total likes', () => { 
    test('Empty list returns zero', () => {
        const likes = listHelper.totalLikes([])
        assert.strictEqual(likes, 0)
    })

    test('One blog returns total likes equal to its likes', () => {
        const likes = listHelper.totalLikes(blog)
        assert.strictEqual(likes, 2)
    })

    test('Big list is calculated correctly', () => {
        const likes = listHelper.totalLikes(blogs)
        assert.strictEqual(likes, 36)
    })
})

describe('Favorite', () => {
    test('Empty list returns null', () => {
        const favorite = listHelper.favoriteBlog([])
        assert.strictEqual(favorite, null)
    })
    test('Favorite is returned correctly', () => {
        const favorite = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(favorite, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})
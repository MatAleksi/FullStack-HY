const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testBlogs = require('./testblogs')

const blogs = testBlogs.blogs

describe('Most blogs', () => {
    test('Empty list returns null', () => {
        const author = listHelper.mostBlogs([])
        assert.strictEqual(author, null)
    })
    test('Returns author with most blogs', () => {
        const author = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(author, {
            author: "Robert C. Martin",
            blogs: 3
          })
    })
})

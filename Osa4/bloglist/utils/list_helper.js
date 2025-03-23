const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likestotal = 0
    blogs.forEach(blog => {
        likestotal = likestotal + blog.likes
    });
    return likestotal
}

const favoriteBlog = (blogs) => {
    let favoriteLikes = 0
    let favorite = null
    blogs.forEach(blog => {
        if(blog.likes > favoriteLikes){
            favoriteLikes = blog.likes
            favorite = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, ({author}) => author)
    let currentMost = 0
    let result = null
    _.forEach(groupedBlogs, function(value, key){
        if(value.length > currentMost){
            currentmost = value.length
            result = {
                author: key,
                blogs: value.length
            }
        }      
    })
    return result
}

const mostLikes = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, ({author}) => author)
    let currentMost = 0
    let result = null
    _.forEach(groupedBlogs, function(value, key){
        let likes = 0
        value.forEach(blog => {
            likes = likes + blog.likes
        })
        console.log(key + likes)
        if(likes > currentMost){
            currentMost = likes
            result = {
                author: key,
                likes: likes
            }
        }      
    })
    return result
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}


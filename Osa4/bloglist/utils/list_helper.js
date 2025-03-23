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

module.exports = {dummy, totalLikes, favoriteBlog}


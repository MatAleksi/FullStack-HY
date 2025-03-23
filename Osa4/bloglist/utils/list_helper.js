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


module.exports = {dummy, totalLikes}


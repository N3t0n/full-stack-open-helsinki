const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((fav, next) => {
        return fav.likes > next.likes ? fav : next
    })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
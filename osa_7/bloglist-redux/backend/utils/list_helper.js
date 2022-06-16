const _ = require('lodash')

const dummy = blogs => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0) / blogs.length
}

const totalLikes = blogs => {
  return _.sumBy(blogs, 'likes')
}

const favoriteBlog = blogs => {
  return _.maxBy(blogs, 'likes')
}

const mostBlogs = blogs => {
  const countBlogs = _.countBy(blogs, 'author')
  const blogAuthor =  _.max(Object.keys(countBlogs), o => countBlogs[o])
  const countedBlog = _.entries(countBlogs)
  const countedBlogMax = _.max(countedBlog, _.last)
  const blogObject = [{ author: blogAuthor, blogs: _.last(countedBlogMax) }]
  return blogObject
}

const mostLikes = blogs => {
  const groupBy = _.map(_.groupBy(blogs, 'author'), (o,x) => {
    return { author: x, likes: _.sumBy(o,'likes') }})
  const topAuthor = _.maxBy(groupBy, 'likes')
  return [topAuthor]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const favoriteReviews = await db.collection('favorite-review').where({
    userId: wxContext.OPENID,
    isLike: true
  }).get()


  const favoriteRevIds = favoriteReviews.data.map(({reviewId}) => reviewId)
  const relatedReviews = await db.collection('movie-review').where({
    _id: db.command.in(favoriteRevIds)
  }).get()

  const relatedMovieIds = relatedReviews.data.map(({ movieId }) => movieId)
  const relatedMovies = await db.collection('movie').where({
    _id: db.command.in(relatedMovieIds)
  }).get()

  return favoriteReviews.data.map((item) => {
    const review = relatedReviews.data.find(review => review._id === item.reviewId)
    return {
      review: review,
      movie: relatedMovies.data.find(movie => movie._id === review.movieId)
    }
  })
}
const cloud = require('wx-server-sdk')

cloud.init()

const db = await cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const favoriteReviews = await db.collection('favorite-review').where({
    userId: wxContext.OPENID,
    reviewId: event.reviewId
  }).get()
  
  let result = {}

  if (favoriteReviews.data.length === 0) {
    result = await db.collection('favorite-review').add({
      data: {
        userId: wxContext.OPENID,
        reviewId: event.reviewId,
        isLike: true,
        createdAt: +new Date(),
        updatedAt: +new Date()
      }
    })
  } else {
    const review = favoriteReviews[0]
    result = await db.collection('favorite-review').where({
      userId: wxContext.OPENID,
      reviewId: event.reviewId
    }).update({
      isLike: !review.isLike,
      updatedAt: +new Date()
    })
  }

  return result
}
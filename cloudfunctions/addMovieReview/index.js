// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID

  const result = await db.collection('movie-review').add({
    data: {
      userId: wxContext.OPENID,
      username: event.username,
      avatar: event.avatar,
      reviewType: event.reviewType,
      content: event.content || null,
      movieId: event.movieId,
      voice: event.voice || null,
      createdAt: +new Date(),
      updatedAt: +new Date()
    }
  })
  return result.data
}
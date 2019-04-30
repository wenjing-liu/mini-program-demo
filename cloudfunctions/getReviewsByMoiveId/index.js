// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  
  const result = await db.collection('movie-review').where({
    movieId: event.id
  }).get()

  return result.data
}
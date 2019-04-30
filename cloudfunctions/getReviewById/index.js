const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  const result = await db.collection('movie-review').where({
    _id: event.id
  })

  return result.data[0]
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const getRandomNumber = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random()*(max - min)) + min
}

// 云函数入口函数
exports.main = async (event, context) => {
  const countsOfRecords = await db.collection('movies').count()
  const random = getRandomNumber(0, countsOfRecords)
  const result = await db.collection('movies').skip(random).limit(1).get()
  return result[0]
}
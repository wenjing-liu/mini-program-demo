const regeneratorRuntime = require('../../libs/runtime')
import movieApi from '../../apis/movie.js'
import reviewApi from '../../apis/review.js'

Page({
  data: {
    movie: null,
    reviewAuthor: null
  },
  onLoad () {
    this.getData()
  },
  onPullDownRefresh: function () {

  },
  async getData () {
    wx.showLoading({
      title: 'Loading...'
    })
    const movie = await movieApi.getRandomMovie()
    let reviewAuthor = {}
    const movieReviews = await reviewApi.getReviewsByMoiveId(movie._id)
    wx.hideLoading()
    if (movieReviews.result.length) {
      reviewAuthor = { ...movieReviews.result[0] }
    }
    this.setData({
      movie,
      reviewAuthor
    })
  }
})
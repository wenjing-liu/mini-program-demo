module.exports = {
  uploadVoice(filePath, callback) {
    if (filePath) {
      return wx.cloud.uploadFile({
        cloudPath: `movie-review/${getId()}`,
        filePath,
      })
    }
    callback && callback()
  },

  addReview(data) {
    return wx.cloud.callFunction({
      name: 'addMovieReview',
      data,
    })
  },

  getReviewsByMoiveId(id) {
    return wx.cloud.callFunction({
      name: 'getReviewsByMoiveId',
      data: {
        id
      }
    })
  },

  favoriteAReview(data) {
    return wx.cloud.callFunction({
      name: 'favoriteAReview',
      data
    })
  },

  getReviewById(id) {
    return wx.cloud.callFunction({
      name: 'getReviewById',
      data: {
        id
      }
    })
  },

  getFavoriteReviews() {
    return wx.cloud.callFunction({
      name: 'getFavoriteReviews'
    })
  }
}
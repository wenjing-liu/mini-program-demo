module.exports = {
  async getRandomMovie() {
    return await wx.cloud.callFunction({
      name: 'getRandomMovie'
    })
  },
  async getAllMovies() {
    return await wx.cloud.callFunction({
      name: 'getAllMovies'
    })
  },
  async getMovieById(id) {
    return await wx.cloud.callFunction({
      name: 'getMovieById',
      data: {
        id
      }
    })
  }
}
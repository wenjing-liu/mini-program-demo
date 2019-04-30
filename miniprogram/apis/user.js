module.exports = {
  login() {
    return wx.cloud.callFunction({
      name: login
    })
  }
}
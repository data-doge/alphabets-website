const $ = require('jquery')

class View {

  constructor () {
    this.renderSun()
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  renderSun () {
    this.$sun = $('<div id="sun"></div>')
    $('body').append(this.$sun)
    const centerX = $(window).width() / 2 - this.$sun.width() / 2
    const centerY = $(window).height() / 2 - this.$sun.height() / 2

    this.$moon = $('<div id="moon"></div>')
    $('body').append(this.$moon)

    const a = 500
    const b = 300
    let theta = 0

    setInterval(t => {
      this.$sun.offset({
        top: centerY + b * Math.sin(theta),
        left: centerX + a * Math.cos(theta)
      })
      this.$moon.offset({
        top: centerY + b * Math.sin(theta + Math.PI),
        left: centerX + a * Math.cos(theta + Math.PI)
      })
      theta -= Math.PI / 180 / 8
    }, 40)
  }

}

module.exports = View

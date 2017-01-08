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
    const a = 500
    const b = 300
    let theta = 0

    setInterval(t => {
      this.$sun.offset({
        top: centerY + b * Math.sin(theta),
        left: centerX + a * Math.cos(theta)
      })
      theta -= Math.PI / 180 / 5
    }, 40)
  }

}

module.exports = View

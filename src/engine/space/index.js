const $ = require('jquery')

class Space {

  constructor () {
    this.$sun = $('<div id="sun"></div>')
    this.$moon = $('<div id="moon"></div>')
    $('body').append(this.$sun)
    $('body').append(this.$moon)
    this.centerX = $(window).width() / 2 - this.$sun.width() / 2
    this.centerY = $(window).height() / 2 - this.$sun.height() / 2
    this.a = 500
    this.b = 300
  }

  show () {
    this.$sun.show()
    this.$moon.show()
  }

  update (theta) {
    this.$sun.offset({
      top: this.centerY + this.b * Math.sin(theta),
      left: this.centerX + this.a * Math.cos(theta)
    })
    this.$moon.offset({
      top: this.centerY + this.b * Math.sin(theta + Math.PI),
      left: this.centerX + this.a * Math.cos(theta + Math.PI)
    })
  }

}

module.exports = Space

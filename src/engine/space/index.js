const $ = require('jquery')

class Space {

  constructor () {
    this.$sun = $('<div id="sun"></div>')
    this.$moon = $('<div id="moon"></div>')
    $('body').append(this.$sun)
    $('body').append(this.$moon)
    this.a = 500
    this.b = 300
  }

  show () {
    this.$sun.show()
    this.$moon.show()
  }

  update (theta, diameter) {
    const centerX = $(window).width() / 2 - diameter / 2
    const centerY = $(window).height() / 2 - diameter / 2
    this.$sun.css({ width: diameter, height: diameter })
    this.$moon.css({ width: diameter, height: diameter })
    this.$sun.offset({
      top: centerY + this.b * Math.sin(theta),
      left: centerX + this.a * Math.cos(theta)
    })
    this.$moon.offset({
      top: centerY + this.b * Math.sin(theta + Math.PI),
      left: centerX + this.a * Math.cos(theta + Math.PI)
    })
  }

}

module.exports = Space

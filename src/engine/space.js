const $ = require('jquery')
const min = require('lodash.min')

class Space {
  constructor () {
    this.$space = $('#space')
    this.setSpaceContainerSize()
    this.$sun = $('#sun')
    this.$moon = $('#moon')
    this.bindEventListeners()
  }

  bindEventListeners () {
    $(window).resize(this.setSpaceContainerSize.bind(this))
  }

  setSpaceContainerSize () {
    this.spaceSize = min([$(window).width(), $(window).height()])
    this.$space.width(this.spaceSize)
    this.$space.height(this.spaceSize)
  }

  show () {
    this.$sun.show()
    this.$moon.show()
  }

  update (theta, loudness) {
    const diameter = 50 + loudness / 255 * this.spaceSize * 0.25
    const centerX = $(window).width() / 2 - diameter / 2
    const centerY = $(window).height() / 2 - diameter / 2
    this.$sun.css({ width: diameter, height: diameter })
    this.$moon.css({ width: diameter, height: diameter })
    this.$sun.offset({
      top: centerY + this.spaceSize / 2 * Math.sin(theta),
      left: centerX + this.spaceSize / 2 * Math.cos(theta)
    })
    this.$moon.offset({
      top: centerY + this.spaceSize / 2 * Math.sin(theta + Math.PI),
      left: centerX + this.spaceSize / 2 * Math.cos(theta + Math.PI)
    })
  }
}

module.exports = Space

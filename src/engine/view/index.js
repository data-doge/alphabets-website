const $ = require('jquery')
const convert = require('color-convert')

class View {

  constructor () {
    this.textHex = 'FFFFFF'
    this.backgroundHex = '000000'
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  makeDarker (currentCount, totalCount) {
    const opacity = currentCount / totalCount
    const backgroundHex = convert.hsl.hex(0, 0, opacity * 100)
    this.backgroundHex = backgroundHex
    const textHex = convert.hsl.hex(0, 0, (1 - opacity) * 100)
    this.textHex = textHex
    this.renderColors()
  }

  makeLighter (currentCount, totalCount) {
    const opacity = currentCount / totalCount
    const backgroundHex = convert.hsl.hex(0, 0, (1 - opacity) * 100)
    this.backgroundHex = backgroundHex
    const textHex = convert.hsl.hex(0, 0, opacity * 100)
    this.textHex = textHex
    this.renderColors()
  }

  renderColors () {
    $('body').css({ background: `#${this.backgroundHex}` })
    $('#ground-overlay').css({ background: `#${this.backgroundHex}` })
    $('#copy-container').css({ color: `#${this.textHex}` })
    $('h1').css({ background: `#${this.textHex}`, color: `#${this.backgroundHex}` })
    $('a').css({ borderColor: `#${this.textHex}` })
  }

}

module.exports = View

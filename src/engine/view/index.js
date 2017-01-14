const $ = require('jquery')

class View {

  constructor () {
    this.textColor = 'black'
    this.backgroundColor = 'white'
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  invertColors () {
    this.textColor = this.textColor === 'white' ? 'black' : 'white'
    this.backgroundColor = this.backgroundColor === 'white' ? 'black' : 'white'
    this.renderColors()
  }

  renderColors () {
    $('body').css({ background: this.backgroundColor })
    $('#ground-overlay').css({ background: this.backgroundColor })
    $('#copy-container').css({ color: this.textColor })
    $('h1').css({ background: this.textColor, color: this.backgroundColor })
    $('a').css({ borderColor: this.textColor })
  }

}

module.exports = View

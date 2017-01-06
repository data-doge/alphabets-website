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
  }

}

module.exports = View

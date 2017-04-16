const $ = require('jquery')
const audioList = require('./audio-list')
const videoList = require('./video-list')

class View {
  constructor ({ audioInterface }) {
    this.audioInterface = audioInterface
    this.bindEventListeners()
  }

  populateAudioPanel () {
    $('#audio-panel').html(audioList.map(({ img, album, title }) => `
      <a href="https://lotsoflettershere.bandcamp.com/album/${album}" class="album-link" target="_blank">
        <img class="album-art" src="https://f4.bcbits.com/img/${img}" />
      </a>
    `))
  }

  populateVideoPanel () {
    $('#video-panel').html(videoList.map(({ gif, video }) => `
      <img class="video-art" src=${gif} data-src="https://github.com/data-doge/hosted-videos/blob/master/${video}?raw=true" />
    `))
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  bindEventListeners () {
    $('.nav-link').on('click', this.handleNavLinkClick.bind(this))
    $('#home').on('click', this.hideAllPanels.bind(this))
    $(document).on('click', '.video-art', this.handleVideoLinkClick.bind(this))
    $(document).on('click', '#close-video', this.handleCloseVideoClick.bind(this))
  }

  handleNavLinkClick (e) {
    e.preventDefault()
    const id = e.target.id
    const $panel = $(`#${id}-panel`)
    if ($panel.attr('data-selected') === 'true') {
      $panel.hide().attr('data-selected', false)
    } else {
      if (id === 'audio') { this.populateAudioPanel() }
      if (id === 'video') { this.populateVideoPanel() }
      this.hideAllPanels()
      $panel.show().attr('data-selected', true)
    }
  }

  hideAllPanels () {
    $('.panel').hide().attr('data-selected', false)
  }

  handleVideoLinkClick (e) {
    this.audioInterface.pause()
    const src = $(e.target).attr('data-src')
    $('body').append($(`
      <div id="video-container">
        <div id="close-video">&times;</div>
        <video autoplay>
          <source src="${src}"></source>
        </video>
      </div>
    `))
  }

  handleCloseVideoClick (e) {
    $('#video-container').remove()
  }

  renderColors (primary, secondary) {
    $('body').css({ background: `#${secondary}` })
    $('.color-transition-copy').css({ background: `#${primary}`, color: `#${secondary}` })
    $('.audio-control').css({ color: `#${primary}` })
  }
}

module.exports = View

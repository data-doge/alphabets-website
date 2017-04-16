const $ = require('jquery')

class View {

  constructor ({ audioInterface }) {
    this.audioInterface = audioInterface
    this.bindEventListeners()
  }

  populateAudioPanel () {
    const html = [
      { img: 'a3247042134_2.jpg', album: 'dead-beat-til-i-die', title: 'dead//beat til i die' },
      { img: 'a3287578958_2.jpg', album: 'steeping', title: 'steeping' },
      { img: 'a2557375228_2.jpg', album: 'motionless', title: 'motionless' },
      { img: 'a2361122322_2.jpg', album: 'stress', title: 'stress' },
      { img: 'a3136442865_2.jpg', album: 'low-vibes', title: 'low vibes' },
      { img: 'a0412213850_2.jpg', album: 'untitled-ep-4', title: 'untitled ep4' },
      { img: 'a1343068421_2.jpg', album: 'untitled-ep-3', title: 'untitled ep3' },
      { img: 'a1637662097_2.jpg', album: 'takes-the-air', title: 'takes the air' },
      { img: 'a3163431488_2.jpg', album: 'untitled-ep-2', title: 'untitled ep 2' },
      { img: 'a2362660752_2.jpg', album: 'untitled-ep', title: 'untitled ep' },
      { img: 'a0499335438_2.jpg', album: 'thought-loop', title: 'thought loop' },
      { img: 'a0500555093_2.jpg', album: 'hfpn011-a-long-interval-marked-by-nothing-of-distinguished-note', title: '(HFPN011) a long interval, marked by nothing of distinguished note' },
      { img: 'a2317249876_2.jpg', album: 'cold-heart-warm', title: 'cold/heart\\warm' },
      { img: 'a3290534802_2.jpg', album: 'music-to-watch-clouds-with', title: 'music to watch clouds with' },
      { img: 'a3201699299_2.jpg', album: 'so-long-blue-skies', title: '(so long) blue skies' },
      { img: 'a4109433261_2.jpg', album: 'view', title: 'view' },
      { img: 'a4085011476_2.jpg', album: 'ilo', title: 'ilo' },
      { img: 'a2870091575_2.jpg', album: 'well', title: 'well' },
      { img: 'a0329685018_2.jpg', album: '-', title: '...' },
      { img: 'a2153041237_2.jpg', album: 'styrofoam-sleep', title: 'Styrofoam Sleep' },
      { img: 'a1789288278_2.jpg', album: 'red-oak-intermodulation', title: 'Red Oak Intermodulation' },
      { img: 'a4058127069_2.jpg', album: 'um-ah', title: 'Um / Ah' },
      { img: 'a1942401491_2.jpg', album: 'oh-people', title: 'Oh [people]' }
    ].map(({ img, album, title }) => {
      return `
        <a href="https://lotsoflettershere.bandcamp.com/album/${album}" class="album-link" target="_blank">
          <img class="album-art" src="https://f4.bcbits.com/img/${img}" />
        </a>
      `
    })
    $('#audio-panel').html(html)
  }

  populateVideoPanel () {
    const html = [
      { gif: './media/0.gif', audio: '0.mp4' },
      { gif: './media/1.gif', audio: '1.mp4' },
      { gif: './media/2.gif', audio: '2.mp4' },
      { gif: './media/3.gif', audio: '3.mp4' },
      { gif: './media/4.gif', audio: '4.mp4' }
    ].map(({ gif, audio }) => {
      return `
        <img class="video-art" src=${gif} data-src="https://github.com/data-doge/hosted-videos/blob/master/${audio}?raw=true" />
      `
    })
    $('#video-panel').html(html)
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
    const $video = $(`
      <div id="video-container">
        <div id="close-video">&times;</div>
        <video autoplay>
          <source src="${src}"></source>
        </video>
      </div>
    `)
    $('body').append($video)
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

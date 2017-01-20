const $ = require('jquery')
const convert = require('color-convert')

class View {

  constructor () {
    this.textHex = 'FFFFFF'
    this.backgroundHex = '000000'
    this.bindEventListeners()
    this.populateAudioPanel()
  }

  populateAudioPanel () {
    const html = [
      { imgUrl: 'https://f4.bcbits.com/img/a3247042134_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/dead-beat-til-i-die', title: 'dead//beat til i die' },
      { imgUrl: 'https://f4.bcbits.com/img/a3287578958_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/steeping', title: 'steeping' },
      { imgUrl: 'https://f4.bcbits.com/img/a2557375228_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/motionless', title: 'motionless' },
      { imgUrl: 'https://f4.bcbits.com/img/a2361122322_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/stress', title: 'stress' },
      { imgUrl: 'https://f4.bcbits.com/img/a3136442865_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/low-vibes', title: 'low vibes' },
      { imgUrl: 'https://f4.bcbits.com/img/a0412213850_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/untitled-ep-4', title: 'untitled ep4' },
      { imgUrl: 'https://f4.bcbits.com/img/a1343068421_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/untitled-ep-3', title: 'untitled ep3' },
      { imgUrl: 'https://f4.bcbits.com/img/a1637662097_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/takes-the-air', title: 'takes the air' },
      { imgUrl: 'https://f4.bcbits.com/img/a3163431488_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/untitled-ep-2', title: 'untitled ep 2' },
      { imgUrl: 'https://f4.bcbits.com/img/a2362660752_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/untitled-ep', title: 'untitled ep' },
      { imgUrl: 'https://f4.bcbits.com/img/a0499335438_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/thought-loop', title: 'thought loop' },
      { imgUrl: 'https://f4.bcbits.com/img/a0500555093_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/hfpn011-a-long-interval-marked-by-nothing-of-distinguished-note', title: '(HFPN011) a long interval, marked by nothing of distinguished note' },
      { imgUrl: 'https://f4.bcbits.com/img/a2317249876_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/cold-heart-warm', title: 'cold/heart\\warm' },
      { imgUrl: 'https://f4.bcbits.com/img/a3290534802_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/music-to-watch-clouds-with', title: 'music to watch clouds with' },
      { imgUrl: 'https://f4.bcbits.com/img/a3201699299_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/so-long-blue-skies', title: '(so long) blue skies' },
      { imgUrl: 'https://f4.bcbits.com/img/a4109433261_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/view', title: 'view' },
      { imgUrl: 'https://f4.bcbits.com/img/a4085011476_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/ilo', title: 'ilo' },
      { imgUrl: 'https://f4.bcbits.com/img/a2870091575_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/well', title: 'well' },
      { imgUrl: 'https://f4.bcbits.com/img/a0329685018_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/-', title: '...' },
      { imgUrl: 'https://f4.bcbits.com/img/a2153041237_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/styrofoam-sleep', title: 'Styrofoam Sleep' },
      { imgUrl: 'https://f4.bcbits.com/img/a1789288278_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/red-oak-intermodulation', title: 'Red Oak Intermodulation' },
      { imgUrl: 'https://f4.bcbits.com/img/a4058127069_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/um-ah', title: 'Um / Ah' },
      { imgUrl: 'https://f4.bcbits.com/img/a1942401491_2.jpg', bcUrl: 'https://lotsoflettershere.bandcamp.com/album/oh-people', title: 'Oh [people]' }
    ].map(({ imgUrl, bcUrl, title }) => {
      return `
        <a href=${bcUrl} class="album-link">
          <img class="album-art" src=${imgUrl} />
        </a>
      `
    })
    $('#audio-panel').html(html)
    $('#audio-panel').hide()
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  bindEventListeners () {
    $('a').on('click', this.handleLinkClick.bind(this))
  }

  handleLinkClick (e) {
    e.preventDefault()
    $('.panel').hide()
    $(`#${e.target.id}-panel`).show()
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
    $('.color-transition-copy').css({ background: `#${this.textHex}`, color: `#${this.backgroundHex}` })
  }

}

module.exports = View

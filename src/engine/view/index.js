const $ = require('jquery')

class View {

  constructor ({ audioInterface }) {
    this.audioInterface = audioInterface
    this.bindEventListeners()
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
        <a href=${bcUrl} class="album-link" target="_blank">
          <img class="album-art" src=${imgUrl} />
        </a>
      `
    })
    $('#audio-panel').html(html)
  }

  populateVideoPanel () {
    const html = [
      { gifUrl: './media/0.gif', src: 'https://github.com/data-doge/hosted-videos/blob/master/0.mp4?raw=true' },
      { gifUrl: './media/1.gif', src: 'https://github.com/data-doge/hosted-videos/blob/master/1.mp4?raw=true' },
      { gifUrl: './media/2.gif', src: 'https://github.com/data-doge/hosted-videos/blob/master/2.mp4?raw=true' },
      { gifUrl: './media/3.gif', src: 'https://github.com/data-doge/hosted-videos/blob/master/3.mp4?raw=true' },
      { gifUrl: './media/4.gif', src: 'https://github.com/data-doge/hosted-videos/blob/master/4.mp4?raw=true' }
    ].map(({ gifUrl, src }) => {
      return `
        <img class="video-art" src=${gifUrl} data-src=${src} />
      `
    })
    $('#video-panel').html(html)
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  bindEventListeners () {
    $('.nav-link').on('click', this.handleNavLinkClick.bind(this))
    $(document).on('click', '.video-art', this.handleVideoLinkClick.bind(this))
    $(document).on('click', '#close-video', this.handleCloseVideoClick.bind(this))
  }

  handleNavLinkClick (e) {
    e.preventDefault()
    const id = e.target.id
    if (id === 'audio') { this.populateAudioPanel() }
    if (id === 'video') { this.populateVideoPanel() }
    $('.panel').hide()
    $(`#${id}-panel`).show()
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

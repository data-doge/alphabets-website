const $ = require('jquery')
const webAudioAnalyser2 = require('web-audio-analyser-2')
const range = require('lodash.range')
const audioIds = range(10).map(i => `#track-${i}`)
const rotate = require('rotate-array')

class AudioInterface {
  constructor () {
    this.currentAudioIdIndex = 0
    this.ctx = new (window.webkitAudioContext || window.AudioContext)()
    this.sources = audioIds.map(id => {
      let source = this.ctx.createMediaElementSource($(id)[0])
      if (!source.mediaElement) { source.mediaElement = $(id)[0] } // patch for AudioContext/firefox
      return source
    })
    this.analyser = webAudioAnalyser2({
      context: this.ctx,
      fftSize: 2048,
      addSubBassToBarkScale: true
    })
    this.out = this.ctx.destination
    this.currentSource().connect(this.analyser)
    this.analyser.connect(this.out)
    this.bindEventListeners()
  }

  bindEventListeners () {
    $('#play').click(e => {
      this.play()
      $('#play-sound')[0].play()
    })
    $('#pause').click(e => {
      this.pause()
      $('#pause-sound')[0].play()
    })
    $('#step-forward').click(e => {
      this.stepForward()
      $('#step-sound')[0].play()
    })
    $('#step-backward').click(e => {
      this.stepBackward()
      $('#step-sound')[0].play()
    })
    this.sources.forEach(source => {
      source.mediaElement.onended = this.stepForward.bind(this)
    })
  }

  measure () {
    const { frequencies, overallAmplitude } = this.analyser.barkScaleFrequencyData()
    return { frequencies, overallAmplitude }
  }

  currentSource () {
    return this.sources[0]
  }

  currentAudio () {
    return this.currentSource().mediaElement
  }

  stepForward () {
    this.pause()
    this.currentAudio().currentTime = 0
    this.sources = rotate(this.sources, 1)
    this.currentSource().connect(this.analyser)
    this.play()
  }

  stepBackward () {
    if (this.currentAudio().paused) {
      this.sources = rotate(this.sources, -1)
      this.currentSource().connect(this.analyser)
    } else {
      this.pause()
      this.currentAudio().currentTime = 0
    }
  }

  pause () {
    $('#pause').hide()
    $('#play').show()
    this.currentAudio().pause()
  }

  play () {
    $('#play').hide()
    $('#pause').show()
    setTimeout(() => { this.currentAudio().play() }, 1000)
  }
}

module.exports = AudioInterface

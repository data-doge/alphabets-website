const $ = require('jquery')
const webAudioAnalyser2 = require('web-audio-analyser-2')
const range = require('lodash.range')
const audioIds = range(5).map(i => `#track-${i}`)
const rotate = require('rotate-array')

class AudioInterface {

  constructor () {
    this.currentAudioIdIndex = 0
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.sources = audioIds.map(id => this.ctx.createMediaElementSource($(id)[0]))
    this.analyser = webAudioAnalyser2({
      context: this.ctx,
      fftSize: 2048,
      equalTemperedFreqBinCount: 7
    })
    this.out = this.ctx.destination
    this.currentSource().connect(this.analyser)
    this.analyser.connect(this.out)
    this.bindEventListeners()
  }

  bindEventListeners () {
    $('#step-backward').click(this.stepBackward.bind(this))
    $('#pause').click(this.pause.bind(this))
    $('#play').click(this.play.bind(this))
    $('#step-forward').click(this.stepForward.bind(this))
  }

  measure () {
    const { frequencies, overallAmplitude } = this.analyser.equalTemperedFrequencyData(7)
    return { frequencies, overallAmplitude }
  }

  currentSource () {
    return this.sources[0]
  }

  currentAudio () {
    return this.currentSource().mediaElement
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
    this.currentAudio().play()
  }

  stepForward () {
    this.pause()
    this.currentAudio().currentTime = 0
    this.sources = rotate(this.sources, 1)
    this.currentSource().connect(this.analyser)
    this.play()
  }

}

module.exports = AudioInterface

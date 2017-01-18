const $ = require('jquery')
const webAudioAnalyser2 = require('web-audio-analyser-2')

class AudioInterface {

  constructor () {
    this.audio = $('audio')[0]
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.src = this.ctx.createMediaElementSource(this.audio)
    this.analyser = webAudioAnalyser2({
      context: this.ctx,
      fftSize: 2048,
      equalTemperedFreqBinCount: 10
    })
    this.out = this.ctx.destination

    this.src.connect(this.analyser)
    // TODO: uncomment to hear music
    // this.analyser.connect(this.out)
    this.audio.play()
  }

  measure () {
    const { frequencies, overallAmplitude } = this.analyser.barkScaleFrequencyData()
    return { frequencies, overallAmplitude }
  }
}

module.exports = AudioInterface
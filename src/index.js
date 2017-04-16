const $ = require('jquery')
const detectie = require('detectie')
const Engine = require('./engine')

if (detectie()) {
  $('#fuck-ie').css('display', 'flex')
} else {
  const engine = new Engine()
  engine.bindEventListeners()
  engine.start()
}

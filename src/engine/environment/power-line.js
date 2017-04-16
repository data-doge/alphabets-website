const THREE = require('three')
const { MeshBasicMaterial, Mesh, CylinderGeometry } = THREE
const sample = require('lodash.sample')
const { groundLevel, powerLineSpacing } = require('../constants')
let powerLineTicker = 0

class PowerLine {
  constructor ({ scene, color }) {
    powerLineTicker++
    const poleHeight = 3
    const material = new MeshBasicMaterial({ color })
    const x = sample([-5, 5])

    const poleGeometry = new CylinderGeometry(0.02, 0.02, poleHeight, 32)
    this.pole = new Mesh(poleGeometry, material)
    this.pole.position.set(x, groundLevel + poleHeight / 2, -powerLineTicker * powerLineSpacing)

    const crossGeometry = new CylinderGeometry(0.02, 0.02, 0.4, 32)
    this.cross = new Mesh(crossGeometry, material)
    this.cross.rotation.z = Math.PI / 2
    this.cross.position.set(x, groundLevel + 2 * poleHeight / 3, -powerLineTicker * powerLineSpacing)

    this.scene = scene
    this.scene.add(this.pole, this.cross)
  }

  remove () {
    this.scene.remove(this.pole, this.cross)
  }
}

module.exports = PowerLine

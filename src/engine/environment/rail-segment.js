const THREE = require('three')
const { MeshBasicMaterial, Mesh, BoxGeometry } = THREE
const { groundLevel, railSpacing } = require('../constants')
let railTicker = 0

class RailSegment {
  constructor ({ scene, color }) {
    railTicker++
    this.left = this._mesh(color, -3)
    this.right = this._mesh(color, 3)
    this.scene = scene
    this.scene.add(this.left, this.right)
  }

  remove () {
    this.scene.remove(this.left, this.right)
  }

  _mesh (color, x) {
    const geometry = new BoxGeometry(0.2, 0.02, 1)
    const material = new MeshBasicMaterial({ color })
    const mesh = new Mesh(geometry, material)
    mesh.position.set(x, groundLevel, -railTicker * railSpacing)
    return mesh
  }
}

module.exports = RailSegment

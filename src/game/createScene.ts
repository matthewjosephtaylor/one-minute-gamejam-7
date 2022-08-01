import { ArcRotateCamera, HemisphericLight, Scene } from 'babylonjs'

import { Babs } from '@/engine/babs'
import { Meshes } from '../engine/babs/mesh/Meshes'
import { v3 } from '../engine/babs/v3'

export const createScene = (canvas: HTMLCanvasElement) => {
    const renderEngine = Babs.createEngine({ canvas })
    const scene = new Scene(renderEngine)

    const topDownAlpha = -Math.PI / 2
    const topDownBeta = 0
    const camera = new ArcRotateCamera('camera', topDownAlpha, topDownBeta, 15, v3(0, 0, 0))
    const light = new HemisphericLight('h', v3(0, 1, 0.5), scene)
    light.intensity = 1

    const plane = Meshes.getPlane(scene, 'ground', { width: 30, height: 30 })
    plane.rotation.x = Math.PI * 0.5
    plane.position.y = -1

    return scene
}
import { ArcRotateCamera, Camera } from 'babylonjs'
import { GameWorld } from '../GameWorld'

export const setupCameraTopDown = (world: GameWorld) => {
    const { scene, unitsTall, unitsWide } = world
    const camera = scene.activeCamera as ArcRotateCamera
    //TODO cleanup unneded variables
    const topDownAlpha = -Math.PI / 2
    const topDownBeta = 0
    camera.alpha = topDownAlpha
    camera.beta = topDownBeta
    camera.orthoTop = -unitsTall / 2
    camera.orthoBottom = unitsTall / 2
    camera.orthoLeft = -unitsWide / 2
    camera.orthoRight = unitsWide / 2
    camera.detachControl()
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA
}

import { ArcRotateCamera, Camera } from 'babylonjs'
import { GameWorld } from '../GameWorld'

export const setupCameraDebug = (world: GameWorld) => {
    const { scene, unitsTall, unitsWide } = world
    const camera = scene.activeCamera as ArcRotateCamera
    const canvas = scene.getEngine().getRenderingCanvas()
    //TODO cleanup unneded variables
    const debugAlpha = -Math.PI / 2
    const debugBeta = Math.PI / 2.5
    camera.alpha = debugAlpha
    camera.beta = debugBeta
    camera.attachControl(canvas, true)
    camera.mode = Camera.PERSPECTIVE_CAMERA
}

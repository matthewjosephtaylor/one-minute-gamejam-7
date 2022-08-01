import { ArcRotateCamera, HemisphericLight, Scene } from 'babylonjs'

import { Babs } from '@/engine/babs'
import useGeneralState from '@/state/generalState'
import { Materials } from '../engine/babs/material/Materials'
import { Meshes } from '../engine/babs/mesh/Meshes'
import { v3 } from '../engine/babs/v3'

export const Game = (canvas: HTMLCanvasElement) => {
    console.log('Game Initiated')
    const engine = Babs.createEngine({ canvas })
    const scene = new Scene(engine)

    const topDownAlpha = -Math.PI / 2
    const topDownBeta = 0
    const camera = new ArcRotateCamera('camera', topDownAlpha, topDownBeta, 15, v3(0, 0, 0))
    const light = new HemisphericLight('h', v3(0, 1, 0.5), scene)
    light.intensity = 1

    const plane = Meshes.getPlane(scene, 'ground', { width: 30, height: 30 })
    plane.rotation.x = Math.PI * 0.5
    plane.position.y = -1

    // useGeneralState.subscribe(({ color }) => {
    //     Materials.updateMaterial(scene, material, {
    //         diffuseColor: color
    //     })
    // })
    return scene
}

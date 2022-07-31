import { Babs } from '@/engine/babs'
import useGeneralState from '@/state/generalState'
import { ArcRotateCamera, HemisphericLight, Scene } from 'babylonjs'
import { Materials } from '../engine/babs/material/Materials'
import { Meshes } from '../engine/babs/mesh/Meshes'
import { v3 } from '../engine/babs/v3'
import { tuple2 } from '../engine/object'
import { Ticks } from '../engine/tick'

export const Game = (canvas: HTMLCanvasElement) => {
    console.log('Game Initiated')
    const engine = Babs.createEngine({ canvas })
    const scene = new Scene(engine)
    const material = Materials.getMaterial(scene, 'material')
    const box = Meshes.getBox(scene, 'box', {
        material: material.name
    })
    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 15, v3(0, 0, 0))
    camera.attachControl(canvas, true)
    const light = new HemisphericLight('h', v3(0, 1, 0.5), scene)
    light.intensity = 1

    const plane = Meshes.getPlane(scene, 'ground', { width: 30, height: 30 })
    plane.rotation.x = Math.PI * 0.5
    plane.position.y = -1

    useGeneralState.subscribe(({ color }) => {
        Materials.updateMaterial(scene, material, {
            diffuseColor: color
        })
    })

    console.log('Ticker started...')

    return tuple2(
        Ticks.create({
            ticker: (tick) => {
                box.rotate(v3(1, 1, 1), 0.1)
                scene.render()
            }
        }),
        scene
    )
}

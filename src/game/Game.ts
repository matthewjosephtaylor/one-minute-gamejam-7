import useGeneralState from '@/state/generalState'
import { Engine, Scene, MeshBuilder, ArcRotateCamera, Vector3, HemisphericLight, StandardMaterial, Color3 } from '@babylonjs/core'

export default class Game {
    engine: Engine
    scene: Scene

    constructor(canvas: HTMLCanvasElement) {
        console.log('Game Initiated')
        this.engine = new Engine(canvas, true)
        this.scene = new Scene(this.engine)
        this.scene.collisionsEnabled = true

        const box = MeshBuilder.CreateBox('box', { width: 10 })

        const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0))
        camera.attachControl(canvas, true)

        const light = new HemisphericLight('h', new Vector3(0, 1, 0.5), this.scene)
        light.intensity = 1.0

        const plane = MeshBuilder.CreatePlane('ground', { size: 30 }, this.scene)
        plane.rotation.x = Math.PI * 0.5
        plane.position.y = -1

        const material = new StandardMaterial('material', this.scene)
        box.material = material
        useGeneralState.subscribe(({ color }) => {
            material.diffuseColor = color
        })
        this.scene.executeWhenReady(() => {
            console.log('Scene Loaded')
        })

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    update(delta: number) {
        this.scene.render()
    }
}

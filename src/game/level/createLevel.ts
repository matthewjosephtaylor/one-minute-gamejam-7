import { Engine } from 'babylonjs'
import { Materials, Meshes, Textures } from '../../engine/babs'
import { v3 } from '../../engine/babs/v3'
import { times } from '../../engine/object'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'
import { addPeg } from './addPeg'

export const createLevel = ({ world }: { world: GameWorld }) => {
    // add pegs with colliders

    // simple grid
    times(6, (y) => {
        times(6, (x) => {
            const offset = y % 2 === 0 ? 0 : 1
            const tx = x - 3 + offset
            const ty = y - 3
            addPeg({ world, x: tx, y: ty })
        })
    })

    addBackground({ world })
    addTopOverlay({ world })
    addWalls({ world })
}

export const addWalls = ({ world }) => {
    const { scene, unitsWide, unitsTall } = world

    const tex = Textures.getPathTexture(scene, 'walls-texture', {
        src: 'img/walls.png'
    })
    const mat = Materials.getMaterial(scene, 'walls-material', {
        emissiveTexture: tex.name,
        opacityTexture: tex.name
    })

    const id = `level-walls`

    const mesh = Meshes.getBox(scene, id, {
        position: [0, -9, 0],
        width: unitsWide,
        height: 0.001,
        depth: unitsTall,
        material: mat.name
    })
    mesh.rotate(v3(0, 1, 0), Math.PI / 2)

    GameWorlds.addEntity(world, {
        id,
        mesh,
        type: 'environment'
    })
}

export const addBackground = ({ world }) => {
    const { scene, unitsWide, unitsTall } = world

    const tex = Textures.getPathTexture(scene, 'background-texture', {
        src: 'img/background.png'
    })
    const mat = Materials.getMaterial(scene, 'background-material', {
        emissiveTexture: tex.name,
        opacityTexture: tex.name
    })

    const id = `level-background`

    const mesh = Meshes.getBox(scene, id, {
        position: [0, -10, 0],
        width: unitsWide,
        height: 0.001,
        depth: unitsTall,
        material: mat.name
    })
    mesh.rotate(v3(0, 1, 0), Math.PI / 2)

    GameWorlds.addEntity(world, {
        id,
        mesh,
        type: 'environment'
    })
}

export const addTopOverlay = ({ world }) => {
    const { scene, unitsWide, unitsTall } = world

    const tex = Textures.getPathTexture(scene, 'overlay-texture', {
        src: 'img/overlay.png'
    })
    const mat = Materials.getMaterial(scene, 'overlay-material', {
        emissiveTexture: tex.name,
        opacityTexture: tex.name,
        alpha: 0.3
    })
    mat.alphaMode = Engine.ALPHA_MULTIPLY
    // mat.wireframe = true

    const id = `level-overlay`

    const mesh = Meshes.getBox(scene, id, {
        position: [0, 10, 0],
        width: unitsWide,
        height: 0.001,
        depth: unitsTall,
        material: mat.name
    })
    mesh.rotate(v3(0, 1, 0), Math.PI / 2)

    GameWorlds.addEntity(world, {
        id,
        mesh,
        type: 'environment'
    })
}

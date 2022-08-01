import { Materials, Meshes } from '../../engine/babs'
import { times } from '../../engine/object'
import { Physics } from '../../engine/physics-2d'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'

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
}

export const addPeg = ({ world, x, y }: { world: GameWorld; x: number; y: number }) => {
    const { scene, physicsEngine } = world

    const mat = Materials.getMaterial(scene, 'peg-material')

    const id = `peg-${x},${y}`

    // const x = random() * unitsWide - unitsWide / 2
    // const z = unitsTall / 2

    const radius = 0.1
    const mesh = Meshes.getSphere(scene, id, {
        position: [x, 0, y],
        color: 'green',
        radius,
        material: mat.name
    })

    // totally made up just to demonstrate destination pathing
    // const randWithinBounds = () => Math.random() * 10 - 5

    const physicsBody = Physics.getBodyType(physicsEngine.world, 'circle', id, {
        x,
        y: -y,
        radius,
        isStatic: true,
        mass: 10,
        frictionAir: 0.05
    })

    GameWorlds.addEntity(world, {
        id,
        mesh,
        // destination,
        type: 'peg',
        physicsBody
    })
}

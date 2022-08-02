import { Materials, Meshes } from '../../engine/babs'
import { Colors } from '../../engine/color'
import { Maths, Vec3 } from '../../engine/math'
import { Randoms } from '../../engine/random'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { gameTickRandom } from '../gameTickRandom'
import { GameWorlds } from '../GameWorlds'
import { Physics } from '../../engine/physics-2d'

export const bubbleSpawnSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { scene, unitsWide, unitsTall, entities, physicsEngine } = world
        // TODO spawn rate for bubbles
        if (entities.filter((e) => e.type === 'bubble').length > 10) {
            return
        }
        const mat = Materials.getMaterial(scene, 'bubble-material')
        const random = gameTickRandom(world, tick)
        if (random() < 0.9) {
            return
        }

        const id = `bubble-${Randoms.randomUuid(random)}`

        const boardWidth = 7
        const x = random() * boardWidth - boardWidth / 2
        const z = unitsTall / 2

        const radius = 0.1 + random() * 0.15
        const mesh = Meshes.getSphere(scene, id, {
            position: [x, 0, z],
            color: Colors.from('blue').mix(Colors.from('green')).mix(Colors.from('white')).toString(),
            radius,
            material: mat.name
        })

        // totally made up just to demonstrate destination pathing

        const physicsBody = Physics.getBodyType(physicsEngine.world, 'circle', id, {
            x,
            y: -z,
            radius,
            mass: 10,
            friction: 0,
            frictionStatic: 0

            // frictionAir: 0.05
        })

        GameWorlds.addEntity(world, {
            id,
            mesh,
            type: 'bubble',
            collisionRadius: radius,
            physicsBody
        })
    }
}

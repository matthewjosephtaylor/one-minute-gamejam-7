import { Materials, Meshes } from '../../engine/babs'
import { v3 } from '../../engine/babs/v3'
import { Colors } from '../../engine/color'
import { Point3, toVec3, xOf, zOf } from '../../engine/math'
import { Randoms } from '../../engine/random'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'

export const fireAtTarget = ({ world, target, from }: { world: GameWorld; from: Point3; target: Point3 }) => {
    const { scene } = world
    const id = `projectile-${Randoms.randomUuid()}`

    const mat = Materials.getMaterial(scene, 'projectile-material')

    const mesh = Meshes.getBox(scene, id, {
        position: from,
        color: Colors.from('yellow').toString(),
        material: mat.name,
        width: 0.1,
        height: 0.1,
        depth: 0.1
    })

    const angle = Meshes.lookAt([xOf(from), zOf(from)], [xOf(target), zOf(target)])

    mesh.rotate(v3(0, 1, 0), angle)

    GameWorlds.addEntity(world, {
        id,
        mesh,
        destination: toVec3(target),
        destinationRadius: 0.01,
        type: 'projectile',
        speed: 2,
        onDestinationReached: () => {
            GameWorlds.removeEntity(world, id)
        }
    })
}

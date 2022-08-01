import { Meshes } from '../../engine/babs'
import { Maths, toVec3 } from '../../engine/math'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from './GameWorlds'

export const bubbleReachedTopSystem = ({ world }: { world: GameWorld }) => {
    // TODO match up wavetop to art

    return (tick: Tick) => {
        const { scene, unitsWide, unitsTall, entities } = world
        const WAVE_TOP = -(unitsTall / 2) * 0.8
        entities
            .filter((e) => e.type === 'bubble')
            .forEach((entity) => {
                const { mesh, id } = entity
                const [x, y, z] = toVec3(mesh.position)
                if (z > WAVE_TOP) {
                    return
                }
                // TODO game mechanics for bubble reaching the top
                // for now just destroy
                Meshes.destroyMesh(scene, mesh.name)

                GameWorlds.removeEntity(world, id)
            })
    }
}

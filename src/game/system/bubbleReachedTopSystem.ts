import { toVec3 } from '../../engine/math'
import { Tick } from '../../engine/tick'
import useGeneralState from '../../state/generalState'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'

export const bubbleReachedTopSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { addScore } = useGeneralState.getState()
        const { scene, unitsWide, unitsTall, entities } = world
        // TODO match up wavetop to art
        const WAVE_TOP = -(unitsTall / 2) * 0.8
        entities
            .filter((e) => e.type === 'bubble')
            .forEach((entity) => {
                const { mesh, id } = entity
                const [x, y, z] = toVec3(mesh.position)
                if (z > WAVE_TOP) {
                    return
                }
                addScore(-1)
                GameWorlds.removeEntity(world, id)
            })
    }
}

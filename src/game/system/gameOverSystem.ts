import { Tick } from '../../engine/tick'
import useGeneralState from '../../state/generalState'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'

export const gameOverSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { endPhase } = useGeneralState.getState()
        const { entities } = world
        if (endPhase) {
            // remove all towers
            entities
                .filter((e) => e.type === 'projectile' || e.type === 'tower')
                .forEach((entity) => {
                    GameWorlds.removeEntity(world, entity.id)
                })
        }
    }
}

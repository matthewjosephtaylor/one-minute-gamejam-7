import { Maths } from '../../engine/math'
import { first, isUndefined } from '../../engine/object'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { entityDistance2 } from '../calculation/entityDistance2'
import { fireAtTarget } from './fireAtTarget'
import { sortEntitiesByDistanceFromTarget } from './sortEntitiesByDistanceFromTarget'
import { entityToPosition2 } from '../calculation/entityToPosition2'

export const fireAtBubblesSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { entities } = world

        // for each 'sea urchin'
        // if it is near a bubble
        // fire a projectile at the bubble
        // if the projectile hits the bubble it pops (or damages it)

        const bubblePositions = entities.filter((e) => e.type === 'bubble')

        entities
            .filter((e) => e.type === 'tower')
            .forEach((entity) => {
                const { mesh, range = 0, cooldownTicks = 0, fireRateTicks = 30 } = entity

                entity.cooldownTicks -= 1
                if (entity.cooldownTicks > 0) {
                    return
                }

                const bubblesWithinRange = bubblePositions.sort((a, b) => sortEntitiesByDistanceFromTarget(a, b, mesh.position))

                const closest = first(bubblesWithinRange)
                if (isUndefined(closest)) {
                    return
                }
                if (Maths.distance2(entityToPosition2(closest), entityToPosition2(entity)) > range) {
                    return
                }

                entity.cooldownTicks = fireRateTicks
                fireAtTarget({ from: mesh.position, target: closest.mesh.position, world })

                // find nearby bubbles within range of this tower

                // const id =

                // GameWorlds.addEntity(world, {
                //     id,
                //     mesh,
                //     type: 'bubble',
                //     physicsBody
                // })
            })
    }
}

import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'
import { entityDistance2 } from './entityDistance2'

export const projectileHitsBubbleSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { entities } = world
        // if projectile is within/touches a bubble then pop it

        const bubbles = entities.filter((e) => e.type === 'bubble')
        entities
            .filter((e) => e.type === 'projectile')
            .forEach((projectile) => {
                const collided = bubbles.filter((bubble) => {
                    const { collisionRadius = 1 } = bubble
                    return entityDistance2(bubble, projectile) <= collisionRadius
                })

                // TODO popped bubble (score, sound, etc) for now just destroy
                collided.forEach((bubble) => {
                    GameWorlds.removeEntity(world, bubble.id)
                    GameWorlds.removeEntity(world, projectile.id)
                })
            })
    }
}

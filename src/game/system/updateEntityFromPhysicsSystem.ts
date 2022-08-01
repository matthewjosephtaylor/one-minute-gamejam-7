import { v3 } from '../../engine/babs/v3'
import { toVec2 } from '../../engine/math'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'

export const updateEntityFromPhysicsSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { entities } = world
        entities
            .filter((e) => e.type === 'bubble')
            .forEach((entity) => {
                const { physicsBody, mesh } = entity
                const [x, y] = toVec2(physicsBody.position)
                mesh.position = v3(x, 0, -y)
            })
    }
}
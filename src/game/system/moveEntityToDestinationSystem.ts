import { v3 } from '../../engine/babs/v3'
import { Maths } from '../../engine/math'
import { isUndefined } from '../../engine/object'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { AddDestructor } from './keyboardHandlerSystem'

export const moveEntityToDestinationSystem = ({ world, addDestructor }: { world: GameWorld; addDestructor: AddDestructor }) => {
    return (tick: Tick) => {
        const { scene, entities } = world
        const { deltaMs } = tick
        for (const entity of entities) {
            const { mesh, destination } = entity
            if (isUndefined(destination)) {
                return
            }
            console.log('moving')
            mesh.position = v3(Maths.lerp3(mesh.position, destination, 0.01))
        }
    }
}

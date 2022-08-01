import { Ticker } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { bubbleReachedTopSystem } from './bubbleReachedTopSystem'
import { bubbleSpawnSystem } from './bubbleSpawnSystem'
import { AddDestructor } from './keyboardHandlerSystem'
import { moveEntityToDestinationSystem } from './moveEntityToDestinationSystem'
import { placeBoxAtPointerClickSystem } from './placeBoxAtPointerClickSystem'
import { updateEntityFromPhysicsSystem } from './updateEntityFromPhysicsSystem'
import { updatePhysicsSystem } from './updatePhysicsSystem'

export const addGameSystems = (world: GameWorld, addDestructor: AddDestructor): Ticker[] => {
    return [
        placeBoxAtPointerClickSystem({ world, addDestructor }),
        moveEntityToDestinationSystem({ world, addDestructor }),
        bubbleSpawnSystem({ world }),
        bubbleReachedTopSystem({ world }),
        updatePhysicsSystem({ world }),
        updateEntityFromPhysicsSystem({ world })
    ]
}
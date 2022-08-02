import { Ticker } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { bubbleReachedTopSystem } from './bubbleReachedTopSystem'
import { bubbleSpawnSystem } from './bubbleSpawnSystem'
import { AddDestructor } from './keyboardHandlerSystem'
import { moveEntityToDestinationSystem } from './moveEntityToDestinationSystem'
import { placeTowerAtPointerClickSystem } from './placeTowerAtPointerClickSystem'
import { fireAtBubblesSystem } from './fireAtBubblesSystem'
import { updateEntityFromPhysicsSystem } from './updateEntityFromPhysicsSystem'
import { updatePhysicsSystem } from './updatePhysicsSystem'
import { projectileHitsBubbleSystem } from './projectileHitsBubbleSystem'

export const addGameSystems = (world: GameWorld, addDestructor: AddDestructor): Ticker[] => {
    return [
        placeTowerAtPointerClickSystem({ world, addDestructor }),
        moveEntityToDestinationSystem({ world, addDestructor }),
        bubbleSpawnSystem({ world }),
        bubbleReachedTopSystem({ world }),
        updatePhysicsSystem({ world }),
        updateEntityFromPhysicsSystem({ world }),
        fireAtBubblesSystem({ world }),
        projectileHitsBubbleSystem({ world })
    ]
}

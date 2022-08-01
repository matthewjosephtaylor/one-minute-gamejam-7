import { Ticker } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { AddDestructor } from './keyboardHandlerSystem'
import { moveEntityToDestinationSystem } from './moveEntityToDestinationSystem'
import { placeBoxAtPointerClickSystem } from './placeBoxAtPointerClickSystem'

export const addGameSystems = (world: GameWorld, addDestructor: AddDestructor): Ticker[] => {
    return [placeBoxAtPointerClickSystem({ world, addDestructor }), moveEntityToDestinationSystem({world, addDestructor})]
}
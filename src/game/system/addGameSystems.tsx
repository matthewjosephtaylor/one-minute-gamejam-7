import { Ticker } from '../../engine/tick';
import { GameWorld } from "../GameWorld";
import { placeBoxAtPointerClickSystem } from './placeBoxAtPointerClickSystem';
import { moveEntityToDestinationSystem } from "./moveEntityToDestinationSystem";


export const addGameSystems = (world: GameWorld): Ticker[] => {
    return [placeBoxAtPointerClickSystem({ world}), moveEntityToDestinationSystem(world)];
};

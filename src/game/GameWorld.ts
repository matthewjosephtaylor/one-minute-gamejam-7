import { Scene } from 'babylonjs';
import { GameEntity } from "./GameEntity";


export type GameWorld = {
    scene: Scene;
    entities: GameEntity[];
};

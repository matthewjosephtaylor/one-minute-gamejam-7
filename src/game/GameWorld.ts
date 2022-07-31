import { Scene } from 'babylonjs'
import { TickState } from '../engine/tick'
import { GameEntity } from './GameEntity'

export type GameWorld = {
    scene: Scene
    entities: GameEntity[]
    controlLoop: TickState
    renderLoop: TickState
    gameLoop: TickState
}

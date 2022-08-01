import { Scene } from 'babylonjs'
import { TickState } from '../engine/tick'
import { GameEntity } from './GameEntity'

export type GameWorld = {
    scene: Scene
    seed: number
    debug: boolean
    unitsWide: number
    unitsTall: number

    entities: GameEntity[]
    controlLoop: TickState
    renderLoop: TickState
    gameLoop: TickState
}

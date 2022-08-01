import { Scene } from 'babylonjs'
import { Engine } from 'matter-js'
import { TickState } from '../engine/tick'
import { GameEntity } from './GameEntity'

export type GameWorld = {
    scene: Scene
    physicsEngine: Engine
    seed: number
    debug: boolean
    unitsWide: number
    unitsTall: number

    entities: GameEntity[]
    controlLoop: TickState
    renderLoop: TickState
    gameLoop: TickState
}

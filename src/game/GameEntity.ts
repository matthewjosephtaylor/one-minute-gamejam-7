import { AbstractMesh } from 'babylonjs'
import { Vec3 } from '../engine/math'

import { Body } from 'matter-js'

export type EntityType = 'bubble' | 'tower' | 'peg' | 'projectile'

export type GameEntity = {
    id: string
    mesh: AbstractMesh
    physicsBody?: Body
    type: EntityType

    // movement outside of physics
    destination?: Vec3
    destinationRadius?: number
    onDestinationReached?: () => void // KISS
    speed?: number

    // fire control
    cooldownTicks?: number
    fireRateTicks?: number

    // collisions outside of physics
    collisionRadius?: number

    range?: number // how far the tower can shoot
}

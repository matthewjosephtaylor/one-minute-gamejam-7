import { AbstractMesh } from 'babylonjs'
import { Vec3 } from '../engine/math'

import { Body } from 'matter-js'

export type EntityType = 'bubble' | 'tower' | 'peg'

export type GameEntity = {
    id: string
    mesh: AbstractMesh
    destination?: Vec3
    type: EntityType
    physicsBody: Body
}

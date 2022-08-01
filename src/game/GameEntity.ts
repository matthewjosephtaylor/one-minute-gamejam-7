import { AbstractMesh } from 'babylonjs'
import { Vec3 } from '../engine/math'

export type EntityType = 'bubble' | 'tower'

export type GameEntity = {
    id: string
    mesh: AbstractMesh
    destination: Vec3
    type: EntityType
}

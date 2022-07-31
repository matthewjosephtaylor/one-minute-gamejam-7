import { AbstractMesh } from 'babylonjs';
import { Vec3 } from '../engine/math';


export type GameEntity = {
    mesh: AbstractMesh;
    destination: Vec3;
};

import { Meshes } from '../../engine/babs';
import { Physics } from '../../engine/physics-2d';
import { GameEntity } from '../GameEntity';
import { GameWorld } from '../GameWorld';
import { GameWorlds } from '../GameWorlds';


export const removeBubbleEntity = ({ world, entity }: { world: GameWorld; entity: GameEntity; }) => {
    const { mesh, id } = entity;
    const { scene, physicsEngine } = world;
    // TODO game mechanics for bubble reaching the top
    // for now just destroy
    Meshes.destroyMesh(scene, mesh.name);
    Physics.removeBody(physicsEngine.world, id);
    GameWorlds.removeEntity(world, id);
};

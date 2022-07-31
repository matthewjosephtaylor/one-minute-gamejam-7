import { v3 } from '../../engine/babs/v3';
import { Maths } from '../../engine/math';
import { isUndefined } from '../../engine/object';
import { Tick } from '../../engine/tick';
import { GameWorld } from '../GameWorld';


export const moveEntityToDestinationSystem = (world: GameWorld) => {
    const { scene, entities } = world;

    return (tick: Tick) => {
        const { deltaMs } = tick;
        for (const entity of entities) {
            const { mesh, destination } = entity;
            if (isUndefined(destination)) {
                return;
            }
            mesh.position = v3(Maths.lerp3(mesh.position, destination,  0.01));
        }
    };
};

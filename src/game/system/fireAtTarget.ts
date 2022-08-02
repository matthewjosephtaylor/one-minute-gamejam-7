import { Materials, Meshes } from '../../engine/babs';
import { Colors } from '../../engine/color';
import { Point3, toVec3 } from '../../engine/math';
import { Randoms } from '../../engine/random';
import { GameWorld } from '../GameWorld';
import { GameWorlds } from '../GameWorlds';


export const fireAtTarget = ({ world, target, from }: { world: GameWorld; from: Point3; target: Point3; }) => {
    const { scene } = world;
    const id = `projectile-${Randoms.randomUuid()}`;

    const mat = Materials.getMaterial(scene, 'projectile-material');

    const mesh = Meshes.getBox(scene, id, {
        position: from,
        color: Colors.from('yellow').toString(),
        material: mat.name,
        width: 0.1,
        height: 0.1,
        depth: 0.1
    });

    GameWorlds.addEntity(world, {
        id,
        mesh,
        destination: toVec3(target),
        destinationRadius: 0.1,
        type: 'projectile',
        onDestinationReached: () => {
            GameWorlds.removeEntity(world, id);
        }
    });
};

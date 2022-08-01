import { Materials, Meshes } from '../../engine/babs';
import { Physics } from '../../engine/physics-2d';
import { GameWorld } from '../GameWorld';
import { GameWorlds } from '../GameWorlds';


export const addPeg = ({ world, x, y }: { world: GameWorld; x: number; y: number; }) => {
    const { scene, physicsEngine } = world;

    const mat = Materials.getMaterial(scene, 'peg-material');

    const id = `peg-${x},${y}`;
    const radius = 0.1;
    const mesh = Meshes.getSphere(scene, id, {
        position: [x, 0, y],
        color: 'green',
        radius,
        material: mat.name
    });

    const physicsBody = Physics.getBodyType(physicsEngine.world, 'circle', id, {
        x,
        y: -y,
        radius,
        isStatic: true,
        mass: 10,
        frictionAir: 0.05
    });

    GameWorlds.addEntity(world, {
        id,
        mesh,
        type: 'peg',
        physicsBody
    });
};

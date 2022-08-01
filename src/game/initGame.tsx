import { createScene } from './createScene';
import { addGameSystems } from './system/addGameSystems';
import { GameWorld } from './GameWorld';
import { AddDestructor } from './system/keyboardHandlerSystem';
import { Ticks } from '../engine/tick';
import { addControlSystems } from './system/addControlSystems';
import { setupCameraTopDown } from './camera/setupCameraTopDown';
import { addDebugMeshes } from './addDebugMeshes';
import { Physics } from '../engine/physics-2d';


export const initGame = (canvas: HTMLCanvasElement) => {
    const scene = createScene(canvas);

    const physicsEngine = Physics.createEngine({
        gravity: {
            y: 0.00001
        }
    });

    // various forms of loops
    const controlLoop = Ticks.create({});
    const renderLoop = Ticks.create({
        ticker: (tick) => {
            scene.render();
        }
    });
    const gameLoop = Ticks.create({});

    // cleanup after component is removed
    const destructors = [
        () => {
            gameLoop.abort = true;
        },
        () => {
            controlLoop.abort = true;
        },
        () => {
            renderLoop.abort = true;
        }
    ];

    // allow systems to clean up after themselves
    const addDestructor: AddDestructor = (destructor) => {
        destructors.push(destructor);
    };

    const world: GameWorld = {
        debug: false,
        scene,
        physicsEngine,
        unitsWide: 10,
        unitsTall: 10,
        entities: [],
        controlLoop,
        gameLoop,
        renderLoop,
        seed: 0
    };
    addDebugMeshes(world);
    setupCameraTopDown(world);
    gameLoop.tickers.push(...addGameSystems(world, addDestructor));
    controlLoop.tickers.push(...addControlSystems(world, addDestructor));

    return () => {
        destructors.forEach((destructor) => destructor());
    };
};

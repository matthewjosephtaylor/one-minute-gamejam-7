import { tuple2 } from '../engine/object'
import { Physics } from '../engine/physics-2d'
import { Sounds, SoundSampleMap } from '../engine/sound'
import { SoundSetupSpec } from '../engine/sound/setupSound'
import { Ticks } from '../engine/tick'
import { setupCameraTopDown } from './camera/setupCameraTopDown'
import { createScene } from './createScene'
import { GameWorld } from './GameWorld'
import { createLevel } from './level/createLevel'
import { addControlSystems } from './system/addControlSystems'
import { addGameSystems } from './system/addGameSystems'
import { AddDestructor } from './system/keyboardHandlerSystem'

export const initGame = async (canvas: HTMLCanvasElement) => {
    const scene = createScene(canvas)

    const physicsEngine = Physics.createEngine({
        gravity: {
            // y: 0.000001
            y: 0.0001
        }
    })

    // various forms of loops
    const controlLoop = Ticks.create({})
    const renderLoop = Ticks.create({
        running: false,
        ticker: (tick) => {
            scene.render()
        }
    })
    const gameLoop = Ticks.create({})

    // cleanup after component is removed
    const destructors = [
        () => {
            gameLoop.abort = true
        },
        () => {
            controlLoop.abort = true
        },
        () => {
            renderLoop.abort = true
        }
    ]

    // allow systems to clean up after themselves
    const addDestructor: AddDestructor = (destructor) => {
        destructors.push(destructor)
    }

    const sampleMap: SoundSampleMap = Object.fromEntries(
        SFX_SOURCES.map((sfx) => {
            return tuple2(sfx, `sfx/${sfx}`)
        })
    )
    const { ctx } = await Sounds.setupSound({
        sampleMap
    })

    const world: GameWorld = {
        debug: false,
        scene,
        physicsEngine,
        soundCtx: ctx,
        physicsScale: 100,
        unitsWide: 9,
        unitsTall: 9,
        entities: [],
        controlLoop,
        gameLoop,
        renderLoop,
        seed: 0
    }
    // addDebugMeshes(world)

    setupCameraTopDown(world)
    renderLoop.running = true
    gameLoop.tickers.push(...addGameSystems(world, addDestructor))
    controlLoop.tickers.push(...addControlSystems(world, addDestructor))

    // TODO this should happen via UI interaction not on start
    createLevel({ world })

    return tuple2(() => {
        destructors.forEach((destructor) => destructor())
    }, world)
}

export const SFX_SOURCES = [
    'bubble_pop1.mp3',
    'bubble_pop2.mp3',
    'bubble_pop3.mp3',
    'game_end.mp3',
    'game_start.mp3',
    'placement_start.mp3',
    'shoot_pearl_1.mp3',
    'shoot_pearl_2.mp3',
    'tower_placement_1.mp3',
    'tower_placement_2.mp3',
    'tower_placement_3.mp3'
]

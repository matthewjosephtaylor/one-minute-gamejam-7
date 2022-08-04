import { tuple2 } from '../engine/object'
import { Physics } from '../engine/physics-2d'
import { Sounds, SoundSampleMap } from '../engine/sound'
import { SoundSetupSpec } from '../engine/sound/setupSound'
import { Ticks } from '../engine/tick'
import { setupCameraTopDown } from './camera/setupCameraTopDown'
import { createScene } from './createScene'
import { GameWorld } from './GameWorld'
import { createLevel } from './level/createLevel'
import { MUSIC_SOURCES } from './MUSIC_SOURCES'
import { SFX_SOURCES } from './SFX_SOURCES'
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
    Sounds.playAudio({ ctx, repeat: true, src: MUSIC_SOURCES.map((src) => `music/${src}`) })

    return tuple2(() => {
        destructors.forEach((destructor) => destructor())
    }, world)
}

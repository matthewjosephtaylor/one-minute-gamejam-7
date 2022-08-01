import { useEffect, useRef } from 'react'

import { Game } from '../../../game/Game'
import { addGameSystems } from '../../../game/system/addGameSystems'
import { GameWorld } from '../../../game/GameWorld'
import * as S from './styles'
import { AddDestructor } from '../../../game/system/keyboardHandlerSystem'
import { Ticks } from '../../../engine/tick'
import { addControlSystems } from '../../../game/system/addControlSystems'
import { setupCameraTopDown } from '../../../game/camera/setupCameraTopDown'
import { addDebugMeshes } from '../../../game/addDebugMeshes'
import { Physics } from '../../../engine/physics-2d'

const GameComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>()

    useEffect(() => {
        const scene = Game(canvasRef.current)

        const physicsEngine = Physics.createEngine({
            gravity: {
                y: 0.00001
            }
        })

        // various forms of loops
        const controlLoop = Ticks.create({})
        const renderLoop = Ticks.create({
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
        }
        addDebugMeshes(world)
        setupCameraTopDown(world)
        gameLoop.tickers.push(...addGameSystems(world, addDestructor))
        controlLoop.tickers.push(...addControlSystems(world, addDestructor))

        return () => {
            destructors.forEach((destructor) => destructor())
        }
    }, [])

    return (
        <S.Game>
            <canvas ref={canvasRef} />
        </S.Game>
    )
}

export default GameComponent

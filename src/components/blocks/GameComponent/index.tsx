import { useEffect, useRef } from 'react'

import { Game } from '../../../game/Game'
import { addGameSystems } from '../../../game/system/addGameSystems'
import { GameWorld } from "../../../game/GameWorld"
import * as S from './styles'

const GameComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>()

    useEffect(() => {
        const [tickState, scene] = Game(canvasRef.current)
        // TODO allow systems chance to cleanup (unsub, etc...)
        const world: GameWorld = {
            scene,
            entities: []
        }
        tickState.tickers.push(...addGameSystems(world))
        return () => {
            tickState.abort = true
        }
    }, [])

    return (
        <S.Game>
            <canvas ref={canvasRef} />
        </S.Game>
    )
}

export default GameComponent

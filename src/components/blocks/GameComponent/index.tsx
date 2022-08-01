import { useEffect, useRef } from 'react'

import * as S from './styles'
import { initGame } from '../../../game/initGame'

const GameComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>()

    useEffect(() => {
        return initGame(canvasRef.current)
    }, [])

    return (
        <S.Game>
            <canvas ref={canvasRef} />
        </S.Game>
    )
}

export default GameComponent

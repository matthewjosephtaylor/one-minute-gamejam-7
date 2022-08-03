import { useEffect, useRef } from 'react'

import * as S from './styles'
import { initGame } from '../../../game/initGame'
import ScoreDisplay from '@/components/elements/ScoreDisplay'
import ShellDisplay from '@/components/elements/ShellDisplay'

const GameComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>()

    useEffect(() => {
        return initGame(canvasRef.current)
    }, [])

    return (
        <S.Game>
            <S.GameCanvas>
                <ScoreDisplay />
                <ShellDisplay />
                <canvas ref={canvasRef} />
            </S.GameCanvas>
        </S.Game>
    )
}

export default GameComponent

import { useEffect, useRef, useState } from 'react'

import * as S from './styles'
import { initGame } from '../../../game/initGame'
import ScoreDisplay from '@/components/elements/ScoreDisplay'
import ShellDisplay from '@/components/elements/ShellDisplay'
import GameMenu from '@/components/elements/GameMenu'
import useGeneralState from '@/state/generalState'

const GameComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const { menuOpen, setMenuOpen } = useGeneralState((state) => state)

    useEffect(() => {
        return initGame(canvasRef.current)
    }, [])

    return (
        <S.Game>
            <S.GameCanvas>             
                <canvas ref={canvasRef} />
                <S.Hamburger onClick={() => setMenuOpen(!menuOpen)} />
                {menuOpen && <GameMenu />}   
                <ScoreDisplay />
                <ShellDisplay />
            </S.GameCanvas>
        </S.Game>
    )
}

export default GameComponent

import { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import Game from '@/game/Game'

const GameComponent = () => {
    const canvasRef = useRef()
    const [game, setGame] = useState(null)
    const requestRef = useRef()
    const previousTimeRef = useRef()

    const gameLoop = (time) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current
            game?.update(deltaTime)
        }
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(gameLoop)
    }

    useEffect(() => {
        setGame(new Game(canvasRef.current))
        requestRef.current = requestAnimationFrame(gameLoop)
        return () => cancelAnimationFrame(requestRef.current)
    }, [])

    return (
        <S.Game>
            <canvas ref={canvasRef} />
        </S.Game>
    )
}

export default GameComponent

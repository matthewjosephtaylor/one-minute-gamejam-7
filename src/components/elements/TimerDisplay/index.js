import { useState, useRef, useEffect } from 'react'

import * as S from './styles'
import useGeneralState from '@/state/generalState'

const TimerDisplay = () => {
    const { placementPhase, placementTime, gamePhase, gameTime, finishedPlacement, finishedGame, score, addHighScore } = useGeneralState(
        (state) => state
    )
    const [count, setCount] = useState(0)

    const requestRef = useRef()
    const previousTimeRef = useRef()
    const animate = (time) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current

            setCount((prevCount) => (prevCount - deltaTime * 0.001) % 1000)
        }
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        if (gamePhase) {
            cancelAnimationFrame(requestRef.current)
            setCount(gameTime)
            previousTimeRef.current = undefined
            requestRef.current = requestAnimationFrame(animate)
        }
        if (placementPhase) {
            cancelAnimationFrame(requestRef.current)
            setCount(placementTime)
            previousTimeRef.current = undefined
            requestRef.current = requestAnimationFrame(animate)
        }
    }, [gamePhase, placementPhase])

    useEffect(() => {
        if (count < 0) {
            cancelAnimationFrame(requestRef.current)
            setCount(0)
            if (placementPhase) {
                finishedPlacement()
            }
            if (gamePhase) {
                finishedGame()
                addHighScore(score)
            }
        }
    }, [count])

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current)
    }, [])

    return <S.TimerDisplay>{Math.round(count)}</S.TimerDisplay>
}

export default TimerDisplay

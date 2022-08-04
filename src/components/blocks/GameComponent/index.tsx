import { useEffect, useRef, useState } from 'react'

import * as S from './styles'
import { initGame } from '../../../game/initGame'
import ScoreDisplay from '@/components/elements/ScoreDisplay'
import ShellDisplay from '@/components/elements/ShellDisplay'
import GameMenu from '@/components/elements/GameMenu'
import useGeneralState from '@/state/generalState'
import { GameWorld } from '../../../game/GameWorld'
import { placeTowerAtMousePosition } from "../../../game/tower/placeTowerAtMousePosition"
import { TOWERS } from '../../../game/tower/TOWERS'

const GameComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>()
    const { menuOpen, setMenuOpen } = useGeneralState((state) => state)

    // TODO use zustand
    const [world, setWorld] = useState<GameWorld>()

    useEffect(() => {
        const [destructor, world] = initGame(canvasRef.current)
        setWorld(world)
        return destructor
    }, [])

    return (
        <S.Game>
            <S.GameCanvas>
                <canvas
                    onDrop={(event) => {
                        event.preventDefault()
                        const towerName = event.dataTransfer.getData('text')
                        const { clientX, clientY } = event
                        // get offset
                        const { left, top } = canvasRef.current.getBoundingClientRect()
                        const x = clientX - left
                        const y = clientY - top
                        placeTowerAtMousePosition({ world, position: [x, y], towerName })
                    }}
                    onDragOver={(event) => {
                        event.preventDefault()
                    }}
                    ref={canvasRef}
                />
                <S.Hamburger onClick={() => setMenuOpen(!menuOpen)} />
                {menuOpen && <GameMenu />}
                <ScoreDisplay />
                <ShellDisplay />
            </S.GameCanvas>

            <div
                // TODO HACK to get buttons on screen fast. For the love of Knuth please fix me! :)
                style={{ position: 'absolute', top: '92vh', left: '50vw' }}
            >
                <button>
                    {Object.entries(TOWERS).map((entry, index) => {
                        const [towerName, tower] = entry
                        const { textureSrc } = tower

                        return (
                            <img
                                key={index}
                                draggable="true"
                                onDragStart={(event) => {
                                    event.dataTransfer.setData('text', towerName)
                                }}
                                style={{ height: '5em' }}
                                src={textureSrc}
                            />
                        )
                    })}
                </button>
            </div>
        </S.Game>
    )
}

export default GameComponent

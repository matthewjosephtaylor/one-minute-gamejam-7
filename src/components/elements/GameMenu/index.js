import { useState } from 'react'

import * as S from './styles'
import useGeneralState from '@/state/generalState'
import MenuButton from './MenuButton'
import VolumeScrubber from '../VolumeScrubber'

const GameMenu = () => {
    const { setMenuOpen, sfxVolume, musicVolume, setSFXVolume, setMusicVolume } = useGeneralState((state) => state)
    const [optionsOpen, setOptionsOpen] = useState(false)

    return (
        <S.GameMenuWrapper>
            <S.GameMenu
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 400, duration: 1, delay: 0.2 }}
            >
                <S.Close
                    onClick={() => {
                        setMenuOpen(false)
                    }}
                />
                {!optionsOpen ? (
                    <>
                        <h1>Menu</h1>
                        <MenuButton>Start Game</MenuButton>
                        <MenuButton>High Scores</MenuButton>
                        <MenuButton
                            onClick={() => {
                                setOptionsOpen(true)
                            }}
                        >
                            Options
                        </MenuButton>
                    </>
                ) : (
                    <>
                        <h1>Options</h1>
                        <VolumeScrubber
                            label="Music"
                            volume={musicVolume}
                            onChange={(volume) => {
                                setMusicVolume(volume)
                            }}
                        />
                        <VolumeScrubber
                            label="SFX"
                            volume={sfxVolume}
                            onChange={(volume) => {
                                setSFXVolume(volume)
                            }}
                        />
                        <MenuButton onClick={() => setOptionsOpen(false)}>Back</MenuButton>
                    </>
                )}
            </S.GameMenu>
        </S.GameMenuWrapper>
    )
}

export default GameMenu

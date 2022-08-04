import create from 'zustand'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const useGeneralState = create((set) => ({
    score: 0,
    highScores: [],
    money: 100,
    sfxVolume: 80,
    musicVolume: 80,
    menuOpen: false,
    placementTime: 15,
    gameTime: 60,
    placementPhase: false,
    gamePhase: false,
    endPhase: false,
    lastHighScore: 0,
    addHighScore: (score) => {
        return set((state) => ({ ...state, highScores: [...state.highScores, score], lastHighScore: score }))
    },
    setMenuOpen: (menuOpen) => set((state) => ({ ...state, menuOpen })),
    startGame: () => set((state) => ({ ...state, score: 0, money: 100, placementPhase: true, menuOpen: false, endPhase: false })),
    finishedPlacement: () => set((state) => ({ ...state, placementPhase: false, gamePhase: true })),
    finishedGame: () => set((state) => ({ ...state, gamePhase: false, endPhase: true, menuOpen: true })),
    setScore: (score) => set((state) => ({ ...state, score })),
    setMoney: (money) => set((state) => ({ ...state, money })),
    setSFXVolume: (sfxVolume) => set((state) => ({ ...state, sfxVolume: clamp(sfxVolume, 0, 100) })),
    setMusicVolume: (musicVolume) => set((state) => ({ ...state, musicVolume: clamp(musicVolume, 0, 100) })),
    addScore: (value) => set((state) => ({ ...state, score: state.score + value })),
    closeEndScreen: () => set((state) => ({ ...state, endPhase: false }))
}))

export default useGeneralState

import create from 'zustand'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const useGeneralState = create((set) => ({
    score: 0,
    shells: 100,
    sfxVolume: 100,
    musicVolume: 100,
    menuOpen: false,
    setMenuOpen: (menuOpen) => set((state) => ({ ...state, menuOpen })),
    startGame: () => set((state) => ({ ...state, score: 0, shells: 100 })),
    setScore: (score) => set((state) => ({ ...state, score })),
    setShells: (shells) => set((state) => ({ ...state, shells })),
    setSFXVolume: (sfxVolume) => set((state) => ({ ...state, sfxVolume: clamp(sfxVolume, 0, 100) })),
    setMusicVolume: (musicVolume) => set((state) => ({ ...state, musicVolume: clamp(musicVolume, 0, 100) }))
}))

export default useGeneralState

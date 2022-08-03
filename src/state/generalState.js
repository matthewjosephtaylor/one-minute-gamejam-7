import create from 'zustand'

const useGeneralState = create((set) => ({
    score: 0,
    shells: 0,
    setScore: (score) => set((state) => ({ ...state, score })),
    setShells: (shells) => set((state) => ({ ...state, shells }))
}))

export default useGeneralState

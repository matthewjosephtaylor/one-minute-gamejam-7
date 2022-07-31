import create from 'zustand'

const useGeneralState = create((set) => ({
    username: 'Panguino',
    color: 'red',
    setColor: (color) => set((state) => ({ ...state, color: color })),
    setUsername: (username) => set((state) => ({ ...state, username }))
}))

export default useGeneralState

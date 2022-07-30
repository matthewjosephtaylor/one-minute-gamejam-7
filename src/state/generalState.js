import { Color3 } from '@babylonjs/core'
import create from 'zustand'

const useGeneralState = create((set) => ({
	username: 'Panguino',
	color: new Color3(1, 0, 0),
	setColor: (color) => set((state) => ({ ...state, color: color })),
	setUsername: (username) => set((state) => ({ ...state, username }))
}))

export default useGeneralState

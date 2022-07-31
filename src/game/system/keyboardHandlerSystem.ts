import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { PAUSE_KEY } from './KEYBOARD_KEYS'

export type AddDestructor = (destructor: () => void) => void

export const keyboardHandlerSystem = ({
    world,
    parent = document.body,
    addDestructor
}: {
    world: GameWorld
    parent?: HTMLElement
    addDestructor: AddDestructor
}) => {
    const KEY_STATE = {
        keys: []
    }

    const addKeyHandler = (event: KeyboardEvent) => {
        KEY_STATE.keys.push(event.key)
    }

    const removeKeyHandler = (event: KeyboardEvent) => {
        KEY_STATE.keys = KEY_STATE.keys.filter((k) => event.key === k)
    }

    parent.addEventListener('keydown', addKeyHandler)
    parent.addEventListener('keyup', removeKeyHandler)

    addDestructor(() => parent.removeEventListener('keydown', addKeyHandler))
    addDestructor(() => parent.removeEventListener('keyup', removeKeyHandler))

    return (tick: Tick) => {
        const { keys } = KEY_STATE
        const { gameLoop } = world

        // basic keyboard controls
        if (keys.includes(PAUSE_KEY)) {
            gameLoop.running = !gameLoop.running
            // consume the keypress
            KEY_STATE.keys = keys.filter((k) => k !== PAUSE_KEY)
        }
    }
}

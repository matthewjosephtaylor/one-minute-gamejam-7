import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { consumeKey } from './consumeKey'
import { DEBUG_KEY, PAUSE_KEY } from './KEYBOARD_KEYS'

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
        const { gameLoop } = world

        // basic keyboard controls
        consumeKey(KEY_STATE, PAUSE_KEY, () => {
            gameLoop.running = !gameLoop.running
        })
        consumeKey(KEY_STATE, DEBUG_KEY, () => {
            console.log({ world })
        })
    }
}

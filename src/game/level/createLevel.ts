import { times } from '../../engine/object'
import { GameWorld } from '../GameWorld'
import { addPeg } from './addPeg'

export const createLevel = ({ world }: { world: GameWorld }) => {
    // add pegs with colliders

    // simple grid
    times(6, (y) => {
        times(6, (x) => {
            const offset = y % 2 === 0 ? 0 : 1
            const tx = x - 3 + offset
            const ty = y - 3
            addPeg({ world, x: tx, y: ty })
        })
    })
}

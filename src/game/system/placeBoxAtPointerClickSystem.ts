import { Materials, Meshes } from '../../engine/babs'
import { toVec3, Vec2, Vec3 } from '../../engine/math'
import { first, isUndefined, times } from '../../engine/object'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'

/** Example system that places a box where the user clicks */
export const placeBoxAtPointerClickSystem = ({ world, parent = document.body }: { world: GameWorld; parent?: HTMLElement }) => {
    const { scene } = world
    //
    const CLICK_STATE = { position: undefined as Vec2 }

    // TODO cleanup listener or do this some other way
    parent.addEventListener('pointerdown', (event) => {
        const { offsetX, offsetY } = event
        CLICK_STATE.position = [offsetX, offsetY]
    })

    return (tick: Tick) => {
        const { position } = CLICK_STATE
        if (isUndefined(position)) {
            return
        }
        delete CLICK_STATE.position //consume the click

        const [x, y] = position

        const pick = first(Meshes.pickMeshes(scene, x, y))
        if (isUndefined(pick)) {
            return
        }

        const [px, py, pz] = toVec3(pick.pickedPoint)

        const mat = Materials.getMaterial(scene, 'test-material')

        const mesh = Meshes.getBox(scene, `box-${x},${y}`, {
            position: [px, 0, pz],
            color: 'red',
            width: 1,
            height: 1,
            depth: 1,
            material: mat.name
        })

        // totally made up just to demonstrate destination pathing
        const randWithinBounds = () => Math.random() * 10 - 5
        const destination: Vec3 = [randWithinBounds(), 0, randWithinBounds()]

        world.entities.push({
            mesh,
            destination
        })
    }
}

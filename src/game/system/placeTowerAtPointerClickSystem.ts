import { Materials, Meshes } from '../../engine/babs'
import { toVec3, Vec2 } from '../../engine/math'
import { first, isUndefined, times } from '../../engine/object'
import { Physics } from '../../engine/physics-2d'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { isTowerAtPosition } from './isTowerAtPosition'
import { AddDestructor } from './keyboardHandlerSystem'
import { sortEntitiesByDistanceFromTarget } from './sortEntitiesByDistanceFromTarget'

/** Example system that places a box where the user clicks */
export const placeTowerAtPointerClickSystem = ({
    world,
    parent = document.body,
    addDestructor
}: {
    world: GameWorld
    parent?: HTMLElement
    addDestructor: AddDestructor
}) => {
    const { scene, physicsEngine } = world
    const CLICK_STATE = { position: undefined as Vec2 }

    const pointerDownHandler = (event: PointerEvent) => {
        const { offsetX, offsetY } = event
        console.log(`${offsetX} ${offsetY}`)
        CLICK_STATE.position = [offsetX, offsetY]
    }
    parent.addEventListener('pointerdown', pointerDownHandler)
    addDestructor(() => parent.removeEventListener('pointerdown', pointerDownHandler))

    return (tick: Tick) => {
        const { entities } = world
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

        const mat = Materials.getMaterial(scene, 'tower-material')

        const id = `tower-${x},${y}`

        // find closest peg to click
        const sortedEntities = entities.filter((e) => e.type === 'peg').sort((a, b) => sortEntitiesByDistanceFromTarget(a, b, [px, pz]))
        const closestPeg = first(sortedEntities)
        const pegPosition = closestPeg.mesh.position

        const size = 0.5

        const mesh = Meshes.getBox(scene, id, {
            // position: [px, 0, pz],
            position: pegPosition,
            color: 'blue',
            width: size,
            height: size,
            depth: size,
            material: mat.name
        })

        const [pegX, pegY, pegZ] = toVec3(pegPosition)
        if (isTowerAtPosition({ world, position: [pegX, pegY, pegZ] })) {
            return
        }

        const physicsBody = Physics.getBodyType(physicsEngine.world, 'rectangle', id, {
            x: pegX,
            y: -pegZ,
            width: size,
            height: size,
            isStatic: true,
            mass: 10,
            frictionAir: 0.05
        })

        world.entities.push({
            id,
            mesh,
            range: 2,
            type: 'tower',
            fireRateTicks: 60,
            physicsBody
        })
    }
}

import { Materials, Meshes, Textures } from '../../engine/babs'
import { v3 } from '../../engine/babs/v3'
import { toVec2, toVec3, Vec2 } from '../../engine/math'
import { first, isUndefined } from '../../engine/object'
import { Physics } from '../../engine/physics-2d'
import { GameWorld } from '../GameWorld'
import { isTowerAtPosition } from '../system/isTowerAtPosition'
import { sortEntitiesByDistanceFromTarget } from '../system/sortEntitiesByDistanceFromTarget'
import { TOWERS } from './TOWERS'

export const placeTowerAtMousePosition = ({ world, position, towerName }: { world: GameWorld; position: Vec2; towerName: string }) => {
    const { entities, physicsScale, scene, physicsEngine } = world
    const [x, y] = position
    const tower = TOWERS[towerName]
    if (isUndefined(tower)) {
        console.log({ tower, towerName })
        throw new Error(`No such tower: '${towerName}'`)
    }

    const pick = first(Meshes.pickMeshes(scene, x, y))
    if (isUndefined(pick)) {
        return
    }

    const [px, py, pz] = toVec3(pick.pickedPoint)

    const { textureSrc } = tower

    const tex = Textures.getPathTexture(scene, `${towerName}-texture`, { src: textureSrc })
    const mat = Materials.getMaterial(scene, `${towerName}-material`, {
        emissiveTexture: tex.name,
        opacityTexture: tex.name
    })
    console.log({ textureSrc })

    const id = `tower-${x},${y}`

    // find closest peg to click
    const sortedEntities = entities.filter((e) => e.type === 'peg').sort((a, b) => sortEntitiesByDistanceFromTarget(a, b, [px, pz]))
    const closestPeg = first(sortedEntities)
    const pegPosition = closestPeg.mesh.position

    const size = 0.5

    const mesh = Meshes.getBox(scene, id, {
        // position: pegPosition,
        position: [0, 10, 0],
        // color: 'blue',
        width: size,
        height: size,
        depth: size,
        material: mat.name
    })
    mesh.rotation = v3(0, Math.PI / 2, 0)

    const [pegX, pegY, pegZ] = toVec3(pegPosition)
    if (isTowerAtPosition({ world, position: [pegX, pegY, pegZ] })) {
        return
    }

    const physicsBody = Physics.getBodyType(physicsEngine.world, 'circle', id, {
        x: pegX * physicsScale,
        y: -pegZ * physicsScale,
        radius: (size / 2) * physicsScale,
        // width: size,
        // height: size,
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

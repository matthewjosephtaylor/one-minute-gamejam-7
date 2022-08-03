import { Materials, Meshes, Textures } from '../../engine/babs'
import { Colors } from '../../engine/color'
import { Maths, Vec3 } from '../../engine/math'
import { Randoms } from '../../engine/random'
import { Tick } from '../../engine/tick'
import { GameWorld } from '../GameWorld'
import { gameTickRandom } from '../gameTickRandom'
import { GameWorlds } from '../GameWorlds'
import { Physics } from '../../engine/physics-2d'
import { Images } from '../../engine/image'
import { createCanvas } from '../../engine/babs/createCanvas'
import { v3 } from '../../engine/babs/v3'

export const bubbleSpawnSystem = ({ world }: { world: GameWorld }) => {
    return async (tick: Tick) => {
        const { scene, unitsWide, unitsTall, entities, physicsEngine } = world
        // TODO spawn rate for bubbles
        if (entities.filter((e) => e.type === 'bubble').length > 10) {
            return
        }

        const image = await Images.loadHTMLImageElement('img/bubble.svg')

        const cvs = createCanvas({ width: image.naturalWidth, height: image.naturalHeight })
        const ctx = cvs.getContext('2d')
        ctx.drawImage(image, 0, 0)

        const tex = Textures.getHtmlElementTexture(scene, 'bubble-texture', {
            element: cvs
        })
        const mat = Materials.getMaterial(scene, 'bubble-material', {
            emissiveTexture: tex.name,
            opacityTexture: tex.name
        })
        const random = gameTickRandom(world, tick)
        if (random() < 0.9) {
            return
        }

        const id = `bubble-${Randoms.randomUuid(random)}`

        const boardWidth = 7
        const x = random() * boardWidth - boardWidth / 2
        const z = unitsTall / 2

        const size = 0.1 + random() * 0.6
        const mesh = Meshes.getBox(scene, id, {
            position: [x, 0, z],
            color: Colors.from('blue').mix(Colors.from('green')).mix(Colors.from('white')).toString(),
            width: size,
            height: 0.001,
            depth: size,
            material: mat.name
        })

        // TODO figure out the plane rotation
        // mesh.rotate(v3(0, 0, 0), Math.PI)

        const physicsBody = Physics.getBodyType(physicsEngine.world, 'circle', id, {
            x,
            y: -z,
            radius: size / 2,
            mass: 10,
            friction: 0,
            frictionStatic: 0

            // frictionAir: 0.05
        })

        GameWorlds.addEntity(world, {
            id,
            mesh,
            type: 'bubble',
            collisionRadius: size,
            physicsBody
        })
    }
}

import { toVec3 } from '../../engine/math'
import { Randoms } from '../../engine/random'
import { Sounds } from '../../engine/sound'
import { Tick } from '../../engine/tick'
import useGeneralState from '../../state/generalState'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'
import { SFX_SOURCES } from '../initGame'

export const bubbleReachedTopSystem = ({ world }: { world: GameWorld }) => {
    return (tick: Tick) => {
        const { addScore } = useGeneralState.getState()
        const { unitsTall, entities, soundCtx } = world
        // TODO match up wavetop to art
        const WAVE_TOP = -(unitsTall / 2) * 0.8
        entities
            .filter((e) => e.type === 'bubble')
            .forEach((entity) => {
                const { mesh, id } = entity
                const [x, y, z] = toVec3(mesh.position)
                if (z > WAVE_TOP) {
                    return
                }
                const popSfx = Randoms.pickRandom(SFX_SOURCES.filter((sfx) => /bubble_pop/.test(sfx)))
                Sounds.playNote({ ctx: soundCtx, instrument: 'sampler', voice: popSfx })
                addScore(-1)
                GameWorlds.removeEntity(world, id)
            })
    }
}

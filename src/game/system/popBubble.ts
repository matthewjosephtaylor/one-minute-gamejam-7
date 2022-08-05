import { Randoms } from '../../engine/random'
import { Sounds } from '../../engine/sound'
import { GameWorld } from '../GameWorld'
import { GameWorlds } from '../GameWorlds'
import { SFX_SOURCES } from '../SFX_SOURCES'
import { GameEntity } from '../GameEntity'
import useGeneralState from '../../state/generalState'

export const popBubble = ({ world, bubble }: { world: GameWorld; bubble: GameEntity }) => {
    const { soundCtx } = world
    const sfx = Randoms.pickRandom(SFX_SOURCES.filter((sfx) => /bubble_pop/.test(sfx)))
    Sounds.playNote({ ctx: soundCtx, instrument: 'sampler', voice: sfx })
    GameWorlds.removeEntity(world, bubble.id)
    const { addMoney } = useGeneralState.getState()
    addMoney(1)
}

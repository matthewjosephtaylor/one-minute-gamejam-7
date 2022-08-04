import { SoundCtx } from './type/SoundCtx'

import { Player } from 'tone'
import { Objects } from '../object/Objects'
import { Randoms } from '../random'

export function playAudio({ ctx, src }: { ctx: SoundCtx; src: string | string[] }) {
    const firstSrc = Randoms.pickRandom(Objects.toMany(src))
    const player = new Player(firstSrc).toDestination()
    player.autostart = true
    return player
}

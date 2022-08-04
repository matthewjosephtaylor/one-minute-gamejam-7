import { SoundCtx } from './type/SoundCtx'

import { Player } from 'tone'
import { Objects } from '../object/Objects'
import { Randoms } from '../random'

export const playAudio = ({ ctx, src, repeat = true }: { ctx: SoundCtx; src: string | string[]; repeat: boolean }) => {
    const firstSrc = Randoms.pickRandom(Objects.toMany(src))
    const player = new Player(firstSrc).toDestination()
    player.autostart = true

    // TODO pause music
    player.onstop = () => {
        playAudio({ ctx, src, repeat })
    }
}

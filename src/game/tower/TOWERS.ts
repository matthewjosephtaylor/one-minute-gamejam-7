import { Tower } from './Tower'

export const TOWERS: Record<string, Tower> = {
    clam: {
        textureSrc: 'img/clam.png',
        cost: 10,
        range: 3
    },
    coral: {
        textureSrc: 'img/coral.png',
        cost: 20,
        range: 3
    },
    urchin: {
        textureSrc: 'img/urchin.png',
        cost: 30,
        range: 3
    }
}

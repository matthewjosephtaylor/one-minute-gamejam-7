import { Tower } from './Tower'

export const TOWERS: Record<string, Tower> = {
    clam: {
        textureSrc: 'img/clam.png',
        cost: 10,
        range: 3,
        visualSize: 1,
        colliderSize: 0.5,
        attack: 'fire'
    },
    coral: {
        textureSrc: 'img/coral.png',
        cost: 20,
        range: 0.6,
        visualSize: 1,
        colliderSize: 0.5,
        attack: 'area'
    },
    urchin: {
        textureSrc: 'img/urchin.png',
        cost: 40,
        range: 2,
        visualSize: 1,
        colliderSize: 0.5,
        attack: 'area',
        attackTextureSrc: 'img/spike_nova.png'
    }
}

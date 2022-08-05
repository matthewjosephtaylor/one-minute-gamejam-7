import { Tower } from './Tower'

export const TOWERS: Record<string, Tower> = {
    clam: {
        textureSrc: 'img/clam.png',
        cost: 20,
        range: 3,
        visualSize: 0.75,
        colliderSize: 0.5,
        attack: 'fire',
        fireRateTicks: 30,
        projectileLifetimeTicks: 60
    },
    coral: {
        textureSrc: 'img/coral.png',
        cost: 40,
        range: 0.6,
        visualSize: 0.75,
        colliderSize: 0.5,
        attack: 'area'
    },
    urchin: {
        textureSrc: 'img/urchin.png',
        cost: 80,
        range: 2,
        visualSize: 0.75,
        colliderSize: 0.5,
        attack: 'area',
        attackTextureSrc: 'img/spike_nova.png',
        fireRateTicks: 60
    }
}


export type Attack = 'fire' | 'area'

export type Tower = {
    textureSrc: string
    cost: number
    range: number
    attack: Attack
}

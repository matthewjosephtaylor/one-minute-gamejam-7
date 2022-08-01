import { GameEntity } from './GameEntity'
import { GameWorld } from './GameWorld'

export const addEntity = (world: GameWorld, entity: GameEntity) => {
    world.entities.push(entity)
    return world
}

export const removeEntity = (world: GameWorld, id: string) => {
    const { entities } = world
    world.entities = entities.filter((e) => e.id !== id)
    return world
}

export const GameWorlds = {
    addEntity,
    removeEntity
}

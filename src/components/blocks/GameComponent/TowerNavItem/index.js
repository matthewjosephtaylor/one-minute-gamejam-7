import * as S from './styles'

const TowerNavItem = ({ draggable, onDragStart, icon }) => {
    return <S.TowerNavItem draggable={draggable} onDragStart={onDragStart} icon={icon}></S.TowerNavItem>
}

export default TowerNavItem

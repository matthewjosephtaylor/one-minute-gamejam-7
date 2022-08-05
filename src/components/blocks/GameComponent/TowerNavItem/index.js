import * as S from './styles'

const TowerNavItem = ({ draggable, onDragStart, icon, cost }) => {
    return (
        <S.TowerNavItem draggable={draggable} onDragStart={onDragStart} icon={icon}>
            <S.Cost>{cost}</S.Cost>
        </S.TowerNavItem>
    )
}

export default TowerNavItem

import * as S from './styles'
import useGeneralState from '@/state/generalState'

const TowerNavItem = ({ draggable, onDragStart, icon, cost }) => {
    const { money } = useGeneralState((state) => state)
    return (
        <S.TowerNavItem draggable={draggable} onDragStart={onDragStart} icon={icon} active={cost <= money}>
            <S.Cost>{cost}</S.Cost>
        </S.TowerNavItem>
    )
}

export default TowerNavItem

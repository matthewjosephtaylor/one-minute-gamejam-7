import * as S from './styles'
import useGeneralState from '@/state/generalState'

const ShellDisplay = () => {
    const { shells } = useGeneralState((state) => state)
    return <S.ShellDisplay>{shells}</S.ShellDisplay>
}

export default ShellDisplay

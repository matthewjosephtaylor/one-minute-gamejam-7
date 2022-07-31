// import { Color3 } from '@babylonjs/core'

import * as S from './styles'
import useGeneralState from '@/state/generalState'

const Navigation = () => {
    const { setColor } = useGeneralState((state) => state)

    return (
        <S.Navigation>
            <div>
                <button
                    onClick={() => {
                        setColor('red')
                    }}
                >
                    red
                </button>
                <button
                    onClick={() => {
                        setColor('blue')
                    }}
                >
                    blue
                </button>
                <button
                    onClick={() => {
                        setColor('green')
                    }}
                >
                    green
                </button>
            </div>
        </S.Navigation>
    )
}

export default Navigation

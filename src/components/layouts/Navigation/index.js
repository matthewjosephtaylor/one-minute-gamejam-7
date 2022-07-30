import { Color3 } from '@babylonjs/core'

import * as S from './styles'
import useGeneralState from '@/state/generalState'

const Navigation = () => {
    const { setColor } = useGeneralState((state) => state)

    return (
        <S.Navigation>
            <div>
                <button
                    onClick={() => {
                        setColor(new Color3(1, 0, 0))
                    }}
                >
                    red
                </button>
                <button
                    onClick={() => {
                        setColor(new Color3(0, 1, 0))
                    }}
                >
                    blue
                </button>
                <button
                    onClick={() => {
                        setColor(new Color3(0, 0, 1))
                    }}
                >
                    green
                </button>
            </div>
        </S.Navigation>
    )
}

export default Navigation

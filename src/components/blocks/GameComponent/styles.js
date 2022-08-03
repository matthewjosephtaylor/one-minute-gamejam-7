import styled from 'styled-components'

export const Game = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`
export const GameCanvas = styled.div`
    position: relative;
    width: 80vh;
    height: 80vh;
    background: #000;
    canvas {
        width: 100%;
        height: 100%;
    }
`

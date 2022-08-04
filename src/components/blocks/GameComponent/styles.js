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
        z-index: 20;
        position: relative;
    }
`
export const Hamburger = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-image: url('/img/menu@2x.png');
    background-size: cover;
    width: 50px;
    height: 50px;
    z-index: 30;
    cursor: pointer;
`

export const TowerNav = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 30;
    display: flex;
    gap: 10px;
`

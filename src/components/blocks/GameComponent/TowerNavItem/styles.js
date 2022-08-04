import styled, { css } from 'styled-components'

export const TowerNavItem = styled.div`
    width: 70px;
    height: 70px;
    background-image: url('/img/TowerButton@2x.png');
    background-size: contain;
    background-position: 0% 0%;
    background-repeat: no-repeat;
    position: relative;
    ${({ icon }) =>
        css`
            &:before {
                position: absolute;
                background-size: 60px 60px;
                background-position: 50% 50%;
                background-image: url('${icon}');
                background-repeat: no-repeat;
                content: '';
                top: 0;
                width: 100%;
                height: 100%;
                left: 0;
            }
        `}
`

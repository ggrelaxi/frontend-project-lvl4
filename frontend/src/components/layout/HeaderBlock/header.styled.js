import styled from 'styled-components';

export const HeaderContainer = styled.header`
    box-shadow: 0px 0px 4px 1px rgb(0 0 0 / 30%);
    flex: 0 0;
    padding: 10px 0;

    .header-logo {
        display: block;
        max-width: 40px;
        height: auto;
    }

    a {
        display: flex;
        align-items: center;
        gap: 20px;
        color: black;
        text-decoration: none;
    }
`;

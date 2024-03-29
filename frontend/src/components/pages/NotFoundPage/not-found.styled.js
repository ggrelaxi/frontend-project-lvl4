import styled from 'styled-components';

const NotFoundContainer = styled.div`
    .notfound {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .notfound {
        max-width: 767px;
        width: 100%;
        line-height: 1.4;
        padding: 110px 40px;
        text-align: center;
        background: #fff;
        -webkit-box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
        box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
    }

    .notfound .notfound-404 {
        position: relative;
        height: 180px;
    }

    .notfound .notfound-404 h1 {
        font-family: 'Roboto', sans-serif;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 165px;
        font-weight: 700;
        margin: 0px;
        color: #262626;
        text-transform: uppercase;
    }

    .notfound .notfound-404 h1 > span {
        color: #0d6efd;
    }

    .notfound h2 {
        font-family: 'Roboto', sans-serif;
        font-size: 22px;
        font-weight: 400;
        text-transform: uppercase;
        color: #151515;
        margin-top: 0px;
        margin-bottom: 25px;
    }

    @media only screen and (max-width: 767px) {
        .notfound h2 {
            font-size: 18px;
        }
    }

    @media only screen and (max-width: 480px) {
        .notfound .notfound-404 h1 {
            font-size: 141px;
        }
    }
`;

export default NotFoundContainer;

import { createGlobalStyle } from 'styled-components';
import env from '../../env.json';

const { novalid } = env.colors;

export const GlobalStyle = createGlobalStyle `
    @font-face {
        font-family: 'CoFo Sans';
        src: local("CoFo Sans Bold"), local("CoFoSans-Bold"), url("./fonts/CoFoSans-Bold.woff2") format("woff2"), url("./fonts/CoFoSans-Bold.woff") format("woff");
        font-weight: bold;
        font-display: swap;
    }

    @font-face {
        font-family: 'CoFo Sans';
        src: local("CoFo Sans Black"), local("CoFoSans-Black"), url("./fonts/CoFoSans-Black.woff2") format("woff2"), url("./fonts/CoFoSans-Black.woff") format("woff");
        font-weight: 900;
        font-display: swap;
    }

    @font-face {
        font-family: 'CoFo Sans';
        src: local("CoFo Sans"), local("CoFoSans-Regular"), url("./fonts/CoFoSans-Regular.woff2") format("woff2"), url("./fonts/CoFoSans-Regular.woff") format("woff");
        font-weight: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'CoFo Sans';
        src: local("CoFo Sans Medium"), local("CoFoSans-Medium"), url("./fonts/CoFoSans-Medium.woff2") format("woff2"), url("./fonts/CoFoSans-Medium.woff") format("woff");
        font-weight: 500;
        font-display: swap;
    }

    :root {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        -webkit-box-sizing: inherit;
            box-sizing: inherit;
    }

    body {
        min-width: 320px;
        min-height: 100vh;
        margin: 0;
        background-color: #fff;
        font-family: "CoFo Sans", Arial, sans-serif;
        font-size: 16px;
        font-weight: 400;
        color: black;
        overflow: hidden;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        font: inherit;
        margin: 0;
        padding: 0;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    ul,
    ol,
    li,
    nav {
        list-style: none;
    }

    h1,
    h2,
    h3,
    h4,
    p,
    ul,
    ol,
    figure,
    figcaption,
    nav {
        padding: 0;
        margin: 0;
    }

    button {
        cursor: pointer;
        box-shadow: none;
        outline: none;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: none;
    }

    .empty {
        background-color: ${novalid} !important;
        svg {
            fill: ${novalid} !important;
        }
    }
`;
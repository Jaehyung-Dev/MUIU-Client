import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'TTLaundryGothicB';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/TTLaundryGothicB.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: 'Pretendard-Regular', sans-serif;
    }

    .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 600px;
        margin: 0 auto;
        padding: 0 20px 180px;
        box-sizing: border-box;
    }

`;

export default GlobalStyle;

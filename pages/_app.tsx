import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";
import { store } from "../src/store";
import { Provider } from "react-redux";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: openhuninn;
    src: url('/fonts/jf-openhuninn-1.1.ttf') format('truetype');
  }

  @font-face {
    font-family: HanaMinA;
    src: url('/fonts/HanaMinA.ttf') format('truetype');
  }


  @font-face {
    font-family: HanaMinB;
    src: url('/fonts/HanaMinB.ttf') format('truetype');
  }

  @font-face {
    font-family: Vidaloka;
    src: url('/fonts/Vidaloka-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: TaipeiSansTCBetaBold;
    src: url('/fonts/TaipeiSansTCBeta-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: TaipeiSansTCBetaLight;
    src: url('/fonts/TaipeiSansTCBeta-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: TaipeiSansTCBetaRegular;
    src: url('/fonts/TaipeiSansTCBeta-Regular.ttf') format('truetype');
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:  TaipeiSansTCBetaBold !important;

  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  ul {
    list-style:none;
  }

  a:link,a:visited {
    text-decoration: none;
  }

  button {
    transition: background-color 0.3s;
    border: none;
  }

  input:focus {
    outline: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

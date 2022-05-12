import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";
import { store } from "../src/store";
import { Provider } from "react-redux";
import { AdminProvider } from "../src/store/context/adminContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: jfOpenhuninn;
    src: url('/fonts/jf-openhuninn-1.1.ttf') format('truetype');
  }

  @font-face {
    font-family: hanaMinA;
    src: url('/fonts/HanaMinA.ttf') format('truetype');
  }


  @font-face {
    font-family: hanaMinB;
    src: url('/fonts/HanaMinB.ttf') format('truetype');
  }

  @font-face {
    font-family: Vidaloka;
    src: url('/fonts/Vidaloka-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: taipeiSansTCBold;
    src: url('/fonts/TaipeiSansTCBeta-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: taipeiSansTCLight;
    src: url('/fonts/TaipeiSansTCBeta-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: taipeiSansTCRegular;
    src: url('/fonts/TaipeiSansTCBeta-Regular.ttf') format('truetype');
  }


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: jfOpenhuninn;
    color:#333;
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
    font-family: inherit;
  }

  input:focus {
    outline: none;
  }

  .swal2-container .swal2-modal {
    background-image: url('/images/dashboard-background.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .swal2-modal .swal2-title {
    margin: 0;
  }

  & #swal2-html-container {
    font-size: 1.6rem;
    white-space: pre-line;
  }
  
  .swal2-actions .swal2-styled.swal2-confirm, .swal2-actions .swal2-styled.swal2-cancel {
    width: 12rem;
    height: 3.2rem;
    font-size: 1.6rem;
    padding:0
  }

  .swal2-actions .swal2-styled.swal2-confirm {
    order: 2;
  }
  .swal2-actions .swal2-styled.swal2-cancel {
    order: 1;
  }

  .swal2-modal .swal2-select {
    border-radius: 3px;
    border: 1px solid #ccc;
    padding:1rem;
    font-size: 1.5rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AdminProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AdminProvider>
    </Provider>
  );
}

export default MyApp;

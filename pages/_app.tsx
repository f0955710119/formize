import { createGlobalStyle } from "styled-components";
import type { AppProps } from "next/app";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: openhuninn;
    src: url('/fonts/jf-openhuninn-1.1.ttf') format('truetype');
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: openhuninn;
  }

  ul: {
    list-style: none;
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
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

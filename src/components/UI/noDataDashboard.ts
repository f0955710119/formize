import breakpointConfig from "../../configs/breakpointConfig";

export const generateNoDataDashBoard = (content: string) => {
  return `position:relative;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),url("/images/analysis-default.svg");
  background-size: cover;
  background-size: 35%;
  background-position: 50% 40%;
  filter: grayscale(100%);

  &::after {
    content:'${content}';
    position: absolute;
    top:70%;
    left:50%;
    width:100%;
    font-size:2rem;
    text-align:center;
    white-space: pre-line;
    color:#777;
    transform:translate(-50%,0);
  }
  
  &::before {
    content:'';
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:url("/images/main-bg.svg");
    background-repeat: no-repeat;
    background-size: cover;
    opacity:0.2;
  }

  @media ${breakpointConfig.laptopL} {
    background-size: 50%;
  }

  @media ${breakpointConfig.tablet} {
    background-size: 60%;
    &::after {
        font-size:1.8rem;
    }
  }

  @media ${breakpointConfig.tabletS} {
    background-size: 75%;
  }

  @media ${breakpointConfig.mobileL} {
    background-size: 100%;
    &::after {
        font-size:1.6rem;
    }
  }`;
};

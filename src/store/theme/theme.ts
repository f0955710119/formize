type Color = string;

export interface StyledComponentTheme {
  [key: string]: Color;
}

interface Themes {
  [key: string]: StyledComponentTheme;
}

const themes: Themes = {
  main: {
    title: "#381D2A",
    note: "#BA5624",
    option: "#FFA552",
    matrix: "#C4D6B0",
    optionClicked: "#BA5624",
    addOption: "#FCDE9C",
    optionText: "#381D2A",
    titleContrast: "#40160e",
  },
  yellow: {
    title: "#FF9900",
    note: "#EEA243",
    option: "#F1D9A7",
    matrix: "#F1D9A7",
    optionClicked: "#F3D34A",
    addOption: "#ffcc80",
    optionText: "#ffa31a",
    titleContrast: "#56a139",
  },
  green: {
    title: "#524632",
    note: "#8F7E4F",
    option: "#C3C49E",
    matrix: "#C3C49E",
    optionClicked: "#D8FFDD",
    addOption: "#cfd0b1",
    optionText: "#75765f",
    titleContrast: "#d58642",
  },
};

export default themes;

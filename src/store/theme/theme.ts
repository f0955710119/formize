type Color = string;

export interface StyledComponentTheme {
  title: Color;
  note: Color;
  placeholder: Color;
  option: Color;
  martix: Color;
  optionClicked: Color;
  addOption: Color;
  optionText: Color;
}

interface Themes {
  [key: string]: StyledComponentTheme;
}

const themes: Themes = {
  main: {
    title: "#381D2A",
    note: "#FFA552",
    placeholder: "#c8c8c8",
    option: "#C4D6B0",
    martix: "#C4D6B0",
    optionClicked: "#BA5624",
    addOption: "#FCDE9C",
    optionText: "#381D2A",
  },
  yellow: {
    title: "#FF9900",
    note: "#EEA243",
    placeholder: "#F3E37C",
    option: "#F1D9A7",
    martix: "#F1D9A7",
    optionClicked: "#F3D34A",
    addOption: "#ffcc80",
    optionText: "#ffa31a",
  },
  green: {
    title: "#524632",
    note: "#8F7E4F",
    placeholder: "#DEDBD8",
    option: "#C3C49E",
    martix: "#C3C49E",
    optionClicked: "#D8FFDD",
    addOption: "#cfd0b1",
    optionText: "#75765f",
  },
};

export default themes;

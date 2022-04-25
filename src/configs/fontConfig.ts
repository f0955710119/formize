interface FontConfig {
  [key: string]: {
    name: string;
    value: string;
  };
}

const fontConfig: FontConfig = {
  "0": { value: "jfOpenhuninn", name: "麻吉粉圓" },
  "1": { value: "hanaMinA", name: "花園明朝" },
  "2": { value: "taipeiSansTCBold", name: "臺北黑體" },
};

export default fontConfig;

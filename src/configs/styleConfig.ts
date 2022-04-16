// BUG: 好奇差異，因為這個可以解決能把參數帶入key的問題
interface StyleConfig {
  [key: string]: string;
}

// const styleConfig = {
//   MAIN: "main",
//   YELLOW: 'yellow',
//   BLACK: 'black'
// };
const styleConfig: StyleConfig = {
  MAIN: "main",
  YELLOW: "yellow",
  GREEN: "green",
  MAIN_NAME: "沉穩大地",
  YELLOW_NAME: "歡樂光芒",
  GREEN_NAME: "墨綠森林",
  OPENHUNNINN: "jf-openhuninn",
  HANAMINA: "HanaMinA",
  TAIPEISANSTCBOLD: "TaipeiSansTC-Bold",
  OPENHUNNINN_FONT: "麻吉粉圓",
  HANAMINA_FONT: "花園明朝",
  TAIPEISANSTCBOLD_FONT: "臺北黑體",
};

export default styleConfig;

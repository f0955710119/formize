// BUG: 好奇差異，因為這個可以解決能把參數帶入key的問題
interface StyleConfig {
  [key: string]: string;
}

// const styleConfig = {
//   MAIN: "main",
//   YELLOW: 'yellow',
//   BLACK: 'black'
// };

// 用來存取對應的 key 值 跟 呈現名稱
const styleConfig: StyleConfig = {
  MAIN: "main",
  YELLOW: "yellow",
  GREEN: "green",
  MAIN_NAME: "沉穩大地",
  YELLOW_NAME: "歡樂光芒",
  GREEN_NAME: "墨綠森林",
  MAIN_CODE: "0",
  YELLOW_CODE: "1",
  GREEN_CODE: "2",
  OPENHUNNINN: "jfOpenhuninn",
  HANAMINA: "hanaMinA",
  TAIPEISANSTCBOLD: "taipeiSansTCBold",
  OPENHUNNINN_FONT: "麻吉粉圓",
  HANAMINA_FONT: "花園明朝",
  TAIPEISANSTCBOLD_FONT: "臺北黑體",
  OPENHUNNINN_CODE: "0",
  HANAMINA_CODE: "1",
  TAIPEISANSTCBOLD_CODE: "2",
  "0": "OPENHUNNINN",
  "1": "HANAMINA",
  "2": "TAIPEISANSTCBOLD",
};

export default styleConfig;

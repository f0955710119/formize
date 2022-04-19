interface SettingsConfig {
  [key: string]: string[];
}

const settingConfig: SettingsConfig = {
  DEFAULT_SETTING_TITLE_LIST: [
    "標題",
    "問卷狀態",
    "頁面模式",
    "填答時間限制",
    "上限回應筆數",
  ],
  DEFAULT_STATUS_LIST: ["公開", "待上線", "保護", "額滿", "關閉"],
  DEFAULT_MODE_LIST: ["一頁式", "多頁式"],
  DEFAULT_UNIT_LIST: ["秒鐘", "分鐘", "小時"],
};

export default settingConfig;

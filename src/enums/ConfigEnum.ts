const systemInfo = uni.getSystemInfoSync()
const windowHeight = systemInfo.windowHeight
export const ConfigEnum = {
  // 浮动面板-高度
  floatingPanelAnchors: [
    Math.round(0.5 * windowHeight),
    Math.round(0.7 * windowHeight),
    Math.round(0.85 * windowHeight),
    // Math.round(0.7 * window.innerHeight),
    // Math.round(0.9 * window.innerHeight),
  ],
}

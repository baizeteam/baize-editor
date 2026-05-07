// 生成随机颜色
export const randomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30); // 70-100%
  const lightness = 50 + Math.floor(Math.random() * 20); // 50-70%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// 生成 n 位随机 id
export function generateId(n = 4) {
  return Math.random()
    .toString(36)
    .substring(2, n + 2);
}

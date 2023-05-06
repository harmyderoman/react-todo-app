
export function checkIfColorDark(color: string) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.slice(0, 2), 16);
  const c_g = parseInt(hex.slice(2, 4), 16);
  const c_b = parseInt(hex.slice(4, 6), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness < 155;
}

/**
 * @method 格式化时间戳
 * @param {Number|String} value
 * @returns {Date|String}
 */
export const dateFormat = value => {
  if (!value) return "";
  let date = new Date(value * 1000);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  return `${y}-${m > 9 ? m : "0" + m}-${d > 9 ? d : "0" + d} ${h > 9 ? h : "0" + h}:${
    min > 9 ? min : "0" + min
  }:${s > 9 ? s : "0" + s}`;
};

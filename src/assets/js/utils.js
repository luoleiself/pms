/**
 * @method 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 */
export const Debounce = (fn, t) => {
  let delay = t || 300;
  let timer;
  return function() {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};
/**
 * @method 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 */
export const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 300;
  return function() {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
};
/**
 * @method 格式化时间戳
 * @param {Number|String} value 时间戳单位为毫秒
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

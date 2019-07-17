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

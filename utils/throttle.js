// export default function throttle(callback: any, delay: number) {
//   let last: number | undefined;
//   let timer: number;

//   return function (this: any, ...args: any) {
//     const now = +new Date();
//     console.log("now>>>" + now);
//     console.log("last>>>" + last);
//     if (last && now < last + delay) {
//       // le délai n'est pas écoulé on reset le timer
//       clearTimeout(timer);
//       timer = setTimeout(function (this: any) {
//         last = now;
//         callback.apply(this, ...args);
//       }, delay);
//     } else {
//       last = now;
//       console.log("else/last>>>" + last);
//       callback.apply(this, ...args);
//     }
//   };
// }

export default function throttle(callback, delay) {
  let last;
  let timer;
  console.log(last);
  return function () {
    const now = +new Date();
    const args = arguments;
    console.log("last>>>" + last);
    if (last && now < last + delay) {
      // le délai n'est pas écoulé on reset le timer
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        callback.apply(this, args);
      }, delay);
    } else {
      last = now;
      callback.apply(this, args);
    }
  };
}

export default function debounce(callback: () => void, delay: number) {
  let timer: number;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

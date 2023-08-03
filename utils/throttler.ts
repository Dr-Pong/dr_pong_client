export const throttler = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
  timer: NodeJS.Timeout | null
) => {
  const throttled = (...args: Parameters<F>) => {
    if (!timer) {
      func(...args);
      timer = setTimeout(() => {
        timer = null;
      }, waitFor);
    }
  };
  return throttled as (...args: Parameters<F>) => ReturnType<F>;
};

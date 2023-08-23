let timer: NodeJS.Timeout | null = null;
export const throttler = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
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

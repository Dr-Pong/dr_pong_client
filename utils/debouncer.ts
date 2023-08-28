let timer: NodeJS.Timeout | null = null;

export const debouncer = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
) => {
  const debounced = (...args: Parameters<F>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const debouncer = <T extends Function>(func: T, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    const self = this;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(self, args);
    }, wait);
  };
};

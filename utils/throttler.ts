export const throttler = <T extends Function>(func: T, wati: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    const self = this;
    if (!timeoutId) {
      func.apply(self, args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, wati);
    }
  };
};

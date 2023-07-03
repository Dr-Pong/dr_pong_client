const timezoneResolver = (date: Date): Date => {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!browserTimezone || browserTimezone === 'Asia/Seoul') return date;

  return new Date(date.toLocaleString('en-US', { timeZone: browserTimezone }));
};

export const timezoneResolverToString = (date: Date): string => {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!browserTimezone || browserTimezone === 'Asia/Seoul')
    return date.toLocaleString();
  const browserLocale = Intl.DateTimeFormat().resolvedOptions().locale;

  return date.toLocaleString(browserLocale, { timeZone: browserTimezone });
};

export function timeConverter(time: Date | undefined) {
  if (!time) return '';
  const date = new Date(timezoneResolver(time));
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute < 10 ? '0' + minute : minute}`;
}

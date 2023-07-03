export const timezoneResolver = (date: Date): Date => {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!browserTimezone || browserTimezone === 'Asia/Seoul') return date;

  return new Date(date.toLocaleString('en-US', { timeZone: browserTimezone }));
};

export const timezoneResolverToString = (date: Date): string => {
  console.log(date);
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!browserTimezone || browserTimezone === 'Asia/Seoul')
    return date.toLocaleString();
  const browserLocale = Intl.DateTimeFormat().resolvedOptions().locale;

  return date.toLocaleString(browserLocale, { timeZone: browserTimezone });
};

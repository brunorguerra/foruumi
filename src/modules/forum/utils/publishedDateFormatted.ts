import { format, Locale } from 'date-fns';

export function publishedDateFormatted(publishedAt: string, locale: Locale) {
  return format(new Date(publishedAt), "d 'de' LLLL 'às' HH:mm'h'", {
    locale,
  });
}

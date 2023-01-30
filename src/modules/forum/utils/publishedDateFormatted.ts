import ptBR, { format } from 'date-fns';

export function publishedDateFormatted(publishedAt: string) {
  return format(new Date(publishedAt), "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });
}

/* eslint-disable */
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function publishedDateFormatted(publishedAt: string) {
  return format(new Date(publishedAt), "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });
}

import "intl"
import 'intl/locale-data/jsonp/pt-BR';

export function formatPrice(value: number) {
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return priceFormatter.format(value)
}
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'CAD',
});

export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number);
}

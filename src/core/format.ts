/** Parse user input, accepting both "1.5" and "1,5". Returns NaN if invalid. */
export function num(s: string): number {
  if (s.trim() === '') return NaN;
  return Number(s.replace(',', '.'));
}

export function money(n: number): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function qty(n: number): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

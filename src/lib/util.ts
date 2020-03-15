export function odds (numerator: number, demoninator: number): boolean {
  return Math.floor(Math.random() * demoninator) > (numerator - 1)
}

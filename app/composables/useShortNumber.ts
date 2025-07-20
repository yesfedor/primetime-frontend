const SI = [
  { v: 1e3, s: 'K' },
  { v: 1e6, s: 'M' },
  { v: 1e9, s: 'B' },
  { v: 1e12, s: 'T' },
  { v: 1e15, s: 'P' },
  { v: 1e18, s: 'E' },
]

export function useShortNumber(longNumber: number | string) {
  longNumber = Number(longNumber.toString().replace(/[^0-9.]/g, ''))

  if (longNumber < 1000) {
    return longNumber
  }

  let index: number
  for (index = SI.length - 1; index > 0; index--) {
    if (longNumber >= SI[index]!.v) {
      break
    }
  }

  return (longNumber / SI[index]!.v).toFixed(1).replace(/\.0+$|(\.\d*[1-9])0+$/, '$1') + SI[index]!.s
}

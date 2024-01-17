export const normal = {
  /**
   * Modified from: https://stackoverflow.com/a/49434653
   */
  boxMuller(min: number, max: number, skew: number = 1): number {
    if (min > max) throw new Error('Min was set higher than max')
    if (min === max) return min

    let u: number = 0
    let v: number = 0
    let num: number

    do {
      while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
      while (v === 0) v = Math.random()

      num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

      num = num / 10.0 + 0.5 // Translate to 0 -> 1
    } while (num > 1 || num < 0) // resample between 0 and 1 if out of range

    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min

    return num
  },
}

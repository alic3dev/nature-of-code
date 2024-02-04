export const normal = {
  acceptReject(min: number, max: number): number {
    let res: number

    do {
      res = Math.random()
    } while (res > Math.random())

    return (max - min) * res + min
  },

  /**
   * Modified from: https://stackoverflow.com/a/49434653
   */
  boxMuller(
    min: number,
    max: number,
    skew: number = 1,
    normal: number = 1,
  ): number {
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

    num = ((u + v) / 2) * (1 - normal) + num * normal

    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min

    return num
  },

  sinvul(min: number, max: number): number {
    const range: number = max - min
    const ran: number = Math.random() * range

    const sinVal: number = Math.sin((ran / range) * Math.PI * 2)
    const normalizedSinVal: number = (sinVal + 1) / 2

    const c: number = normalizedSinVal - 0.5

    return range * (c < 0 ? c + 1 : c) + min
  },
}

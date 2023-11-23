import styles from './Fraction.module.scss'

export function Fraction({
  numerator,
  denominator,
}: {
  numerator: number
  denominator: number
}): JSX.Element {
  return (
    <span className={styles.fraction}>
      <span className={styles.numerator}>{numerator}</span>
      <span className={styles.denominator}>{denominator}</span>
    </span>
  )
}

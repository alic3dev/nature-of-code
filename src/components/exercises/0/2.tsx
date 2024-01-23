import { Fraction } from '@/components/Fraction'
import { ExerciseMinimal } from '@/components/exercises/ExerciseMinimal'

export function ExerciseOneDotTwo(): JSX.Element {
  return (
    <ExerciseMinimal
      chapter={1}
      instructions={
        'What is the probability of drawing two aces in a row from a deck of fifty-two cards?'
      }
    >
      <p style={{ fontSize: '2rem' }}>
        <Fraction numerator={4} denominator={52} />
        {'  '}*{'  '}
        <Fraction numerator={3} denominator={51} />
        {'  '}={'  '}
        {(100 * (4 / 52) * (3 / 51)).toPrecision(4)}%
      </p>
    </ExerciseMinimal>
  )
}

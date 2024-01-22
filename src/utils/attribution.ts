import licenseText from '../../LICENSE.NATURE_OF_CODE.txt'

export { licenseText }

/* LEGACY
const artOfCodeChapterLookup: Record<number, string> = {
  1: 'vectors',
  2: 'forces',
  3: 'oscillation',
  4: 'particle-systems',
  5: 'physics-libraries',
  6: 'autonomous-agents',
  7: 'cellular-automata',
  8: 'fractals',
  9: 'the-evolution-of-code',
  10: 'neural-networks',
}

export const getArtOfCodeChapterURL = (chapter: number): string => {
  return `https://natureofcode.com/book/chapter-${chapter}-${artOfCodeChapterLookup[chapter]}`
}
*/

const artOfCodeChapterLookup: Record<number, string> = {
  1: 'random',
  2: 'vectors',
  3: 'force',
  4: 'oscillation',
  5: 'particles',
  6: 'autonomous-agents',
  7: 'physics-libraries',
  8: 'cellular-automata',
  9: 'fractals',
  10: 'genetic-algorithms',
  11: 'neural-networks',
  12: 'neuroevolution',
}

export const getArtOfCodeChapterURL = (chapter: number): string => {
  return `https://natureofcode.com/${artOfCodeChapterLookup[chapter]}`
}

export default {
  licenseText,
  getArtOfCodeChapterURL,
}

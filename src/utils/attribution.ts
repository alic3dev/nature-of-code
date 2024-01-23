import licenseText from '../../LICENSE.NATURE_OF_CODE.txt'

export { licenseText }

const artOfCodeChapterLookup: Record<number, string> = {
  0: 'random',
  1: 'vectors',
  2: 'force',
  3: 'oscillation',
  4: 'particles',
  5: 'autonomous-agents',
  6: 'physics-libraries',
  7: 'cellular-automata',
  8: 'fractals',
  9: 'genetic-algorithms',
  10: 'neural-networks',
  11: 'neuroevolution',
}

export const getArtOfCodeChapterURL = (chapter: number): string => {
  return `https://natureofcode.com/${artOfCodeChapterLookup[chapter]}`
}

export default {
  licenseText,
  getArtOfCodeChapterURL,
}

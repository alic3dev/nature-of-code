export const artOfCodeChapterLookup: Record<number, string> = {
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

export default {
  artOfCodeChapterLookup,
  getArtOfCodeChapterURL,
}

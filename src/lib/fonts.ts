export interface FontStyleDef {
  id: string;
  name: string;
  category: string;
  mapping: Record<string, string>;
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const COMMON_PUNCTUATION = `!?.:;,'"-_+/&()[]{}@#%*=`;

const DEFAULT_TEXT =
  `${LOWERCASE}${UPPERCASE}${DIGITS}${COMMON_PUNCTUATION} `;

function buildMapFromStrings(
  source: string,
  target: string,
  seed?: Record<string, string>
): Record<string, string> {
  if (source.length !== target.length) {
    throw new Error('Source and target alphabets must have the same length.');
  }

  const mapping: Record<string, string> = { ...(seed ?? {}) };

  for (let index = 0; index < source.length; index += 1) {
    mapping[source[index] ?? ''] = target[index] ?? '';
  }

  return mapping;
}

function buildRangeMap(
  lowercaseStart: number,
  uppercaseStart: number,
  digitStart?: number
): Record<string, string> {
  const mapping: Record<string, string> = { ' ': ' ' };

  for (let index = 0; index < LOWERCASE.length; index += 1) {
    mapping[LOWERCASE[index] ?? ''] = String.fromCodePoint(lowercaseStart + index);
    mapping[UPPERCASE[index] ?? ''] = String.fromCodePoint(uppercaseStart + index);
  }

  if (typeof digitStart === 'number') {
    for (let index = 0; index < DIGITS.length; index += 1) {
      mapping[DIGITS[index] ?? ''] = String.fromCodePoint(digitStart + index);
    }
  }

  for (const char of COMMON_PUNCTUATION) {
    mapping[char] = char;
  }

  return mapping;
}

function buildWrappedMap(
  prefix: string,
  suffix: string,
  overrides?: Partial<Record<string, string>>
): Record<string, string> {
  const mapping: Record<string, string> = { ' ': ' ' };

  for (const char of DEFAULT_TEXT) {
    if (char === ' ') {
      continue;
    }

    mapping[char] = `${prefix}${char}${suffix}`;
  }

  if (overrides) {
    for (const [key, value] of Object.entries(overrides)) {
      if (typeof value === 'string') {
        mapping[key] = value;
      }
    }
  }

  return mapping;
}

function buildCombiningMap(mark: string): Record<string, string> {
  const mapping: Record<string, string> = { ' ': ' ' };

  for (const char of DEFAULT_TEXT) {
    if (char === ' ') {
      continue;
    }

    mapping[char] = `${char}${mark}`;
  }

  return mapping;
}

function extendWithAsciiFallback(mapping: Record<string, string>): Record<string, string> {
  const nextMapping = { ...mapping };

  for (const char of DEFAULT_TEXT) {
    if (!(char in nextMapping)) {
      nextMapping[char] = char;
    }
  }

  return nextMapping;
}

const smallCapsMap = extendWithAsciiFallback({
  a: 'ᴀ',
  b: 'ʙ',
  c: 'ᴄ',
  d: 'ᴅ',
  e: 'ᴇ',
  f: 'ꜰ',
  g: 'ɢ',
  h: 'ʜ',
  i: 'ɪ',
  j: 'ᴊ',
  k: 'ᴋ',
  l: 'ʟ',
  m: 'ᴍ',
  n: 'ɴ',
  o: 'ᴏ',
  p: 'ᴘ',
  q: 'ǫ',
  r: 'ʀ',
  s: 'ꜱ',
  t: 'ᴛ',
  u: 'ᴜ',
  v: 'ᴠ',
  w: 'ᴡ',
  x: 'x',
  y: 'ʏ',
  z: 'ᴢ',
  A: 'ᴀ',
  B: 'ʙ',
  C: 'ᴄ',
  D: 'ᴅ',
  E: 'ᴇ',
  F: 'ꜰ',
  G: 'ɢ',
  H: 'ʜ',
  I: 'ɪ',
  J: 'ᴊ',
  K: 'ᴋ',
  L: 'ʟ',
  M: 'ᴍ',
  N: 'ɴ',
  O: 'ᴏ',
  P: 'ᴘ',
  Q: 'ǫ',
  R: 'ʀ',
  S: 'ꜱ',
  T: 'ᴛ',
  U: 'ᴜ',
  V: 'ᴠ',
  W: 'ᴡ',
  X: 'x',
  Y: 'ʏ',
  Z: 'ᴢ',
});

const superscriptMap = extendWithAsciiFallback({
  a: 'ᵃ',
  b: 'ᵇ',
  c: 'ᶜ',
  d: 'ᵈ',
  e: 'ᵉ',
  f: 'ᶠ',
  g: 'ᵍ',
  h: 'ʰ',
  i: 'ⁱ',
  j: 'ʲ',
  k: 'ᵏ',
  l: 'ˡ',
  m: 'ᵐ',
  n: 'ⁿ',
  o: 'ᵒ',
  p: 'ᵖ',
  q: 'ᑫ',
  r: 'ʳ',
  s: 'ˢ',
  t: 'ᵗ',
  u: 'ᵘ',
  v: 'ᵛ',
  w: 'ʷ',
  x: 'ˣ',
  y: 'ʸ',
  z: 'ᶻ',
  A: 'ᴬ',
  B: 'ᴮ',
  D: 'ᴰ',
  E: 'ᴱ',
  G: 'ᴳ',
  H: 'ᴴ',
  I: 'ᴵ',
  J: 'ᴶ',
  K: 'ᴷ',
  L: 'ᴸ',
  M: 'ᴹ',
  N: 'ᴺ',
  O: 'ᴼ',
  P: 'ᴾ',
  R: 'ᴿ',
  T: 'ᵀ',
  U: 'ᵁ',
  V: 'ⱽ',
  W: 'ᵂ',
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
  '+': '⁺',
  '-': '⁻',
  '=': '⁼',
  '(': '⁽',
  ')': '⁾',
});

const subscriptMap = extendWithAsciiFallback({
  a: 'ₐ',
  e: 'ₑ',
  h: 'ₕ',
  i: 'ᵢ',
  j: 'ⱼ',
  k: 'ₖ',
  l: 'ₗ',
  m: 'ₘ',
  n: 'ₙ',
  o: 'ₒ',
  p: 'ₚ',
  r: 'ᵣ',
  s: 'ₛ',
  t: 'ₜ',
  u: 'ᵤ',
  v: 'ᵥ',
  x: 'ₓ',
  0: '₀',
  1: '₁',
  2: '₂',
  3: '₃',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
  '+': '₊',
  '-': '₋',
  '=': '₌',
  '(': '₍',
  ')': '₎',
});

const circledMap = extendWithAsciiFallback({
  ...buildMapFromStrings(UPPERCASE, 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', { ' ': ' ' }),
  ...buildMapFromStrings(LOWERCASE, 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ', { ' ': ' ' }),
  ...buildMapFromStrings(DIGITS, '⓪①②③④⑤⑥⑦⑧⑨', { ' ': ' ' }),
});

const squaredMap = extendWithAsciiFallback({
  ...buildMapFromStrings(UPPERCASE, '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉', { ' ': ' ' }),
  ...buildMapFromStrings(LOWERCASE, '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉', { ' ': ' ' }),
});

const runeMap = extendWithAsciiFallback({
  a: 'ᚨ',
  b: 'ᛒ',
  c: 'ᚲ',
  d: 'ᛞ',
  e: 'ᛖ',
  f: 'ᚠ',
  g: 'ᚷ',
  h: 'ᚺ',
  i: 'ᛁ',
  j: 'ᛃ',
  k: 'ᚲ',
  l: 'ᛚ',
  m: 'ᛗ',
  n: 'ᚾ',
  o: 'ᛟ',
  p: 'ᛈ',
  q: 'Ⴓ',
  r: 'ᚱ',
  s: 'ᛊ',
  t: 'ᛏ',
  u: 'ᚢ',
  v: 'ᚡ',
  w: 'ᚹ',
  x: 'ᛪ',
  y: 'ᛦ',
  z: 'ᛉ',
  A: 'ᚨ',
  B: 'ᛒ',
  C: 'ᚲ',
  D: 'ᛞ',
  E: 'ᛖ',
  F: 'ᚠ',
  G: 'ᚷ',
  H: 'ᚺ',
  I: 'ᛁ',
  J: 'ᛃ',
  K: 'ᚲ',
  L: 'ᛚ',
  M: 'ᛗ',
  N: 'ᚾ',
  O: 'ᛟ',
  P: 'ᛈ',
  Q: 'Ⴓ',
  R: 'ᚱ',
  S: 'ᛊ',
  T: 'ᛏ',
  U: 'ᚢ',
  V: 'ᚡ',
  W: 'ᚹ',
  X: 'ᛪ',
  Y: 'ᛦ',
  Z: 'ᛉ',
  0: '᛫0᛫',
  1: '᛫1᛫',
  2: '᛫2᛫',
  3: '᛫3᛫',
  4: '᛫4᛫',
  5: '᛫5᛫',
  6: '᛫6᛫',
  7: '᛫7᛫',
  8: '᛫8᛫',
  9: '᛫9᛫',
});

const tinyCapsMap = extendWithAsciiFallback(
  buildMapFromStrings(
    LOWERCASE + UPPERCASE,
    'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ',
    { ' ': ' ' }
  )
);

const vaporwaveMap = extendWithAsciiFallback({
  ...buildMapFromStrings(UPPERCASE, 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', { ' ': '　' }),
  ...buildMapFromStrings(LOWERCASE, 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ', { ' ': '　' }),
  ...buildMapFromStrings(DIGITS, '０１２３４５６７８９', { ' ': '　' }),
});

const ghostMap = buildWrappedMap('⟪', '⟫');
const bracketedMap = buildWrappedMap('〔', '〕');
const boxedMap = buildWrappedMap('▣', '▣');
const sparkleMap = buildCombiningMap('⃟');
const wavyMap = buildCombiningMap('̴');
const dottedMap = buildCombiningMap('̈');
const arrowedMap = buildCombiningMap('⃗');
const doubleUnderlineMap = buildCombiningMap('͟');
const heartsMap = buildWrappedMap('♥', '♥');
const slashBurstMap = buildCombiningMap('̷');

export const fontStyles: FontStyleDef[] = [
  { id: 'bold', name: 'Bold', category: 'Math', mapping: buildRangeMap(0x1d41a, 0x1d400, 0x1d7ce) },
  { id: 'italic', name: 'Italic', category: 'Math', mapping: buildRangeMap(0x1d44e, 0x1d434) },
  { id: 'bold-italic', name: 'Bold Italic', category: 'Math', mapping: buildRangeMap(0x1d482, 0x1d468) },
  { id: 'small-caps', name: 'Small Caps', category: 'Classic', mapping: smallCapsMap },
  { id: 'superscript', name: 'Superscript', category: 'Classic', mapping: superscriptMap },
  { id: 'subscript', name: 'Subscript', category: 'Classic', mapping: subscriptMap },
  { id: 'monospace', name: 'Monospace', category: 'Math', mapping: buildRangeMap(0x1d68a, 0x1d670, 0x1d7f6) },
  { id: 'sans-serif', name: 'Sans Serif', category: 'Math', mapping: buildRangeMap(0x1d5ba, 0x1d5a0, 0x1d7e2) },
  { id: 'sans-serif-bold', name: 'Sans Bold', category: 'Math', mapping: buildRangeMap(0x1d5ee, 0x1d5d4, 0x1d7ec) },
  { id: 'sans-serif-italic', name: 'Sans Italic', category: 'Math', mapping: buildRangeMap(0x1d622, 0x1d608) },
  { id: 'sans-serif-bold-italic', name: 'Sans Bold Italic', category: 'Math', mapping: buildRangeMap(0x1d656, 0x1d63c) },
  { id: 'double-struck', name: 'Double Struck', category: 'Math', mapping: buildRangeMap(0x1d552, 0x1d538, 0x1d7d8) },
  { id: 'script', name: 'Script', category: 'Classic', mapping: buildRangeMap(0x1d4b6, 0x1d49c) },
  { id: 'bold-script', name: 'Bold Script', category: 'Classic', mapping: buildRangeMap(0x1d4ea, 0x1d4d0) },
  { id: 'fraktur', name: 'Fraktur', category: 'Classic', mapping: buildRangeMap(0x1d51e, 0x1d504) },
  { id: 'fullwidth', name: 'Fullwidth', category: 'Decorative', mapping: vaporwaveMap },
  { id: 'circled', name: 'Circled', category: 'Decorative', mapping: circledMap },
  { id: 'squared', name: 'Squared', category: 'Decorative', mapping: squaredMap },
  { id: 'overline', name: 'Overline', category: 'Combining', mapping: buildCombiningMap('̅') },
  { id: 'underline', name: 'Underline', category: 'Combining', mapping: buildCombiningMap('̲') },
  { id: 'strikethrough', name: 'Strikethrough', category: 'Combining', mapping: buildCombiningMap('̶') },
  { id: 'slash', name: 'Slash', category: 'Combining', mapping: buildCombiningMap('̸') },

  { id: 'vaporwave', name: 'Vaporwave', category: 'New', mapping: vaporwaveMap },
  { id: 'tiny-caps', name: 'Tiny Caps', category: 'New', mapping: tinyCapsMap },
  { id: 'runes', name: 'Runes', category: 'New', mapping: runeMap },
  { id: 'bracketed', name: 'Bracketed', category: 'New', mapping: bracketedMap },
  { id: 'boxed', name: 'Boxed', category: 'New', mapping: boxedMap },
  { id: 'ghost', name: 'Ghost', category: 'New', mapping: ghostMap },
  { id: 'sparkle', name: 'Sparkle', category: 'New', mapping: sparkleMap },
  { id: 'wavy', name: 'Wavy', category: 'New', mapping: wavyMap },
  { id: 'dotty', name: 'Dotty', category: 'New', mapping: dottedMap },
  { id: 'arrowed', name: 'Arrowed', category: 'New', mapping: arrowedMap },
  { id: 'double-underline', name: 'Double Underline', category: 'New', mapping: doubleUnderlineMap },
  { id: 'hearts', name: 'Hearts', category: 'New', mapping: heartsMap },
  { id: 'slash-burst', name: 'Slash Burst', category: 'New', mapping: slashBurstMap },
];

export function convertText(text: string, mapping: Record<string, string>): string {
  return text
    .split('')
    .map((char) => mapping[char] ?? char)
    .join('');
}

export default fontStyles;

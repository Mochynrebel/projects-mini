export interface FontStyleDef {
  id: string;
  name: string;
  category: string;
  mapping: Record<string, string>;
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const ASCII_PUNCTUATION = `!?.:;,'"-_+/&()[]{}@#%*=`;
const DEFAULT_SOURCE = `${LOWERCASE}${UPPERCASE}${DIGITS}${ASCII_PUNCTUATION}`;

function buildMapFromStrings(
  source: string,
  target: string,
  seed?: Record<string, string>
): Record<string, string> {
  const sourceChars = Array.from(source);
  const targetChars = Array.from(target);

  if (sourceChars.length !== targetChars.length) {
    throw new Error('Source and target alphabets must have the same length.');
  }

  const mapping: Record<string, string> = { ' ': ' ', ...(seed ?? {}) };

  for (let index = 0; index < sourceChars.length; index += 1) {
    const sourceChar = sourceChars[index];
    const targetChar = targetChars[index];

    if (!sourceChar || !targetChar) {
      continue;
    }

    mapping[sourceChar] = targetChar;
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
    const lowercase = LOWERCASE[index];
    const uppercase = UPPERCASE[index];

    if (!lowercase || !uppercase) {
      continue;
    }

    mapping[lowercase] = String.fromCodePoint(lowercaseStart + index);
    mapping[uppercase] = String.fromCodePoint(uppercaseStart + index);
  }

  if (typeof digitStart === 'number') {
    for (let index = 0; index < DIGITS.length; index += 1) {
      const digit = DIGITS[index];

      if (!digit) {
        continue;
      }

      mapping[digit] = String.fromCodePoint(digitStart + index);
    }
  }

  for (const char of ASCII_PUNCTUATION) {
    mapping[char] = char;
  }

  return mapping;
}

function buildWrappedMap(
  prefix: string,
  suffix: string,
  overrides?: Record<string, string>
): Record<string, string> {
  const mapping: Record<string, string> = { ' ': ' ' };

  for (const char of DEFAULT_SOURCE) {
    mapping[char] = `${prefix}${char}${suffix}`;
  }

  if (overrides) {
    for (const [key, value] of Object.entries(overrides)) {
      mapping[key] = value;
    }
  }

  return mapping;
}

function buildCombiningMap(
  marks: string | string[],
  options?: { uppercaseOnly?: boolean; lettersOnly?: boolean }
): Record<string, string> {
  const markText = Array.isArray(marks) ? marks.join('') : marks;
  const mapping: Record<string, string> = { ' ': ' ' };

  for (const char of DEFAULT_SOURCE) {
    const isLetter = /[a-z]/i.test(char);
    const isUppercase = /[A-Z]/.test(char);

    if (options?.lettersOnly && !isLetter) {
      mapping[char] = char;
      continue;
    }

    if (options?.uppercaseOnly && !isUppercase) {
      mapping[char] = char;
      continue;
    }

    mapping[char] = `${char}${markText}`;
  }

  return mapping;
}

function buildEnclosedMap(baseCodePoint: number, zeroCodePoint?: number): Record<string, string> {
  const mapping: Record<string, string> = { ' ': ' ' };

  for (let index = 0; index < UPPERCASE.length; index += 1) {
    const uppercase = UPPERCASE[index];
    const lowercase = LOWERCASE[index];

    if (!uppercase || !lowercase) {
      continue;
    }

    const glyph = String.fromCodePoint(baseCodePoint + index);
    mapping[uppercase] = glyph;
    mapping[lowercase] = glyph;
  }

  if (typeof zeroCodePoint === 'number') {
    for (let index = 0; index < DIGITS.length; index += 1) {
      const digit = DIGITS[index];

      if (!digit) {
        continue;
      }

      mapping[digit] = String.fromCodePoint(index === 0 ? zeroCodePoint : zeroCodePoint + index);
    }
  }

  for (const char of ASCII_PUNCTUATION) {
    mapping[char] = char;
  }

  return mapping;
}

function extendWithFallback(mapping: Record<string, string>): Record<string, string> {
  const nextMapping: Record<string, string> = { ' ': ' ', ...mapping };

  for (const char of DEFAULT_SOURCE) {
    if (!(char in nextMapping)) {
      nextMapping[char] = char;
    }
  }

  return nextMapping;
}

const smallCapsMap = extendWithFallback({
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
  x: 'ˣ',
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
  X: 'ˣ',
  Y: 'ʏ',
  Z: 'ᴢ',
});

const superscriptMap = extendWithFallback({
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
  q: '𐞥',
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

const subscriptMap = extendWithFallback({
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

const mirroredMap = extendWithFallback({
  a: 'ɒ',
  b: 'd',
  c: 'ɔ',
  d: 'b',
  e: 'ɘ',
  f: 'Ꮈ',
  g: 'ǫ',
  h: 'ʜ',
  i: 'i',
  j: 'ꞁ',
  k: 'ʞ',
  l: 'l',
  m: 'm',
  n: 'ᴎ',
  o: 'o',
  p: 'q',
  q: 'p',
  r: 'ɿ',
  s: 'ꙅ',
  t: 'ƚ',
  u: 'υ',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'γ',
  z: 'z',
  A: 'A',
  B: 'ᙠ',
  C: 'Ɔ',
  D: '◖',
  E: 'Ǝ',
  F: 'ꟻ',
  G: 'Ꭾ',
  H: 'H',
  I: 'I',
  J: 'Ⴑ',
  K: '⋊',
  L: '⅃',
  M: 'M',
  N: 'И',
  O: 'O',
  P: 'ꟼ',
  Q: 'Ọ',
  R: 'Я',
  S: 'Ƨ',
  T: 'T',
  U: 'U',
  V: 'V',
  W: 'W',
  X: 'X',
  Y: 'Y',
  Z: 'Ƹ',
});

const upsideDownMap = extendWithFallback({
  a: 'ɐ',
  b: 'q',
  c: 'ɔ',
  d: 'p',
  e: 'ǝ',
  f: 'ɟ',
  g: 'ɓ',
  h: 'ɥ',
  i: 'ᴉ',
  j: 'ɾ',
  k: 'ʞ',
  l: 'ꞁ',
  m: 'ɯ',
  n: 'u',
  o: 'o',
  p: 'd',
  q: 'b',
  r: 'ɹ',
  s: 's',
  t: 'ʇ',
  u: 'n',
  v: 'ʌ',
  w: 'ʍ',
  x: 'x',
  y: 'ʎ',
  z: 'z',
  A: '∀',
  B: '𐐒',
  C: 'Ɔ',
  D: '◖',
  E: 'Ǝ',
  F: 'Ⅎ',
  G: '⅁',
  H: 'H',
  I: 'I',
  J: 'ſ',
  K: '⋊',
  L: '⅂',
  M: 'W',
  N: 'N',
  O: 'O',
  P: 'Ԁ',
  Q: 'Ό',
  R: 'ᴚ',
  S: 'S',
  T: '┴',
  U: '∩',
  V: 'Λ',
  W: 'M',
  X: 'X',
  Y: '⅄',
  Z: 'Z',
  '?': '¿',
  '!': '¡',
  '.': '˙',
  ',': "'",
  "'": ',',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
});

const regionalIndicatorMap = extendWithFallback(
  buildMapFromStrings(
    UPPERCASE + LOWERCASE,
    '🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿'
  )
);

const circledMap = buildEnclosedMap(0x24b6, 0x24ea);
const negativeCircledMap = buildEnclosedMap(0x1f150);
const squaredMap = buildEnclosedMap(0x1f130);

const parenthesizedMap = extendWithFallback({
  ...buildMapFromStrings(UPPERCASE, '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵'),
  ...buildMapFromStrings(LOWERCASE, '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵'),
});

const vaporwaveMap = buildMapFromStrings(
  `${UPPERCASE}${LOWERCASE}${DIGITS}`,
  'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９',
  { ' ': '　' }
);

const typewriterMap = buildWrappedMap('⌈', '⌋');
const bubbleWrapMap = buildWrappedMap('◌', '◌');
const starWrapMap = buildWrappedMap('✦', '✦');
const diamondWrapMap = buildWrappedMap('◆', '◆');
const heartWrapMap = buildWrappedMap('♥', '♥');
const flameWrapMap = buildWrappedMap('✧', '✧');
const bracketWrapMap = buildWrappedMap('〔', '〕');
const angleWrapMap = buildWrappedMap('⟪', '⟫');
const curlyWrapMap = buildWrappedMap('❴', '❵');
const slashWrapMap = buildWrappedMap('/', '\\');
const boxWrapMap = buildWrappedMap('▣', '▣');
const runeWrapMap = buildWrappedMap('᚛', '᚜');
const ghostWrapMap = buildWrappedMap('☾', '☽');
const cloudWrapMap = buildWrappedMap('☁', '☁');
const waveWrapMap = buildWrappedMap('〰', '〰');
const sparkleWrapMap = buildWrappedMap('✧', '✧');
const boltWrapMap = buildWrappedMap('⚡', '⚡');
const dotWrapMap = buildWrappedMap('•', '•');

const overlineMap = buildCombiningMap('\u0305');
const doubleOverlineMap = buildCombiningMap('\u033f');
const underlineMap = buildCombiningMap('\u0332');
const doubleUnderlineMap = buildCombiningMap('\u035f');
const strikethroughMap = buildCombiningMap('\u0336');
const slashMap = buildCombiningMap('\u0338');
const xAboveMap = buildCombiningMap('\u033d');
const arrowAboveMap = buildCombiningMap('\u20d7');
const leftArrowAboveMap = buildCombiningMap('\u20d6');
const tildeMap = buildCombiningMap('\u0330');
const dotAboveMap = buildCombiningMap('\u0307');
const diaeresisMap = buildCombiningMap('\u0308');
const ringAboveMap = buildCombiningMap('\u030a');
const caronMap = buildCombiningMap('\u030c');
const acuteMap = buildCombiningMap('\u0301');
const graveMap = buildCombiningMap('\u0300');
const bridgeMap = buildCombiningMap('\u0346');
const zigzagMap = buildCombiningMap('\u035b');
const sparkleMap = buildCombiningMap(['\u035e', '\u0334']);
const glitchMap = buildCombiningMap(['\u0338', '\u035c']);
const runeMarkMap = buildCombiningMap('\u20db');
const boxedCombiningMap = buildCombiningMap('\u20e3');

export const fontStyles: FontStyleDef[] = [
  { id: 'bold', name: 'Bold', category: 'Math', mapping: buildRangeMap(0x1d41a, 0x1d400, 0x1d7ce) },
  { id: 'italic', name: 'Italic', category: 'Math', mapping: buildRangeMap(0x1d44e, 0x1d434) },
  { id: 'bold-italic', name: 'Bold Italic', category: 'Math', mapping: buildRangeMap(0x1d482, 0x1d468) },
  { id: 'monospace', name: 'Monospace', category: 'Math', mapping: buildRangeMap(0x1d68a, 0x1d670, 0x1d7f6) },
  { id: 'sans-serif', name: 'Sans Serif', category: 'Math', mapping: buildRangeMap(0x1d5ba, 0x1d5a0, 0x1d7e2) },
  { id: 'sans-serif-bold', name: 'Sans Bold', category: 'Math', mapping: buildRangeMap(0x1d5ee, 0x1d5d4, 0x1d7ec) },
  { id: 'sans-serif-italic', name: 'Sans Italic', category: 'Math', mapping: buildRangeMap(0x1d622, 0x1d608) },
  { id: 'sans-serif-bold-italic', name: 'Sans Bold Italic', category: 'Math', mapping: buildRangeMap(0x1d656, 0x1d63c) },
  { id: 'double-struck', name: 'Double Struck', category: 'Math', mapping: buildRangeMap(0x1d552, 0x1d538, 0x1d7d8) },
  { id: 'script', name: 'Script', category: 'Math', mapping: buildRangeMap(0x1d4b6, 0x1d49c) },
  { id: 'bold-script', name: 'Bold Script', category: 'Math', mapping: buildRangeMap(0x1d4ea, 0x1d4d0) },
  { id: 'fraktur', name: 'Fraktur', category: 'Math', mapping: buildRangeMap(0x1d51e, 0x1d504) },
  { id: 'bold-fraktur', name: 'Bold Fraktur', category: 'Math', mapping: buildRangeMap(0x1d586, 0x1d56c) },
  { id: 'fullwidth', name: 'Fullwidth', category: 'Classic', mapping: vaporwaveMap },
  { id: 'small-caps', name: 'Small Caps', category: 'Classic', mapping: smallCapsMap },
  { id: 'superscript', name: 'Superscript', category: 'Classic', mapping: superscriptMap },
  { id: 'subscript', name: 'Subscript', category: 'Classic', mapping: subscriptMap },
  { id: 'mirrored', name: 'Mirrored', category: 'Classic', mapping: mirroredMap },
  { id: 'upside-down', name: 'Upside Down', category: 'Classic', mapping: upsideDownMap },
  { id: 'regional', name: 'Regional', category: 'Classic', mapping: regionalIndicatorMap },
  { id: 'circled', name: 'Circled', category: 'Enclosed', mapping: circledMap },
  { id: 'negative-circled', name: 'Negative Circled', category: 'Enclosed', mapping: negativeCircledMap },
  { id: 'squared', name: 'Squared', category: 'Enclosed', mapping: squaredMap },
  { id: 'parenthesized', name: 'Parenthesized', category: 'Enclosed', mapping: parenthesizedMap },
  { id: 'typewriter', name: 'Typewriter', category: 'Wrapped', mapping: typewriterMap },
  { id: 'bubble-wrap', name: 'Bubble Wrap', category: 'Wrapped', mapping: bubbleWrapMap },
  { id: 'star-wrap', name: 'Star Wrap', category: 'Wrapped', mapping: starWrapMap },
  { id: 'diamond-wrap', name: 'Diamond Wrap', category: 'Wrapped', mapping: diamondWrapMap },
  { id: 'heart-wrap', name: 'Heart Wrap', category: 'Wrapped', mapping: heartWrapMap },
  { id: 'flame-wrap', name: 'Flame Wrap', category: 'Wrapped', mapping: flameWrapMap },
  { id: 'bracket-wrap', name: 'Bracket Wrap', category: 'Wrapped', mapping: bracketWrapMap },
  { id: 'angle-wrap', name: 'Angle Wrap', category: 'Wrapped', mapping: angleWrapMap },
  { id: 'curly-wrap', name: 'Curly Wrap', category: 'Wrapped', mapping: curlyWrapMap },
  { id: 'slash-wrap', name: 'Slash Wrap', category: 'Wrapped', mapping: slashWrapMap },
  { id: 'box-wrap', name: 'Box Wrap', category: 'Wrapped', mapping: boxWrapMap },
  { id: 'rune-wrap', name: 'Rune Wrap', category: 'Wrapped', mapping: runeWrapMap },
  { id: 'ghost-wrap', name: 'Ghost Wrap', category: 'Wrapped', mapping: ghostWrapMap },
  { id: 'cloud-wrap', name: 'Cloud Wrap', category: 'Wrapped', mapping: cloudWrapMap },
  { id: 'wave-wrap', name: 'Wave Wrap', category: 'Wrapped', mapping: waveWrapMap },
  { id: 'sparkle-wrap', name: 'Sparkle Wrap', category: 'Wrapped', mapping: sparkleWrapMap },
  { id: 'bolt-wrap', name: 'Bolt Wrap', category: 'Wrapped', mapping: boltWrapMap },
  { id: 'dot-wrap', name: 'Dot Wrap', category: 'Wrapped', mapping: dotWrapMap },
  { id: 'overline', name: 'Overline', category: 'Combining', mapping: overlineMap },
  { id: 'double-overline', name: 'Double Overline', category: 'Combining', mapping: doubleOverlineMap },
  { id: 'underline', name: 'Underline', category: 'Combining', mapping: underlineMap },
  { id: 'double-underline', name: 'Double Underline', category: 'Combining', mapping: doubleUnderlineMap },
  { id: 'strikethrough', name: 'Strikethrough', category: 'Combining', mapping: strikethroughMap },
  { id: 'slash', name: 'Slash', category: 'Combining', mapping: slashMap },
  { id: 'x-above', name: 'X Above', category: 'Combining', mapping: xAboveMap },
  { id: 'arrow-above', name: 'Arrow Above', category: 'Combining', mapping: arrowAboveMap },
  { id: 'left-arrow', name: 'Left Arrow', category: 'Combining', mapping: leftArrowAboveMap },
  { id: 'tilde', name: 'Tilde', category: 'Combining', mapping: tildeMap },
  { id: 'dot-above', name: 'Dot Above', category: 'Combining', mapping: dotAboveMap },
  { id: 'diaeresis', name: 'Diaeresis', category: 'Combining', mapping: diaeresisMap },
  { id: 'ring-above', name: 'Ring Above', category: 'Combining', mapping: ringAboveMap },
  { id: 'caron', name: 'Caron', category: 'Combining', mapping: caronMap },
  { id: 'acute', name: 'Acute', category: 'Combining', mapping: acuteMap },
  { id: 'grave', name: 'Grave', category: 'Combining', mapping: graveMap },
  { id: 'bridge', name: 'Bridge', category: 'Combining', mapping: bridgeMap },
  { id: 'zigzag', name: 'Zigzag', category: 'Combining', mapping: zigzagMap },
  { id: 'sparkle', name: 'Sparkle', category: 'Combining', mapping: sparkleMap },
  { id: 'glitch', name: 'Glitch', category: 'Combining', mapping: glitchMap },
  { id: 'rune-mark', name: 'Rune Mark', category: 'Combining', mapping: runeMarkMap },
  { id: 'boxed', name: 'Boxed', category: 'Combining', mapping: boxedCombiningMap },
];

if (fontStyles.length < 50) {
  throw new Error('Expected at least 50 font styles.');
}

export function convertText(text: string, mapping: Record<string, string>): string {
  return text
    .split('')
    .map((char) => mapping[char] ?? char)
    .join('');
}

export default fontStyles;

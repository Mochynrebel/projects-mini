# Viral Fonts - Unicode Font Generator

## 1. Concept & Vision

**Viral Fonts** is a sleek, mobile-first web app that transforms ordinary text into eye-catching Unicode fonts for social media bios, captions, and stories. It embodies the energy of viral content — bold, colorful, and instantly shareable. The experience feels like having a creative text toolkit at your fingertips, designed for quick bursts of inspiration during commutes or idle moments.

The vibe: A neon-lit digital playground where typography becomes an expression of personality.

## 2. Design Language

### Aesthetic Direction
**Dark Glassmorphism** — Deep black (#0a0a0a) background with glass-effect cards and vibrant purple-pink gradients. Premium mobile app feel with backdrop blur and subtle shadows.

### Color Palette
```
--bg-primary: #0a0a0a          // Deep black background
--text-primary: #f0f0f0        // Light text
--bg-card: #1e1e1e             // Dark card background
--accent-gradient-start: #a855f7  // Purple
--accent-gradient-end: #ec4899   // Pink
```

### Typography
- **Headings**: Inter (weight 700-800) — Modern, clean geometric sans-serif
- **Body/UI**: Inter (weight 400-500)
- **Font Previews**: Style-specific Unicode fonts displayed at 18-24px

### Spatial System
- Container max-width: 768px (centered)
- Card padding: 24px (mobile: 16px)
- Gap between cards: 16px
- Border-radius: 16px (cards), 12px (buttons), 24px (input)
- Section spacing: 64px vertical

### Motion Philosophy
- **Entrance**: Cards fade-in with stagger (100ms delay each), translateY from 20px
- **Interactions**: Button scale on hover (1.05), gradient shift on active
- **Feedback**: Copy notification slides up from bottom, fades out after 1s
- **Transitions**: All hover/focus states use 200ms ease-out

### Visual Assets
- **Icons**: Lucide React icons (Copy, Sparkles, Type, Check)
- **Decorative**: Subtle radial gradient orbs in background (pink/orange glow)
- **No images needed**: Pure CSS/SVG aesthetic

## 3. Layout & Structure

### Page Flow (Single Scroll)
```
┌─────────────────────────────────────┐
│  HEADER                             │
│  Logo + Tagline                     │
├─────────────────────────────────────┤
│  HERO INPUT SECTION                │
│  ┌─────────────────────────────┐    │
│  │  Large textarea             │    │
│  │  Placeholder: "Type your    │    │
│  │  text here..."              │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  FONT STYLE GRID (3 columns desktop) │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  │ Style 1  │  │ Style 2  │  │ Style 3  │
│  │ Preview  │  │ Preview  │  │ Preview  │
│  │ [Copy]   │  │ [Copy]   │  │ [Copy]   │
│  └──────────┘  └──────────┘  └──────────┘
│  ... (52 styles, load 12 initial)      │
│  [Load More Styles] button             │
├─────────────────────────────────────┤
│  HOW TO USE SECTION                │
│  3 steps: Type → Generate → Copy   │
├─────────────────────────────────────┤
│  ABOUT UNICODE FONTS (SEO)         │
│  Explanation text                   │
├─────────────────────────────────────┤
│  FOOTER                            │
│  Copyright + Links                  │
└─────────────────────────────────────┘
```

### Responsive Strategy
- **Mobile (< 640px)**: 1 column font grid, full-width cards
- **Tablet/Desktop (≥ 640px)**: 2 column font grid, max-width container

## 4. Features & Interactions

### Core Features

#### 4.1 Text Input
- Large textarea (min-height: 120px)
- Real-time conversion as user types (no button needed)
- Character counter showing current length
- Clear button (X icon) appears when text exists

#### 4.2 Font Style Generation
- 52 Unicode font styles, each with:
  - **Category**: Basic, Decorative, Combining, Numbers, or Extra
  - **Style Name**: Descriptive label (e.g., "Bold Script")
  - **Preview**: Converted text displayed in card
  - **Copy Button**: Gradient button with copy icon

#### 4.3 Load More
- Initial display: 12 styles
- Load More button: Shows 8 more styles per click
- Progress indicator: "Showing X of 52 styles"
- All loaded indicator: "All styles loaded (52 styles)" when complete
  - **Copy Button**: Gradient button with copy icon
- Styles update instantly as input changes

#### 4.3 Copy to Clipboard
- Click triggers `navigator.clipboard.writeText()`
- Visual feedback: Button shows checkmark + "Copied!" text for 1 second
- Toast notification appears at bottom: "Copied to clipboard!"
- Toast auto-dismisses after 1 second with fade animation

### Edge Cases
- **Empty input**: Show placeholder text in all previews: "Your text here..."
- **Very long text**: Card preview scrolls horizontally if text overflows
- **Special characters**: Only convert supported characters; unsupported show as-is
- **Copy API unavailable**: Fallback to `document.execCommand()` with warning

## 5. Component Inventory

### Header
- **Default**: Logo text "Viral Fonts" with gradient, tagline below
- **Background**: Transparent with subtle bottom border

### TextInput
- **Default**: Dark textarea with subtle border, placeholder text
- **Focus**: Glowing border (pink gradient), elevated shadow
- **With Text**: Clear button visible on right side
- **States**: default, focus, filled

### FontCard
- **Default**: Glassmorphic card with style name, preview text, copy button
- **Hover**: Slight lift (translateY -2px), enhanced glow
- **Copy Button States**:
  - Default: Gradient background, copy icon, "Copy" text
  - Hover: Brighter gradient, scale 1.05
  - Active: Scale 0.98
  - Success: Green background, checkmark icon, "Copied!" text (1s)

### CopyToast
- **Appearance**: Slides up from bottom, centered pill shape
- **Style**: Dark glass background, white text, checkmark icon
- **Animation**: Fade in (200ms), hold 800ms, fade out (200ms)

### HowToStep
- **Layout**: Numbered icon + title + description
- **Style**: Inline with subtle connecting line between steps

## 6. Technical Approach

### Framework & Stack
- **Next.js 15** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4** (with shadcn/ui utilities)
- **Lucide React** (icons)

### Architecture
```
/workspace/projects/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with fonts
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Tailwind + custom styles
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── TextInput.tsx
│   │   ├── FontCard.tsx
│   │   ├── FontGrid.tsx
│   │   ├── CopyToast.tsx
│   │   ├── HowToSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── Footer.tsx
│   └── lib/
│       └── fonts.ts         # Unicode character mappings
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .coze
```

### Unicode Font Mappings
JavaScript object mapping standard A-Z, a-z, 0-9, and common punctuation to Unicode alternatives. 12 distinct styles:

1. **Bold** - 𝗔𝗕𝗖 (Mathematical Bold)
2. **Italic** - 𝘈𝘉𝘊 (Mathematical Italic)
3. **Bold Italic** - 𝘈𝘉𝘊 (Mathematical Bold Italic)
4. **Script** - 𝒜ℬ𝒞 (Script letters)
5. **Bold Script** - 𝓐𝓑𝓒 (Bold Script)
6. **Fraktur** - 𝔄𝔅ℭ (Fraktur)
7. **Double Struck** - 𝔸𝔹ℂ (Double-struck)
8. **Sans Serif** - 𝖠𝖡𝖢 (Sans-serif bold)
9. **Monospace** - 𝙰𝙱𝙲 (Monospace)
10. **Square** - 🄰🄱🄲 (Squared letters)
11. **Circled** - ⒶⒷⒸ (Circled)
12. **Upside Down** - Ǝ∩ᗺ (Upside down)

### State Management
- React `useState` for input text
- `useCallback` for clipboard operations
- No external state library needed

### Performance Considerations
- Debounce not needed (client-side conversion is instant)
- Fonts map is static, loaded once
- CSS animations use transform/opacity only

## 7. Unicode Font Reference

Complete mapping for A-Z, a-z, 0-9, and punctuation to all 12 styles. Stored as nested object in `fonts.ts`.

```typescript
const fonts = {
  bold: { a: '𝗮', b: '𝗯', ... },
  italic: { a: '𝘢', b: '𝘣', ... },
  // ... 10 more styles
}
```

## 8. SEO Content

### Meta Tags
- Title: "Viral Fonts - Free Unicode Font Generator for Social Media"
- Description: "Create unique, eye-catching fonts for Instagram, TikTok, and more. 12+ styles, instant copy & paste. No signup required."

### About Section Content
Explain how Unicode fonts work — each character maps to a different Unicode block, allowing visual transformation while remaining copy-paste compatible across platforms.

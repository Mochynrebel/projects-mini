export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  sections: BlogPostSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-use-small-text-on-instagram',
    title: 'How to Use Small Text on Instagram Bios and Captions',
    description:
      'Learn how tiny Unicode text works on Instagram and where small text styles fit best in bios, captions, and profile highlights.',
    publishedAt: '2026-04-18',
    sections: [
      {
        heading: 'Why Small Text Works',
        paragraphs: [
          'Small text stands out because it looks different from standard keyboard characters while still being easy to copy and paste into most social media apps.',
          'On Instagram, creators often use tiny fonts to make bios look cleaner, separate keywords, or add a subtle decorative style without using images.',
        ],
      },
      {
        heading: 'Best Places to Use It',
        paragraphs: [
          'Small text works well in profile bios, story highlight names, captions, and comment replies. It is especially useful when you want a neat visual hierarchy without making the text look too loud.',
          'For readability, keep the decorative text short. Use normal text for important calls to action, names, and links so visitors can scan your profile faster.',
        ],
      },
      {
        heading: 'Copy and Paste Workflow',
        paragraphs: [
          'Type your phrase into the generator, browse the available styles, and click the version you want to copy. Then paste it directly into Instagram.',
          'If a style does not render correctly on one device, try a simpler Unicode variant. Support can vary by operating system, app version, and font rendering engine.',
        ],
      },
    ],
  },
  {
    slug: 'unicode-fonts-explained',
    title: 'Unicode Fonts Explained: Why Fancy Text Is Not a Real Font File',
    description:
      'Understand the difference between Unicode symbols and traditional font files, and why fancy text generators work across apps without installation.',
    publishedAt: '2026-04-12',
    sections: [
      {
        heading: 'Unicode Symbols vs Traditional Fonts',
        paragraphs: [
          'A fancy text generator usually does not create a downloadable font. Instead, it swaps standard letters for visually similar Unicode characters.',
          'Because the output is still text, you can usually paste it into social platforms, messaging apps, and profile fields without installing anything.',
        ],
      },
      {
        heading: 'Why Some Characters Look Different',
        paragraphs: [
          'Many stylized characters come from Unicode blocks such as Mathematical Alphanumeric Symbols. These include script, bold, monospace, and double-struck variations.',
          'Not every letter has a perfect Unicode match, which is why some styles mix stylized characters with regular letters or fallback symbols.',
        ],
      },
      {
        heading: 'Compatibility Limits',
        paragraphs: [
          'Unicode text is broadly supported, but not uniformly. Some older devices, apps, or fonts may show empty boxes or inconsistent spacing for certain characters.',
          'If compatibility matters, test your chosen style on the platforms where your audience will actually see it.',
        ],
      },
    ],
  },
  {
    slug: 'best-fancy-text-styles-for-social-media',
    title: 'Best Fancy Text Styles for Social Media Profiles',
    description:
      'A practical guide to choosing fancy text styles for TikTok, Instagram, X, and Discord without hurting readability.',
    publishedAt: '2026-04-05',
    sections: [
      {
        heading: 'Choose Style Based on Context',
        paragraphs: [
          'Clean small caps and tiny text are good for profile labels, while script and bold styles are better for short display names or emphasis.',
          'For longer captions or descriptions, choose styles that remain readable at a glance. Highly decorative characters can reduce clarity when used in large blocks.',
        ],
      },
      {
        heading: 'Balance Branding and Readability',
        paragraphs: [
          'A strong social profile usually uses one decorative style consistently instead of switching between many unrelated looks.',
          'You can combine normal text with one accent style for usernames, section dividers, or short taglines to keep the overall page polished.',
        ],
      },
      {
        heading: 'Test Before Publishing',
        paragraphs: [
          'Preview your text on mobile first, because most visitors will see your profile there. Tiny decorative details can look very different on smaller screens.',
          'When in doubt, choose the style that stays readable in both dark mode and light mode across different apps.',
        ],
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

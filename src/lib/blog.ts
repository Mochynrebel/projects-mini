export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
  listItems?: string[];
  subsections?: {
    heading: string;
    paragraphs: string[];
    listItems?: string[];
  }[];
  links?: {
    label: string;
    href: string;
    description: string;
    external?: boolean;
  }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  keywords?: string[];
  sections: BlogPostSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-use-discord-small-text',
    title: 'Discord Small Text: How to Make Tiny Text for Names, Channels, and Messages',
    description:
      'Learn how to make Discord small text with a Unicode generator, which styles work best, and how to use tiny text in nicknames, channels, statuses, and messages.',
    publishedAt: '2026-04-18',
    keywords: [
      'discord small text',
      'small text discord',
      'discord small font generator',
      'small text for discord',
      'discord tiny text',
      'how to make small text on discord',
    ],
    sections: [
      {
        heading: 'Why People Want Discord Small Text',
        paragraphs: [
          'If you spend any time on Discord, you have probably seen someone with a stylish nickname, a neatly organized channel list, or a status message that looks more polished than plain keyboard text. That is where Discord small text comes in. Users want tiny text because it helps names, category labels, welcome messages, and profile details feel more custom without needing images, bots, or complicated formatting tricks.',
          'The catch is that Discord does not include a built-in small font button. There is no secret menu where you can switch your nickname to mini mode and become instantly cooler by 12 percent. Instead, the usual solution is to use Unicode characters that look smaller than normal letters. A good discord small font generator converts regular text into copy-and-paste Unicode styles that work inside Discord.',
          'This guide explains how small text for Discord works, how to generate it, which styles are the easiest to read, and where to use them without turning your server into a cryptic puzzle. If your goal is to create discord tiny text for a nickname, channel name, server heading, or message, this is the practical walkthrough.',
        ],
      },
      {
        heading: 'Why Discord Does Not Natively Support a Small Font Option',
        paragraphs: [
          'Discord supports standard text formatting such as bold, italics, spoilers, code blocks, and headings in some contexts, but it does not offer a true font picker. That is because Discord is mainly displaying plain text characters, not swapping between installed font files for each user field. When people talk about Discord small text, they are usually not changing the app font at all.',
          'Instead, they are using Unicode. Unicode is the global text standard that gives thousands of symbols and letter-like characters a code point that computers can recognize. Some of those characters look like small capitals, superscript letters, subscript letters, or other stylized forms. A discord small font generator replaces ordinary letters with these Unicode alternatives, then you copy and paste the result into Discord.',
          'This is why small text discord styles can work in many places across the app. Discord sees text, not an uploaded font file. However, support is not perfect for every character on every device. If a character is missing from a user font or operating system, another person might see a square box or a fallback symbol instead. That is not Discord being dramatic. It is just Unicode compatibility doing its usual thing.',
        ],
        links: [
          {
            label: 'Unicode Standard',
            href: 'https://home.unicode.org/',
            description:
              'Official Unicode overview explaining how characters are standardized across platforms.',
            external: true,
          },
          {
            label: 'Discord Help Center',
            href: 'https://support.discord.com/hc/en-us',
            description:
              'Discord official help pages for profiles, usernames, channels, and server settings.',
            external: true,
          },
        ],
      },
      {
        heading: 'How to Make Small Text on Discord',
        paragraphs: [
          'The fastest method is to use a Unicode text generator built for copy-and-paste formatting. On small-text-generator.online, you can turn normal words into several Discord-friendly styles in a few seconds. This workflow is simple enough for casual users and fast enough for server admins who are renaming half a category list at midnight.',
          'Here is the basic process for how to make small text on Discord.',
          'A good rule is to keep decorative text short. A tiny nickname can look sharp. A whole essay in miniature Unicode usually looks like your keyboard lost a fight. For the best balance, use normal text for long explanations and reserve discord tiny text for labels, emphasis, and aesthetic touches.',
        ],
        listItems: [
          'Step 1: Open the generator at the homepage of small-text-generator.online.',
          'Step 2: Type the text you want to convert, such as a nickname, channel title, role label, or status line.',
          'Step 3: Browse the generated styles and pick the version that looks clean and readable on Discord.',
          'Step 4: Click to copy the result.',
          'Step 5: Paste it into Discord in your nickname, channel name, server category, bio, profile status, or message box.',
          'Step 6: Preview the result on desktop and mobile if readability matters for your community.',
        ],
        links: [
          {
            label: 'Small Text Generator Home',
            href: '/',
            description:
              'Generate Discord small text, tiny text, superscript, and more in one click.',
          },
          {
            label: 'Blog',
            href: '/blog',
            description:
              'Read more guides about Unicode text styles, compatibility, and copy-and-paste use cases.',
          },
        ],
      },
      {
        heading: 'Best Small Text Styles for Discord',
        paragraphs: [
          'Not every style is equally useful. Some look great in a short username but become hard to read in longer channel names. The safest approach is to choose a style that feels different without making people squint at their screen like they are decoding an ancient rune tablet.',
        ],
        subsections: [
          {
            heading: 'Small Caps',
            paragraphs: [
              'Small Caps is one of the best options for small text discord formatting because it looks clean, modern, and readable. It is excellent for nicknames, server labels, channel categories, and profile bios.',
              'Example: normal text to small caps | discord server -> \u1D05\u026A\uA731\u1D04\u1D0F\u0280\u1D05 \uA731\u1D07\u0280\u1D20\u1D07\u0280',
            ],
          },
          {
            heading: 'Superscript',
            paragraphs: [
              'Superscript creates a floating tiny-text look that is perfect for short accents, status messages, and decorative name endings. It is one of the most recognizable discord tiny text styles, but it can be harder to read in long strings.',
              'Example: small text -> \u02E2\u1D50\u1D43\u02E1\u02E1 \u1D57\u1D49\u02E3\u1D57',
            ],
          },
          {
            heading: 'Subscript',
            paragraphs: [
              'Subscript sits lower than normal letters and can look stylish in niche use cases, especially for themed servers, bot messages, or science and gaming jokes. It is more decorative than practical, so use it sparingly.',
              'Example: small text -> \u209B\u2098\u2090\u2097\u2097 \u209C\u2091\u2093\u209C',
            ],
          },
          {
            heading: 'Bold Unicode Styles',
            paragraphs: [
              'If you want something compact but still visible, bold Unicode variants can work well. They are not always literally smaller, but they pair nicely with small caps for section labels or emphasis in announcements.',
              'Example: use bold Unicode output from the generator when you want emphasis without using Markdown formatting.',
            ],
          },
        ],
        listItems: [
          'Best for usernames: Small Caps, short Superscript accents.',
          'Best for channels and categories: Small Caps, clean bold styles.',
          'Best for status and bio text: Small Caps, Superscript, mixed normal plus tiny text.',
          'Use with caution: very decorative styles that reduce readability or trigger missing-character boxes.',
        ],
      },
      {
        heading: 'Creative Ways to Use Small Text for Discord',
        paragraphs: [
          'Once you know how to generate small text for Discord, the fun part is deciding where it actually improves the look of your server or profile. The best uses are small visual upgrades that make information easier to scan or make your branding feel more intentional.',
          'For example, a gaming server could use small caps for category titles, normal text for actual channel names, and a bit of superscript in welcome messages. That creates personality without sacrificing usability. Good formatting should help your server feel sharper, not more confusing.',
        ],
        listItems: [
          'Nicknames: Add a subtle style to your display name without making it unreadable.',
          'Server names: Use small caps to create a cleaner branded look.',
          'Channel categories: Make category headers feel more organized and consistent.',
          'Bot welcome messages: Add tiny text accents to greetings, rules prompts, or reaction-role instructions.',
          'Custom statuses: Use discord small text for a short mood, game title, or inside joke.',
          'Profile bios and about me sections: Make section labels stand out without using full decorative text blocks.',
        ],
      },
      {
        heading: 'FAQ About Discord Tiny Text',
        paragraphs: [
          'These are the questions people usually ask before they paste stylized Unicode into their server and wait for someone to complain in general chat.',
        ],
        subsections: [
          {
            heading: 'Why do some people see boxes instead of the small text?',
            paragraphs: [
              'That usually happens because a device, app version, or system font does not fully support the Unicode characters you used. Simpler styles such as Small Caps often render more reliably than highly specialized characters. If compatibility matters, test on desktop and mobile before using a style everywhere.',
            ],
          },
          {
            heading: 'Can using small text get me banned on Discord?',
            paragraphs: [
              'In normal use, no. Small text is just Unicode text. It is not a hack, exploit, or client modification. What matters is how you use it. If your name or server content breaks Discord rules, the problem is the content, not the fact that it is tiny and fancy.',
            ],
          },
          {
            heading: 'What is the length limit for Discord names or channels?',
            paragraphs: [
              'Discord field limits vary depending on what you are editing, such as usernames, nicknames, channels, categories, bios, or statuses. Unicode characters usually count as text characters, but some stylized versions can behave differently in edge cases. The practical advice is simple: keep decorative text short and test before renaming important server elements.',
            ],
          },
          {
            heading: 'Does small text work in nicknames, messages, and channel names?',
            paragraphs: [
              'Yes, in many cases it does. Users commonly paste Unicode small text into nicknames, statuses, bios, server names, category labels, and message content. Exact results can vary by client and by the specific characters you choose.',
            ],
          },
          {
            heading: 'What is the best discord small font generator?',
            paragraphs: [
              'Use a generator that is fast, copy-and-paste friendly, and includes readable styles rather than only extreme novelty text. On small-text-generator.online, you can type once, preview multiple results, and copy the one that fits Discord best.',
            ],
          },
        ],
      },
      {
        heading: 'Final Tips Before You Paste',
        paragraphs: [
          'The best Discord small text is readable, intentional, and short. If every name, channel, and announcement uses a different style, the effect stops looking creative and starts looking like a formatting accident. Pick one or two styles, stay consistent, and use them where they improve clarity or branding.',
          'If you want the safest route, start with Small Caps. It is usually the best mix of style and legibility. If you want a more playful look, test Superscript for short accents. Either way, a unicode-based discord small font generator gives you more flexibility than Discord itself does.',
          'Ready to try it? Use the free generator on small-text-generator.online to create small text discord styles instantly, then copy and paste them into your nickname, channel names, profile, or messages. No signup, no download, and no mysterious font wizardry required.',
        ],
        links: [
          {
            label: 'Try the Generator',
            href: '/',
            description:
              'Create Discord small text online for free with no registration.',
          },
          {
            label: 'Read More Unicode Guides',
            href: '/blog/unicode-fonts-explained',
            description:
              'Learn why fancy text generators work and why they are not traditional font files.',
          },
          {
            label: 'Best Styles for Social Media',
            href: '/blog/best-fancy-text-styles-for-social-media',
            description:
              'See which Unicode styles balance branding and readability across platforms.',
          },
        ],
      },
    ],
  },
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

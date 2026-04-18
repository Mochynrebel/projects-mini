import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read blog posts about small text, Unicode fonts, and copy-and-paste styles for social media profiles.',
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <Link
            href="/"
            className="mb-4 inline-flex text-sm text-white/50 transition-colors hover:text-white"
          >
            Back to generator
          </Link>
          <h1 className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Blog
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/65">
            Guides, tips, and explanations about Unicode text styles, tiny fonts,
            and better copy-and-paste formatting for social profiles.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-xl backdrop-blur-md transition-colors hover:bg-white/[0.05] sm:p-8"
            >
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/35">
                {dateFormatter.format(new Date(post.publishedAt))}
              </p>
              <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-pink-300"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 text-base leading-7 text-white/60">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-pink-400/40 hover:text-white"
              >
                Read article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

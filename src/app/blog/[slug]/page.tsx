import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <article className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <Link
            href="/blog"
            className="mb-6 inline-flex text-sm text-white/50 transition-colors hover:text-white"
          >
            Back to blog
          </Link>

          <p className="text-sm uppercase tracking-[0.24em] text-white/35">
            {dateFormatter.format(new Date(post.publishedAt))}
          </p>
          <h1 className="mt-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/65">
            {post.description}
          </p>

          <div className="mt-10 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-white/70 sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.listItems ? (
                    <ul className="space-y-3 pl-5 text-base leading-8 text-white/70 sm:text-lg">
                      {section.listItems.map((item) => (
                        <li key={item} className="list-disc marker:text-pink-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.subsections?.map((subsection) => (
                    <div key={subsection.heading} className="pt-2">
                      <h3 className="text-xl font-semibold text-white/95">
                        {subsection.heading}
                      </h3>
                      <div className="mt-3 space-y-4">
                        {subsection.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-base leading-8 text-white/70 sm:text-lg"
                          >
                            {paragraph}
                          </p>
                        ))}
                        {subsection.listItems ? (
                          <ul className="space-y-3 pl-5 text-base leading-8 text-white/70 sm:text-lg">
                            {subsection.listItems.map((item) => (
                              <li
                                key={item}
                                className="list-disc marker:text-pink-300"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  {section.links ? (
                    <div className="grid gap-3 pt-2">
                      {section.links.map((link) => (
                        <Link
                          key={`${section.heading}-${link.href}`}
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-pink-400/40 hover:bg-white/[0.05]"
                        >
                          <span className="block text-sm font-semibold text-pink-300">
                            {link.label}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-white/65">
                            {link.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}

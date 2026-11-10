import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Heart, Link2, Mail, MessageCircle, Repeat2, Share } from 'lucide-react';
import { POSTS, loadPostHtml, postDate } from '../writing';

const SUBSTACK = 'https://ahumpert.substack.com';
const PUBLICATION = POSTS.find((post) => !post.note)?.publication ?? 'The Ansible';

// Points the page's <head> at this post while it's open: canonical link to
// Substack (the original) and a description for search results. Notes live
// only on this site, so they have no Substack original.
function useHeadTags(post) {
  useEffect(() => {
    if (!post) return undefined;
    document.title = `${post.title} — Alexander Wolfgang Humpert`;

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = post.url ?? `${window.location.origin}/writing/${post.slug}`;
    const description = document.createElement('meta');
    description.name = 'description';
    description.content = post.subtitle ?? '';
    document.head.append(canonical, description);

    return () => {
      canonical.remove();
      description.remove();
      document.title = 'Alexander Wolfgang Humpert';
    };
  }, [post]);
}

// Sharing keeps readers here: every option shares this site's URL.
function ShareButtons({ post }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/writing/${post.slug}`;
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  const text = encodeURIComponent(post.title);
  const url = encodeURIComponent(shareUrl);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', shareUrl);
    }
  };

  const nativeShare = () =>
    navigator.share({ title: post.title, text: post.subtitle, url: shareUrl }).catch(() => {});

  return (
    <div className="post-actions-group" role="group" aria-label="Share">
      {canNativeShare && (
        <button type="button" className="post-action" onClick={nativeShare}>
          <Share size={15} strokeWidth={1.6} aria-hidden="true" />
          Share
        </button>
      )}
      <button type="button" className="post-action" onClick={copyLink} aria-live="polite">
        {copied ? (
          <Check size={15} strokeWidth={1.6} aria-hidden="true" />
        ) : (
          <Link2 size={15} strokeWidth={1.6} aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a
        className="post-action"
        href={`https://x.com/intent/post?text=${text}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className="post-action"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a className="post-action" href={`mailto:?subject=${text}&body=${url}`}>
        <Mail size={15} strokeWidth={1.6} aria-hidden="true" />
        Email
      </a>
    </div>
  );
}

// Likes, comments and restacks need a Substack login, so these hand off to the post there.
function SubstackButtons({ post }) {
  return (
    <div className="post-actions-group" role="group" aria-label="Respond on Substack">
      <a className="post-action" href={post.url} target="_blank" rel="noopener noreferrer">
        <Heart size={15} strokeWidth={1.6} aria-hidden="true" />
        Like
      </a>
      <a className="post-action" href={`${post.url}/comments`} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={15} strokeWidth={1.6} aria-hidden="true" />
        Comment
      </a>
      <a className="post-action" href={post.url} target="_blank" rel="noopener noreferrer">
        <Repeat2 size={15} strokeWidth={1.6} aria-hidden="true" />
        Restack
      </a>
      <span className="post-actions-note">Opens on Substack ↗</span>
    </div>
  );
}

function PostNotFound() {
  return (
    <main className="post-page">
      <div className="post-column">
        <p className="timeline-kicker">Writing</p>
        <h1 className="post-title">This essay isn&rsquo;t here</h1>
        <Link to="/writing" className="view-all">
          All writing
          <span className="arrow-icon" aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}

export default function PostPage() {
  const { slug } = useParams();
  const index = POSTS.findIndex((item) => item.slug === slug);
  const post = POSTS[index];
  const newer = POSTS[index - 1];
  const older = POSTS[index + 1];
  const [html, setHtml] = useState(null);

  useHeadTags(post);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHtml(null);
    let cancelled = false;
    loadPostHtml(slug).then((body) => {
      if (!cancelled) setHtml(body);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!post) return <PostNotFound />;

  return (
    <main className="post-page">
      <article className="post-column">
        <Link to="/writing" className="post-back">
          <ArrowLeft size={15} strokeWidth={1.6} aria-hidden="true" />
          Writing
        </Link>

        <header className="post-header">
          <p className="timeline-kicker">
            {post.note ? 'Note' : post.publication} · <time dateTime={post.date}>{postDate(post.date)}</time> ·{' '}
            {post.minutes} min read
          </p>
          <h1 className="post-title">{post.title}</h1>
          {post.subtitle && <p className="post-subtitle">{post.subtitle}</p>}
          <div className="post-actions">
            <ShareButtons post={post} />
          </div>
        </header>

        {html === null ? (
          <div className="post-body post-loading" aria-busy="true" />
        ) : (
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        )}

        <footer className="post-footer">
          <div className="post-actions">
            {!post.note && <SubstackButtons post={post} />}
            <ShareButtons post={post} />
          </div>

          <section className="post-subscribe" aria-label="Subscribe">
            <h2 className="post-subscribe-title">Get new essays by email</h2>
            <p className="post-subscribe-text">
              Free, through {PUBLICATION} on Substack. No spam, unsubscribe any time.
            </p>
            <iframe
              src={`${SUBSTACK}/embed`}
              title={`Subscribe to ${PUBLICATION}`}
              className="post-subscribe-frame"
              loading="lazy"
            />
            <a
              href={`${SUBSTACK}/subscribe`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-subscribe-fallback"
            >
              Or subscribe on Substack ↗
            </a>
          </section>

          {(newer || older) && (
            <nav className="post-more" aria-label="More writing">
              {older && (
                <Link to={`/writing/${older.slug}`} className="post-more-link">
                  <span className="post-more-label">Older</span>
                  <span className="post-more-title">{older.title}</span>
                </Link>
              )}
              {newer && (
                <Link to={`/writing/${newer.slug}`} className="post-more-link post-more-newer">
                  <span className="post-more-label">Newer</span>
                  <span className="post-more-title">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}
        </footer>
      </article>
    </main>
  );
}

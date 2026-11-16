import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, CornerDownLeft, FileText, Hammer, Moon, Search, Sun, Volume2, VolumeX } from 'lucide-react';
import { POSTS } from '../writing';
import { PROJECTS } from '../data/projects';
import { NAV_LINKS } from '../data/nav';
import { setSoundEnabled, sound } from '../tactile/sound';
import { useSoundEnabled } from '../tactile/useSound';
import { toggleTheme, useTheme } from '../theme';

const SUBSTACK = 'https://ahumpert.substack.com';

// Jump to anything: pages, essays, projects, and the two switches.
// Opens with Cmd/Ctrl + K, or the "Jump to" button in the nav.
export default function CommandPalette({ open, instant, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const soundOn = useSoundEnabled();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocusRef = useRef(null);

  const groups = useMemo(() => {
    const all = [
      {
        label: 'Go to',
        items: [{ to: '/', label: 'Home' }, ...NAV_LINKS].map((link) => ({
          id: `page-${link.to}`,
          title: link.label,
          run: () => navigate(link.to),
        })),
      },
      {
        label: 'Writing',
        items: POSTS.map((post) => ({
          id: `post-${post.slug}`,
          title: post.title,
          hint: post.note ? 'Note' : 'Essay',
          icon: FileText,
          run: () => navigate(`/writing/${post.slug}`),
        })),
      },
      {
        label: 'Projects',
        items: PROJECTS.map((project) => ({
          id: `project-${project.slug}`,
          title: project.title,
          hint: project.tag,
          icon: Hammer,
          run: () => navigate(`/projects#${project.slug}`),
        })),
      },
      {
        label: 'Switches',
        items: [
          {
            id: 'theme',
            title: theme === 'day' ? 'Switch to the night sky' : 'Switch to the day sky',
            icon: theme === 'day' ? Moon : Sun,
            keep: true,
            quiet: true,
            run: () => toggleTheme(),
          },
          {
            id: 'sound',
            title: soundOn ? 'Mute interface sounds' : 'Turn on interface sounds',
            icon: soundOn ? VolumeX : Volume2,
            keep: true,
            quiet: true,
            run: () => setSoundEnabled(!soundOn),
          },
          {
            id: 'subscribe',
            title: 'Subscribe to The Ansible on Substack',
            icon: ArrowUpRight,
            run: () => window.open(`${SUBSTACK}/subscribe`, '_blank', 'noopener'),
          },
        ],
      },
    ];

    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return all;
    return all
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const haystack = `${item.title} ${item.hint ?? ''} ${group.label}`.toLowerCase();
          return words.every((word) => haystack.includes(word));
        }),
      }))
      .filter((group) => group.items.length);
  }, [query, theme, soundOn, navigate]);

  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    setQuery('');
    setActive(0);
    document.body.classList.add('is-locked');
    inputRef.current?.focus();
    return () => {
      document.body.classList.remove('is-locked');
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (item) => {
    if (!item) return;
    if (!item.quiet) sound.navigate();
    item.run();
    if (!item.keep) onClose();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (flat.length ? (index + 1) % flat.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (flat.length ? (index - 1 + flat.length) % flat.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(flat[active]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'Tab') {
      event.preventDefault(); // focus stays in the field; arrows move the list
    }
  };

  let row = -1;

  return (
    <div className={`palette-backdrop${instant ? ' is-instant' : ''}`} onPointerDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Jump to anything" onKeyDown={onKeyDown}>
        <div className="palette-field">
          <Search size={16} strokeWidth={1.8} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search essays, projects, pages…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={flat[active] ? `palette-${flat[active].id}` : undefined}
            autoComplete="off"
            spellCheck="false"
          />
          <kbd>Esc</kbd>
        </div>

        <div className="palette-list" id="palette-list" role="listbox" ref={listRef}>
          {groups.length === 0 && <p className="palette-empty">Nothing by that name. Try a shorter word.</p>}
          {groups.map((group) => (
            <div key={group.label} role="group" aria-label={group.label}>
              <p className="palette-group">{group.label}</p>
              {group.items.map((item) => {
                row += 1;
                const index = row;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`palette-${item.id}`}
                    type="button"
                    role="option"
                    aria-selected={index === active}
                    data-active={index === active}
                    data-sound="own"
                    tabIndex={-1}
                    className="palette-item"
                    onPointerMove={() => index !== active && setActive(index)}
                    onClick={() => run(item)}
                  >
                    <span className="palette-item-icon" aria-hidden="true">
                      {Icon ? <Icon size={15} strokeWidth={1.6} /> : <span className="palette-item-dot" />}
                    </span>
                    <span className="palette-item-title">{item.title}</span>
                    {item.hint && <span className="palette-item-hint">{item.hint}</span>}
                    <CornerDownLeft className="palette-item-enter" size={13} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

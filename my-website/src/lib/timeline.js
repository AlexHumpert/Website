// Shared by every timeline page (Writing, Projects, Library, Work, Community).

// Each group on a timeline takes the next pastel, in order. The names match
// the --sage / --lapis / … tokens in styles/tokens.css.
export const TONES = ['sage', 'lapis', 'apricot', 'sand', 'clay'];

export const toneStyle = (index) => ({ '--tone': `var(--${TONES[index % TONES.length]})` });

const asDate = (date) => new Date(`${date}T00:00:00`);

export const monthLabel = (date) =>
  asDate(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

export const dayLabel = (date) =>
  asDate(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export const shortMonthLabel = (date) =>
  asDate(date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

// Items must already be sorted newest first.
export function groupByMonth(items) {
  const months = [];
  items.forEach((item) => {
    const key = item.date.slice(0, 7);
    let month = months[months.length - 1];
    if (!month || month.key !== key) {
      month = { key, label: monthLabel(item.date), items: [] };
      months.push(month);
    }
    month.items.push(item);
  });
  return months;
}

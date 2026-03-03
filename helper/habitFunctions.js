function parseLocalDate(ymd) {
  const [y, m, d] = ymd.split('-');
  return new Date(y, m - 1, d); // local
}

export function getWeekDayIndex(date) {
  const jsDay = parseLocalDate(date).getDay(); // 0 (Dom) - 6 (Sab)
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function formatDate(date) {
  const year = parseLocalDate(date).getFullYear();
  const month = String(parseLocalDate(date).getMonth() + 1).padStart(2, '0');
  const day = String(parseLocalDate(date).getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

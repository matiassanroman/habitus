export function getWeekDayIndex(date) {
  const jsDay = date.getDay(); // 0 (Dom) - 6 (Sab)
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export const CATEGORIES = [
  { id: 'other', label: 'Otros', icon: 'category', color: '#64748b' },
  { id: 'health', label: 'Salud', icon: 'favorite', color: '#ef4444' },
  {
    id: 'fitness',
    label: 'Ejercicio',
    icon: 'fitness-center',
    color: '#22c55e',
  },
  { id: 'nutrition', label: 'Nutrición', icon: 'restaurant', color: '#84cc16' },
  { id: 'finance', label: 'Finanzas', icon: 'attach-money', color: '#10b981' },
  { id: 'study', label: 'Estudio', icon: 'school', color: '#6366f1' },
  { id: 'work', label: 'Trabajo', icon: 'work', color: '#f59e0b' },
  { id: 'mind', label: 'Mente', icon: 'self-improvement', color: '#8b5cf6' },
  {
    id: 'entertainment',
    label: 'Entretenimiento',
    icon: 'movie',
    color: '#ec4899',
  },
  { id: 'social', label: 'Social', icon: 'groups', color: '#0ea5e9' },
  { id: 'sleep', label: 'Sueño', icon: 'bedtime', color: '#334155' },
  { id: 'personal', label: 'Personal', icon: 'person', color: '#14b8a6' },
  {
    id: 'productivity',
    label: 'Productividad',
    icon: 'task-alt',
    color: '#f97316',
  },
  { id: 'hobby', label: 'Hobbies', icon: 'palette', color: '#a855f7' },
  { id: 'bad-habits', label: 'Malos hábitos', icon: 'block', color: '#dc2626' },
  {
    id: 'addictions',
    label: 'Adicciones',
    icon: 'do-not-disturb',
    color: '#7c2d12',
  },
];

const DEFAULT_CATEGORY = {
  id: 'other',
  label: 'Otros',
  icon: 'category',
  color: '#64748b',
};

export function getCategoryById(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId) ?? DEFAULT_CATEGORY;
}

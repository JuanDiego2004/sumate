export const CATEGORIES = [{
  id: 'bodega',
  label: 'bodegas',
  emoji: '🛒'
}, {
  id: 'ferreteria',
  label: 'ferreterías',
  emoji: '🔧'
}, {
  id: 'farmacia',
  label: 'farmacias',
  emoji: '💊'
}, {
  id: 'servicios',
  label: 'servicios',
  emoji: '🛠️'
}, {
  id: 'panaderia',
  label: 'panaderías',
  emoji: '🥖'
}];
export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

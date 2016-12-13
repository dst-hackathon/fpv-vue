import _ from 'lodash';

const MENUS = [
  {
    name: 'plan',
    icon: 'fa-calendar',
    title: 'Plan Management'
  }, {
    name: 'building',
    icon: 'fa-building-o',
    title: 'Building Management'
  }, {
    name: 'review',
    icon: 'fa-check',
    title: 'Plan Review'
  }
];

export function findMenuByName(name) {
  return _.find(MENUS, { name });
}

export default MENUS;

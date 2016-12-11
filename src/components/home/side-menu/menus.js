import _ from 'lodash';

const MENUS = [
  {
    name: 'plan',
    icon: 'fa-calendar'
  }, {
    name: 'building',
    icon: 'fa-building-o'
  }, {
    name: 'review',
    icon: 'fa-check'
  }
];

export function findMenuByName(name) {
  return _.find(MENUS, { name });
}

export default MENUS;

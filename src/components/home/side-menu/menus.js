import _ from 'lodash';
import PlanManagement from 'components/home/plan-management';
import BuildingManagement from 'components/home/building-management';

const MENUS = [
  {
    name: 'Plan',
    component: PlanManagement,
    icon: 'fa-calendar'
  }, {
    name: 'Building',
    component: BuildingManagement,
    icon: 'fa-building'
  }, {
    name: 'Review',
    icon: 'fa-check'
  }
];

export function findMenuByName(name) {
  return _.find(MENUS, { name });
}

export default MENUS;

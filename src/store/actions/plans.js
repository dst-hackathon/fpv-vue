import * as types from 'store/types';
import api from 'api';

export default {
  [types.FETCH_ALL]: async function({ commit }) {
    let plans = await api.plans.findAll();
    let buildings = await api.buildings.findAll();
    let floors = await api.floors.findAll();
    let desks = await api.desks.findAll();

    // construct nested plans
    floors = floors.map(floor => {
      return {
        ...floor,

        desks: _.filter(desks, [ 'floor.id', floor.id ]),
      };
    });

    buildings = buildings.map(building => {
      return {
        ...building,

        floors: _.filter(floors, [ 'building.id', building.id ]),
      };
    });

    plans = plans.map(plan => {
      return {
        ...plan,

        buildings: _.filter(buildings, [ 'plan.id', plan.id ])
      };
    });

    commit(types.UPDATE_PLANS, { plans });
  },
};

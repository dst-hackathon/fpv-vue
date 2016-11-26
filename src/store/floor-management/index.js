import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    selected: {
      // use 1 just to populate mock data
      planId: 1,
      buildingId: 1,
      floorId: 1,
      deskId: null
    },
    desks: [],
  },

  actions,
  mutations,

  getters: {
    selectedPlan: function (state, getters, rootState) {
      return _.find(rootState.plans, { id: state.selected.planId });
    },

    selectedFloor: function (state, getters) {
      const plan = getters.selectedPlan;
      const building = plan && plan.buildings[0];
      const floorId = state.selected.floorId;

      return plan && _.find(building.floors, { id: floorId });
    },

    selectedDesk: function (state, getters) {
      const floor = getters.selectedFloor;
      const deskId = state.selected.deskId;

      return floor && _.find(floor.desks, { id: deskId });
    }
  }
};

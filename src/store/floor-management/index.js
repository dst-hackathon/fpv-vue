import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    selected: {
      planId: null,
      buildingId: null,
      floorId: null,
      deskId: null
    }
  },

  actions,
  mutations,

  getters: {
    selectedPlan: function (state, rootState) {
      return _.find(rootState.plans, { id: state.selected.planId });
    },

    selectedFloor: function (state, getters) {
      const plan = getters.selectedPlan;
      const building = plan && plan.buildings[0];

      return plan && _.find(building.floors, { id: state.selected.floorId });
    },

    selectedDesk: function (state, getters) {
      const floor = getters.selectedFloor;

      return floor && _.find(floor.desks, { id: state.selected.deskId });
    }
  }
};

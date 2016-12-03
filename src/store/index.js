import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    plans: [{
      buildings: [{
        floors: [{
          // desk
        }]
      }]
    }],

    login: {},

    selection: {
      planId: null,
      buildingId: null,
      floorId: null,
    }
  },

  getters: {
    buildings: function(state) {
      return _.flatMap(state.plans, 'buildings');
    },

    floors: function(state, getters) {
      return _.flatMap(getters.buildings, 'floors');
    },

    desks: function(state, getters) {
      return _.flatMap(getters.floors, 'desks');
    },

    selectedPlan: function(state) {
      return _.find(state.plans, { id: state.selection.planId });
    },

    selectedBuilding: function(state, getters) {
      const selectedPlan = getters.selectedPlan;
      const buildings = selectedPlan && selectedPlan.buildings;

      return _.find(buildings, { id: state.selection.buildingId });
    },

    selectedFloor: function(state, getters) {
      const selectedBuilding = getters.selectedBuilding;
      const floors = selectedBuilding && selectedBuilding.floors;

      return _.find(floors, { id: state.selection.floorId });
    }
  },

  actions,
  mutations,
});

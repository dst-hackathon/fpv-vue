import Vue from 'vue';
import _ from 'lodash';
import * as types from 'store/types';
import { findFloorById } from 'store/helpers';

export default {
  [types.UPDATE_DESK_ASSIGNMENTS]: function(state, { floorId, assignments }) {
    const floor = findFloorById(state, floorId);

    floor.desks.forEach((desk) => {
      const assignment = _.find(assignments, [ 'desk.id', desk.id ]);

      Vue.set(desk, 'employee', assignment && assignment.employee);
    });
  },
};

import Vue from 'vue';
import _ from 'lodash';
import * as types from 'store/types';

export default {
  [types.UPDATE_DESK_ASSIGNMENTS]: function(state, { floorId, assignments }) {
    const floor = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .find({ id: floorId })
      .value();

    floor.desks.forEach((desk) => {
      const assignment = _.find(assignments, [ 'desk.id', desk.id ]);

      Vue.set(desk, 'employee', assignment && assignment.employee);
    });
  },
};

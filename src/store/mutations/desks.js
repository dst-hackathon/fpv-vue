import _ from 'lodash';
import * as types from 'store/types';

export default {
  [types.CREATE_DESK]: function(state, { desk }) {
    const floor = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .find({ id: desk.floor.id })
      .value();

    floor.desks.push(desk);
  },

  [types.UPDATE_DESK]: function(state, { desk }) {
    const storedDesk = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .flatMap('desks')
      .find({ id: desk.id })
      .value();

    _.assignIn(storedDesk, desk);
  },

  [types.DELETE_DESK]: function(state, { desk }) {
    const floor = _
      .chain(state.plans)
      .flatMap('buildings')
      .flatMap('floors')
      .find({ id: desk.floor.id })
      .value();

    floor.desks = _.reject(floor.desks, { id: desk.id });
  },
};

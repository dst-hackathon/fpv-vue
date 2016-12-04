import _ from 'lodash';
import * as types from 'store/types';
import { findFloorById, findDeskById } from 'store/helpers';

export default {
  [types.CREATE_DESK]: function(state, { desk }) {
    const floor = findFloorById(state, desk.floor.id);

    floor.desks.push(desk);
  },

  [types.UPDATE_DESK]: function(state, { desk }) {
    const storedDesk = findDeskById(state, desk.id);

    _.assignIn(storedDesk, desk);
  },

  [types.DELETE_DESK]: function(state, { desk }) {
    const floor = findFloorById(state, desk.floor.id);

    floor.desks = _.reject(floor.desks, { id: desk.id });
  },
};

import api from 'api';
import * as types from 'store/types';

export default {
  [types.FETCH_DESK_ASSIGNMENTS]: async function({ commit }, { floorId }) {
    const assignments = await api.deskAssignments.find({ floorId });

    commit(types.UPDATE_DESK_ASSIGNMENTS, {
      floorId,
      assignments
    });
  },

  [types.REMOVE_DESK_OWNER]: async function({ commit, dispatch }, { changeset, fromDesk }) {
    dispatch(types.CREATE_CHANGESET_ITEM, {
      changesetItem: {
        changeset,
        employee: fromDesk.employee,
        fromDesk: fromDesk,
        toDesk: null
      }
    });
  },

  [types.ASSIGN_DESK_OWNER]: async function({ commit, dispatch }, { changeset, owner, fromDesk, toDesk }) {

    if (toDesk && toDesk.employee) {
      await dispatch(types.REMOVE_DESK_OWNER, {
        changeset,
        fromDesk: toDesk
      });
    }

    dispatch(types.CREATE_CHANGESET_ITEM, {
      changesetItem: {
        changeset,
        employee: owner,
        fromDesk: fromDesk,
        toDesk: toDesk
      }
    });
  },
};

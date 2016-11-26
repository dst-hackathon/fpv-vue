// do nothing and pass the payload to the mutation of the same type
export default (types) => {
  return types.reduce((memo, type) => {
    return {
      ...memo,
      [type]({ commit }, payload) {
        commit(type, payload);
      }
    };
  }, {});
};

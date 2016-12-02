export default {
  employee(id) {
    return `/api/employees/${id}/image`;
  },

  floor(id) {
    return `/api/floors/${id}/image`;
  }
};

<template>
  <div>
    <div>
      <label>Desk Code</label>
      <span class="control">
        <input class="input" name="deskCode" :value="deskCode" :readonly="computeInputReadonly('deskCode')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div>
      <label>Employee ID</label>
      <span class="control">
        <input class="input" name="employeeId" :value="employeeId" :readonly="computeInputReadonly('employeeId')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div>
      <label>First Name</label>
      <span class="control">
        <input class="input" name="firstName" :value="firstName" :readonly="computeInputReadonly('firstName')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div>
      <label>Last Name</label>
      <span class="control">
        <input class="input" name="lastName" :value="lastName" :readonly="computeInputReadonly('lastName')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div v-if="!readonly">
      <button>submit</button>
      <button>cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'desk-detail-panel',
  props: [ 'desk', 'options' ],
  data() {
    return {
      readonly: false,
      fieldStates: {
        deskCode: { editing: false},
        employeeId: { editing: false },
        firstName: { editing: false },
        lastName: { editing: false },
      },
    };
  },
  computed: {
    deskCode() {
      return this.desk ? this.desk.code : '';
    },
    employeeId() {
      return '1234'; // FIXME
    },
    firstName() {
      return 'Hello'; // FIXME
    },
    lastName() {
      return 'World'; // FIXME
    },
  },
  methods: {
    onClickInput: function (event) {
      var fieldName = this.getFieldName(event.target);
      this.setEditingMode(fieldName, true);
    },
    onBlurInput: function (event) {
      var fieldName = this.getFieldName(event.target);
      this.setEditingMode(fieldName, false);
    },
    setEditingMode: function (fieldName, value) {
      this.getFieldState(fieldName).editing = value;
    },
    getFieldState: function (fieldName) {
      return this.fieldStates[fieldName];
    },
    getOption: function (fieldName) {
      return this.options[fieldName];
    },
    getFieldName: function (target) {
      return target.name;
    },
    getReadonlyMode: function (fieldName) {
      return (this.options[fieldName] || {}).readonly || false;
    },
    computeInputReadonly: function (fieldName) {
      return this.readonly || this.getReadonlyMode(fieldName) || !this.getFieldState(fieldName).editing;
    },
  },
};
</script>

<style scoped>
  label {
    font-weight: bold;
  }
  label:after {
    content: ":";
  }
  input[readonly] {
    background: none;
    border: none;
    box-shadow: none;
  }
</style>

<template>
  <div>
    <p v-if="!computeFieldHidden('deskCode')" class="control">
      <label>Desk Code</label>
      <span>
        <input class="input" name="deskCode" :value="deskCode" :readonly="computeInputReadonly('deskCode')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </p>
    <p v-if="!computeFieldHidden('employeeId')" class="control">
      <label>Employee ID</label>
      <span>
        <input class="input" name="employeeId" :value="employeeId" :readonly="computeInputReadonly('employeeId')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </p>
    <p v-if="!computeFieldHidden('firstName')" class="control">
      <label>First Name</label>
      <span>
        <input class="input" name="firstName" :value="firstName" :readonly="computeInputReadonly('firstName')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </p>
    <p v-if="!computeFieldHidden('lastName')" class="control">
      <label>Last Name</label>
      <span>
        <input class="input" name="lastName" :value="lastName" :readonly="computeInputReadonly('lastName')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </p>
    <p v-if="!readonly" class="control">
      <button class="button is-primary" v-on:click="onSubmit">submit</button>
      <button class="button" v-on:click="onCancel">cancel</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'desk-detail-panel',
  props: [ 'desk', 'options' ],
  data() {
    return {
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
    onSubmit: function (event) {
      this.saveDeskInfo();
    },
    onCancel: function (event) {},
    onClickInput: function (event) {
      var fieldName = this.getFieldName(event.target);
      this.setEditingMode(fieldName, true);
    },
    onBlurInput: function (event) {
      var fieldName = this.getFieldName(event.target);
      this.setEditingMode(fieldName, false);
    },
    saveDeskInfo: function () {
      this.$store.dispatch();
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
    computeFieldHidden: function (fieldName) {
      return (this.options[fieldName] || {}).hidden || false;
    },
    computeInputReadonly: function (fieldName) {
      var readonlyMode = (this.options[fieldName] || {}).readonly || false;
      return readonlyMode || !this.getFieldState(fieldName).editing;
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

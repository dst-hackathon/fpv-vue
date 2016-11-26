<template>
  <div>
    <div>
      <label>Desk Code</label>
      <span class="control">
        <input class="input" name="deskCode" :value="desk && desk.code" :readonly="!computeEditingMode('deskCode')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div>
      <label>Employee ID</label>
      <span class="control">
        <input class="input" name="employeeId" :value="fieldValues.employeeId" :readonly="!computeEditingMode('employeeId')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div>
      <label>First Name</label>
      <span class="control">
        <input class="input" name="firstName" :value="fieldValues.firstName" :readonly="!computeEditingMode('firstName')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div>
      <label>Last Name</label>
      <span class="control">
        <input class="input" name="lastName" :value="fieldValues.lastName" :readonly="!computeEditingMode('lastName')"
            v-on:click="onClickInput"
            v-on:blur="onBlurInput">
      </span>
    </div>
    <div v-if="editable">
      <button>submit</button>
      <button>cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'desk-detail-panel',
  props: [ 'desk' ],
  data() {
    return {
      editable: false,
      fieldDetails: {
        deskCode: { editing: false, value: '' },
        employeeId: { editing: false, value: '' },
        firstName: { editing: false, value: '' },
        lastName: { editing: false, value: '' },
      },
      fieldValues: {
        deskCode: '',
        employeeId: '',
        firstName: '',
        lastName: '',
      },
    };
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
      this.getField(fieldName).editing = value;
    },
    getField: function (fieldName) {
      return this.fieldDetails[fieldName];
    },
    getFieldName: function (target) {
      return target.name || target.getAttribute('data-name');
    },
    computeEditingMode: function (fieldName) {
      return this.editable || this.getField(fieldName).editing;
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
  }
</style>

<template>
  <div v-if="!panelHidden">
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
    <p v-if="!panelReadonly" class="control">
      <button class="button is-primary" v-on:click="onSubmit">submit</button>
      <button class="button" v-on:click="onCancel">cancel</button>
    </p>
  </div>
</template>

<script>
import _ from 'lodash';
import * as types from 'store/types';

export default {
  name: 'desk-detail-panel',
  props: [ 'desk', 'employee', 'fieldOptions', 'panelOptions', 'options' ],
  data() {
    return {
      readonly: false,
      fields: {
        deskCode: { mode: { editing: false } },
        employeeId: { mode: { editing: false } },
        firstName: { mode: { editing: false } },
        lastName: { mode: { editing: false } },
      },
    };
  },
  computed: {
    deskCode() {
      return this.desk ? this.desk.code : '';
    },
    employeeId() {
      return ''; // FIXME
    },
    firstName() {
      return ''; // FIXME
    },
    lastName() {
      return ''; // FIXME
    },
    panelHidden() {
      return this.actualPanelOptions.hidden;
    },
    panelReadonly() {
      if (this.actualPanelOptions.readonly) {
        return true;
      }

      return !_.some(this.actualOptions, function (option) {
        return option.hidden !== true && option.readonly !== true;
      });
    },
    actualPanelOptions() {
      var defaultOptions = { hidden: false, readonly: false };
      return _.merge(defaultOptions, this.panelOptions);
    },
    actualFieldOptions() {
      var defaultOptions = {
        deskCode: { hidden: false, readonly: false },
        employeeId: { hidden: false, readonly: false },
        firstName: { hidden: false, readonly: false },
        lastName: { hidden: false, readonly: false },
      };
      return _.merge(defaultOptions, this.fieldOptions);
    },
    actualOptions() {
      var defaultOptions = {
        panel: { hidden: false, readonly: false },
        fields: {
          deskCode: { hidden: false, readonly: false },
          employeeId: { hidden: false, readonly: false },
          firstName: { hidden: false, readonly: false },
          lastName: { hidden: false, readonly: false },
        }
      };
      return _.merge(defaultOptions, this.options);
    }
  },
  methods: {
    onSubmit: function (event) {
      this.saveDeskInfo();
    },
    onCancel: function (event) {
      this.discardChange();
    },
    onClickInput: function (event) {
      var fieldName = this.getFieldName(event.target);
      this.setEditingMode(fieldName, true);
    },
    onBlurInput: function (event) {
      var fieldName = this.getFieldName(event.target);
      this.setEditingMode(fieldName, false);
    },
    saveDeskInfo: function () {
      var updatedDesk = _.assignIn({}, this.desk, {
        code: this.deskCode
      });

      this.$store.dispatch(types.UPDATE_DESK, { desk: updatedDesk });
    },
    discardChange: function() {
      this.$emit('discardChange');
    },
    setEditingMode: function (fieldName, value) {
      this.getFieldMode(fieldName).editing = value;
    },
    getFieldMode: function (fieldName) {
      return this.fields[fieldName].mode;
    },
    getActualFieldOption: function (fieldName) {
      return this.actualFieldOptions[fieldName];
    },
    getFieldName: function (target) {
      return target.name;
    },
    computeFieldHidden: function (fieldName) {
      return this.getActualFieldOption(fieldName).hidden;
    },
    computeInputReadonly: function (fieldName) {
      // The flag readonly of the panel has highest priority
      // Every field is in readonly mode regardless of the readonly option of itself
      if (this.panelReadonly) {
        return true;
      }

      return this.getActualFieldOption(fieldName).readonly || !this.getFieldMode(fieldName).editing;
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

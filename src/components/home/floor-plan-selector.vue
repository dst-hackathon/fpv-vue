<template lang="html">
<div class="component">
  <dropdown
    v-model.number="planId"
    :options="plans"
    label="Plan"
    className="plan"
    valueProp="id"
    textProp="name"
    @input="reset('buildingId')" />

  <dropdown
    v-model.number="buildingId"
    :options="buildings"
    label="Building"
    className="building"
    valueProp="id"
    textProp="name"
    @input="reset('floorId')" />

  <dropdown
    v-model.number="floorId"
    :options="floors"
    label="Floor"
    className="floor"
    valueProp="id"
    textProp="name" />

</div>
</template>

<script>
import _ from 'lodash';
import Dropdown from './dropdown';
import { SELECT_PLAN, SELECT_BUILDING, SELECT_FLOOR } from 'store/types';

export default {
  components: {
    Dropdown,
  },

  computed: {
    plans() {
      return this.$store.state.plans;
    },

    buildings() {
      const selectedPlan = this.$store.getters.selectedPlan;

      return selectedPlan && selectedPlan.buildings;
    },

    floors() {
      const selectedBuilding = this.$store.getters.selectedBuilding;

      return selectedBuilding && selectedBuilding.floors;
    },

    planId: {
      get() {
        return this.$store.state.selection.planId;
      },
      set(planId) {
        this.$store.dispatch(SELECT_PLAN, { planId });
      }
    },

    buildingId: {
      get() {
        return this.$store.state.selection.buildingId;
      },
      set(buildingId) {
        this.$store.dispatch(SELECT_BUILDING, { buildingId });
      }
    },

    floorId: {
      get() {
        return this.$store.state.selection.floorId;
      },
      set(floorId) {
        this.$store.dispatch(SELECT_FLOOR, { floorId });
      }
    },
  },

  methods: {
    reset(prop) {
      this[prop] = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.component > * {
    margin-bottom: 5px;
}
</style>

<template lang="html">
<div class="component">
  <plan-selector v-model="planId" />

  <dropdown
    v-model.number="buildingId"
    :options="buildings"
    label="Building"
    className="building"
    valueProp="id"
    textProp="name" />

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
import Dropdown from 'components/dropdown';
import PlanSelector from 'components/home/plan-selector';
import { SELECT_PLAN, SELECT_BUILDING, SELECT_FLOOR } from 'store/types';

export default {
  components: {
    Dropdown,
    PlanSelector,
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
};
</script>

<style lang="scss" scoped>
.component > * {
    margin-bottom: 5px;
}
</style>

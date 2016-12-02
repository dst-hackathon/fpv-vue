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

export default {
  components: {
    Dropdown,
  },

  data() {
    return {
      planId: null,
      buildingId: null,
      floorId: null,
    };
  },

  computed: {
    plans() {
      return this.$store.state.plans;
    },

    buildings() {
      if (!this.planId) {
        return [];
      }

      const buildings = this.$store.getters.buildings;

      return _.filter(buildings, [ 'plan.id', this.planId ]);
    },

    floors() {
      if (!this.buildingId) {
        return [];
      }

      const floors = this.$store.getters.floors;

      return _.filter(floors, [ 'building.id', this.buildingId ]);
    },

    plan() {
      return _.find(this.plans, { id: this.planId });
    },

    building() {
      return _.find(this.buildings, { id: this.buildingId });
    },

    floor() {
      return _.find(this.floors, { id: this.floorId });
    }
  },

  watch: {
    plan: 'emitSelected',
    building: 'emitSelected',
    floor: 'emitSelected'
  },

  methods: {
    reset(prop) {
      this[prop] = null;
    },

    emitSelected() {
      this.$emit('selected', {
        plan: this.plan,
        building: this.building,
        floor: this.floor
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.component > * {
    margin-bottom: 5px;
}
</style>

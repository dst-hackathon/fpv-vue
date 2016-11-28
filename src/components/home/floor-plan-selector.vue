<template lang="html">
<div class="component">
  <dropdown
    v-model.number="planId"
    :options="plans"
    label="Plan"
    className="plan"
    valueProp="id"
    textProp="name"
    width="120px"
    @input="emitSelected() && reset('buildingId')" />

  <dropdown
    v-model.number="buildingId"
    :options="buildings"
    label="Building"
    className="building"
    valueProp="id"
    textProp="name"
    width="150px"
    @input="emitSelected() && reset('floorId')" />

  <dropdown
    v-model.number="floorId"
    :options="floors"
    label="Floor"
    className="floor"
    valueProp="id"
    textProp="name"
    width="80px"
    @input="emitSelected()" />

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
  },

  methods: {
    reset(prop) {
      this[prop] = null;
    },

    emitSelected() {
      this.$emit('selected', {
        plan: _.find(this.plans, { id: this.planId }),
        building: _.find(this.buildings, { id: this.buildingId }),
        floor: _.find(this.floors, { id: this.floorId })
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.component > * {
    margin-right: 5px;
}

.plan {
    width: 100px;
}

.building {
    width: 150px;
}

.floor {
    width: 60px;
}
</style>

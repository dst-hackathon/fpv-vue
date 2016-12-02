<template>
<div>
  <side-menu />

  <layout>
    <div slot="left">
      <h1 class="title is-2">Left</h1>
    </div>

    <div slot="right">
      <h1 class="title is-2">Right</h1>
    </div>

    <div>
      <view-plan />
    </div>
  </layout>

</div>
</template>
<script>
import SideMenu from './side-menu';
import SidePanel from './side-panel';
import Layout from './layout';
import ViewPlan from './view-master-plan';

export default {
  components: {
    SideMenu,
    Layout,
    ViewPlan
  },
};
</script>

<style scoped>
</style>

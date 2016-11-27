<template lang="html">
<div>
  <!-- Left side -->
  <menu-list :title="'Menu'" :menuList="menuList" :selection="menuSelected" @selected="onMenuSelected" />

  <!-- Page Content -->
  <div class="page-content">
    <component :is="componentSelected" />
  </div>

</div>
</template>

<script>
import _ from 'lodash';
import MenuList from './menu-list';

export default {
  name: 'app',
  components: {
    MenuList,
  },

  data() {
    return {
      menuSelected: 'view',
      menuList: [{
        name: 'View Master Plan',
        value: 'view',
        component: require('./view-master-plan')
      }, {
        name: 'Create/Edit Future Plan',
        value: 'create',
        component: require('./create')
      }, {
        name: 'Approve Future Plan',
        value: 'approve',
        component: require('./approve')
      }, {
        name: 'Manage Floor Plan',
        value: 'manage',
        component: require('./manage')
      }, {
        name: 'Log out',
        value: 'logout'
      }, ],
    };
  },

  computed: {
    componentSelected() {
      const menu = _.find(this.menuList, { value: this.menuSelected });

      return menu.component;
    }
  },

  methods: {
    onMenuSelected(menu) {
      this.menuSelected = menu.value;
    }
  }
};
</script>

<style lang="scss" scoped>
  .page-content {
    margin-left: 200px;
  }
</style>

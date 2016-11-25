<template lang="html">
    <div id="home">
        <h1>{{leftNavTitle}}</h1>
        <div v-for="menu in menuList">
            <a v-on:click='redirect(menu.value)'>{{menu.name}}</a>
        </div>

        <!-- Page Content -->
        <div v-if="menuSelected === 'create'">
            <create></create>
        </div>
        <div v-else-if="menuSelected === 'approve'">
            <approve></approve>
        </div>
        <div v-else-if="menuSelected === 'manage'">
            <manage></manage>
        </div>
        <div v-else>
            <ViewPage></ViewPage>
        </div>
    </div>
</template>

<script>
import ViewPage from './view';
import Create from './create';
import Approve from './approve';
import Manage from './manage';

export default {
  name: 'app',
  components: {
    ViewPage,
    Create,
    Approve,
    Manage,
  },
  methods: {
    redirect(select) {
      if (select !== 'logout') {
        this.menuSelected = select;
      }
    },
  },
  data() {
    return {
      menuSelected: '',
      leftNavTitle: 'Menu',
      menuList: [
        { name: 'ViewPage Master Plan', value: 'view' },
        { name: 'Create/Edit Future Plan', value: 'create' },
        { name: 'Approve Future Plan', value: 'approve' },
        { name: 'Manage Floor Plan', value: 'manage' },
        { name: 'Log out', value: 'logout' },
      ],
    };
  },
};
</script>

<style lang="css">
</style>

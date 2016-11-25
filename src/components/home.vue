<template lang="html">
  <div class="column is-offset-1 is-10" id="home">
    <div class="tile">
      <!-- Left side -->
      <div class="tile is-vertical is-parent is-2">
        <div class="tile is-child notification is-white">
          <h1 class="title">{{leftNavTitle}}</h1>
          <div v-for="menu in menuList" class="margin-bottom-5">
            <h5 class="subtitle is-5"><a v-on:click='redirect(menu.value)'>{{menu.name}}</a></h5>
          </div>
        </div>
      </div>
      <!-- Page Content -->
      <div class="tile is-parent">
        <div v-if="menuSelected === 'create'" class="tile is-child notification is-white">
          <create></create>
        </div>
        <div v-else-if="menuSelected === 'approve'" class="tile is-child notification is-white">
          <approve></approve>
        </div>
        <div v-else-if="menuSelected === 'manage'" class="tile is-child notification is-white">
          <manage></manage>
        </div>
        <div v-else class="tile is-child notification is-white">
          <ViewPage></ViewPage>
        </div>
      </div>
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
.margin-bottom-5 {
  margin-bottom: 5px;
}
</style>

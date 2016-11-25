<template lang="html">
    <div id="home">
        <h1>{{leftNavTitle}}</h1>
        <div v-for="menu in menuList">
            <a href="#">{{menu}}</a>
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
  data() {
    return {
      menuSelected: '',
      leftNavTitle: 'Menu',
      menuList: [
        'ViewPage Master Plan',
        'Create/Edit Future Plan',
        'Approve Future Plan',
        'Manage Floor Plan',
        'Log out',
      ],
    };
  },
};
</script>

<style lang="css">
</style>

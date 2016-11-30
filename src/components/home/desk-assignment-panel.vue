<template lang="html">
  <div v-if="desk">
    <h3 class="desk-code title is-4">Desk #<strong>{{ desk.code }}</strong></h3>

    <figure class="image-wrapper">
      <img class="owner-image" :src="ownerImage">

      <div v-if="owner">
        <h4 class="owner-title title is-4">{{ owner.firstname }} {{ owner.lastname }}</h4>
        <h5 class="owner-subtitle subtitle is-5">
          <span class="icon is-small"><i class="fa fa-phone"></span></i> {{ owner.work }}
        </h5>
      </div>
      <footer class="card-footer owner-action" v-if="editable">
        <a class="card-footer-item">{{ owner ? 'Change' : 'Assign Owner' }}</a>
        <a class="card-footer-item remove" v-show="owner" @click="removeOwner">Remove</a>
      </footer>
    </figure>
  </div>
</template>

<script>
  export default {
    props: ['desk', 'editable'],

    computed: {
      owner() {
        return this.desk.employee;
      },

      ownerImage() {
        if (!this.owner) {
          return 'http://placehold.it/256x341';
        }

        const { image, imageContentType } = this.owner;

        return `data:${imageContentType};base64,${image}`;
      }
    },

    methods: {
      removeOwner() {
        this.$emit('removeOwner', {
          desk: this.desk
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';

  .image-wrapper {
    text-align: center;
    border: 1px solid #CCC;
  }

  .owner-image {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border: 10px solid #fff;
  }

  .owner-subtitle {
    padding-bottom: 10px;
  }

  .owner-subtitle .icon {
    margin-top: 3px;
  }

  .owner-action .remove:not(:hover) {
    color: $red;
  }
</style>

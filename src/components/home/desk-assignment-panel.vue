<template lang="html">
  <div v-if="desk">
    <h3 class="desk-code title is-4">Desk #<strong>{{ desk.code }}</strong></h3>

    <figure class="image-wrapper">
      <img class="owner-image" :src="ownerImage">

      <div v-if="isEditingOwner">
        <p class="owner-query title is-4" placeholder="Enter name ..." contenteditable="true"></p>
        <footer class="card-footer owner-action">
          <span class="card-footer-item" v-show="selectedOwner">
            <a>Save</a>
          </span>
          <span class="card-footer-item">
            <a class="remove">Cancel</a>
          </span>
        </footer>
      </div>
      <div v-else>
        <div v-if="owner">
          <h4 class="owner-title title is-4">{{ owner.firstname }} {{ owner.lastname }}</h4>
          <h5 class="owner-subtitle subtitle is-5">
            <span class="icon is-small"><i class="fa fa-phone"></span></i> {{ owner.work }}
          </h5>
        </div>
        <footer class="card-footer owner-action" v-if="editable">
          <span class="card-footer-item" @click="editOwner">
            <a>{{ owner ? 'Change' : 'Assign Owner' }}</a>
          </span>
          <span class="card-footer-item" v-show="owner" @click="removeOwner">
            <a class="remove">Remove</a>
          </span>
        </footer>
      </div>

    </figure>
  </div>
</template>

<script>
  export default {
    props: ['desk', 'editable'],

    data() {
      return {
        isEditingOwner: false,
        selectedOwner: null,
      };
    },

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

    watch: {
      desk() {
        this.isEditingOwner = false;
      }
    },

    methods: {
      removeOwner() {
        this.$emit('removeOwner', {
          desk: this.desk
        });
      },

      editOwner() {
        this.isEditingOwner = true;

        this.$nextTick().then(() => {
          this.$el.querySelector('.owner-query').focus();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';
  .image-wrapper {
    text-align: center;
    border: 1px solid $grey-lighter;
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

  .owner-action .card-footer-item {
    cursor: pointer;

    &:hover > a {
      color: $grey;
    }
  }

  .owner-query:empty:before {
    content: attr(placeholder);
    font-style: italic;
    color: $grey-lighter;
  }

  .owner-query {
    text-decoration: none;
    margin-left: 10px;
    margin-right: 10px;
    outline: none;
  }
</style>

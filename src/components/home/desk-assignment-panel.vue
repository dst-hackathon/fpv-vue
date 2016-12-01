<template lang="html">
  <div v-if="desk">
    <h3 class="desk-code title is-4">Desk #<strong>{{ desk.code }}</strong></h3>

    <figure class="image-wrapper">
      <img class="owner-image" :src="ownerImage">

      <div v-if="isEditing">
        <p class="owner-query title is-4" placeholder="Enter name ..." contenteditable="true"
          @input="({ target }) => query = target.innerHTML"
          @focus="setQuerySelection">
        </p>
        <footer class="card-footer owner-action">
          <span class="card-footer-item" v-if="selectingOwner" @click="save">
            <a>Save</a>
          </span>
          <span class="card-footer-item" @click="reset">
            <a class="is-danger">Cancel</a>
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
          <span class="card-footer-item" v-if="owner" @click="removeOwner">
            <a class="is-danger">Remove</a>
          </span>
        </footer>
      </div>
    </figure>

    <div class="search-result" v-show="resultingOwners.length > 0">
      <div class="menu">
        <p class="menu-label">Search Result</p>
      </div>
      <ul class="menu-list">
        <li v-for="result in resultingOwners" @click="selectOwner(result)">
          <a>
            {{ result.firstname }} {{ result.lastname }}
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import api from 'api';

  export default {
    props: ['desk', 'editable'],

    data() {
      return {
        isEditing: false,
        editingOwner: null,
        selectingOwner: null,
        resultingOwners: [],
        query: ''
      };
    },

    computed: {
      owner() {
        if (this.isEditing) {
          return this.selectingOwner;
        } else {
          return this.desk && this.desk.employee;
        }
      },

      ownerImage() {
        if (!this.owner) {
          return 'http://placehold.it/256x341';
        }

        return `/api/employees/${this.owner.id}/image`;
      },

      selectingOwnerId() {
        return this.selectingOwner && this.selectingOwner.id;
      }
    },

    watch: {
      desk() {
        this.reset();
      },

      query: async function(query) {
        if (query.length >= 2) {
          this.resultingOwners = await api.employees.search({ query }) || [];
        } else {
          this.resultingOwners = [];
        }
      }
    },

    methods: {
      updateOwner() {
        this.$emit('updateOwner', {
          desk: this.desk,
          owner: this.owner
        });
      },

      removeOwner() {
        this.$emit('removeOwner', {
          desk: this.desk
        });
      },

      editOwner() {
        this.isEditing = true;
        this.editingOwner = this.owner;

        this.$nextTick().then(this.focusQuery);
      },

      reset() {
        this.isEditing = false;
        this.editingOwner = null;
        this.selectingOwner = null;
        this.resultingOwners = [];
        this.query = '';
      },

      selectOwner(owner) {
        this.selectingOwner = owner;
        this.resultingOwners = [];

        const queryEl = this.getQueryEl();
        queryEl.innerHTML = `${owner.firstname} ${owner.lastname}`;

      },

      getQueryEl() {
        return this.$el.querySelector('.owner-query');
      },

      focusQuery() {
        const queryEl = this.getQueryEl();

        queryEl.focus();
      },

      setQuerySelection({ target }) {
        setTimeout(() => {
          const range = document.createRange();
          range.selectNodeContents(target);

          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }, 0);
      },

      save() {
        this.updateOwner();

        // this.reset();
      }
    },
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

  .owner-action .is-danger:not(:hover) {
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

  .search-result {
    margin-top: 10px;

    .menu-list {
      max-height: 200px;
      overflow-y: auto;
    }
  }
</style>

<template>
  <div class="container">
    <div class="row">
      <!--Active Board: {{board}}-->
      <div class="col-xs-offset-3 col-xs-6">
        <router-link class="linked-text" :to="'/'">
          <p>Back to All Boards</p>
        </router-link>
        <h1>{{board.name}}</h1>
        <p>{{board.description}}</p>
        <div class="add-list-form">
          <form type="submit" @submit.prevent="createList(board._id)">
            <div class="form-group">
              <input name="name" type="text" class="form-control" placeholder="List Name" v-model="newList.name">
            </div>
            <div class="form-group">
              <input name="description" type="text" class="form-control" placeholder="Description" v-model="newList.description">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-secondary navbar-btn">+</button>
            </div>
          </form>
          <h4>Click and drag to move tasks between lists.</h4>
        </div>
      </div>
    </div>
    <div class="row lists-row">

      <div class="col-xs-4 list" v-for="list in lists">
        <span class="glyphicon glyphicon-remove-circle pull-right" @click="removeList(list)"></span>
        <list :name="list.name" :description="list.description" :listId="list._id" :boardId="board._id"></list>
      </div>

    </div>
  </div>
</template>

<script>
  import list from './List'
  export default {
    name: 'board',
    data() {
      return {
        newList: {}
      }
    },
    mounted() {
      this.$store.dispatch('getBoard', this.$route.params.id)
    },
    methods: {
      createList(id) {
        this.$store.dispatch('createList', { id, list: this.newList })
        this.newList = {};
      },
      getLists(id) {
        this.$store.dispatch('getLists', id)
      },
      removeList(list) {
        this.$store.dispatch('removeList', list)
      }
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      }
    },
    components: {
      list
    }
  }
</script>

<style scoped>
  .list {
    border: 2px solid #283331;
    height: 600px;
    overflow-y: scroll;
    padding: 15px;
    background: #6F8C71;
    border-radius: 6px;
  }

  .lists-row {
    margin-bottom: 30px;
  }

  .navbar-btn{
    color: #27592A;
  }

  h4{
    font-family: Roboto;
  }
</style>
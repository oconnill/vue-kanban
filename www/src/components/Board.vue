<template>
  <div>
    <!--Active Board: {{board}}-->
    <h1>{{board.name}}</h1>
    <p>{{board.description}}</p>

    <div class="add-list-form">
      <form type="submit" @submit.prevent="createList(board._id)">
        <div class="form-group">
          <input name="name" type="text" class="form-control" placeholder="Name" v-model="newList.name">
        </div>
        <div class="form-group">
          <input name="description" type="text" class="form-control" placeholder="Description" v-model="newList.description">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-default navbar-btn">Create List</button>
        </div>
      </form>

      <button @click="getListsAtBoard(board._id)">Get Lists</button>

    </div>
  </div>
</template>

<script>
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
        this.$store.dispatch('createList', {id, list: this.newList})
      },
      getListsAtBoard(id) {
        this.$store.dispatch('getListsAtBoard', id)
      },
      /*
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      logout() {
        this.$store.dispatch('logout')
      },
      */
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      }
    }
  }
</script>

<style scoped>
</style>
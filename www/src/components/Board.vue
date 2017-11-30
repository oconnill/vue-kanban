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

      <button @click="getLists(board._id)">Get Lists</button>

      <ul>
        <li v-for="list in lists">
          <h4>Name: {{list.name}}</h4>
          <p>Description: {{list.description}}</p>
          <span @click="removeList(list)">x</span>
        </li>
      </ul>

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
      getLists(id) {
        this.$store.dispatch('getLists', id)
      },
      removeList(list) {
        this.$store.dispatch('removeList', list)
      },
      logout() {
        this.$store.dispatch('logout')
      },
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      }
    }
  }
</script>

<style scoped>
</style>
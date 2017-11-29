<template>
  <div>
    <button @click="logout">Logout</button>

    <div class="add-board-form">
        <form type="submit" @submit.prevent="createBoard">
            <div class="form-group">
                <input name="name" type="text" class="form-control" placeholder="Name" v-model="newBoard.name">
            </div>
            <div class="form-group">
                <input name="description" type="text" class="form-control" placeholder="Description" v-model="newBoard.description">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-default navbar-btn">Create Board</button>
            </div>
        </form>
    </div>



    <!--<button @click="createBoard">Add Board</button>-->



    <ul>
      <li v-for="board in boards">
        <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
        <span @click="removeBoard(board)">x</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    data() {
      return {
        newBoard: {}
      }
    },
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', this.newBoard)
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      logout() {
        this.$store.dispatch('logout')
      },
    }
  }
</script>

<style scoped>
</style>
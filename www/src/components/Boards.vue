<template>
  <div class="container">

    <button @click="logout">Logout</button>
    <div class="row">
      <div class="col-xs-offset-3 col-xs-6">
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
      </div>
    </div>
      <div class="row">
       
          <div class="col-xs-12" v-for="board in boards">
            <router-link :to="'/boards/'+board._id">
              <h4><span @click="getBoard(board._id)">{{board.name}}</span></h4>
            </router-link>
            <span class="glyphicon glyphicon-remove-circle" @click="removeBoard(board)"></span>
          </div>
        
      </div>
    
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
      getBoard(id) {
        console.log('get board in compnent')
        this.$store.dispatch('getBoard', id)
      },
      logout() {
        this.$store.dispatch('logout')
      },
    }
  }
</script>

<style scoped>
</style>
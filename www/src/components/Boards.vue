<template>
  <div class="container">
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
      <div class="col-xs-6">
        <h2>My Boards</h2>
        <div class="row board-wrapper">
          <div class="col-xs-12 board-link" v-for="board in boards">
            <router-link :to="'/boards/'+board._id" class="linked-text">
              <h4>
                <span v-on:mouseover="getBoard(board._id)" @click="getBoard(board._id)">{{board.name}}</span>
              </h4>
            </router-link>
            <span class="glyphicon glyphicon-remove" @click="removeBoard(board)"></span>
          </div>
        </div>

      </div>
      <div class="col-xs-6">
        <h2>Preview Board</h2>
        <div class="board-wrapper" v-if="activeBoard.hasOwnProperty('name')">
          <h3>{{activeBoard.name}}</h3>
          <h5>Lists: {{lists.length}}</h5>
          <h5>Created: {{new Date(Number(activeBoard.created)).getMonth() + 1}}/{{new Date(Number(activeBoard.created)).getDate()}}/{{new
            Date(Number(activeBoard.created)).getFullYear()}}
          </h5>
        </div>
        <div v-else>
          <p>Mouse over a board to preview.</p>
        </div>
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
      },
      activeBoard() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      },
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', this.newBoard)
        this.newBoard = {};
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      getBoard(id) {
        console.log('get board in compnent')
        this.$store.dispatch('getBoard', id)
      }
    }
  }
</script>

<style scoped>
  h4 {
    font-size: 1.8em;
    color: #D66D40
  }
  .board-wrapper {
font-family: 'Roboto', sans-serif;
color: #CCD1B3;
  }
  .board-link {
    margin: 20px 0;
  }
</style>
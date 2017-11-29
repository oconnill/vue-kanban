<template>
  <div>
    <!-- SIGNUP FORM -->
    <div class="signup-form">
      <form type="submit" @submit.prevent="addNewUser">
        <div class="form-group">
          <input name="email" type="text" class="form-control" placeholder="Email" v-model="newUser.email">
        </div>
        <div class="form-group">
          <input name="name" type="text" class="form-control" placeholder="Name" v-model="newUser.name">
        </div>
        <div class="form-group">
          <input name="password" type="password" class="form-control" placeholder="Password" v-model="newUser.password">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-default navbar-btn">Sign Up</button>
        </div>
      </form>
    </div>

    <!-- LOGIN FORM -->
    <div class="login-form">
        <form type="submit" @submit.prevent="login">
          <div class="form-group">
            <input name="email" type="text" class="form-control" placeholder="Email" v-model="activeUser.email">
          </div>
          <div class="form-group">
            <input name="password" type="password" class="form-control" placeholder="Password" v-model="activeUser.password">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-default navbar-btn">Login</button>
          </div>
        </form>
      </div>


    <button @click="logout">Logout</button>
    <button @click="createBoard">Add Board</button>

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
        newUser: {},
        activeUser: {},
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
        this.$store.dispatch('createBoard', {
          name: 'Testing board creation',
          description: 'blarg'
        })
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      addNewUser() {
        this.$store.dispatch('addNewUser', this.newUser)
        //this.newUser = {}
      },
      login() {
        this.$store.dispatch('login', this.activeUser)
        //this.newUser = {}
      },
      logout() {
        this.$store.dispatch('logout')
        //this.newUser = {}
      },
    }
  }
</script>

<style scoped>
</style>
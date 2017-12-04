<template>
  <div id="app">
    <div class="text-right logout-bar" v-if="activeUser.hasOwnProperty('name')">
      <button @click="logout" class="btn btn-default">Logout</button>
    </div>
    <h1>KANBAN</h1>
    <error></error>
    <router-view></router-view>
  </div>
</template>

<script>
  import Error from './components/Error'
  export default {
    name: 'app',
    components: {
      Error
    },
    mounted() {
      this.$store.dispatch('authenticate')
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      }
    }
  }
</script>

<style>
  body {
    background: #334034;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    margin-top: 60px;
    background: #334034;
  }

  h1,
  h2,
  h3 {
    font-family: 'Raleway', sans-serif;
  }

  .logout-bar {
    padding-right: 20px;
  }
  .linked-text {
    text-decoration: none;
    color: #ACD9AF;
  }

  .linked-text:hover {
    text-decoration: none;
    color: #6F8C71;
  }
</style>
<template>
  <div id="app">
    <div class="text-right logout-bar" v-if="activeUser.hasOwnProperty('name')">
      <h4>Hello, {{activeUser.name}}</h4>
      <button @click="logout" class="btn btn-default">Logout</button>
    </div>
    <h1 class="main-title">KANBAN
      <span class="period">.</span>
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
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
    background: #283331;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    margin-top: 60px;
    /*background: #334034;*/
  }

  .flex {
    display: flex;
  }

  .flex.wrap {
    flex-wrap: wrap;
  }

  .flex.v-center {
    align-items: center;
  }

  .flex.v-bottom {
    align-items: flex-end;
  }

  .flex.v-top {
    align-items: flex-start;
  }

  .flex.h-center {
    justify-content: center;
  }

  .flex.h-left {
    justify-content: left;
  }

  .flex.h-right {
    justify-content: right;
  }

  .flex.h-space-between {
    justify-content: space-between;
  }

  .flex.text-wrap {
    flex-wrap: wrap;
    word-break: break-all;
  }

  h1,
  h2,
  h3 {
    font-family: 'Oswald', sans-serif;
  }

  .period {
    color: #D66D40;
    font-size: 3em;
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

  .main-title {
    font-size: 4em;
    font-weight: bold;
    letter-spacing: 0.2em;
    color: #F4F4E6;
  }
</style>
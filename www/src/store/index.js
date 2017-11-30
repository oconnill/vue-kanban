import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from 'router'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: [],
    /*
    tasks: {

    },
    */
    comments: {

    },
    error: {},
    activeUser: {}
  },
  mutations: {
    setBoards(state, data) {
      state.boards = data
    },
    handleError(state, err) {
      state.error = err
    },
    setActiveUser(state, user) {
      state.activeUser = user
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
      console.log('activeBoard: ', state.activeBoard)
    },
    setLists(state, data) {
      state.lists = data
    },
    setTasks(state, data) {
      state.tasks = data
    },
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts
    addNewUser({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          console.log('Response to addNewUser: ', res)
          commit('setActiveUser', res.data.data)
          router.push({ name: "Boards" })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          console.log('Response to login: ', res)
          commit('setActiveUser', res.data.data)
          router.push({ name: "Boards" })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          console.log('Response to logout: ', res)
          router.push({ name: "Login" })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    authenticate({ commit, dispatch }) {
      auth('authenticate')
        .then(res => {
          console.log('Response to authenticate: ', res)
          commit('setActiveUser', res.data.data)
          router.push({ name: "Boards" })
        })
        .catch(err => {
          router.push({ name: "Login" })
          commit('handleError', err)
        })
    },
    getBoards({ commit, dispatch }) {
      api('userboards') // api('boards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getBoard({ commit, dispatch }, id) {
      console.log('get board in store')
      api('boards/' + id)
        .then(res => {
          console.log('res to get board: ', res)
          dispatch('getLists', id)
          commit('setActiveBoard', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createBoard({ commit, dispatch }, board) {
      debugger
      api.post('boards/', board)
        .then(res => {
          console.log('res to create board: ', res)
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getLists({ commit, dispatch }, id) {
      api(`boards/${id}/lists`)
        .then(res => {
          console.log('response to getLists: ', res)
          commit('setLists', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createList({ commit, dispatch }, payload) {
      debugger
      payload.list.boardId = payload.id
      console.log('list: ', payload.list)
      api.post('lists/', payload.list)
        .then(res => {
          dispatch('getLists', payload.list.boardId)
          console.log('response to createList: ', res)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeList({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getTasks({ commit, dispatch }, payload) {
      api(`boards/${payload.boardId}/lists/${payload.listId}/tasks`)
        .then(res => {
          console.log('response to getTasks: ', res)
          commit('setTasks', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createTask({ commit, dispatch }, payload) {
      debugger
      payload.task.listId = payload.listId
      console.log('task: ', payload.task)
      api.post('tasks/', payload.task)
        .then(res => {
          dispatch('getTasks', { listId: payload.listId, boardId: payload.boardId })
          console.log('response to createTask: ', res)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeTask({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload.task._id)
        .then(res => {
          dispatch('getTasks', { listId: payload.task.listId, boardId: payload.boardId })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store

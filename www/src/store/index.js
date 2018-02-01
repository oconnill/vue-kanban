import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from 'router'

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:3000/' : '/'

let api = axios.create({
  baseURL: base + 'api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: base,
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {
      /*
      listId: [task-1, task-2...]
      */
    },
    comments: {
      /*
      taskId: [comment-1, comment-2...]
      */
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
    setTasks(state, payload) {
      vue.set(state.tasks, payload.listId, payload.data)

    },
  setComments(state, payload) {
    console.log('payload in setComments: ', payload)
    vue.set(state.comments, payload.taskId, payload.data)
  }
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
          if(!res.data.error) {
            commit('setActiveUser', res.data.data)
            router.push({ name: "Boards" })
          } else {
            commit('handleError', res.data)
          }
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          console.log('Response to logout: ', res)
          commit('setActiveUser', {})
          commit('setActiveBoard', {})
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
          //commit('handleError', err)
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
      //debugger
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
    /*
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    */
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
          commit('setTasks', { data: res.data.data, listId: payload.listId })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createTask({ commit, dispatch }, payload) {
      payload.task.listId = payload.listId
      //parent ID needed to make Task schema compatible with cascading delete:
      payload.task.boardId = payload.boardId
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
    moveTask({ commit, dispatch }, payload) {
      console.log('old list id: ', payload.task.listId)
      payload.task.listId = payload.newListId
      console.log('new list id: ', payload.task.listId)
      console.log('task to move: ', payload.task)
      api.put(`tasks/${payload.task._id}`, payload.task)
        .then(res => {
          dispatch('getTasks', { listId: payload.listId, boardId: payload.boardId })
          dispatch('getTasks', { listId: payload.newListId, boardId: payload.boardId })
          console.log('response to moveTask: ', res)
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

    getComments({ commit, dispatch }, payload) {
      //debugger
      api(`boards/${payload.boardId}/lists/${payload.listId}/tasks/${payload.taskId}/comments`)
        .then(res => {
          console.log('response to getComments: ', res)
          commit('setComments', { data: res.data.data, taskId: payload.taskId })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createComment({ commit, dispatch }, payload) {
      //debugger
      payload.comment.taskId = payload.taskId
      //parent IDs needed to make Comment schema compatible with cascading delete:
      payload.comment.listId = payload.listId
      payload.comment.boardId = payload.boardId
      console.log('comment: ', payload.comment)
      api.post('comments/', payload.comment)
        .then(res => {
          dispatch('getComments', { listId: payload.listId, boardId: payload.boardId, taskId: payload.taskId })
          console.log('response to createComment: ', res)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeComment({ commit, dispatch }, payload) {
      api.delete('comments/' + payload.comment._id)
        .then(res => {
          console.log(res)
          dispatch('getComments', { listId: payload.listId, boardId: payload.boardId, taskId: payload.comment.taskId })
          console.log('response to removeComment: ', res)
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

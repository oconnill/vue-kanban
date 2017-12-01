<template>
    <div>
        <h1>{{name}}</h1>
        <p>{{description}}</p>
        <div class="add-task-form">
            <form type="submit" @submit.prevent="createTask(listId, boardId)">
                <div class="form-group">
                    <input name="name" type="text" class="form-control" placeholder="Name" v-model="newTask.name">
                </div>
                <div class="form-group">
                    <input name="description" type="text" class="form-control" placeholder="Description" v-model="newTask.description">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default navbar-btn">Create Task</button>
                </div>
            </form>
        </div>

        <div v-for="task in tasks" class="task">
            <task :name="task.name" :description="task.description" :taskId="task._id" :boardId="boardId" :listId="listId"></task>
            <span @click="removeTask(task, boardId)">x</span>

            <div class="move-task-form">

                <form @submit.prevent="moveTask(task, listId, boardId)">
                    <select @change="moveTask(task, listId, boardId)" v-model="destinationList">
                        <option :value="list" v-for="list in lists">{{list.name}}</option>
                    </select>
                </form>

            </div>

        </div>


        <!-- <ul>
            <li v-for="task in tasks">
                <h4>Name: {{task.name}}</h4>
                <p>Description: {{task.description}}</p>
                <span @click="removeTask(task, boardId)">x</span>
            </li>
        </ul> -->

    </div>
</template>

<script>
    import task from './Task'
    export default {
        name: 'list',
        props: ["name", "description", "listId", "boardId"],
        data() {
            return {
                newTask: {},
                destinationList: {}
            }
        },
        mounted() {
            this.$store.dispatch('getTasks', { listId: this.listId, boardId: this.boardId })
            console.log('tasks ref: ', this.$store.state.tasks[this.listId])
            console.log('list-Id: ', this.listId)
        },
        methods: {
            createTask(listId, boardId) {
                this.$store.dispatch('createTask', { listId, boardId, task: this.newTask })
            },
            removeTask(task, boardId) {
                this.$store.dispatch('removeTask', { task, boardId })
            },
            moveTask(task, listId, boardId) {
                var newListId = this.destinationList._id
                this.$store.dispatch('moveTask', { task, listId, boardId, newListId })
            },
            logout() {
                this.$store.dispatch('logout')
            },
        },
        computed: {
            tasks() {
                return this.$store.state.tasks[this.listId]
            },
            lists() {
                return this.$store.state.lists
            }
        },
        components: {
            task
        }
    }
</script>

<style scoped>
</style>
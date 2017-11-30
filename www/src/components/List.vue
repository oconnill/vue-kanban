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
            }
        },
        mounted() {
            this.$store.dispatch('getTasks', { listId: this.listId, boardId: this.boardId })
            console.log('listId: ', this.listId)
            console.log('boardId: ', this.boardId)
        },
        methods: {
            createTask(listId, boardId) {
                this.$store.dispatch('createTask', { listId, boardId, task: this.newTask })
            },
            removeTask(task, boardId) {
                this.$store.dispatch('removeTask', { task, boardId })
            },
            logout() {
                this.$store.dispatch('logout')
            },
        },
        computed: {
            tasks() {
                return this.$store.state.tasks
            }
        },
        components: {
      task
    }
    }
</script>

<style scoped>
</style>
<template>
    <div droppable="true" v-on:drop.capture="dragTask" ondragover="event.preventDefault()">
        <div class="flex text-wrap">
            <h1>{{name}}</h1>
        </div>
        <div class="flex text-wrap">
            <p>{{description}}</p>
        </div>
        <div class="add-task-form">
            <form type="submit" @submit.prevent="createTask(listId, boardId)">
                <div class="form-group">
                    <input name="name" type="text" class="form-control" placeholder="Task Name" v-model="newTask.name">
                </div>
                <div class="form-group">
                    <input name="description" type="text" class="form-control" placeholder="Description" v-model="newTask.description">
                </div>
                <div class="form-group text-left">
                    <button type="submit" class="btn btn-secondary navbar-btn">+</button>
                </div>
            </form>
        </div>
        <div class="task-container" droppable="true" v-on:drop.capture="dragTask" ondragover="event.preventDefault()">
            <div v-for="task in tasks" class="task">
                <span class="glyphicon glyphicon-remove-circle pull-right" @click="removeTask(task, boardId)"></span>
                <task :name="task.name" :description="task.description" :task="task" :taskId="task._id" :boardId="boardId" :listId="listId"></task>
                <!-- TODO: remove redundant props from task component -->

                <div class="move-task-form">

                    <form @submit.prevent="moveTask(task, listId, boardId)">
                        <select @change="moveTask(task, listId, boardId)" v-model="destinationList" required>
                            <option value="" selected disabled>Move To:</option>
                            <option :value="list" v-for="list in lists">{{list.name}}</option>
                        </select>
                    </form>

                </div>

            </div>
        </div>

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
                this.newTask = {};
            },
            removeTask(task, boardId) {
                this.$store.dispatch('removeTask', { task, boardId })
            },
            moveTask(task, listId, boardId) {
                var newListId = this.destinationList._id
                this.$store.dispatch('moveTask', { task, listId, boardId, newListId })
            },
            dragTask(event) {
                var taskToDrop = JSON.parse(event.dataTransfer.getData('text/javascript'))
                console.log('task to drop: ', taskToDrop)
                var listId = taskToDrop.listId
                console.log('old list id: ', listId)
                var newListId = this.listId
                console.log('new list id: ', newListId)
                var boardId = this.boardId
                console.log('board id: ', boardId)
                console.log('drop event: ', event)
                this.$store.dispatch('moveTask', { task: taskToDrop, listId, boardId, newListId })
            }
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
    .task {
        padding: 15px;
        background: #F4F4E6;
        border-radius: 6px;
        border: 1px solid #6F8C71;
    }
    .task select {
        color: #404040;
        margin-top: 10px;
    }
    .task-container {
        min-height: 200px;
    }
</style>
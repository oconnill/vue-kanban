<template>
    <div>
        <div class="flex text-wrap">
            <h1>{{name}}</h1>
        </div>
        <div class="flex text-wrap">
            <p>{{description}}</p>
        </div>
        <div class="add-task-form">
            <form type="submit" @submit.prevent="createTask(listId, boardId)">
                <div class="form-group">
                    <input name="name" type="text" class="form-control" placeholder="Name" v-model="newTask.name">
                </div>
                <div class="form-group">
                    <input name="description" type="text" class="form-control" placeholder="Description" v-model="newTask.description">
                </div>
                <div class="form-group text-left">
                    <button type="submit" class="btn btn-success navbar-btn">+ Task</button>
                </div>
            </form>
        </div>

        <div v-for="task in tasks" class="task">
            <span class="glyphicon glyphicon-remove-circle pull-right" @click="removeTask(task, boardId)"></span>
            <task :name="task.name" :description="task.description" :taskId="task._id" :boardId="boardId" :listId="listId"></task>


            <div class="move-task-form">

                <form @submit.prevent="moveTask(task, listId, boardId)">
                    <select @change="moveTask(task, listId, boardId)" v-model="destinationList" required>
                        <option value="" selected>Move To:</option>
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
                this.newTask = {};
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
        border: 2px solid #27592A;
        padding: 15px;
        background: #288C2E;
        border-radius: 6px;
    }

    .task select {
        color: #404040;
        margin-top: 10px;
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
</style>
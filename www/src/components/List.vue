<template>
    <div>
        <h1>{{name}}</h1>
        <p>{{description}}</p>
        <div class="add-task-form">
            <form type="submit" @submit.prevent="createTask(listId)">
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
    </div>
</template>

<script>
    export default {
        name: 'list',
        props: ["name", "description", "listId"],
        data() {
            return {
                newTask: {}
            }
        },
        mounted() {
            this.$store.dispatch('getTasks', listId)
        },
        methods: {
            getTasks(id) {
                this.$store.dispatch('getTasks', id)
            },
            createTask(id) {
                this.$store.dispatch('createTask', { id, list: this.newTask })
            },
            removeTask(task) {
                this.$store.dispatch('removeTask', task)
            },
            logout() {
                this.$store.dispatch('logout')
            },
        },
        computed: {
            tasks() {
                return this.$store.state.tasks
            }
        }
    }
</script>

<style scoped>
</style>
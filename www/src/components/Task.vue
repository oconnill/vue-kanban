<template>
    <div>
        <h1>{{name}}</h1>
        <p>{{description}}</p>
        <div class="add-comment-form">
            <form type="submit" @submit.prevent="createComment(taskId, listId, boardId)">
                <div class="form-group">
                    <input name="name" type="text" class="form-control" placeholder="Comment" v-model="newComment.text">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default navbar-btn">Create Comment</button>
                </div>
            </form>
        </div>


        <ul>
            <li v-for="comment in comments">
                <p>{{comment.text}}</p>
                <span @click="removeComment(comment, boardId, listId)">x</span>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: 'comment',
        props: ["name", "description", "taskId", "boardId", "listId"],
        data() {
            return {
                newComment: {},
            }
        },
        mounted() {
            this.$store.dispatch('getComments', { taskId: this.taskId, boardId: this.boardId, listId: this.listId })
            console.log('listId: ', this.listId)
            // console.log('boardId: ', this.boardId)
        },
        methods: {
            createComment(taskId, listId, boardId) {
                this.$store.dispatch('createComment', { taskId, listId, boardId, comment: this.newComment })
            },
            removeComment(comment, boardId, listId) {
                this.$store.dispatch('removeComment', { comment, boardId, listId })
            },
            logout() {
                this.$store.dispatch('logout')
            },
        },
        computed: {
            comments() {
                return this.$store.state.comments
            }
        }
    }
</script>

<style scoped>
</style>
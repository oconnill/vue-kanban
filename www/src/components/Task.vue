<template>
    <div draggable="true" v-on:dragstart.capture="dragMode">
        <div class="flex text-wrap">
            <h1 class="text-left">{{name}}</h1>
        </div>
        <div class="flex text-wrap">
            <p class="text-left">{{description}}</p>
        </div>
        <div class="add-comment-form">
            <form type="submit" @submit.prevent="createComment(taskId, listId, boardId)">
                <div class="form-group">
                    <input name="name" type="text" class="form-control" placeholder="Comment" v-model="newComment.text">
                </div>
                <div class="form-group text-left">
                    <button type="submit" class="btn navbar-btn">+</button>
                </div>
            </form>
        </div>


        <div class="comment flex v-top h-space-between" v-for="comment in comments">
            <div class="flex text-wrap">
                <p class="text-left">{{comment.text}}</p>
            </div>
            <div class="flex v-center h-center">
                <span class="glyphicon glyphicon-remove-circle" @click="removeComment(comment, boardId, listId)"></span>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'comment',
        props: ["name", "description", "taskId", "boardId", "listId", "task"], //TODO: Clean up redundant props
        data() {
            return {
                newComment: {},
            }
        },
        mounted() {
            this.$store.dispatch('getComments', { taskId: this.taskId, boardId: this.boardId, listId: this.listId })
            console.log('listId:', this.listId)
            //console.log('boardId: ', this.boardId)
        },
        methods: {
            createComment(taskId, listId, boardId) {
                this.$store.dispatch('createComment', { taskId, listId, boardId, comment: this.newComment })
                this.newComment = {}
            },
            removeComment(comment, boardId, listId) {
                this.$store.dispatch('removeComment', { comment, boardId, listId })
            },
            dragMode(event) {
                console.log('Drag Event: ', event)
                console.log('task to drag: ', this.task)
                event.dataTransfer.setData('text/javascript', JSON.stringify(this.task))
                console.log('drag event 2: ', event)
            }
        },
        computed: {
            comments() {
                return this.$store.state.comments[this.taskId]
            }
        }
    }
</script>

<style scoped>
    .comment {
        padding: 15px;
        border: 1px solid #F4F4E6;
        background: #6F8C71;
        border-radius: 6px;
    }

    .linked-text {
        text-decoration: none;
        color: #ACD9AF;
    }

    .linked-text:hover {
        color: #6F8C71;
    }

    h1{
        color:#6F8C71
    }
</style>
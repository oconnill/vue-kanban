<template>
    <div>
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
                    <button type="submit" class="btn btn-success navbar-btn">+ Comment</button>
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
        props: ["name", "description", "taskId", "boardId", "listId"],
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
            logout() {
                this.$store.dispatch('logout')
            },
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
        border: 1px solid #288C2E;
        background: #6F8C71;
        border-radius: 6px;
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

    .linked-text {
        text-decoration: none;
        color: #ACD9AF;
    }

    .linked-text:hover {
        color: #6F8C71;
    }
</style>
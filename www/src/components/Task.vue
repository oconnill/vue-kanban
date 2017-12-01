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
        padding: 0px 15px;
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
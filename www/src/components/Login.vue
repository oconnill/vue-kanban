<template>
    <div class="container">

        <!-- LOGIN FORM -->
        <div class="row">
                <error></error>
            <div class="col-sm-12 top-space"></div>
            <div v-if="loginFormActive" class="login-form col-sm-offset-3 col-sm-6">
                <form type="submit" @submit.prevent="login">
                    <div class="form-group">
                        <input name="email" type="text" class="form-control" placeholder="Email" v-model="returningUser.email">
                    </div>
                    <div class="form-group">
                        <input name="password" type="password" class="form-control" placeholder="Password" v-model="returningUser.password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-default navbar-btn">Login</button>
                    </div>
                </form>
                <a class="toggle-link" @click="toggleFormState">Not a user? Sign up here.</a>
            </div>

            <!-- SIGNUP FORM -->
            <div v-else class="signup-form col-sm-offset-3 col-sm-6">
                <form type="submit" @submit.prevent="addNewUser">
                    <div class="form-group">
                        <input name="email" type="text" class="form-control" placeholder="Email" v-model="newUser.email">
                    </div>
                    <div class="form-group">
                        <input name="name" type="text" class="form-control" placeholder="Name" v-model="newUser.name">
                    </div>
                    <div class="form-group">
                        <input name="password" type="password" class="form-control" placeholder="Password" v-model="newUser.password">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-default navbar-btn">Sign Up</button>
                    </div>
                    <a class="toggle-link" @click="toggleFormState">Already a user? Log in here.</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Error from './Error'
    export default {
        name: 'login',
        components: {
            Error
        },
        data() {
            return {
                loginFormActive: true,
                newUser: {},
                returningUser: {},
            }
        },
        methods: {
            toggleFormState() {
                this.loginFormActive = !this.loginFormActive
            },
            addNewUser() {
                this.$store.dispatch('addNewUser', this.newUser)
                this.newUser = {}
            },
            login() {
                this.$store.dispatch('login', this.returningUser)
                this.returningUser = {}
            }
        }
    }
</script>

<style scoped>
    .toggle-link {
        color: #D66D40;
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
    }

    .toggle-link:hover {
        color: #F4F4E6;
        cursor: pointer;
    }

    .navbar-btn {
        /* border-radius: 0; */
        font-family: 'Roboto', sans-serif;

    }
    .top-space {
        height: 55px;
    }
    
    .input{
background-color: #F4F4E6;
    }
</style>
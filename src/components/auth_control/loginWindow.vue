<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onLogin">
                                <v-layout row>
                                    <v-flex sx12>
                                        <v-text-field
                                            name="email"
                                            label="Mail"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex sx12>
                                        <v-text-field
                                            name="password"
                                            label="password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">
                                            Login
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>

                    <v-card-text>
                        <v-container>
                            <v-icon>notification_important</v-icon>
                                If you don't have an account, please <strong class="red--text">SIGN UP</strong> or <strong class="red--text">contact Administrator</strong>
                        </v-container>

                        <v-container>
                            <v-icon>notification_important</v-icon>
                                This app will be shortly removed to <a href="https://studytimecounter.firebaseapp.com/">https://studytimecounter.firebaseapp.com</a> for a better user experience. All the user data <strong class="red--text">WILL NOT BE DELETED</strong> and you can continue using this app in the new address. We appreciate your understanding. Please save the new address and support me.
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'loginWindow',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    computed: {

    },
    methods: {
        onLogin: function () {
            this.$store.dispatch('login', {email: this.email, password: this.password})
        }
    },
    created () {
        console.log("loginWindow component created")
    }
}
</script>

<style scoped>

</style>
<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
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
                                    <v-flex sx12>
                                        <v-text-field
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            v-model="confirmPassword"
                                            type="password"
                                            :rules="[comparePasswords]"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">
                                            Sign up
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>

                    <v-card-text>
                        <v-container>
                        <v-icon>notification_important</v-icon>
                            You are strongly recommanded <strong class="red--text">NOT</strong> to use your real-world-password here. Eventhough your password won't be seen by the Administrator, but since it's only a small SPA, <strong class="red--text">it can not be guaranteed</strong> that there is no safety issue by the client side.
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'signupWindow',
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        }
    },
    methods: {
        onSignup: function () {
            this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            
            console.log("signup clicked")
            // vuex
            console.log({email: this.email, password: this.password, confirmPassword: this.confirmPassword})
        }
    },
    created () {
        console.log("signup component created")
    }
}
</script>

<style scoped>

</style>
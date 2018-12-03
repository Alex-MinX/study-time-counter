<template>
    <div>
        <v-list-tile @click="login">
            <v-list-tile-action>
                <v-icon>account_box</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>Sign up</v-list-tile-title>
            </v-list-tile-content>
    </v-list-tile>
    </div>
</template>

<script>
export default {
    name: 'signupBtn',
    methods: {
        login: function () {
            console.log("signupBtn clicked")
        }
    },
    created () {
        console.log("signupBtn component created")
    }
}
</script>

<style scoped>

</style>

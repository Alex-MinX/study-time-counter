<template>
    <div>
        <v-list-tile @click="login">
            <v-list-tile-action>
                <v-icon>account_box</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </div>
</template>

<script>
export default {
    name: 'loginBtn',
    methods: {
        login: function () {
            console.log("loginBtn clicked")
        }
    },
    created () {
        console.log("loginBtn component created")
    }
}
</script>

<style scoped>

</style>

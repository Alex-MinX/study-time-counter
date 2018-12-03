<template>
    <div>
        <v-list-tile @click="logout">
            <v-list-tile-action>
                <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </div>
</template>

<script>
export default {
    name: 'logoutBtn',
    methods: {
        logout: function () {
            console.log("logoutBtn clicked")
        }
    },
    created () {
        console.log("logoutBtn component created")
    }
}
</script>

<style scoped>

</style>

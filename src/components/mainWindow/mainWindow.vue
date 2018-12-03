<template>
    <form @submit.prevent="submit">
        <v-layout row wrap>
            <v-flex xs4>
                <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Date of study"
                        prepend-icon="event"
                        readonly
                        solo
                    ></v-text-field>

                    <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs4>
                <v-text-field
                v-model="time"
                label="Time of study"
                solo
                type="number"
                required
                ></v-text-field>
            </v-flex>

            <v-flex xs4>
                <v-text-field
                v-model="description"
                label="What did you do today?"
                solo
                ></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-btn
                    block
                    dark
                    color="light blue"
                    type="submit"
                >
                    submit
                </v-btn>
            </v-flex>

            <diagramWindow></diagramWindow>

        </v-layout>
    </form>
</template>

<script>
import diagramWindow from './diagramWindow.vue'

export default {
    name: 'mainWindow',
    components: {
        diagramWindow
    },
    data () {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            time: '',
            description: '',
        }
    },
    methods: {
        submit () {
            let date = this.date;
            let time = this.time;
            let description = this.description;

            let payload = {}
            payload = {
                date: date,
                time: time,
                description: description
            }

            console.log("submitContent: ", payload);

            this.$store.dispatch('addDataToFB', payload);
        }
    }
}
</script>

<style scoped>

</style>
<template>
<v-layout
    justify-center
    row
    wrap
>
    <v-flex xs8>
        <v-card>
            <v-container>
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
                            label="Time of study (required and min. step is 0.5)"
                            solo
                            type="number"
                            step="0.5"
                            suffix="h"
                            required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs4>
                            <v-text-field
                            v-model="description"
                            label="What did you do today? (optional)"
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

                    </v-layout>
                </form>
            </v-container>
        </v-card>
    </v-flex>

    <v-flex xs8>
        <diagramWindow></diagramWindow>
    </v-flex>

    <v-snackbar
        v-model="snackbar"
        top
        color="rgba(0,0,0,0.35)"
        class="font-weight-medium text-uppercase cyan--text text--lighten-5"
    >
        {{snackbarText}}
    </v-snackbar>

</v-layout>

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
            snackbarText: ''
        }
    },
    computed: {
        snackbar () {
            let statusInfo = this.$store.getters.getaddDataToFBStatus
            if (statusInfo.status == true) {
                this.snackbarText = statusInfo.infoText;
                return true
            } else {
                return false
            }
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

            this.$store.dispatch('addDataToFB', payload);
        },
        setSnackbar () {
            this.$store.commit('setaddDataToFBStatus', false);
        }
    }
}
</script>

<style scoped>

</style>
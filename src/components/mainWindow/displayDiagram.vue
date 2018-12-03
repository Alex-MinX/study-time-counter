<template>
    <div>
        <v-toolbar
            color="cyan"
            dark
            height="50px"
        >
            <v-icon>timeline</v-icon>

            <v-toolbar-title>Study time heat map</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container>
            <calendar-heatmap
                :values="data"
                :end-date="endDate"
                :max="5"
                tooltip-unit="hours"
            />
        </v-container>
    </div>
</template>

<script>
export default {
    name: "displayDiagram",
    props: ['data'],
    data () {
        return {
            endDate: new Date().toISOString().substr(0, 10),
            //colorRange: ['#F0F0F0', '#FCE3E2', '#F9C8C6', '#F6ADAA', '#F3928D', '#F07671', '#ED5B55', '#EA4038', '#E7251C', '#E50A00']
        }
    },
    methods: {

    },
    computed: {

    },
    created () {

    }
}
</script>

<style>

</style>

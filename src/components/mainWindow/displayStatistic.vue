<template>
    <div>
        <v-toolbar
                color="cyan"
                dark
                height="50px"
            >
                <v-icon>bar_chart</v-icon>

                <v-toolbar-title>Satistic</v-toolbar-title>

                <v-spacer></v-spacer>
        </v-toolbar>
        
        <v-list two-line>
            <v-layout>
                <v-flex xs6
                    v-for="(value, key) in statistic"
                    :key="key"
                >
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="key"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="value"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-flex>
            </v-layout>
        </v-list>
    </div>
</template>

<script>
export default {
    name: 'displayStatistic',
    props: ['statistic'],
    data () {
        return {

        }
    }
}
</script>

<style>

</style>

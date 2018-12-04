<template>
        <v-flex xs12>
            <v-card>
                <displayStatistic :statistic="statistic"></displayStatistic>
            </v-card>
            <v-card>
                <displayDiagram :data="data"></displayDiagram>
            </v-card>
            <v-card>
                <displayUserInfo :userInfo="userInfo"></displayUserInfo>
            </v-card>
        </v-flex>
</template>

<script>
import displayUserInfo from './displayUserInfo.vue'
import displayDiagram from './displayDiagram.vue'
import displayStatistic from './displayStatistic.vue'

export default {
    name: 'diagramWindow',
    components: {
        displayUserInfo,
        displayDiagram,
        displayStatistic
    },
    data () {
        return {

        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.user;
        },
        data () {
            let orgData = this.$store.getters.getDataFromFB;
            let filData = []

            if (orgData) {
                Object.keys(orgData).forEach(function(a_key) {
                    let a_obj = {}
                    a_obj["date"] = orgData[a_key].date;
                    a_obj["count"] = orgData[a_key].time
                    filData.push(a_obj)
                })
            } else {

            }

            return filData;
        },
        statistic () {
            let orgData = this.$store.getters.getDataFromFB;
            let statistic = {};
            
            if (orgData) {
                let filData = []
                Object.keys(orgData).forEach(function(a_key) {
                    let a_obj = {}
                    a_obj["date"] = orgData[a_key].date;
                    a_obj["count"] = orgData[a_key].time
                    filData.push(a_obj)
                })

                // calculate total study hours
                let total_study_hours = 0;
                filData.forEach(function(a_day) {
                    total_study_hours += parseInt(a_day.count);
                })

                // calculate average study hours
                let average_study_hours = 0;
                filData.forEach(function(a_day) {
                    average_study_hours = (total_study_hours / parseInt(filData.length)).toFixed(2);
                })

                statistic = {
                    "Total study hours": total_study_hours + " h",
                    "Average study hours": average_study_hours + " h"
                };

            } else {
                statistic = {"No Data available": ""}
            }

            return statistic;
        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>

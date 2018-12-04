<template>
    <div>
        <v-card>
            <displayStatistic :statistic="statistic"></displayStatistic>
        </v-card>
        <v-card>
            <displayDiagram :data="data"></displayDiagram>
        </v-card>
        <v-card>
            <displayUserInfo :userInfo="userInfo"></displayUserInfo>
        </v-card>
    </div>
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
                    total_study_hours += parseFloat(a_day.count);
                })
                total_study_hours = (total_study_hours).toFixed(2);

                // calculate average study hours
                let not0day = 0;
                filData.forEach(function(a_day) {
                    if (a_day.count != 0) {
                        not0day += 1
                    }
                })
                let average_study_hours = (total_study_hours / parseInt(not0day)).toFixed(2);

                statistic = {
                    "Total study hours": total_study_hours + " h",
                    "Average study hours (On worked days)": average_study_hours + " h"
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

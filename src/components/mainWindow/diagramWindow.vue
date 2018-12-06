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

                // calculate total study hours ------------------------------------------------------
                let total_study_hours = 0;
                filData.forEach(function(a_day) {
                    total_study_hours += parseFloat(a_day.count);
                })
                total_study_hours = (total_study_hours).toFixed(2);

                // calculate average study hours on worked days---------------------------------------
                let not0day = 0;
                filData.forEach(function(a_day) {
                    if (a_day.count != 0) {
                        not0day += 1
                    }
                })
                let average_study_hours_owd = (total_study_hours / parseInt(not0day)).toFixed(2);

                // calculate average study hours -----------------------------------------------------
                console.log("filData: ", filData);
                //Get 1 day in milliseconds 
                let one_day = 1000*60*60*24;
                let reg_day = new Date(filData[0].date.slice(0, 4), filData[0].date.slice(5, 7) - 1, filData[0].date.slice(8, 10));
                // Convert both dates to milliseconds
                let date1_ms = reg_day.getTime();
                let date2_ms = new Date().getTime();
                let difference_ms = date2_ms - date1_ms; // Calculate the difference in milliseconds
                let difference_day = Math.round(difference_ms / one_day); // Convert back to days and return
                console.log("difference_day: ", difference_day);
                let totalDays = filData.length;
                let average_study_hours = (total_study_hours / difference_day).toFixed(2);

                // calculate total study hour on the past 7 days -------------------------------------
                let today = new Date();
                //console.log("today: ", today);
                today.setTime( today.getTime() - today.getTimezoneOffset()*60*1000 );
                //console.log("adjusted_today: ", today);

                let today_str = today.toISOString().substr(0, 10);
                //console.log("today_str: ", today_str);
                let today_d_str = today_str.slice(-2); // e.g.: get the "05" of "2018-12-05"
                let today_mon_str = today_str.slice(5, 7);

                let last7d_str = [];

                if (parseInt(today_d_str) < 7) {
                    if (parseInt(today_mon_str) != 1) {
                        // Current month is NOT january
                        for (let i = parseInt(today_d_str); i > 0; i-- ) {
                            last7d_str.push(today_str.slice(0, 8) + 0 + i);
                        }

                        // calculate the last day of the last month
                        let fdcm = new Date(today.getFullYear(), today.getMonth(), 1); // first day of current month
                        let ldlm = new Date(fdcm - 1) // last day of last month
                        let ldlm_str = ldlm.toISOString().substr(0, 10);
                        let ldlm_d_str = ldlm_str.slice(-2)

                        for (let i = parseInt(ldlm_d_str); i > parseInt(ldlm_d_str) - (7 - parseInt(today_d_str)); i-- ) {
                            last7d_str.push(ldlm_str.slice(0, 8) + i);
                        }
                        console.log("last7d_str: ", last7d_str);
                    } else {
                        // Current month is january
                        for (let i = parseInt(today_d_str); i > 0; i-- ) {
                            last7d_str.push(today_str.slice(0, 8) + 0 + i);
                        }

                        // calculate the last day of the last year
                        let ldly =  new Date(today.getFullYear(), 0, 0);
                        let ldly_str = ldly.toISOString().substr(0, 10);
                        let ldly_d_str = ldly_str.slice(-2);

                        for (let i = parseInt(ldly_d_str); i > parseInt(ldly_d_str) - (7 - parseInt(today_d_str)); i-- ) {
                            last7d_str.push(ldly_str.slice(0, 8) + i);
                        }
                        console.log("last7d_str: ", last7d_str);
                    }
                } else {
                    for (let i = parseInt(today_d_str); i > parseInt(today_d_str) - 7; i--) {
                        if (i >= 10) {
                            last7d_str.push(today_str.slice(0, 8) + i);
                        } else {
                            last7d_str.push(today_str.slice(0, 8) + 0 + i);
                        }
                    }
                    console.log("last7d_str: ", last7d_str);
                }
                
                let total_study_hours_l7d = 0;
                filData.forEach(function(a_day) {
                    last7d_str.forEach(function(l_a_day) {
                        if (l_a_day == a_day.date) {
                            total_study_hours_l7d += parseFloat(a_day.count);
                        }
                    })
                })

                // calculate the average study hours on the past 7 days---------------------------
                let average_study_hours_l7d = (total_study_hours_l7d / 7).toFixed(2);

                total_study_hours_l7d = (total_study_hours_l7d).toFixed(2);
                //console.log("total_study_hours_l7d: ", total_study_hours_l7d);

                statistic = {
                    "Total study hours": total_study_hours + " h"
                    , "Total study hours on the past 7 days": total_study_hours_l7d + " h"
                    , "Average study hours on the past 7 days": average_study_hours_l7d + " h"
                    , "Average study hours (on worked days)": average_study_hours_owd + " h"
                    , "Average study hours (since day 1)": average_study_hours + " h"
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

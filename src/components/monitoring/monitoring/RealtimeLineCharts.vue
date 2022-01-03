<template>
    <v-layout class="defectLineChart">
        <v-card class="defectLineChart_card">
            <v-layout column class="defectLineChart_card_title">
                <p class="main_title">실시간 차트 테스트</p>
            </v-layout>
            <LineChart :chart-data="datacollections" :options="options" ></LineChart>
        </v-card>
        <v-btn @click="this.realtimeData">click</v-btn>
    </v-layout>    
</template>

<script>
import {mapGetters} from 'vuex'
import LineChart from '@/commons/chartjs/LineChart.js'
export default {
    components: {LineChart},
    data() {
        return{
            temp: {},
            datacollections: null,
            tempDataLabels: null,
            tempDatasetsData: null,
            num: 0,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: -100,
                            suggestedMax: 100
                        }
                    }],
                    xAxex: [{
                        display: true
                    }]
                },  
                  animation: {
                    duration: 0, // general animation time
                },   
            },
        }
    },
    mounted () {
        this.initData();
    },

    computed: {
        ...mapGetters ({
            baseUrl: 'getBaseUrl'
        })
    },
    methods: {
        realtimeData() {
            setInterval(() => {
                // this.num++;
                // var tempLabels = this.datacollections.labels.splice(1,14);
                // tempLabels.push('x'+ (15+this.num));
                // var tempData = this.datacollections.datasets[0].data.splice(1,14);
                // tempData.push(Math.floor(Math.random() * (100 - (-100)) + (-100)));
                
                // var tempData2 = this.datacollections.datasets[1].data.splice(1,14);
                // tempData2.push(Math.floor(Math.random() * (100 - (-100)) + (-100)));
                
                // this.datacollections = {
                //     labels: tempLabels,
                //     datasets: [
                //         {
                //             label: 'test1',
                //             data: tempData,
                //             fill: false,
                //             borderColor: '#1287A7'
                //         },
                //         {
                //             label: 'test2',
                //             data: tempData2,
                //             fill: false,
                //             borderColor: '#F48A38'
                //         }
                //     ],
                // } 
                // }

            var tempLables = null;
            var tempCmd = null;
            var tempFeedback = null;
            this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/trend/sa_s`, {
                factoryid: 203, boothid: 1, zoneid: 1, robotid: 2
                }).then((result) => {
                    for(var i = 0; i < result.lenght; i++) {
                        var date = new Date(result[i].date_trunc);
                        tempLables.push(date.getTime());
                        tempCmd.push(result[i].sa_s_cmd);
                        tempFeedback.push(result[i].sa_s_feedback);
                    }
                    this.datacollections = {
                        labels: tempLables,
                        datasets: [
                            {
                                label: 'Command',
                                data: tempCmd,
                                fill: false,
                                borderColor: '#1287A7'
                            },
                            {
                                label: 'Feedback',
                                data: tempFeedback,
                                fill: false,
                                borderColor: '#F48A38'
                            },

                        ]
                    }
                    
                }).catch((error) => {
                    this.$log.error(error); 
                })
                
            }, 1000);
        },
        initData() {
            var tempLables = null;
            var tempCmd = null;
            var tempFeedback = null;
            this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/trend/sa_s`, {
                factoryid: 203, boothid: 1, zoneid: 1, robotid: 2
                }).then((result) => {
                    for(var i = 0; i < result.lenght; i++) {
                        var date = new Date(result[i].date_trunc);
                        tempLables.push(date.getTime());
                        tempCmd.push(result[i].sa_s_cmd);
                        tempFeedback.push(result[i].sa_s_feedback);
                    }
                    this.datacollections = {
                        labels: tempLables,
                        datasets: [
                            {
                                label: 'Command',
                                data: tempCmd,
                                fill: false,
                                borderColor: '#1287A7'
                            },
                            {
                                label: 'Feedback',
                                data: tempFeedback,
                                fill: false,
                                borderColor: '#F48A38'
                            },

                        ]
                    }
                    
                }).catch((error) => {
                    this.$log.error(error); 
                })

                // this.datacollections = {
                //         labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12', 'x13', 'x14', 'x15'],
                //         datasets: [
                //             {
                //                 label: 'test1',
                //                 data: [1,3,5,7,9,2,4,6,8,10,8,10,2,4,1],
                //                 fill: false,
                //                 borderColor: '#1287A7'
                //             },
                //             {
                //                 label: 'test2',
                //                 data: [2,5,3,1,2,10,5,6,1,2,5,1,10,4,1],
                //                 fill: false,
                //                 borderColor: '#F48A38'
                //             },
                //         ],
                //     }
        }
    }
    
}
</script>
<style scoped>

</style>


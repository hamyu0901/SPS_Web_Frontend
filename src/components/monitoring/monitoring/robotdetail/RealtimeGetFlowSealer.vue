<template>
        <v-card class="trendClr defectLineChart_card" :height="cardHeight">
            <v-card-text class="headerClr title_area pb-1">
                <p>{{ui.title}}</p>
            </v-card-text>
            <LineChart class="trendClr pt-3 " :chart-data="datacollections" :options="options" :height="chartHeight"></LineChart>
        </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import LineChart from '@/commons/chartjs/LineChart.js'
export default {
    props: ['cardHeight', 'chartHeight', 'factoryid', 'boothid', 'zoneid', 'robotid'],
    components: {LineChart},
    data() {
        return{
            ui: {
                title: 'Flow'
            },
            temp: {},
            datacollections: null,
            tempDataLabels: null,
            tempDatasetsData: null,
            num: 0,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: this.$style.getHomeAlarmEventChartLegendColorStyle(),
                        fontSize: 15
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: '',
                            beginAtZero: true,
                            min: 0
                        }
                    }],
                    xAxes: [{
                        display: true,
                         ticks: {
                            fontColor: '',
                            autoSkip: false
                        }
                    }],
                },
                animation: {
                    duration: 0, // general animation time
                },   
            },
            interval: null
        }
    },
    computed: {
        ...mapGetters ({
            baseUrl: 'getBaseUrl'
        })
    },
    mounted () {
        this.initData();
        this.realtimeData();
        this.initializeStyle();
    },
    destroyed() {
        clearInterval(this.interval);
    },
    methods: {
        initializeStyle() {
            $('.headerClr').css('background-color', '#171A29');
            $('.trendClr').css('background-color', '#21263a');
            this.options.scales.yAxes[0].ticks.fontColor = '#ffffff';
            this.options.scales.xAxes[0].ticks.fontColor = '#ffffff';
        },
        realtimeData() {
            this.interval = setInterval(() => {
                let tempLables = [];
                let tempCmd = [];
                let tempFeedback = [];
                this.$http.post(`${this.baseUrl}/robotdetails/robot/trend/sealer/flow`, {
                    factoryid: this.factoryid, boothid: this.boothid, zoneid: this.zoneid, robotid: this.robotid 
                    }).then((result) => {
                        for(var i = 0; i < result.data.length; i++) {
                            var date = new Date(result.data[i].date_trunc);
                            var time = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
                            tempLables.push(time);
                            tempCmd.push(result.data[i].flow_cmd);
                            tempFeedback.push(result.data[i].flow_feedback);
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

                return this.interval;
        },
        initData() {
            var tempLables = [];
            var tempCmd = [];
            var tempFeedback = [];
            this.$http.post(`${this.baseUrl}/robotdetails/robot/trend/sealer/flow`, {
                factoryid: this.factoryid, boothid: this.boothid, zoneid: this.zoneid, robotid: this.robotid 
                }).then((result) => {
                    for(var i = 0; i < result.data.length; i++) {
                        var date = new Date(result.data[i].date_trunc);
                        var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                        tempLables.push(time);
                        tempCmd.push(result.data[i].flow_cmd);
                        tempFeedback.push(result.data[i].flow_feedback);
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
        }
    }
}
</script>
<style scoped>
    .title_area {
      text-align: left;
      font-size: 20px;
    }
</style>


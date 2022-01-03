<template>
    <v-card v-bind="initialize" class="pastRobotStateTimeCard" :height="cardHeight" elevation="0">
        <v-card-title class="pastRobotStateTimeCardTitle pb-2" v-bind:style="ui.titleStyle">{{ui.title}}</v-card-title>
        <pie-chart v-if="ui.condition" class="bodyClr pt-4" :chartData="datacollection" :options="options" :height="chartHeight"></pie-chart>
        <v-layout class="noDataText" v-else justify-center align-center>
            <p>{{ui.noDataTitle}}</p>
        </v-layout>
    </v-card>
</template>

<script>
    import anime from 'animejs';
import {mapGetters} from 'vuex'
import PieChart from '@/commons/chartjs/PieChart'
export default {
    props: ['cardHeight', 'chartHeight', 'boothid', 'zoneid', 'robotid'],
    components: {PieChart},
    data() {
        return { 
            ui: {
                title: this.$t(`monitoring.child.pastRobotStateTime.title`),
                noDataTitle: this.$t(`monitoring.child.pastRobotStateTime.noDataTitle`),
                condition: true,
                titleStyle: null
            },
            datacollection: null,
            insertData: null,
            options: {
                tooltips: {
                    titleFontSize: 20,
                    bodyFontSize: 20,
                    footerFontSize: 20,
                    caretSize: 5
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: this.$style.monitoring.pastRobotStateTimeItemChartFontColor
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                } 
            },
            robotStatus: [
                {flag: 'robot_playback', color: this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.playback}, // 동작
                {flag: 'robot_manual', color: this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.manual}, // 대기
                {flag: 'robot_alarm', color: this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.alarm}, // 알람
                {flag: 'robot_offline', color: this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.offline}, // 오프라인
                // {flag: 'robot_error', color: '#007bff'} 에러
            ]
        }
    },
    computed: {
        ...mapGetters ({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId'
        }),
        initialize() {
            this.updateData();
        }
    },
    created() {
        
    },
    mounted() {
        this.initializeStyle();
    },
    methods: {
        initializeStyle() {
            this.ui.titleStyle = this.$style.common.titleObjectItemColor;
            document.documentElement.style.setProperty("--pastRobotStateTimeCardBackgroundColor", this.$style.monitoring.pastRobotStateTimeItemBackgroundColor);
            document.documentElement.style.setProperty("--pastRobotStateTimeCardColor", this.$style.monitoring.pastRobotStateTimeItemColor);
            document.documentElement.style.setProperty("--pastRobotStateTimeCardBorderColor", this.$style.common.cardItemBorderColor);
            document.documentElement.style.setProperty("--pastRobotStateTimeCardTitleBackgroundColor", this.$style.monitoring.pastRobotStateTimeItemTitleBackgroundColor);
            document.documentElement.style.setProperty("--pastRobotStateTimeCardTitleColor", this.$style.monitoring.pastRobotStateTimeItemTitleColor);
        },
        /*추가 데이터 초기화*/
        initData() {
          this.insertData = [0,0,0,0];  
        },
        
        /*api 호출을 통해, 데이터 받아오는 함수 */
        updateData() {
            this.initData();
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.boothid,
                zoneid: this.zoneid,
                robotid: this.robotid
            }
            this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/prevchart`, params).then((result) => {
                if (result.data == '') {
                    this.ui.condition = false;
                }
                else {
                    for (let i = 0; i < result.data.length; i++) {
                        for (let j = 0; j < this.robotStatus.length; j++) {
                            if (result.data[i].flag == this.robotStatus[j].flag) {
                                this.insertData[j] = result.data[i].minutes;
                            }
                        }
                    }
                    this.renderChart(this.insertData);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        
        /*props를 통해 넘겨주는 chartData에 받아온 데이터 삽입해 렌더링 해주는 함수 */
        renderChart(data) {
             this.datacollection = {
                labels: [
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.action`),
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.ready`), 
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.alarm`),
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.offline`),
                ],
                datasets: [
                    {
                        backgroundColor: [
                            this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.playback,
                            this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.manual,
                            this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.alarm,
                            this.$style.monitoring.pastRobotStateTimeItemChartRobotStatusColor.offline    
                        ],
                        data: data
                    }
                ],
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import "./pastrobotstatetime";
</style>

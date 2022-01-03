<template>
    <v-card 
    v-bind="initialize"
    class="bodyClr"
    :height="cardHeight">
        <v-card-text class="headerClr title_area pb-1">
            <p>{{ui.title}}</p>
        </v-card-text>
        <pie-chart 
            class="bodyClr pt-4"
            :chartData="datacollection" 
            :options="options" 
            :height="chartHeight"
        ></pie-chart>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import PieChart from '@/commons/chartjs/PieChart'
export default {
    props:['cardHeight', 'chartHeight', 'boothid', 'zoneid', 'robotid'],
    components: { 
        PieChart
    },
    data() {
        return {
            ui: {
                title: this.$t(`monitoring.child.currentRobotStateCount.title`)
            },
            datacollection: null,
            insertData: null,
            options: {
                legend: {
                    display: true
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            },
            /*state는 해당 아이디값이 어떤 상태를 나타내고 있는지 구분하기 위함 */
            robotStatus: [
                {id: 0, state: 'offline'},
                {id: 1, state: 'ready'},
                {id: 2, state: 'action'},
                {id: 3, state: 'hold'},
                {id: 4, state: 'alarm'},
                {id: 5, state: 'alarm'},
                {id: 6, state: 'error'}
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
    mounted() {
        this.initCSS();
    },
    methods: {
        initCSS() {
            $('.headerClr').css('background-color', '#171A29');
            $('.bodyClr').css('background-color', '#21263a');
        },
         /*추가 데이터 초기화*/
        initData() {
          this.insertData = [0,0,0,0,0];  
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
            this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/currchart`, params).then((result) => {
                if (result.data == '') {

                }
                else {
                    for (let i = 0; i < result.data.length; i++) {
                        for (let j = 0; j < this.robotStatus.length; j++) {
                            if (result.data[i].robot_status == this.robotStatus[j].id) {
                                this.insertData[j] = result.data[i].count;
                            }
                        }
                    }
                    this.renderChart();
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        /*props를 통해 넘겨주는 chartData에 받아온 데이터 삽입해 렌더링 해주는 함수 */
        renderChart() {
             this.datacollection = {
                labels: [
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.offline`), 
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.ready`), 
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.action`), 
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.alarm`), 
                    this.$t(`monitoring.child.currentRobotStateCount.robotStatus.error`)
                ],
                datasets: [
                    {
                        backgroundColor: ['#53636F', '#FEC706', '#06A43E', '#E64107', '#2195F3'],
                        data: this.insertData
                    }
                ],
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
}
</script>

<style scoped>
    .title_area {
      text-align: left;
      font-weight: bold;
    }
</style>

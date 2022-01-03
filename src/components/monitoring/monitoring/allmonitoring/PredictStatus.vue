<template>
    <v-layout justify-start v-bind="getFactoryInfos">
        <v-btn
            class="predictIcon mr-2 elevation-0"
            fab
            v-for="predictStatusItem in datas.predictStatusItems" :key="predictStatusItem.id"
            :color="predictStatusItem.value === 0 ? ui.predictStatusColor.normal : ui.predictStatusColor.alarm"
        ></v-btn>
    </v-layout>
</template>

<script>
export default {
    props: ['boothId', 'zoneId', 'robotId'],
    data() {
        return {
            ui: {
                predictStatusColor: {
                    normal: this.$style.monitoring.predictStatusItemNormalColor,
                    alarm: this.$style.monitoring.predictStatusItemAlarmColor
                }
            },
            datas: {
                predictStatusItems: [
                    {id: 'p001', name: 'range_warning', value: 0},
                    {id: 'p002', name: 'motor_temperature_warning', value: 0},
                    {id: 'p005', name: 'cumulative_warning', value: 0}
                ]
            },
            handle: {
                predictStatus: null
            }
        }   
    },

    created() {
    },

    mounted() {
       
    },

    destroyed() {
        this.destroyHandle();
    },

    computed: {
       getFactoryInfos() {
           if(this.boothId !== "" && this.zoneId !== "" && this.robotId !== "") {
               let factoryInfos = {};
               factoryInfos['boothid'] = this.boothId;
               factoryInfos['zoneid'] = this.zoneId;
               factoryInfos['robotid'] = this.robotId;
               this.handle.predictStatus = setInterval(this.getPredictStatus(factoryInfos), 3000);
           }
       }
    },

    methods: {
        getPredictStatus(factoryInfos) {
            this.$http.get(`/home/predict/list/boothid/${factoryInfos.boothid}/zoneid/${factoryInfos.zoneid}/robotid/${factoryInfos.robotid}`).then(res => {
                if(res.data.length > 0) {
                    res.data.forEach(predictStatus => {
                        this.datas.predictStatusItems.forEach(predictStatusItem => {
                            if(predictStatus[predictStatusItem.id] !== undefined) {
                                predictStatusItem.value = predictStatus[predictStatusItem.id];
                            }
                        })
                    })
                }
            }).catch(error => {
                this.$log.error(error);
            })
        },

        destroyHandle() {
            clearInterval(this.handle.predictStatus);
            this.handle.predictStatus = null;
        }
    }

}
</script>

<style scoped lang="scss">
    @import "./predictstatus.scss";
</style>
<template>
    <v-card class="robotInfosCard" v-bind="initialize" elevation="0">
        <div v-if="datas.robot.type != 2">
            <table class="robotInfo_table">
                <tr v-for="robotInfo in robotInfos" :key="robotInfo.id" class="robotInfo_table_row">
                    <v-layout>
                        <v-flex lg2 class="headerClr robotInfo_info_name">
                            <th>{{robotInfo.info.name}}</th>
                        </v-flex>
                        <v-flex lg4 class="robotInfo_info_value">
                            <td>{{robotInfo.info.value}}</td>
                        </v-flex>
                        <v-flex lg2 class="headerClr robotInfo_status_name">
                            <th>{{robotInfo.status.name}}</th>
                        </v-flex>
                        <v-flex lg4 class="robotInfo_status_value">
                            <td>{{robotInfo.status.value}}</td>
                        </v-flex>
                    </v-layout>
                </tr>
            </table>
        </div>
        <div v-else>
            <table class="robotInfo_table">
                    <tr v-for="robotInfo in robotInfosSealer" :key="robotInfo.id" class="robotInfo_table_row">
                        <v-layout>
                            <v-flex lg2 class="headerClr robotInfo_info_name">
                                <th>{{robotInfo.info.name}}</th>
                            </v-flex>
                            <v-flex lg4 class="robotInfo_info_value">
                                <td>{{robotInfo.info.value}}</td>
                            </v-flex>
                            <v-flex lg2 class="headerClr robotInfo_status_name">
                                <th>{{robotInfo.status.name}}</th>
                            </v-flex>
                            <v-flex lg4 class="robotInfo_status_value">
                                <td>{{robotInfo.status.value}}</td>
                            </v-flex>
                        </v-layout>
                    </tr>
            </table>
        </div>
    </v-card>
    
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: ['boothid', 'zoneid', 'robotid'],
    data() {
        return {
            robotInfos: [
                {info: {id: 'robot_model',  name: this.$t(`monitoring.child.robotInfo.robotModel`), value: ''}, status: {id: 'pp_mode', name: 'Pendant Mode', value: ''}},
                {info: {id: 'rc_model',     name: this.$t(`monitoring.child.robotInfo.rcModel`), value: ''}, status:  {id: 'servo_on', name: 'Servo On/Off', value: ''}},
                {info: {id: 'atom_model',   name: this.$t(`monitoring.child.robotInfo.atomModel`), value: ''}, status: {id: 'main_air', name: 'Main Air', value: ''}},
                {info: {id: 'install_date', name: this.$t(`monitoring.child.robotInfo.installDate`), value: ''}, status: {id: 'spray_enable', name: 'Spray Enable', value: ''}},
                {info: {id: 'ip_addr',      name: this.$t(`monitoring.child.robotInfo.ip`), value: ''}, status: {id: 'hv_enable', name: 'H/V Enable', value: ''}}
            ],
            robotInfosSealer: [
                {info: {id: 'robot_model',  name: this.$t(`monitoring.child.robotInfo.robotModel`), value: ''}, status: {id: 'pp_mode', name: 'Pendant Mode', value: ''}},
                {info: {id: 'rc_model',     name: this.$t(`monitoring.child.robotInfo.rcModel`), value: ''}, status:  {id: 'servo_on', name: 'Servo On/Off', value: ''}},
                {info: {id: 'atom_model',   name: this.$t(`monitoring.child.robotInfo.atomModel`), value: ''}, status: {id: 'trigger1', name: 'trigger1', value: ''}},
                {info: {id: 'install_date', name: this.$t(`monitoring.child.robotInfo.installDate`), value: ''}, status: {id: 'trigger2', name: 'trigger2', value: ''}},
                {info: {id: 'ip_addr',      name: this.$t(`monitoring.child.robotInfo.ip`), value: ''}, status: {id: 'trigger3', name: 'trigger3', value: ''}}
            ],
            datas: {
                robot: {
                    type: 1
                },
                updateFlag: null
            }
        }
    },
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId'
        }), 
        initialize() {
            this.getRobotType();
            this.datas.updateFlag = setInterval(this.update, 1000);
        }
    },

    mounted() {
        this.initializeStyle();
    },

    destroyed() {
        if(this.datas.updateFlag != null) {
            clearInterval(this.datas.updateFlag);
        }
    },

    methods: {
        initializeStyle() {
            document.documentElement.style.setProperty("--robotInfoCardBorderColor", this.$style.monitoring.robotInfosItemCardBorderColor);
            document.documentElement.style.setProperty("--robotInfosThBackgroundColor", this.$style.monitoring.robotInfosItemThBackgroundColor);
            document.documentElement.style.setProperty("--robotInfosTdBackgroundColor", this.$style.monitoring.robotInfosItemTdBackgroundColor);
            document.documentElement.style.setProperty("--robotInfosColor", this.$style.monitoring.robotInfosItemColor);
            document.documentElement.style.setProperty("--robotInfosBorderColor", this.$style.monitoring.robotInfosItemBorderColor);
        },
        getRobotType() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.boothid,
                zoneid: this.zoneid,
                robotid: this.robotid
            }
            this.$http.post(`${this.baseUrl}/robotdetails/robot/type`, params).then((result) => {
                if (result.data == '') {

                }
                else {
                    this.datas.robot.type = result.data[0].robot_type;
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        update() {
            if (this.datas.robot.type == 2) {
                this.updateSealerData();
            }
            else {
                this.updatePaintData();
            }
        },
        updateSealerData() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.boothid,
                zoneid: this.zoneid,
                robotid: this.robotid
            }
            this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/sealer/table`, params).then((result) => {
                if (result.data == '') {
                    for (let i = 0; i < 5; ++i) {
                        this.robotInfosSealer[i].status.value = this.robotInfosSealer[i].info.value = 'No data available.';
                    }
                }
                else {
                    for (let i = 0; i < this.robotInfos.length; i++) {
                        this.robotInfosSealer[i].info.value = result.data[0][this.robotInfosSealer[i].info.id];
                    }
                    this.getTranslatePPMODE(result.data[0]);
                    this.getTranslateServoStatus(result.data[0]);
                    this.getTranslateTrigger1Status(result.data[0]);
                    this.getTranslateTrigger2Status(result.data[0]);
                    this.getTranslateTrigger3Status(result.data[0]);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        updatePaintData() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.boothid,
                zoneid: this.zoneid,
                robotid: this.robotid
            }
            this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/table`, params).then((result) => {
                if (result.data == '') {

                }
                else {
                    for (let i = 0; i < this.robotInfos.length; i++) {
                        this.robotInfos[i].info.value = result.data[0][this.robotInfos[i].info.id];
                    }
                    this.getTranslatePPMODE(result.data[0]);
                    this.getTranslateServoStatus(result.data[0]);
                    this.getTranslateMainAirStatus(result.data[0]);
                    this.getTranslateSprayStatus(result.data[0]);
                    this.getTranslateHVStatus(result.data[0]);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        getTranslatePPMODE(data) {
            if (data.pp_mode == 0) {
                this.robotInfos[0].status.value = 'TEACH';
                this.robotInfosSealer[0].status.value = 'TEACH';
            }
            else if (data.pp_mode == 1) {
                this.robotInfos[0].status.value = 'PLAY';
                this.robotInfosSealer[0].status.value = 'PLAY';
            }
            else if (data.pp_mode == 2) {
                this.robotInfos[0].status.value = 'REMOTE';
                this.robotInfosSealer[0].status.value = 'REMOTE';
            }
        },
        getTranslateServoStatus(data) {
            if (data.servo_on == 0) {
                this.robotInfos[1].status.value = 'OFF';
                this.robotInfosSealer[1].status.value = 'OFF';
            }
            else if (data.servo_on == 1) {
                this.robotInfos[1].status.value = 'ON';
                this.robotInfosSealer[1].status.value = 'ON';
            }
        },
        getTranslateMainAirStatus(data) {
            if (data.main_air == 0) {
                this.robotInfos[2].status.value = 'OFF';
                
            }
            else if (data.main_air == 1) {
                this.robotInfos[2].status.value = 'ON';
            }
        },
        getTranslateSprayStatus(data) {
            if (data.spray_enable == 0) {
                this.robotInfos[3].status.value = 'DISABLE';
            }
            else if (data.spray_enable == 1) {
                this.robotInfos[3].status.value = 'ENABLE';
            }
        },
        getTranslateHVStatus(data) {
            if (data.hv_enable == 0) {
                this.robotInfos[4].status.value = 'DISABLE';
            }
            else if (data.hv_enable == 1) {
                this.robotInfos[4].status.value = 'ENABLE';
            }
        },
        getTranslateTrigger1Status(data) {
            if (data.trigger1 == 0) {
                this.robotInfosSealer[2].status.value = 'OFF';
            }
            else if (data.trigger1 == 1) {
                this.robotInfosSealer[2].status.value = 'ON';
            }
        },
        getTranslateTrigger2Status(data) {
            if (data.trigger2 == 0) {
                this.robotInfosSealer[3].status.value = 'OFF';
            }
            else if (data.trigger2 == 1) {
                this.robotInfosSealer[3].status.value = 'ON';
            }
        },
        getTranslateTrigger3Status(data) {
            if (data.trigger3 == 0) {
                this.robotInfosSealer[4].status.value = 'OFF';
            }
            else if (data.trigger3 == 1) {
                this.robotInfosSealer[4].status.value = 'ON';
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import './robotinfos';
</style>

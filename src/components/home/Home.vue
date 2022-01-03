<template>
    <v-container fluid fill-height v-bind="initialize">
        <v-layout column>
            <v-layout column>
                <v-layout>
                    <p v-bind:style="styleObject">{{ui.boothMonitoringTitle}}</p>
                    <a class="convert" @click="convertClicked">{{'['+ui.detailShowText+']'}}</a>
                    <v-spacer/>
                    <div class="pr-3" v-for="boothStatusType in boothStatusTypes" :key="boothStatusType.id">
                        <a class="pr-2 boothStatusImg"><img :src='boothStatusType.img'/>
                        {{boothStatusType.text}}</a>
                    </div>
                </v-layout>
                <v-layout>
                    <v-flex class="pr-2 pl-2 boothMonitoring" lg4 v-for="(boothStatusInfo, index) in boothStatusInfos" :key="index">
                        <booth-status-chart
                            v-bind:chartId="boothStatusInfo.id"
                            v-bind:cardTitle="boothStatusInfo.title"
                            v-bind:cardHeight="320"
                            v-bind:chartHeight="280"
                            v-bind:boothid="boothStatusInfo.boothId"
                        ></booth-status-chart>
                    </v-flex>
                </v-layout>
            </v-layout>
            <v-layout>
                <v-flex lg6 class="pr-2">
                    <alarm-list-table
                        v-bind:headerDatas="alarmListTableHeaderDatas"
                        v-bind:contentDatas="alarmListTableContentDatas"
                        v-bind:highlightFlag="true"
                        v-on:selectAlarmListData="getSelectedAlarmListData"
                    ></alarm-list-table>
                </v-flex>
                <v-flex lg6 class="pl-2">
                    <alarm-chart
                        v-bind:chartId="'alarmChart'"
                        v-bind:alarmChartDatas="alarmChartDatas"
                    ></alarm-chart>
                </v-flex>
            </v-layout>
            <v-layout class="pt-2">
                <v-flex lg6 class="pr-2">
                    <maintenance-info-table
                        v-show="Boolean(getAuth)"
                        v-bind:headerDatas="maintenanceInfoTabelHeaderDatas"
                        v-bind:contentDatas="maintenanceInfoTableContentDatas"
                    ></maintenance-info-table>
                </v-flex>
                <v-flex lg6 class="pl-2">
                    <process-status-table
                        v-bind:headerDatas="processStatusTableHeaderDatas"
                        v-bind:contentDatas="processStatusTableContentDatas"
                    ></process-status-table>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import AlarmListTableVue from './home/AlarmListTable.vue';
import AlarmChartVue from './home/AlarmChart.vue';
import MaintenanceInfoTableVue from './home/MaintenanceInfoTable.vue';
import ProcessStatusTableVue from './home/ProcessStatusTable.vue';
import BoothStatusChartVue from './home/BoothStatusChart.vue';

export default {
    components:{
        BoothStatusChart: BoothStatusChartVue,
        AlarmListTable: AlarmListTableVue,
        AlarmChart: AlarmChartVue,
        MaintenanceInfoTable: MaintenanceInfoTableVue,
        ProcessStatusTable: ProcessStatusTableVue
    },
    data() {
        return {
            ui: {
                boothMonitoringTitle: this.$t(`home.boothMonitoring`),
                detailShowText: this.$t(`home.showDetailPage`)
            },
            boothStatusTypes: [
                { id: '0', text: this.$t(`home.robotStatus.action`), img: require("@/images/state_motion.png") },
                { id: '1', text: this.$t(`home.robotStatus.ready`), img: require("@/images/state_ready.png") },
                { id: '2', text: this.$t(`home.robotStatus.alarm`), img: require("@/images/state_alarm.png") },
                { id: '3', text: this.$t(`home.robotStatus.offline`), img: require("@/images/state_offline.png") },
                { id: '4', text: this.$t(`home.robotStatus.error`), img: require("@/images/state_error.png") },
            ],
            boothStatusInfos: [],
            alarmListTableHeaderDatas: [
                {id: 'process_info',    title: this.$t(`home.alarmColumn.processInformation`)},
                {id: 'timestamp',      title: this.$t(`home.alarmColumn.occurTime`)},
                {id: 'alarmcode',      title: this.$t(`home.alarmColumn.alarmCode`)},
                {id: 'alarmtype',      title: this.$t(`home.alarmColumn.alarmCase`)}
            ],
            alarmListTableContentDatas: [],
            maintenanceInfoTabelHeaderDatas: [
                {id: 'unit',            title: this.$t(`home.maintenanceColumn.unit`)},
                {id: 'maint_point',     title: this.$t(`home.maintenanceColumn.inspectionSite`)},
                {id: 'maint_name',      title: this.$t(`home.maintenanceColumn.managementCategory`)},
                {id: 'progress',        title: this.$t(`home.maintenanceColumn.status`)}
            ],
            maintenanceInfoTableContentDatas: [],
            processStatusTableHeaderDatas: [
                {id: 'processInfo', title: this.$t(`home.alarmColumn.processInformation`)},
                {id: 'p001', title: this.$t(`home.child.processStatusTable.p001`)},
                {id: 'p002', title: this.$t(`home.child.processStatusTable.p002`)},
                {id: 'p005', title: this.$t(`home.child.processStatusTable.p005`)}
            ],
            alarmChartDatas: [],
            processStatusTableContentDatas: [],
            alarmInfoDlgFlag: false,
            alarmRateDatas: [],
            alarmContentDatas: [],
            alarmStopDatas: [],
            styleObject: null,
            handle: {
                boothMonitoring: null,
                updateData: null
            }
        }
    },
    created() {
        this.createHandle();
    },
    destroyed() {
        this.destroyHandle();
    },
    mounted() {
        this.$emit('mountedTab');
        this.initializeStyle();
    },
    computed: {
        ...mapGetters ({
            baseUrl: 'getBaseUrl',
            getTheme: 'getTheme',
            getLanguage: 'getLanguage',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos',
            getAuth: 'getAuth'     
        }),
        initialize() {
            this.setBoothStatusInfos();
        }
    },
    methods: {
        initializeStyle() {
            this.styleObject = this.$style.common.titleObjectItemColor;
            document.documentElement.style.setProperty("--boothMonitoringDetailText", this.$style.home.boothMonitoringDetailShowTextColor);
            document.documentElement.style.setProperty("--boothStatusImgTextColor", this.$style.home.boothMonitoringDetailShowTextColor);
            document.documentElement.style.setProperty("--tableCardTopColor", this.$style.common.tableCardTopColor);
            document.documentElement.style.setProperty("--tableTheadBackgroundColor", this.$style.common.tableTHeadBGColor);
            document.documentElement.style.setProperty("--tableTheadBorderBottomColor", this.$style.common.tableTHeadBBColor);
            document.documentElement.style.setProperty("--tableTBodyTrOddBackgroundColor", this.$style.common.tableTBodyOddBGColor);
            document.documentElement.style.setProperty("--tableTBodyTrOddBorderBottomColor", this.$style.common.tableTBodyOddBBColor);
            document.documentElement.style.setProperty("--tableTBodyTrEvenBackgroundColor", this.$style.common.tableTBodyEvenBGColor);
            document.documentElement.style.setProperty("--tableTBodyTrEvenBorderBottomColor", this.$style.common.tableTBodyEvenBBColor);
            document.documentElement.style.setProperty("--tableTBodyTrBackgroundColor", this.$style.common.tableTBodyHoverColor);
            document.documentElement.style.setProperty("--tableTBodyPaginationItem", this.$style.common.tablePaginationColor);
            document.documentElement.style.setProperty("--tdTextColor", this.$style.home.boothMonitoringCardItemTdColor);
            document.documentElement.style.setProperty("--convert", this.$style.home.tableMaintenanceShowDetailTextColor);
            document.documentElement.style.setProperty("--dataTableBorderBottomColor", this.$style.common.tableTBodyBBColor);
        },
        update() {
            this.getFactoryInfos();
            this.getAlarmListTableDatas();
            this.getAlarmChartDatas();
            this.getProcessStatusTableDatas();
        },
        createHandle() {
            this.handle.updateData = setInterval(this.update, 3000);
        },
        destroyHandle() {
            clearInterval(this.handle.updateData);
            this.handle.updateData = null;
        },
        getFactoryInfos() {
            if(this.getFactoryId != '') {
                this.getMaintenanceInfoTableDatas();
            }
        },
        setBoothStatusInfos() {
            if(this.getBoothInfos.length != 0) {
                this.getBoothStatusInfos();
            }
        },
        getBoothStatusInfos() {
            let tempDatas = [];
            this.$http.get(`${this.baseUrl}/home/status/info`).then((result) => {
                if(result.data.length != 0) {
                    for(let i = 0; i < this.getBoothInfos.length; i++) {
                        tempDatas.push({datas: []});
                        for(let j = 0; j < result.data.length; j++) {            
                            if(this.getBoothInfos[i].id == result.data[j].booth_id) { 
                               tempDatas[i].datas[result.data[j].robot_status] = Number(result.data[j].count);
                            }
                        }
                    }
                    this.boothStatusInfos = [];
                    for(let i = 0; i < this.getBoothInfos.length; i++) {
                        this.boothStatusInfos.push({id: "boothChart"+i ,boothId: this.getBoothInfos[i].id, title: this.getBoothInfos[i].name, datas: tempDatas[i].datas});
                    }
                } 
                else {
                    this.$popmsg(this.$t(`home.popMsg.statusInfo`));
                }
            }).catch((error) => {
                this.$log.error(error);
            }); 
        },
        getAlarmChartDatas() {
            this.alarmChartDatas = [];
            this.$http.get(`${this.baseUrl}/home/alarm/chart`)
            .then((result) => {
                if(result.data.length != 0) {
                    this.alarmChartDatas = result.data;
                }
                else {
                    //this.$popmsg(this.$t(`home.popMsg.alarmChart`));
                }
            }).catch((error) => {
                this.$log.error(error);
            });
        },
        getAlarmListTableDatas() {
            this.$http.get(`${this.baseUrl}/home/alarm/list`)
            .then((result) => {
                if(result.data.length != 0) {
                    for(let i = 0; i < result.data.length; i++) {
                        result.data[i].process_info = result.data[i].booth_name + '-' + result.data[i].zone_name + '-' + result.data[i].robot_name;
                        result.data[i].timestamp = result.data[i].time_stamp.replace('T', ' ').replace('Z','').split('.')[0];
                        result.data[i].alarm_type = result.data[i]['type_name_'+this.getLanguage];
                        result.data[i].alarmcode = result.data[i].alarm_code;
                        result.data[i].alarmtype = result.data[i].alarm_name;
                        result.data[i].booth = result.data[i].booth_name;
                        result.data[i].zone = result.data[i].zone_name;
                        result.data[i].robot = result.data[i].robot_name;
                        result.data[i].alarmstatus = result.data[i].alarm_status;
                        result.data[i].alarmid = result.data[i].alarm_id;
                    }
                    this.alarmListTableContentDatas = result.data;
                } 
                else {
                    this.alarmListTableContentDatas = [];
                }
            }).catch((error) => {
                this.$log.error(error);
            }); 
        },
        getSelectedAlarmListData(selectedAlarmListData) {
            let processInfoIds = {};
            processInfoIds = this.getProcessInfoId(selectedAlarmListData.process_info);
            this.alarmInfoDlgFlag = true;
            this.getAlarmRateDatas(selectedAlarmListData.time_stamp, selectedAlarmListData.alarm_code);
            this.getAlarmContentDatas(selectedAlarmListData.alarm_id ,processInfoIds);
            this.getAlarmStopDatas(selectedAlarmListData.time_stamp, processInfoIds, selectedAlarmListData.alarm_code, selectedAlarmListData.alarm_status);
        },
        changeAlarmInfoDlgFlag() {
            this.alarmInfoDlgFlag = false;
        },
        getAlarmRateDatas(selectDate, alarmCode) {
            this.alarmRateDatas = [];
            let postDatas = {};
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['selectdate'] = selectDate.split(' ')[0];
            postDatas['alarmcode'] = alarmCode;

            this.$http.post(`${this.baseUrl}/alarmview/data/detail/chart`, postDatas)
            .then((result) => {
                if(result.data == '') {
                   this.alarmRateDatas = [];  
                } 
                else {        
                    this.alarmRateDatas = result.data;                    
                }
            }).catch((error) => {
                this.$log.error(error);
            });
            
        },
        getAlarmContentDatas(alarmId, processInfoIds) {
            this.alarmContentDatas = [];
            let postDatas = {};
            let alarmCode = '';
            let alarmSubCode = '';
            let alarmType = '';
            postDatas['alarmid'] = alarmId;
            postDatas['robotid'] = processInfoIds.robotid;
            
            this.$http.post(`${this.baseUrl}/alarmview/data/detail/info`, postDatas)
            .then((result) => {
                if(result.data == '') {
                    this.alarmContentDatas = [];
                } 
                else {
                    alarmCode = result.data[0].alarm_code;
                    alarmSubCode = result.data[0].alarm_sub_code;
                    alarmType = result.data[0].alarm_type;
                    this.getAlarmDescriptionDatas(result.data);
                }
            }).catch((error) => {
                this.$log.error(error);
            });

        },
        getAlarmDescriptionDatas(alarmInfoDatas) {
            let postDatas = {};
            postDatas['alarmcode'] = alarmInfoDatas[0].alarm_code;
            postDatas['subcode'] = alarmInfoDatas[0].alarm_sub_code;
            postDatas['alarmtype'] = alarmInfoDatas[0].alarm_type;

            
            this.$http.post(`${this.baseUrl}/alarmview/data/detail/manual`, postDatas)
            .then((result) => {
                if(result.data == '') {
                    this.alarmContentDatas = [];
                } 
                else {
                    this.alarmContentDatas = [result.data, alarmInfoDatas];
                }
            }).catch((error) => {
                this.$log.error(error);
            });
        },
        getAlarmStopDatas(selectDate, processInfoIds, alarmCode, alarmStatus) {
            this.alarmStopDatas = [];
            let postDatas = {};
            postDatas['selectdate'] = selectDate.split(' ')[0];
            postDatas['boothid'] = processInfoIds.boothid;
            postDatas['zoneid'] = processInfoIds.zoneid;
            postDatas['alarmcode'] = alarmCode;
            
            this.$http.post(`${this.baseUrl}/alarmview/data/detail/alarmstop`, postDatas)
            .then((result) => {
                if(result.data == '') {
                    this.alarmStopDatas = [];
                } 
                else {
                    Object.keys(result.data).forEach(function eachKey(key) {
                        result.data[key].time_stamp = result.data[key].time_stamp.split('T')[0];
                    });
                    this.alarmStopDatas = result.data;            
                }
            }).catch((error) => {
                this.$log.error(error);
            });
        },
        getMaintenanceInfoTableDatas() {
            this.maintenanceInfoTableContentDatas = [];
            let postDatas = {};
            postDatas['factoryid'] = this.getFactoryId;
            
            this.$http.post(`${this.baseUrl}/home/maintenance/list`, postDatas).then((result) => {
                    if(result.data != '') {
                        Object.keys(result.data).forEach(function eachKey(key) {
                            if (result.data[key].etc == null) {
                                result.data[key].etc = '-';
                            }
                        });
                        this.maintenanceInfoTableContentDatas = result.data;
                    }
                }).catch((error) => {
                this.$log.error(error);
            });
        },
        getProcessStatusTableDatas() {
            this.processStatusTableContentDatas = [];
            this.$http.get(`${this.baseUrl}/home/predict/list`)
            .then((result) => {
                if(result.data.length != 0) {
                    result.data.forEach((processStatusTableData, index) => {
                        if(!Boolean(this.getAuth)) {
                            // basic
                            delete processStatusTableData.p005;  
                        } 
                        if((result.data.length - 1) === index) {
                            this.processStatusTableContentDatas = result.data;   
                        }
                    })
                } 
                else {
                    //this.$popmsg(this.$t(`home.popMsg.predictList`));
                }
            }).catch((error) => {
                this.$log.error(error);
            }); 
        },
        getProcessInfoId(processInfo) {
            let processInfoIds = {};
            let boothInfo = '';
            let zoneInfo = '';
            let robotInfo = '';

            boothInfo = this.getBoothId(processInfo.split('-')[0]);
            zoneInfo = this.getZoneId(processInfo.split('-')[1], boothInfo.id);
            robotInfo = this.getRobotId(processInfo.split('-')[2], zoneInfo.id);
            
            processInfoIds['boothid'] = boothInfo.id;
            processInfoIds['zoneid'] = zoneInfo.id;

            if(robotInfo != undefined) {
                processInfoIds['robotid'] = robotInfo.id;
            } 
            else {
                processInfoIds['robotid'] = null;
            }
            return processInfoIds;
        },
        getBoothId(boothName) {
            for(let i = 0; i < this.getBoothInfos.length; i++) {
                if(this.getBoothInfos[i].name == boothName) {
                    return this.getBoothInfos[i];
                }
            }
        },
        getZoneId(zoneName, boothId) {
           for(let i = 0; i < this.getZoneInfos.length; i++) {
               if(this.getZoneInfos[i].name == zoneName && this.getZoneInfos[i].booth == boothId) {
                   return this.getZoneInfos[i];
               }
           }
        },
        getRobotId(robotName, zoneId) {
            for(let i = 0; i < this.getRobotInfos.length; i++) {
               if(this.getRobotInfos[i].name == robotName && this.getRobotInfos[i].zone == zoneId) {
                   return this.getRobotInfos[i];
               }
           }
        },
        convertClicked() {
            this.$router.push('/sps/monitoring/allmonitoring');
        }
    }
}
</script>

<style scoped lang="scss">
@import './home';
</style>

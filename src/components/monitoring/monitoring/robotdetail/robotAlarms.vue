<template>
        <table class='scrolltbody elevation-0' v-bind="initialize">
            <thead>
                <tr>
                    <th :style="ui.tableHeaderStyle">{{ui.col.occurTime}}</th>
                    <th :style="ui.tableHeaderStyle">{{ui.col.alarmName}}</th>
                    <th :style="ui.tableHeaderStyle">{{ui.col.robotName}}</th>
                    <th :style="ui.tableHeaderStyle">{{ui.col.alarmCode}}</th>
                    <th :style="ui.tableHeaderStyle">{{ui.col.desc}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index" @click="createDialog(item)">
                    <td class="text-xs-center tdText">{{ item.timestamp }}</td>
                    <td class="text-xs-center tdText">{{ item.alarm }}</td>
                    <td class="text-xs-center tdText">{{ item.processInfo }}</td>
                    <td class="text-xs-center tdText">{{ item.alarmcode }}</td>
                    <td class="text-xs-center tdText">{{ item.desc }}</td>
                </tr>
                <v-dialog v-model='handle.dialog' width='1700px' persistent>
                        <alarm-view-data
                            class="alarmViewData"
                            v-if="handle.dialog"
                            v-bind:pieChartData="datas.alarmChartData" 
                            v-bind:alarmDesc="datas.alarmDesc" 
                            v-bind:alarmStopData="datas.alarmStopData"
                            v-bind:alarmInfoData="datas.alarmInfoData"
                            v-on:closeFlag='closeDialog'
                        ></alarm-view-data>
                </v-dialog>
            </tbody>
        </table>
</template>
    
<script>
    import { mapGetters } from 'vuex';
    import alarmViewData from '@/components/alarm/alarmview/alarmview/gridtablewithdialog/AlarmViewData';
    export default {
        props: ['contentData'],
        components: {
            alarmViewData
        },
        data() {
            return {
                ui: {
                    titleName: this.$t(`monitoring.child.robotAlarm.title`),
                    col: {
                        occurTime: this.$t(`monitoring.child.robotAlarm.col.occurTime`),
                        alarmName: this.$t(`monitoring.child.robotAlarm.col.alarmName`),
                        robotName: this.$t(`monitoring.child.robotAlarm.col.robotName`),
                        alarmCode: this.$t(`monitoring.child.robotAlarm.col.alarmCode`),
                        desc: this.$t(`monitoring.child.robotAlarm.col.desc`)
                    },
                    style: null,
                    closeDlg: this.$t(`alarmView.child.GridTableWithDialog.close`),
                    tableHeaderStyle: null
                },
                datas: {
                    alarmChartData: [],
                    alarmDesc: [],
                    alarmStopData: [],
                    alarmInfoData: ''
                },
                handle: {
                    dialog: false
                },
                list: [],
            }
        },
        computed: {
            ...mapGetters ({
                baseUrl: 'getBaseUrl',
                getTheme: 'getTheme',
                getLanguage: 'getLanguage',
                getFactoryId: 'getFactoryId',
            }),
            initialize() {
                this.initContentData();
            }
        },
        mounted() {
            this.initializeStyle();
        },
        methods: {
            initializeStyle() {
                this.ui.tableHeaderStyle = this.$style.common.tableHeaderStyleColor;

                document.documentElement.style.setProperty("--robotAlarmDlgTableBackgroundColor", this.$style.monitoring.robotAlarmDlgItemBackgroundColor);
                document.documentElement.style.setProperty("--robotAlarmDlgTableBorderColor", this.$style.monitoring.robotAlarmDlgItemBorderColor);
                document.documentElement.style.setProperty("--robotAlarmDlgTableThBackgroundColor", this.$style.monitoring.robotAlarmDlgItemThBackgroundColor);
                document.documentElement.style.setProperty("--robotAlarmDlgTableTdBackgroundColor", this.$style.monitoring.robotAlarmDlgItemTdBackgroundColor);
                document.documentElement.style.setProperty("--robotAlarmDlgTableTdBorderColor", this.$style.monitoring.robotAlarmDlgItemTdBorderColor);
            },
            initContentData() {
                if (Array.isArray(this.contentData) == true) {
                    if (this.contentData.length != 0) {
                        this.list = this.contentData;
                    }
                }
            },
            createDialog(data) {
                this.handle.dialog = true;
                this.getAlarmRatioData(data.alarmcode, data.timestamp);
                this.getAlarmDescData(data.alarmcode, data.alarmid);
                this.getAlarmStopData(data.alarmStatus, data.alarmcode, data.booth, data.zone, data.timestamp); 
                this.datas.alarmInfoData = data;
            },
            closeDialog() {
                this.handle.dialog = false;
            },
            getAlarmRatioData(alarmCode, alarmOccurTime) {
                this.datas.alarmChartData = [];
                let postDatas = {
                    alarmcode: alarmCode,
                    factoryid: this.getFactoryId,
                    selectdate: alarmOccurTime,
                }
                this.$http.post(`${this.baseUrl}/alarmview/data/detail/chart`, postDatas).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`alarmView.child.GridTableWithDialog.popMsg.alarmDataChart`));
                    }
                    else {
                        for (let idx = 0; idx < result.data.length; ++idx) {
                            this.datas.alarmChartData.push({
                                count: result.data[idx].count,
                                zonename: result.data[idx].name,
                            });
                        }
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            getAlarmDescData(alarmCode, alarmId) {
                let postDatas = {
                    alarmid: alarmId,
                }
                this.$http.post(`${this.baseUrl}/alarmview/data/detail/info`, postDatas).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`alarmView.child.GridTableWithDialog.popMsg.alarmDataInfo`));
                    }
                    else {
                        let subCode, alarmType, jobName, lineNo, stopNo, subCodeInfo;
                        let detailInfoData = {};
                        detailInfoData['alarmCode'] = alarmCode;
                        for (let idx = 0; idx < result.data.length; ++idx) {
                            detailInfoData['alarmType'] = result.data[idx].alarm_type;
                            detailInfoData['job_name'] = result.data[idx].job_name;
                            detailInfoData['line_no'] = result.data[idx].line_no;
                            detailInfoData['step_no'] = result.data[idx].step_no;
                            detailInfoData['sub_code_info'] = result.data[idx].sub_code_info;
                            detailInfoData['alarm_type'] = result.data[idx].alarm_type;
                        }
                        this.reqAlarmScriptData(detailInfoData);
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            reqAlarmScriptData(detailInfoData) {
                let postDatas = {
                    alarmcode: detailInfoData.alarmCode,
                    alarmtype: detailInfoData.alarmType
                }
                this.$http.post(`${this.baseUrl}/alarmview/data/detail/manual`, postDatas).then((result) => {
                    if (result.data == '') {
                        this.alarmDesc = [];
                        this.$popmsg(this.$t(`alarmView.child.GridTableWithDialog.popMsg.alarmManual`));
                    }
                    else {
                        this.datas.alarmDesc = result.data;
                        this.datas.alarmDesc[0]['job_name'] = detailInfoData.job_name;
                        this.datas.alarmDesc[0]['line_no'] = detailInfoData.line_no;
                        this.datas.alarmDesc[0]['step_no'] = detailInfoData.step_no;
                        this.datas.alarmDesc[0]['sub_code_info'] = detailInfoData.sub_code_info;
                        this.datas.alarmDesc[0]['alarm_type'] = detailInfoData.alarm_type;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            getAlarmStopData(alarmStatus, alarmCode, booth, zone, date) {
                this.$http.post(`${this.baseUrl}/info/boothid`, { boothname: booth }).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`alarmView.child.GridTableWithDialog.popMsg.reqBoothId`));
                    }
                    else {
                        booth = result.data[0].booth_id;
                        this.$http.post(`${this.baseUrl}/info/zoneid`, { zonename: zone }).then((result) => {
                            if (result.data == '') {
                                this.$popmsg(this.$t(`alarmView.child.GridTableWithDialog.popMsg.reqZoneId`));
                            }
                            else {
                                zone = result.data[0].zone_id;
                                date = date.split(' ');
                                let postDatas = {
                                    alarmcode: alarmCode,
                                    alarmstatus: alarmStatus,
                                    boothid: booth,
                                    zoneid: zone,
                                    selectdate: date[0]
                                }
                                this.$http.post(`${this.baseUrl}/alarmview/data/detail/alarmstop`, postDatas).then((result) => {
                                    if (result.data == '') {
                                        this.datas.alarmStopData = [];
                                        this.$popmsg(this.$t(`alarmView.child.GridTableWithDialog.popMsg.alarmStop`));
                                    }
                                    else {
                                        this.datas.alarmStopData = result.data;
                                    }
                                }).catch((error) => {
                                    this.$log.error(error);
                                })
                            }
                        }).catch((error) => {
                            this.$log.error(error);
                        })
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            }
        }
    }
</script>
    
<style scoped lang="scss">
    @import './robotalarms.scss';
</style>
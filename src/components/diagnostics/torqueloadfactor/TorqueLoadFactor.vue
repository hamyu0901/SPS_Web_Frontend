<template>
    <v-layout column v-bind="initPredictSetting">
        <v-layout column>
            <v-layout>
                <v-flex class="pr-2" lg2>
                    <date-picker 
                        :conditionalDate="datas.predict.date"
                        v-on:getDate="getPrevDate"
                    ></date-picker>
                </v-flex>
                <a><img class="pt-1 pr-2" src="@/images/selector_icon.png"/></a>
                <v-flex lg2>
                    <selector 
                        class="torqueLoadFactorSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.booth`))" 
                        v-bind:selectorOptions="getBoothInfos"
                        v-bind:selectorTRATarget="datas.predict.booth"
                        v-on:selectedTarget="getTargetBoothId"
                        v-bind:predictInUse="getPredictUse()"
                    ></selector>
                </v-flex>
                <v-flex lg2>
                    <selector 
                        class="torqueLoadFactorSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.zone`))" 
                        v-bind:selectorOptions="getSelectedTargetZoneInfos"
                        v-bind:selectorTRATarget="datas.predict.zone"
                        v-on:selectedTarget="getTargetZoneId"
                        v-bind:predictInUse="getPredictUse()"
                    ></selector>
                </v-flex>
                
                <v-flex lg2>
                    <selector 
                        class="torqueLoadFactorSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.robot`))" 
                        v-bind:selectorOptions="getSelectedTargetRobotInfos"
                        v-bind:selectorTRATarget="datas.predict.robot"
                        v-on:selectedTarget="getTargetRobotId"
                        v-bind:predictInUse="getPredictUse()"
                    ></selector>
                </v-flex>
                <!-- <v-btn class="smallBtn" @click="jobUpdateBtnClicked">{{ui.jobUpdate}}</v-btn> -->
                <v-flex lg2>
                    <selector 
                        class="torqueLoadFactorSelector pl-2 pr-2" 
                        v-bind:selectorTitle="ui.selectJobFile"
                        v-bind:selectorOptions="getSelectedTargetJobInfos"
                        v-bind:selectorTRATarget="datas.predict.job"
                        v-on:selectedTarget="getTargetJobFile"
                        v-bind:predictInUse="getPredictUse()"
                    ></selector>
                </v-flex>

                 <v-flex lg2>
                    <selector 
                        class="torqueLoadFactorSelector pl-2 pr-2" 
                        v-bind:selectorTitle="ui.selectAxis"
                        v-bind:selectorOptions="datasByAxis"
                        v-bind:selectorTRATarget="datas.predict.axis"
                        v-on:selectedTarget="getTargetAxisNum"
                        v-bind:predictInUse="getPredictUse()"
                    ></selector>
                </v-flex>

                <v-flex lg1>
                </v-flex>
                <v-spacer/>
                <v-btn class="smallBtn ml-1" @click="searchBtnClicked"><a class="pt-1"><img :src="searchBtnIcon"></a></v-btn>
                <comfirm-dlg
                    v-bind:comfirmDlgType="'jobUpdate'"
                    v-bind:comfirmDlgFlag="comfirmDlgFlag"
                    v-on:comfirmFlag="getComfirmFlag"
                    v-on:closeFlag="comfirmDlgFlag = false"
                ></comfirm-dlg>
            </v-layout>
            <v-layout class="pt-2">
                <v-flex lg12 class="pl-2">
                    <load-factor-by-axis
                        v-bind:chartId="'torqueLoadFactorChart'"
                        v-bind:chartTitle="ui.chartTitle"
                        v-bind:chartHeight="chartHeight"
                        v-bind:chartDatas="loadFactorTrendDatas"
                        v-bind:configDatas="abnormalStandardSettingTableContentDatas"
                    ></load-factor-by-axis>
                </v-flex>
            </v-layout>
            <v-layout class="pt-3 pr-2">
                <v-flex lg6 class="pr-2 pl-2">
                    <work-list-table
                        v-bind:headerData="workListTableHeaderDatas"
                        v-bind:contentData="workListTableContentDatas"
                        v-bind:configDatas="abnormalStandardSettingTableContentDatas"
                    ></work-list-table>
                </v-flex>
                <v-flex lg6>
                    <abnormal-standard-setting-table
                        v-bind:headerData="abnormalStandardSettingTableHeaderDatas"
                        v-bind:contentData="abnormalStandardSettingTableContentDatas"
                        v-bind:date="prevDate"
                        v-on:settingAbnormalData="getSettingAbnormalData"
                        v-on:reloadPage="reloadPage"
                    ></abnormal-standard-setting-table>
                </v-flex>   
            </v-layout>
        </v-layout>
        <loading-dlg
            v-bind:loadingFlag="datas.flag.loading"
        ></loading-dlg>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import DatePicker from '@/commons/DatePicker'
import Selector from '@/commons/Selector'
import GridTable from '@/commons/GridTable'
import AbnormalStandardSettingTable from '@/components/diagnostics/torqueloadfactor/torqueloadfactor/AbnormalStandardSettingTable'
import ViolationRecordTable from '@/components/diagnostics/torqueloadfactor/torqueloadfactor/ViolationRecordTable'
import WorkListTable from '@/components/diagnostics/torqueloadfactor/torqueloadfactor/WorkListTable'
import LoadFactorByAxis from '@/components/diagnostics/torqueloadfactor/torqueloadfactor/LoadFactorByAxis'
import ComfirmDlg from '@/commons/ComfirmDlg'
import LoadingDlg from '@/commons/LoadingDlg'
export default {
    components: {DatePicker, Selector, GridTable, AbnormalStandardSettingTable, ViolationRecordTable, WorkListTable, LoadFactorByAxis, ComfirmDlg, LoadingDlg},
    data() {
        return {
            ui: {
                selectJobFile: this.$t(`diagnostics.torqueLoadFactor.selectJobFile`),
                selectAxis: this.$t(`diagnostics.torqueLoadFactor.selectAxis`),
                exception: this.$t(`diagnostics.torqueLoadFactor.exception`),
                jobUpdate: this.$t(`diagnostics.torqueLoadFactor.jobUpdate`),
                chartTitle: this.$t(`diagnostics.torqueLoadFactor.child.loadFactorByAxis.sumChartTitle`)
            },
            prevDate: '',
            currDate: '',
            updateBtnIcon: require("@/images/update_icon.png"),
            searchBtnIcon: require("@/images/search_icon.png"),
            interval: null,
            targetBoothId: '',
            targetZoneId: '',
            targetRobotId: '',
            targetJobFile: '',
            targetAxisNum: '',
            exceptCheckFlag: true,
            getSelectedTargetZoneInfos: [],
            getSelectedTargetRobotInfos: [],
            getSelectedTargetJobInfos: [],
            chartHeight: 400,
            abnormalStandardSettingTableHeaderDatas: [
                {id: 'type',    title: this.$t(`diagnostics.torqueLoadFactor.abnormalStandardSettingTableHeaderDatas.category`)},
                {id: 'value', title: this.$t(`diagnostics.torqueLoadFactor.abnormalStandardSettingTableHeaderDatas.value`)}
            ],
            abnormalStandardSettingTableRequestInfo: {},
            abnormalStandardSettingTableContentDatas: [],
            datasByAxis: [
                {id: 1, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.1axis`), active: false},
                {id: 2, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.2axis`), active: false},
                {id: 3, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.3axis`), active: false},
                {id: 4, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.4axis`), active: false},
                {id: 5, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.5axis`), active: false},
                {id: 6, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.6axis`), active: false},
                {id: 7, name: this.$t(`diagnostics.torquedata.loadfactorbyaxis.7axis`), active: false}
            ],
            workListTableHeaderDatas: [
                {id: 'timestamp',   title: this.$t(`diagnostics.torqueLoadFactor.workListTableHeaderDatas.timestamp`)},
                {id: 'sum',         title: this.$t(`diagnostics.torqueLoadFactor.workListTableHeaderDatas.sum`)},
                {id: 'cycle',       title: this.$t(`diagnostics.torqueLoadFactor.workListTableHeaderDatas.cycle`)}
            ],
            workListTableContentDatas: [],
            loadFactorTrendDatas: [],
            comfirmDlgFlag: false,
            datas:{
                flag: {
                    predict: false,
                    loading: false
                },
                predict: {
                    date: null,
                    booth: null,
                    zone: null,
                    robot: null,
                    job: null,
                    axis: null,
                },
            }
        }
    },
    
    mounted() {
        this.initalizeStyle();
    },

    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos'     
        }),
      
        initPredictSetting() {
            if (this.fromPredict()) {
                this.prevDate =  this.datas.predict.date = this.$route.query.date;
                for (let i = 0; i < this.getBoothInfos.length; ++i) {
                    if (this.getBoothInfos[i].id === this.$route.query.boothid) {
                        this.datas.predict.booth = {
                            name: this.getBoothInfos[i].name,
                            target: this.getBoothInfos[i].id
                        }
                        this.setBoothID(this.getBoothInfos[i].id);
                    }
                }
                for (let i = 0; i < this.getZoneInfos.length; ++i) {
                    if (this.getZoneInfos[i].id === this.$route.query.zoneid) {
                        this.datas.predict.zone = {
                            name: this.getZoneInfos[i].name,
                            target: this.getZoneInfos[i].id
                        }
                        this.setZoneID(this.getZoneInfos[i].id);
                    }
                }
                for (let i = 0; i < this.getRobotInfos.length; ++i) {
                    if (this.getRobotInfos[i].id === this.$route.query.robotid) {
                        this.datas.predict.robot = {
                            name: this.getRobotInfos[i].name,
                            target: this.getRobotInfos[i].id
                        }
                        this.setRobotID(this.getRobotInfos[i].id);
                    }
                }                
                this.$http.post(`${this.baseUrl}/diagnostics/torquerange/data/joblist`, {
                    factoryid: this.getFactoryId,
                    boothid: this.$route.query.boothid,
                    zoneid: this.$route.query.zoneid,
                    robotid: this.$route.query.robotid
                }).then((result) => {
                    if (result.data.length > 0 && result.data[0].job_list != null) {
                        let tempJobList = [];
                        result.data[0].job_list.forEach(function (jobFile) {
                            tempJobList.push({ id: jobFile, name: jobFile });
                        })
                        this.getJobInfos = tempJobList;
                        for (let i = 0; i < this.getJobInfos.length; ++i) {
                            if (this.getJobInfos[i].id === this.$route.query.job) {
                                this.datas.predict.job = {
                                    name: this.getJobInfos[i].name,
                                    target: this.getJobInfos[i].id
                                }
                                this.setJob(this.getJobInfos[i].name);
                            }
                        }
                    }
                }).then(() => {
                    this.datas.predict.axis = {
                        name: `${this.$route.query.axis}${this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAllDataTable.axis`)}`,
                        target: this.$route.query.axis
                    }
                    this.setAxis(this.$route.query.axis);
                    this.searchBtnClicked();
                })
            }
        },
    },

    methods: {
        initalizeStyle() {
            document.documentElement.style.setProperty("--buttonBackgroundColor", this.$style.diagnostics.torqueLoadFactorItemButtonBackgroundColor);
            document.documentElement.style.setProperty("--buttonColor", this.$style.diagnostics.torqueLoadFactorItemButtonColor);
            document.documentElement.style.setProperty("--tableCardTopColor", this.$style.common.tableCardTopColor);
            document.documentElement.style.setProperty("--tableTheadBackgroundColor", this.$style.common.tableTHeadBGColor);
            document.documentElement.style.setProperty("--tableTheadBorderBottomColor", this.$style.common.tableTHeadBBColor);
            document.documentElement.style.setProperty("--tableTBodyTrOddBackgroundColor", this.$style.common.tableTBodyOddBGColor);
            document.documentElement.style.setProperty("--tableTBodyTrOddBorderBottomColor", this.$style.common.tableTBodyOddBBColor);
            document.documentElement.style.setProperty("--tableTBodyTrEvenBackgroundColor", this.$style.common.tableTBodyEvenBGColor);
            document.documentElement.style.setProperty("--tableTBodyTrEvenBorderBottomColor", this.$style.common.tableTBodyEvenBBColor);
            document.documentElement.style.setProperty("--tableTBodyTrBackgroundColor", this.$style.common.tableTBodyHoverColor);
            document.documentElement.style.setProperty("--tableTBodyPaginationItem", this.$style.common.tablePaginationColor);
            document.documentElement.style.setProperty("--tdTextColor", this.$style.common.tableItemTdTextColor);
            document.documentElement.style.setProperty("--dataTableBorderBottomColor", this.$style.common.tableTBodyBBColor);
        },
        fromPredict() {
            if ('axis' in this.$route.query) {
                this.setPredictUse(true);
                return true;
            }
            else {
                this.setPredictUse(false);
                return false;
            }
        },
        setLoadingDialog(flag) {
            this.datas.flag.loading = flag;
        },
        setPredictUse(flag) {
            this.datas.flag.predict = flag;
        },
        getPredictUse() {
            return this.datas.flag.predict;
        },
        setBoothID(id) {
            this.targetBoothId = id;
        },
        getBoothID() {
            return this.targetBoothId;
        },
        setZoneID(id) {
            this.targetZoneId = id;
        },
        getZoneID() {
            return this.targetZoneId;
        },
        setRobotID(id) {
            this.targetRobotId = id;
        },
        getRobotID() {
            return this.targetRobotId;
        },
        setJob(name) {
            this.targetJobFile = name;
        },
        getJob() {
            return this.targetJobFile;
        },
        setAxis(id) {
            this.targetAxisNum = id;
        },
        getPrevDate(prevDate) {
            this.prevDate = prevDate;
        },
        getCurrDate(currDate) {
            this.currDate = currDate;
        },
        getTargetBoothId(targetId) {
            this.getSelectedTargetZoneInfos = [];
            this.targetBoothId = targetId.target;
            for(let i = 0; i < this.getZoneInfos.length; i++) {
                if(this.getZoneInfos[i].booth == this.targetBoothId) {
                    this.getSelectedTargetZoneInfos.push(this.getZoneInfos[i]);
                }
            }
            if (!this.fromPredict()) {
                
            }
        },
        getTargetZoneId(targetId) {
            this.getSelectedTargetRobotInfos = [];
            this.targetZoneId = targetId.target;
            for(let i = 0; i < this.getRobotInfos.length; i++) {
                if(this.getRobotInfos[i].zone == this.targetZoneId) {
                    this.getSelectedTargetRobotInfos.push(this.getRobotInfos[i]);
                }
            }
            if (!this.fromPredict()) {
                
            }
        },
        getTargetRobotId(targetId) {
            this.targetRobotId = targetId.target;
            if(this.targetRobotId != undefined) {
                this.getJobList();
            } else {
                this.getSelectedTargetJobInfos = [];   
            }
            if (!this.fromPredict()) {
                
            }
        },
        getJobList() {
            let tempJobList = [];
            this.$http.get(`/diagnostics/joblist/factoryid/${this.getFactoryId}/boothid/${this.targetBoothId}/zoneid/${this.targetZoneId}/robotid/${this.targetRobotId}/date/${this.prevDate}`)
            .then((result) => {
                if(result.data.length > 0) {
                    result.data.forEach(joblist => {
                        tempJobList.push({id: joblist.job_name, name: joblist.job_name})
                    });
                    this.getSelectedTargetJobInfos = tempJobList;  
                } else {
                    this.getSelectedTargetJobInfos = [];
                }              
            }) 
        },
        getTargetJobFile(targetJobFile) {
            if(targetJobFile != undefined) {
                this.targetJobFile = targetJobFile.target;
            }
        },
        getTargetAxisNum(targetAxisNum) {
            if(targetAxisNum != undefined) {
                this.targetAxisNum = targetAxisNum.target;
            }
        },
        listBtnClicked() {
            this.dialog = true;
        },
        searchBtnClicked() {
            if(this.prevDate != undefined && this.targetBoothId != undefined 
                && this.targetZoneId != undefined && this.targetRobotId != undefined 
                && this.targetJobFile != undefined && this.targetAxisNum != undefined)
            {
                this.getAbnormalStandardDatas();
                this.getWorkListTableDatas();
                this.getLoadFactorTrendDatas();
            } else {
                this.abnormalStandardSettingTableContentDatas = [];
                this.workListTableContentDatas = [];  
                this.loadFactorTrendDatas = [];
                this.$popmsg(this.$t(`diagnostics.torqueLoadFactor.popMsg.checkSearchData`));
            }
        },
        getAbnormalStandardDatas() {
            let postDatas = {};
            this.abnormalStandardSettingTableContentDatas = [];
            postDatas = this.checkTargetDatas(this.targetBoothId, this.targetZoneId, this.targetRobotId, this.targetJobFile, this.targetAxisNum);
            this.$http.post(`${this.baseUrl}/diagnostics/torqueloadfactor/data/abn/list`, postDatas)
            .then((result) => {
                if(result.data != '') {
                    this.abnormalStandardSettingTableContentDatas = result.data;      
                } 
                else {
                    this.$popmsg(this.$t(`diagnostics.torqueLoadFactor.popMsg.abnormalRefData`));
                }                    
            })
        },
        reloadPage() {
            this.getAbnormalStandardDatas();    
            this.getWorkListTableDatas();
            this.getLoadFactorTrendDatas();
        },
        getSettingAbnormalData(settingAbnormalData) {
            let postDatas = {};
            let configData = {};
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['boothid'] = this.targetBoothId;
            postDatas['zoneid'] = this.targetZoneId;
            postDatas['robotid'] = this.targetRobotId;
            postDatas['jobname'] = this.targetJobFile;
            postDatas['axis'] = this.targetAxisNum;
            postDatas['worktime'] = settingAbnormalData.workingtime;
            configData['maxsum'] = settingAbnormalData.maxsum;
            configData['minsum'] = settingAbnormalData.minsum;
            postDatas['configdata'] = JSON.stringify(configData);
            this.$http.post(`${this.baseUrl}/diagnostics/torqueloadfactor/data/abn`, postDatas)
            .then((result) => {
                this.reloadPage();
            })
        },
        getWorkListTableDatas() {
            let postDatas = {};
            this.workListTableContentDatas = [];  
            postDatas = this.checkTargetDatas(this.targetBoothId, this.targetZoneId, this.targetRobotId, this.targetJobFile, this.targetAxisNum);
            postDatas['excpt'] = Boolean(this.exceptCheckFlag);
            postDatas['prevtime'] = this.prevDate;
            this.setLoadingDialog(true);
            this.$http.post(`${this.baseUrl}/diagnostics/torqueloadfactor/data`, postDatas)
            .then((result) => {
                if(result.data != '') {
                    this.workListTableContentDatas = [];                        
                    this.workListTableContentDatas = result.data;
                    this.setLoadingDialog(false);
                } 
                else {
                    this.$popmsg(this.$t(`diagnostics.torqueLoadFactor.popMsg.currentData`));
                    if(this.workListTableContentDatas.length == 0) {
                        for(let i = 0; i < 5; i++) {
                            this.workListTableContentDatas.push({timestamp: '', acm: '', avg: '', cycle: ''});
                        }
                    }
                    this.setLoadingDialog(false);
                }                    
            }).catch((error) => {
                this.$log.error(error);
                this.setLoadingDialog(false);
            })
        },
        getLoadFactorTrendDatas() {
            let postDatas = {};
            postDatas = this.checkTargetDatas(this.targetBoothId, this.targetZoneId, this.targetRobotId, this.targetJobFile, this.targetAxisNum);
            postDatas['excpt'] = Boolean(this.exceptCheckFlag);
            postDatas['prevtime'] = this.prevDate;
            this.loadFactorTrendDatas = [];
            this.setLoadingDialog(true);
            this.$http.post(`${this.baseUrl}/diagnostics/torqueloadfactor/data`, postDatas)
            .then((result) => {
                if(result.data != '') {
                    this.loadFactorTrendDatas = result.data;
                    this.setLoadingDialog(false);
                } 
                else {
                    this.$popmsg(this.$t(`diagnostics.torqueLoadFactor.popMsg.trendData`));
                    this.setLoadingDialog(false);
                }                    
            }).catch((error) => {
                this.$log.error(error);
                this.setLoadingDialog(false);
            })
        },

        jobUpdateBtnClicked() {
            if(this.prevDate != undefined && this.targetBoothId != undefined && this.targetZoneId != undefined && this.targetRobotId != undefined) {
                this.comfirmDlgFlag = true;
            } 
            else {
                this.$popmsg(this.$t(`diagnostics.torqueRange.popMsg.jobNotUpdate`));
            }
        },

        jobUpdate() {
            this.setLoadingDialog(true);
            this.$http.post(`/diagnostics/job`, {
                'factoryid': this.getFactoryId,
                'date': this.prevDate,
                'boothid': this.targetBoothId,
                'zoneid': this.targetZoneId,
                'robotid': this.targetRobotId
            })
            .then((result) => {
                this.$popmsg(this.$t(`diagnostics.torqueRange.popMsg.jobUpdate`));
                this.setLoadingDialog(false);
                this.getJobList();
            })  
            .catch((error) => {
                this.$log.error(error); 
                this.setLoadingDialog(false);
            }) 
        },

        getComfirmFlag() {
            this.jobUpdate();
            this.comfirmDlgFlag = false;
        },

        dateCompare(preDate, currDate) {
            var preDate = new Date(preDate);
            var currDate = new Date(currDate);    
            return preDate <= currDate;
        },

        checkTargetDatas(boothId, zoneId, robotId, jobName, axisNum) {
            let postDatas = {};
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['boothid'] = boothId;
            postDatas['zoneid'] = zoneId;
            postDatas['robotid'] = robotId;
            postDatas['jobname'] = jobName;
            postDatas['axis'] = axisNum;
            return postDatas;
        }
    }
}
</script>

<style scoped lang="scss">
    @import './torqueloadfactor';
</style>



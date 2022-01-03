<template>
    <v-layout column>
        <v-layout>
            <v-flex class="pr-2" lg3>
                <date-picker v-on:getDate="getPrevDate"></date-picker>
            </v-flex>
            
            <v-flex class="pl-2 pr-2" lg3>
                <date-picker v-on:getDate="getCurrDate"></date-picker>
            </v-flex>
            
            <v-flex class="pl-3 pr-3" lg1>
                <date-types v-on:dateTypes="getDateTypes"></date-types>
            </v-flex>
            <a><img class="pt-1 pr-2" src="@/images/selector_icon.png"/></a>
            <v-flex class="pl-2 pr-2" lg2>
                <selector 
                    class="AlarmstatisticsSelector" 
                    v-bind:selectorTitle="$t(String(`selector.booth`))" 
                    v-bind:selectorOptions="getBoothInfos"
                    v-on:selectedTarget="getTargetBoothId"
                ></selector>
            </v-flex>

            <v-flex class="pl-2 pr-2" lg2>
                <selector 
                    class="AlarmstatisticsSelector" 
                    v-bind:selectorTitle="$t(String(`selector.zone`))" 
                    v-bind:selectorOptions="datas.getSelectedTargetZoneInfos"
                    v-on:selectedTarget="getTargetZoneId"
                ></selector>
            </v-flex>
               
            <v-flex class="pl-2" lg2>
                <selector 
                    class="AlarmstatisticsSelector" 
                    v-bind:selectorTitle="$t(String(`selector.robot`))" 
                    v-bind:selectorOptions="datas.getSelectedTargetRobotInfos"
                    v-on:selectedTarget="getTargetRobotId"
                ></selector>
            </v-flex>  
        </v-layout>
        <v-layout class="pt-2">
            <v-flex lg3 class="pr-2">
                <selector
                    class="FilterSelector"
                    v-bind:selectorTitle="ui.alarmType"
                    v-bind:selectorOptions="datas.alarmTypes"
                    v-on:selectedTarget="getTargetAlarmTypes"
                ></selector>
            </v-flex>

            <v-flex lg3 class="pl-2 pr-2">
            
                <multi-selector
                    class="FilterSelector"
                    v-bind:selectorTitle="ui.multiSelectorTitle"
                    v-bind:selectorOptions="datas.alarmCodes"
                    v-on:selectedTargets="getTargetAlarmCodes"
                ></multi-selector>
              
            </v-flex>

            <v-flex lg2 class="pl-2 pr-2">
                <v-layout>
                    <selector
                        class="FilterSelector pr-2"
                        v-bind:selectorTitle="'COUNT'"
                        v-bind:selectorOptions="ui.countTypes"
                        v-on:selectedTarget="getCountType"
                    ></selector>
                    <input-message
                        class="FilterInputMessage"
                        v-bind:defaultMessage="datas.countNum"
                        v-bind:inputType="'number'"
                        v-on:targetValue="getCountNum"
                    ></input-message>
                </v-layout>
            </v-flex>

            <v-flex lg2 class="pl-2 pr-2">
                <v-layout>
                    <selector   
                        class="FilterSelector pr-2"
                        v-bind:selectorTitle="'DEADTIME'"
                        v-bind:selectorOptions="ui.deadTimeTypes"
                         v-on:selectedTarget="getDeadTimeType"
                    ></selector>
                    <input-message
                        class="FilterInputMessage"
                        v-bind:defaultMessage="datas.deadtimeNum"
                        v-bind:inputType="'number'"
                        v-on:targetValue="getDeadTimeNum"
                    ></input-message>
                </v-layout>
            </v-flex>
            <v-spacer/>
            <v-btn class="searchBtn buttonItem" @click="searchBtnClicked"><a class="pt-1"><img :src="ui.searchBtnIcon"></a></v-btn>
        </v-layout>

        <v-layout class="pt-3" column>
            <p v-bind:style="ui.styleObject">{{ui.alarmStatisticsTrend}}</p>
            <v-flex class="pt-1" lg12>
                <alarm-mixed-chart
                    v-bind:chartId="'alarmMixedChart'"
                    v-bind:chartHeight="ui.chartHeight"
                    v-bind:alarmMixedChartDatas="datas.chartDatas"
                ></alarm-mixed-chart>
            </v-flex>
        </v-layout>
        <v-layout class="pt-4 mt-1">
            <v-flex lg2 class="pr-2">
                <priority-list 
                    v-bind:priorityTitle="ui.priorityContents[0].title"
                    v-bind:priorityDatas="datas.maxAlarmDateStatistics"
                    v-bind:dataValue="'count'"
                    v-on:priorityFlag="getAlarmDateDetail"
                    v-on:selectedPriorityData="getSelectedPriorityData"
                ></priority-list>
                <code-aggregation-dlg 
                    v-bind:priorityFlag="datas.maxAlarmDateFlag"
                    v-bind:codeAlarmDatas="datas.codeAlarmDatas"
                    v-bind:codeStopDatas="datas.codeStopDatas"
                    v-bind:alarmEventDatas="datas.alarmEventDatas"
                    v-bind:alarmStopDatas="datas.alarmStopDatas"
                    v-on:changePriorityFlag="changePriorityFlag"
                ></code-aggregation-dlg>
            </v-flex>
            <v-flex lg2 class="pr-2">
                <priority-list 
                    v-bind:priorityTitle="ui.priorityContents[1].title"
                    v-bind:priorityDatas="datas.maxAlarmNameStatistics"
                    v-bind:dataValue="'sum'"
                    v-on:priorityFlag="getAlarmNameDetail"
                    v-on:selectedPriorityData="getSelectedPriorityData"
                ></priority-list>
                <date-aggregation-dlg
                    v-bind:priorityFlag="datas.maxAlarmNameFlag"
                    v-bind:alarmNameDatas="datas.alarmNameDatas"
                    v-bind:alarmCodeDatas="datas.alarmCodeDatas"
                    v-bind:alarmType="datas.postDatas.hasOwnProperty('alarmType')? datas.postDatas.alarmType : ''"
                    v-bind:dateAggregationDatas="datas.dateAggregationDatas"
                    v-bind:datePeriod="[datas.postDatas.prevDate, datas.postDatas.currDate]"
                    v-on:changePriorityFlag="changePriorityFlag"
                ></date-aggregation-dlg>
            </v-flex>
            <v-flex lg2 class="pr-2">
                <priority-list 
                    v-bind:priorityTitle="ui.priorityContents[2].title"
                    v-bind:priorityDatas="datas.maxStopDateStatistics"
                    v-bind:dataValue="'dt'"
                    v-on:priorityFlag="getAlarmDateDetail"
                    v-on:selectedPriorityData="getSelectedPriorityData"
                ></priority-list>
                <code-aggregation-dlg 
                    v-bind:priorityFlag="datas.maxStopDateFlag"
                    v-bind:codeAlarmDatas="datas.codeAlarmDatas"
                    v-bind:codeStopDatas="datas.codeStopDatas"
                    v-bind:alarmEventDatas="datas.alarmEventDatas"
                    v-bind:alarmStopDatas="datas.alarmStopDatas"
                    v-on:changePriorityFlag="changePriorityFlag"
                ></code-aggregation-dlg>
            </v-flex>
            <v-flex lg2 class="pr-2">
                <priority-list 
                    v-bind:priorityTitle="ui.priorityContents[3].title"
                    v-bind:priorityDatas="datas.maxStopAlarmStatistics"
                    v-bind:dataValue="'dt'"
                    v-on:priorityFlag="getAlarmNameDetail"
                    v-on:selectedPriorityData="getSelectedPriorityData"
                ></priority-list>
                <date-aggregation-dlg
                    v-bind:priorityFlag="datas.maxStopAlarmFlag"
                    v-bind:alarmNameDatas="datas.alarmNameDatas"
                    v-bind:alarmCodeDatas="datas.alarmCodeDatas"
                    v-bind:alarmType="datas.postDatas.hasOwnProperty('alarmType')? datas.postDatas.alarmType : ''"
                    v-bind:dateAggregationDatas="datas.dateAggregationDatas"
                    v-bind:datePeriod="[datas.postDatas.prevDate, datas.postDatas.currDate]"
                    v-on:changePriorityFlag="changePriorityFlag"
                ></date-aggregation-dlg>
            </v-flex>
            <v-flex lg6 class="pl-2">
                <grid-table
                    class="alarmInfoTable"
                    v-bind:headerData="ui.alarmInfoTableHeaderData"
                    v-bind:contentData="datas.alarmInfoTableContentData"    
                    v-bind:highlightFlag="false"                
                ></grid-table>
            </v-flex>
            </v-layout>
            <v-dialog v-model="datas.event.dialog" hide-overlay persistent width="300">
                <v-card color="indigo" dark>
                    <v-card-text>
                        Loading...
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import DatePicker from '@/commons/DatePicker'
import Selector from '@/commons/Selector'
import MultiSelector from '@/commons/MultiSelector'
import InputMessage from '@/commons/InputMessage'
import DateTypes from '@/commons/DateTypes'
import GridTable from '@/commons/GridTable'
import PriorityList from '@/commons/PriorityList'
import AlarmMixedChart from '@/components/diagnostics/alarmstatistics/alarmstatistics/AlarmMixedChart'
import AlarmInfoTable from '@/components/diagnostics/alarmstatistics/alarmstatistics/AlarmInfoTable'
import CodeAggregationDlg from '@/components/diagnostics/alarmstatistics/alarmstatistics/CodeAggregationDlg'
import DateAggregationDlg from '@/components/diagnostics/alarmstatistics/alarmstatistics/DateAggregationDlg'
export default {
    components: {DatePicker, Selector, MultiSelector, InputMessage, DateTypes,  GridTable, PriorityList, AlarmMixedChart, AlarmInfoTable, CodeAggregationDlg, DateAggregationDlg},
    data() {
        return {
            ui: {
                styleObject: null,
                chartHeight: 490,
                searchBtnIcon: require("@/images/search_icon.png"),
                alarmType: this.$t(`diagnostics.alarmstatistics.alarmType`),
                alarmStatisticsTrend: this.$t(`diagnostics.alarmstatistics.alarmStatisticsTrend`),
                multiSelectorTitle: this.$t(`diagnostics.alarmstatistics.multiSelectorTitle`),
                countTypes: [
                {id: 'over',    name: this.$t(`diagnostics.alarmstatistics.overOption`)},
                {id: 'below',   name: this.$t(`diagnostics.alarmstatistics.belowOption`)}
                ],
                deadTimeTypes: [
                    {id: 'over',    name: this.$t(`diagnostics.alarmstatistics.overOption`)},
                    {id: 'below',   name: this.$t(`diagnostics.alarmstatistics.belowOption`)}
                ],  
                priorityContents: [
                    {title: this.$t(`diagnostics.alarmstatistics.priorityContents.maxAlarmDateFlag`), flag: 'maxAlarmDateFlag'},
                    {title: this.$t(`diagnostics.alarmstatistics.priorityContents.maxAlarmNameFlag`), flag: 'maxAlarmNameFlag'},
                    {title: this.$t(`diagnostics.alarmstatistics.priorityContents.maxStopDateFlag`), flag: 'maxStopDateFlag'},
                    {title: this.$t(`diagnostics.alarmstatistics.priorityContents.maxStopAlarmFlag`), flag: 'maxStopAlarmFlag'}
                ],
                alarmInfoTableHeaderData: [
                    { text: this.$t(`diagnostics.alarmstatistics.alarmstatistics.alarminfotable.date`), value: 'date', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.alarmstatistics.alarmstatistics.alarminfotable.alarmcase`), value: 'alarmcase', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.alarmstatistics.alarmstatistics.alarminfotable.alarmcode`), value: 'alarm_code', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.alarmstatistics.alarmstatistics.alarminfotable.alarmquantity`), value: 'count', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.alarmstatistics.alarmstatistics.alarminfotable.deadtime`), value: 'dt', sortable: false, align: 'center'}
                ]
            },
            datas: {
                searchDatas: {
                    prevDate: '',
                    currDate: '',
                    dateType: '',
                    boothId: '',
                    zoneId: '',
                    robotId: '',
                    alarmType: '',
                    selectedAlarmCodes: [],
                    countType: '',
                    countNum: 5,
                    deadtimeType: '',
                    deadtimeNum: 15
                },
                postDatas: {},
                getSelectedTargetZoneInfos: [],
                getSelectedTargetRobotInfos: [],
                alarmInfoTableContentData: [],
                chartDatas: [],
                alarmTypes: [],
                alarmCodes: [],
                maxAlarmDateFlag: false,
                maxAlarmNameFlag: false,
                maxStopDateFlag: false,
                maxStopAlarmFlag: false,
                maxAlarmDateStatistics: [],
                maxAlarmNameStatistics: [],
                maxStopDateStatistics: [],
                maxStopAlarmStatistics: [],
                selectedPriorityType: '',
                selectedPriorityData: null,
                codeAlarmDatas: [],
                codeStopDatas: [],
                alarmEventDatas: [],
                alarmStopDatas: [],
                alarmNameDatas: [],
                alarmCodeDatas: [],
                dateAggregationDatas: [],
                event: {
                    dialog: false
                }
            }
        }
    },

    mounted() {
        this.initializeStyle();
        this.getAlarmType();
    },

    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos',
            getNavigationFlag: 'getNavigationFlag'
        }),  
    },

    methods: {
        initializeStyle() {
            this.ui.styleObject = this.$style.common.titleObjectItemColor;
            document.documentElement.style.setProperty("--buttonBackgroundColor", this.$style.common.buttonItemBackgroundColor);
            document.documentElement.style.setProperty("--buttonColor", this.$style.common.buttonItemColor);
        },

        initDatas() {
           this.datas.chartDatas = [];
            this.datas.alarmInfoTableContentData = [];
            for(let i = 0; i < 4; i++) {
                this.datas.alarmInfoTableContentData.push({date: '', alarmcase: '', alarm_code: '', count: '', dt: ''});
            }
            this.datas.maxAlarmDateStatistics = [];
            this.datas.maxAlarmNameStatistics = [];
            this.datas.maxStopDateStatistics = [];
            this.datas.maxStopAlarmStatistics = []; 
        },

        setLoadingDialog(flag) {
            this.datas.event.dialog = flag;
        },

        getPrevDate(prevDate) {
            this.datas.searchDatas.prevDate = prevDate;
        },

        getCurrDate(currDate) {
            this.datas.searchDatas.currDate = currDate;
            if(this.checkSearchDatas(this.datas.searchDatas)) {
                this.getAlarmCodes(this.datas.searchDatas.prevDate, this.datas.searchDatas.currDate);
            }
        },

        dateCompare(preDate, currDate) {
            var preDate = new Date(preDate);
            var currDate = new Date(currDate);    
            return preDate <= currDate;
        },

        dateDiff(_date1, _date2) {
            let diffDate_1 = _date1 instanceof Date ? _date1 : new Date(_date1);
            let diffDate_2 = _date2 instanceof Date ? _date2 : new Date(_date2);

            let diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
            diff = Math.ceil(diff / (1000 * 3600 * 24));
            return diff;
        },

        getDateTypes(dateType) {
            this.datas.searchDatas.dateType = dateType;
        },

        getTargetBoothId(target) {
            this.datas.getSelectedTargetZoneInfos = [];
            this.datas.searchDatas.boothId = target.target;
            for(let i = 0; i < this.getZoneInfos.length; i++) {
                if(this.getZoneInfos[i].booth == this.datas.searchDatas.boothId) {
                    this.datas.getSelectedTargetZoneInfos.push(this.getZoneInfos[i]);
                }
            }
        },

        getTargetZoneId(target) {
            this.datas.getSelectedTargetRobotInfos = [];
            this.datas.searchDatas.zoneId = target.target;
            for(let i = 0; i < this.getRobotInfos.length; i++) {
                if(this.getRobotInfos[i].zone == this.datas.searchDatas.zoneId) {
                    this.datas.getSelectedTargetRobotInfos.push(this.getRobotInfos[i]);
                }
            }
        },

        getTargetRobotId(target) {
            this.datas.searchDatas.robotId = target.target;
        },

        getTargetAlarmTypes(targetAlarm) {
            this.datas.searchDatas.alarmType = targetAlarm.target;
        },

        getTargetAlarmCodes(selectedAlarmCodes) {
            let tempAlarmCodes = '';
            for(let i = 0; i < selectedAlarmCodes.length; i++) {
                let tempdata = "'" + selectedAlarmCodes[i] + "'"
                if(i == selectedAlarmCodes.length - 1) {
                    tempAlarmCodes += tempdata;    
                } 
                else {
                    tempAlarmCodes += (tempdata + ',');
                }
            }
            this.datas.searchDatas.selectedAlarmCodes = tempAlarmCodes;
        },

        getCountType(countType) {
            this.datas.searchDatas.countType = countType.target;
        },

        getCountNum(countNum) {
            this.datas.searchDatas.countNum = countNum;
        },

        getDeadTimeType(deadtimeType) {
            this.datas.searchDatas.deadtimeType = deadtimeType.target;
        },

        getDeadTimeNum(deadtimeNum) {
            this.datas.searchDatas.deadtimeNum = deadtimeNum;
        },

        checkSearchDatas(searchDatas) {
            if(searchDatas.prevDate != undefined && searchDatas.currDate != undefined && this.dateCompare(searchDatas.prevDate, searchDatas.currDate)) {
                return true;
            }
            else {
                return false;
            }
        },

        getAlarmCodes(prevDate, currDate) {
            let postDatas = {};
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['prevtime'] = prevDate;
            postDatas['currtime'] = currDate;
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/alarm/code`, postDatas)
            .then((result) => {
                if(result.data != '') {
                    let data = [];
                    Object.keys(result.data).forEach(function eachKey(key) {
                        data.push({
                            id: key,
                            name: result.data[key].code
                        });
                    });
                    this.datas.alarmCodes = data;
                }
                else {
                    this.datas.alarmCodes = [];
                }
            
            }).catch((error) => {
                this.$log.error(error);
            })
        },

        searchBtnClicked() {
            /* searchBtn 클릭 시, 과거/현재날짜 및 부스, 존, 로봇 정보 데이터 전송 */
            Object.assign(this.datas.postDatas, this.datas.searchDatas);
            if(this.checkSearchDatas(this.datas.postDatas)) {
                this.setLoadingDialog(true);
                this.getChartDatas(this.datas.postDatas);
                this.getAlarmDataTableDatas(this.datas.postDatas);
                this.getStatisticsDataTableDatas(this.datas.postDatas);
            }
            else {
                this.initDatas();
                this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.checkDate`));
            }
        },

        getAlarmDataTableDatas(postDatas) {
            let tempIndex = 0;
            let targetDatas = {};
            targetDatas = this.checkTargetDatas(postDatas);
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/alarm/${postDatas.dateType.value}`, targetDatas)
            .then((result) => {
                if(result.data != '') {
                    this.datas.alarmInfoTableContentData = [];
                    Object.keys(result.data).forEach(function eachKey(key) {
                        if (typeof result.data[key].dt === 'number') {
                            result.data[key].dt = Math.round(result.data[key].dt);
                        }
                    });
                    this.datas.alarmInfoTableContentData = result.data;
                    if(this.datas.alarmInfoTableContentData.length % 4 != 0) {
                        tempIndex = 4 - this.datas.alarmInfoTableContentData.length % 4;
                        for(let i = 0; i < tempIndex; i++) {
                            this.datas.alarmInfoTableContentData.push({date: '', alarmcase: '', alarm_code: '', count: '', dt: ''});
                        }
                    }
                }
                else {
                    this.datas.alarmInfoTableContentData = [];
                    for(let i = 0; i < 4; i++) {
                        this.datas.alarmInfoTableContentData.push({date: '', alarmcase: '', alarm_code: '', count: '', dt: ''});
                    }
                    this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsData`));
                } 
            }).catch((error) => {   
                this.$log.error(error);
            })
        },

        getStatisticsDataTableDatas(postDatas) {
            let tempIndex = 0;
            let targetDatas = {};
            targetDatas = this.checkTargetDatas(postDatas);
            Promise.all([
                this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarmdate/${postDatas.dateType.value}`, targetDatas),
                this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarmname/${postDatas.dateType.value}`, targetDatas),
                this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/stopday/${postDatas.dateType.value}`, targetDatas),
                this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/stopalarm/${postDatas.dateType.value}`, targetDatas),
            ])
            .then(([resAlarmDate, resAlarmName, resStopDate, resStopAlarm]) => { 
                this.datas.maxAlarmDateStatistics = resAlarmDate.data,
                this.datas.maxAlarmNameStatistics = resAlarmName.data,
                this.datas.maxStopDateStatistics = resStopDate.data,
                this.datas.maxStopAlarmStatistics = resStopAlarm.data;
            })
        },

        getAlarmDateDetail(selectedPriorityType) {
            this.datas.selectedPriorityType = selectedPriorityType;
            for (let i = 0; i < this.ui.priorityContents.length; i++) {
                if (this.ui.priorityContents[i].title == this.datas.selectedPriorityType) {
                    this.datas[this.ui.priorityContents[i].flag] = true;
                }
            }
            this.getCodeAlarmDatas();
            this.getCodeStopDatas();
            this.getAlarmEventDatas();
            this.getAlarmStopDatas();
        },

        getAlarmNameDetail(selectedPriorityType) {
            this.datas.selectedPriorityType = selectedPriorityType;
            for(let i = 0; i < this.ui.priorityContents.length; i++) {
                if(this.ui.priorityContents[i].title == this.datas.selectedPriorityType) {
                    this.datas[this.ui.priorityContents[i].flag] = true;                
                }
            }
            this.getAlarmCodeDatas();   
            this.getAlarmNameDatas();
            this.getDateAggregationDatas();
        },

        changePriorityFlag() {
            for(let i = 0; i < this.ui.priorityContents.length; i++) {
                if(this.ui.priorityContents[i].title == this.datas.selectedPriorityType) {
                    this.datas[this.ui.priorityContents[i].flag] = false;                    
                }
            }
        },

        getCodeAlarmDatas() {
            let postDatas = {};
            this.datas.codeAlarmDatas = [];
            postDatas = this.checkPopupDatas(this.datas.postDatas, this.datas.selectedPriorityData);
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/codealarm`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsCodeAlarm`));
                    } 
                    else {
                        this.datas.codeAlarmDatas = result.data;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },

        getCodeStopDatas() {
            let postDatas = {};
            this.datas.codeStopDatas = [];
            postDatas = this.checkPopupDatas(this.datas.postDatas, this.datas.selectedPriorityData);
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/codestop`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsCodeStop`));
                    } 
                    else {
                        this.datas.codeStopDatas = result.data;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },

        getAlarmEventDatas() {
            let postDatas = {};
            this.datas.alarmEventDatas = [];
            postDatas = this.checkPopupDatas(this.datas.postDatas, this.datas.selectedPriorityData);
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarmevent`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsAlarmEvent`));
                    } 
                    else {
                        this.datas.alarmEventDatas = result.data;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },

        getAlarmStopDatas() {
            let postDatas = {};
            this.datas.alarmStopDatas = [];
            postDatas = this.checkPopupDatas(this.datas.postDatas, this.datas.selectedPriorityData);
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarmstop`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsAlarmStop`));
                    } 
                    else {
                       this.datas.alarmStopDatas = result.data;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },

        getAlarmNameDatas() {
            //alarmcode, prevtime, currtime
            //output: date, dt, count
            let postDatas = {};
            this.datas.alarmNameDatas = [];
            postDatas['alarmcode'] = "'" + this.datas.selectedPriorityData.option + "'";
            postDatas['date'] = this.datas.postDatas.dateType.value;
            postDatas['prevtime'] = this.datas.postDatas.prevDate;
            postDatas['currtime'] = this.datas.postDatas.currDate;
            
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarmname`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsAlarmName`));
                    } 
                    else {
                        this.datas.alarmNameDatas = result.data;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },  
        
        getAlarmCodeDatas() {
            //alarmcode
            //output: alarm_name
            let postDatas = {};
            this.datas.alarmCodeDatas = [];
            postDatas['alarmcode'] = this.datas.selectedPriorityData.option;
            postDatas['alarmtype'] = this.datas.selectedPriorityData.alarm_type;  
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarm/code`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsAlarmCode`));
                    } else {
                        if(postDatas.alarmtype == 0) {
                            result.data['alarm_code'] = this.datas.selectedPriorityData.option;
                            this.datas.alarmCodeDatas = result.data;
                        } else {
                            result.data['alarm_code'] = this.datas.selectedPriorityData.option;
                            this.datas.alarmCodeDatas = result.data;
                        }
                    }
                }).catch((error) => {
                    this.$log.error(error);  
                })
        },

        getDateAggregationDatas() {
            let postDatas = {};
            this.datas.dateAggregationDatas = [];
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['prevtime'] = this.datas.postDatas.prevDate;
            postDatas['currtime'] = this.datas.postDatas.currDate;
            postDatas['alarmcode'] = this.datas.selectedPriorityData.option;
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/gridtable/statistics/alarm/detail/chart`, postDatas)
                .then((result) => {
                    if(result.data == '') {
                        this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsDetailChart`));
                    } else {
                       this.datas.dateAggregationDatas = result.data;
                    }
                }).catch((error) => {
                    this.$log.error(error);  
                })

        },

        getSelectedPriorityData(selectedPriorityData) {
            this.datas.selectedPriorityData = selectedPriorityData;
        },

        getChartDatas(postDatas) {
            let tempIndex = 0;
            let targetDatas = this.checkTargetDatas(postDatas);
            this.$http.post(`${this.baseUrl}/diagnostics/alarmstatistics/data/chart/${postDatas.dateType.value}`, targetDatas).then((result) => {
                if(result.data != '') {
                    Object.keys(result.data).forEach(function eachKey(key) {
                        if(result.data[key].count == null) {
                            result.data[key].count = 0;
                        }
                        if(result.data[key].dt == null) {
                            result.data[key].dt = 0;
                        }
                    });
                    this.datas.chartDatas = result.data;
                    this.setLoadingDialog(false);
                }
                else {
                    this.datas.chartDatas = [];
                    this.setLoadingDialog(false);
                    this.$popmsg(this.$t(`diagnostics.alarmstatistics.popMsg.alarmStatisticsDataChart`));
                }
            }).catch((error) => {
                this.setLoadingDialog(false);
                this.$log.error(error);
            })
        },

        checkPopupDatas(popupDatas, selectedPriorityData) {
            let postDatas = {};
            postDatas['date'] = popupDatas.dateType.value;
            postDatas['prevtime'] = popupDatas.prevtime;
            postDatas['currtime'] = popupDatas.currtime;
            postDatas['boothid'] = popupDatas.boothId;
            postDatas['zoneid'] = popupDatas.zoneId;
            postDatas['alarmdate'] = selectedPriorityData.option;
            postDatas['alarmtype'] = popupDatas.alarmType;
            return postDatas;
        },

        checkTargetDatas(targetDatas) {
            let postDatas = {};
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['prevtime'] = targetDatas.prevDate;
            postDatas['currtime'] = targetDatas.currDate;
            postDatas['daycount'] = this.dateDiff(targetDatas.prevDate, targetDatas.currDate);
            if(targetDatas.boothId != undefined) {
                postDatas['boothid'] = targetDatas.boothId;
            }
            if(targetDatas.zoneId != undefined) {
                postDatas['zoneid'] = targetDatas.zoneId;
            }
            if(targetDatas.robotId != undefined) {
                postDatas['robotid'] = targetDatas.robotId;
            }
            if(targetDatas.alarmType != undefined) {
                postDatas['alarmtype'] = targetDatas.alarmType;
            }
            if(targetDatas.selectedAlarmCodes.length > 0) {
                postDatas['alarmcode'] = targetDatas.selectedAlarmCodes;
            }
            if(targetDatas.countType != undefined) {
                postDatas['cntstd'] = targetDatas.countType;
                postDatas['count'] = targetDatas.countNum;
            }
            if (targetDatas.deadtimeType != undefined) {
                postDatas['dtstd'] = targetDatas.deadtimeType;
                postDatas['deadtime'] = targetDatas.deadtimeNum;
            }
            return postDatas;
        }, 

        getAlarmType() {
            this.$http.get(`${this.baseUrl}/diagnostics/alarmstatistics/data/alarm/type`)
            .then((result) => {
                if (result.data == '') {
                        this.notify(this.info[3].text);
                        return;
                    }
                this.datas.alarmTypes = result.data;
            }).catch((error) => {
                this.$log.error(error);
            })
        },

        notify(msg) {
            this.$notify({
                group: 'pushAlarm',
                text: msg
            });
        },
        
    }
}
</script>

<style scoped lang="scss">
   @import './alarmstatistics';
</style>

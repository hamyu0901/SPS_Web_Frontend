<template>
    <v-layout column>
        <v-layout>
            <v-flex class="pr-2" lg3>
                <date-picker v-on:getDate="getPrevDate"></date-picker>
            </v-flex>
            
            <v-flex class="pl-2 pr-2" lg3>
                <date-picker v-on:getDate="getCurrDate"></date-picker>
            </v-flex>
            
            <v-flex class="pl-3 pr-3" lg2>
                <output-types v-bind:type="data.searchDatas.outputType" v-on:selectedType="getSelectedType"></output-types>
            </v-flex>
          
            <a><img class="pt-1 pl-2 pr-2" :src="ui.sectorIcon"/></a>  
            <v-flex class="pl-2 pr-2" lg2>
                <selector 
                    class="processSelector" 
                    v-bind:selectorTitle="$t(String(`selector.booth`))" 
                    v-bind:selectorOptions="getBoothInfos"
                    v-on:selectedTarget="getTargetBoothId"
                ></selector>
            </v-flex>

            <v-flex class="pl-2 pr-2" lg2>
                <selector 
                    class="processSelector" 
                    v-bind:selectorTitle="$t(String(`selector.zone`))" 
                    v-bind:selectorOptions="data.getSelectedTargetZoneInfos"
                    v-on:selectedTarget="getTargetZoneId"
                ></selector>
            </v-flex>
               
            <v-flex class="pl-2 pr-2" lg2>
                <selector 
                    class="processSelector" 
                    v-bind:selectorTitle="$t(String(`selector.robot`))" 
                    v-bind:selectorOptions="data.getSelectedTargetRobotInfos"
                    v-on:selectedTarget="getTargetRobotId"
                ></selector>
            </v-flex>
            <v-btn class="ml-2 searchBtn" :color="'#237ffe'" @click="searchBtnClicked">
                <a class="pt-1"><img :src="ui.searchBtnIcon"></a>
            </v-btn>  
            <loading-dlg v-bind:loadingFlag="data.loadingFlag"></loading-dlg>
        </v-layout>
        <v-layout column class="pt-5">
            <v-layout>
                <p 
                    v-bind:style="this.ui.styleObject"
                    class="pl-1 pt-2">{{ui.chartTitle + " ( " + data.outputTypeName + " ) "}}
                </p>
                <v-spacer/>
                <v-btn class="settingBtn buttonItem mr-2 elevation-0" round @click="setTemperatureBtnClicked" :disabled="!data.searchFlag">
                    <a><img class="pt-2 pr-2" :src='ui.settingIcon'/></a>{{ui.settingDlgTitle}}
                </v-btn>
                <div class="pr-2" v-for="dataByAxis in data.datasByAxis" :key="dataByAxis.id">
                    <v-btn class="axisBtn" :ref="dataByAxis.id" @click="axisBtnClicked(dataByAxis)" flat :disabled="!data.searchFlag"> {{dataByAxis.title}} </v-btn>
                </div>
                <v-dialog
                    v-model="data.settingValueDlgFlag"
                    width="400"
                    persistent
                >
                    <v-card class="dialogContent">
                    <v-card-title class="headline">{{ui.settingDlgTitle}}</v-card-title>
                    <temp-setting-dlg 
                        class="pl-3 pr-3"
                        v-bind:settingValue="data.settingValue"
                        v-on:settingValue="getSettingValue"
                    ></temp-setting-dlg>
                    <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        class="buttonItem"
                        @click="settingValueBtnClick"
                    >
                        {{ui.accept}}
                    </v-btn>
                    <v-btn
                        class="buttonItem"
                        @click="closeSettingValueDlg"
                    >
                        {{ui.close}}
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-layout>
            <v-layout class="pt-5">
                <v-flex lg12>
                    <temperature-chart
                        v-bind:chartId="'temperatureChart'"
                        v-bind:chartHeight="ui.window.height"
                        v-bind:chartDatas="data.torqueTemperatureDatas"
                    ></temperature-chart>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import DatePicker from '@/commons/DatePicker'
import Selector from '@/commons/Selector'
import OutputTypes from '@/components/diagnostics/torquetemperature/torquetemperature/OutputTypes'
import TemperatureChart from '@/components/diagnostics/torquetemperature/torquetemperature/TemperatureChart'
import TempSettingDlg from '@/components/diagnostics/torquetemperature/torquetemperature/TempSettingDlg'
import LoadingDlg from '@/commons/LoadingDlg'
export default {
    components: {DatePicker, Selector, OutputTypes, TemperatureChart, TempSettingDlg, LoadingDlg},
    data() {
        return {
            ui: {
                window: {
                    height: 0
                },
                sectorIcon: require("@/images/selector_icon.png"),
                searchBtnIcon: require("@/images/search_icon.png"),
                styleObject: null,
                chartTitle: this.$t(`diagnostics.torqueTemperature.chartTitle`),
                settingIcon: require("@/images/setting.png"),
                settingDlgTitle: this.$t(`diagnostics.torqueTemperature.settingDlgTitle`),
                accept: this.$t(`diagnostics.torqueTemperature.accept`),
                close: this.$t(`diagnostics.torqueTemperature.close`)
            },
            data: {
                prevDate: '',
                currDate: '',
                weeks: '',
                outputType: '',
                outputTypeName: this.$t(`diagnostics.torqueTemperature.outputTypeName`),
                targetBoothId: '',
                targetZoneId: '',
                targetRobotId: '',
                settingValue: null,
                axisNum: 0,
                searchFlag: false,
                settingValueDlgFlag: false,
                loadingFlag: false,
                searchDatas: {
                    prevDate: '',
                    currDate: '',
                    weeks: '',
                    boothId: '',
                    zoneId: '',
                    robotId: '',
                    outputType: '',
                },
                postDatas: {},
                getSelectedTargetZoneInfos: [],
                getSelectedTargetRobotInfos: [],
                datasByAxis: [
                    {id: '1', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.1axis`)},
                    {id: '2', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.2axis`)},
                    {id: '3', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.3axis`)},
                    {id: '4', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.4axis`)},
                    {id: '5', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.5axis`)},
                    {id: '6', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.6axis`)},
                    {id: '7', title: this.$t(`diagnostics.torqueTemperature.datasByAxis.7axis`)}
                ],
                torqueTemperatureDatas: []
            }
        }
    },
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos',
        }),
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    mounted() {
        this.initializeStyle();
    },
    methods: {
        initializeStyle() {
            this.ui.styleObject = this.$style.common.titleObjectItemColor;
            document.documentElement.style.setProperty("--btnAxisBorderColor", this.$style.common.axisButtonItemBorderColor);
            document.documentElement.style.setProperty("--axisBtnHoverBackgroundColor", this.$style.common.axisButtonItemActiveBackgroundColor);
            document.documentElement.style.setProperty("--axisBtnHoverColor", this.$style.common.axisButtonItemActiveColor);
            document.documentElement.style.setProperty("--buttonBackgroundColor", this.$style.common.buttonItemBackgroundColor);
            document.documentElement.style.setProperty("--buttonColor", this.$style.common.buttonItemColor);
            document.documentElement.style.setProperty("--chartCardColor", this.$style.diagnostics.torqueTemperatureItemChartCardColor);
            document.documentElement.style.setProperty("--cartCardBorderColor", this.$style.diagnostics.torqueTemperatureItemCartCardBorderColor);
            document.documentElement.style.setProperty("--dialogContentBackgroundColor", this.$style.diagnostics.tempSettingDlgItemBackgroundColor);
        },
        handleResize() {
            this.ui.window.height = window.innerHeight / 1.5;
        },
        getPrevDate(prevDate) {
            this.data.searchDatas.prevDate = prevDate;
        },
        getCurrDate(currDate) {
            this.data.searchDatas.currDate = currDate;
        },
        getTargetBoothId(target) {
            this.data.getSelectedTargetZoneInfos = [];
            this.data.searchDatas.boothId = target.target;
            for (let i = 0; i < this.getZoneInfos.length; i++) {
                if (this.getZoneInfos[i].booth == this.data.searchDatas.boothId) {
                    this.data.getSelectedTargetZoneInfos.push(this.getZoneInfos[i]);
                }
            }
        },
        getTargetZoneId(target) {
            this.data.getSelectedTargetRobotInfos = [];
            this.data.searchDatas.zoneId = target.target;
            for (let i = 0; i < this.getRobotInfos.length; i++) {
                if(this.getRobotInfos[i].zone == this.data.searchDatas.zoneId) {
                    this.data.getSelectedTargetRobotInfos.push(this.getRobotInfos[i]);
                }
            }
        },
        getTargetRobotId(target) {
            this.data.searchDatas.robotId = target.target;
        },
        getSettingValue(settingValue) {
            this.data.settingValue = Number(settingValue);
        },
        getSelectedType(outputType) {
            if(outputType != '') {
                this.data.outputTypeName = outputType.name;
            } else {
                this.data.outputTypeName = this.$t(`diagnostics.torqueTemperature.outputTypeName`);
            }
        },
        setLoadingFlag(loadingFlag) {
            this.data.loadingFlag = loadingFlag;
        },
        searchBtnClicked() {
            this.data.searchDatas.weeks = this.calcDate(this.data.searchDatas.prevDate, this.data.searchDatas.currDate);
            this.setOutputTpyes(this.data.searchDatas.weeks);
            Object.assign(this.data.postDatas, this.data.searchDatas);
            if(this.checkPostDatas(this.data.postDatas)) {
                this.data.searchFlag = true;
                this.axisBtnClicked({id: 1});
            } else {
                this.data.searchFlag = false;
                this.data.torqueTemperatureDatas = [];
                this.data.searchDatas.outputType = '';
                this.defaultAxisBtn();
                this.$popmsg(this.$t(`diagnostics.torqueTemperature.popMsg.checkSearchData`));
            }
        },
        checkPostDatas(postDatas) {
            let checkFlag = false;
            if(
                postDatas.prevDate != undefined && 
                postDatas.currDate != undefined && 
                postDatas.boothId != undefined && 
                postDatas.zoneId != undefined && 
                postDatas.robotId != undefined
                ) {
                    checkFlag = true;
            }
            return checkFlag;
        },
        settingValueBtnClick() {
            this.setTorqueSettingValue(this.data.settingValue);
            this.data.settingValueDlgFlag = false;
        },

        closeSettingValueDlg() {
            this.data.settingValueDlgFlag = false;
        },

        calcDate(prevDate, currDate) {
            let diffWeeks;
            let tmpPrevDate = new Date(prevDate);
            let tmpCurrDate = new Date(currDate);
            let diffTime = tmpCurrDate - tmpPrevDate;
            if(diffTime < 0) {
                diffWeeks = -1;
            }
            else {
                diffWeeks = Math.ceil(diffTime / (1000*60*60*24*7));
            }
            return diffWeeks;
        },
        getTodayDate() {
            let date;
            let today = new Date();
            date = this.$moment(today).format('YYYY-MM-DD hh:mm:ss');
            return date;
        },
        setOutputTpyes(weeks) {
            if(weeks === 0) {
                this.data.searchDatas.outputType = 'hour';
            } else if(weeks > 0 && weeks <= 4) {
                this.data.searchDatas.outputType = 'day';
            } else if(weeks > 4 && weeks <= 32) {
                this.data.searchDatas.outputType = 'week';
            } else if(weeks > 32){
                this.data.searchDatas.outputType = 'month';
            } 
        },
        setTemperatureBtnClicked() {
            this.data.settingValueDlgFlag = true;
        },
        setTorqueSettingValue(settingValue) {
            let postDatas = {};
            postDatas['factoryid'] = this.getFactoryId;
            postDatas['boothid'] = this.data.postDatas.boothId;
            postDatas['zoneid'] = this.data.postDatas.zoneId;
            postDatas['robotid'] = this.data.postDatas.robotId;
            postDatas['axis'] = this.data.axisNum;
            postDatas['updatetime'] = this.getTodayDate();
            postDatas['templimit'] = settingValue;
            this.$http.post('/diagnostics/torquetemperature/data/limit', postDatas).then((result) => {
                this.getTorqueSettingValue();
            })
        },  
        getTorqueSettingValue() {
            let params = {};
            params['factoryid'] = this.getFactoryId;
            params['boothid'] = this.data.postDatas.boothId;
            params['boothid'] = this.data.postDatas.boothId;
            params['zoneid'] = this.data.postDatas.zoneId;
            params['robotid'] = this.data.postDatas.robotId;
            params['axis'] = this.data.axisNum;
            this.$http.get(`diagnostics/torquetemperature/data/limit`, {params: params}).then((result) => {
                if(result.data.length > 0) {
                    this.data.settingValue = result.data[0].limit;
                } else {
                    this.data.settingValue = null;
                    this.$popmsg(this.$t(`diagnostics.torqueTemperature.popMsg.noReferenceTempData`));
                }
                this.getTorqueTempDatas(this.data.postDatas, this.data.axisNum);
            })
        },
        axisBtnClicked(axisData) {
            let index;
            if(this.data.searchFlag == true) {
                index = Object.keys(this.$refs);  
                for(let i = 1; i <= index.length; i++) {
                    if(axisData.id == i) {
                        this.data.axisNum = i;
                        this.$refs[i][0].$el.style.backgroundColor = this.$style.common.axisButtonItemActiveBackgroundColor;
                        this.$refs[i][0].$el.style.color = this.$style.common.axisButtonItemActiveColor;
                        this.$refs[i][0].$el.style.border = 0;
                        this.setLoadingFlag(true);
                        this.getTorqueSettingValue();
                    } else {
                        this.$refs[i][0].$el.style.backgroundColor = this.$style.common.axisButtonItemBackgroundColor;
                        this.$refs[i][0].$el.style.color = this.$style.common.axisButtonItemColor;
                        this.$refs[i][0].$el.style.border = "";
                    }
                }
            }
        },
        checkDatas(targetDatas, axis) {
            let postDatas = {};
            postDatas['encoder'] = axis;
            postDatas['boothid'] = targetDatas.boothId;
            postDatas['zoneid'] = targetDatas.zoneId;
            postDatas['robotid'] = targetDatas.robotId;
            postDatas['prevtime'] = targetDatas.prevDate + " 00:00:00";
            postDatas['endtime'] = targetDatas.currDate + " 23:59:59";
            
            return postDatas;
        },
        getTorqueTempDatas(targetDatas, axis) {
            let postDatas = {};
            postDatas = this.checkDatas(targetDatas, axis);
            this.$http.post(`diagnostics/torquetemperature/data/trend/`+targetDatas.outputType, postDatas).then((result) => {
                if(result.data.length > 0) {
                    Object.keys(result.data).forEach(function eachKey(key) {
                        result.data[key].settingValue = this.data.settingValue;
                        result.data[key].output_type = String(targetDatas.outputType).substring(0,1).toUpperCase();
                    }.bind(this));
                    this.data.torqueTemperatureDatas = result.data;
                }
                else {
                    this.data.torqueTemperatureDatas = [];
                    this.$popmsg(this.$t(`diagnostics.torqueTemperature.popMsg.noTorqueTemperatureData`))
                }
                this.setLoadingFlag(false);
            })
        },
        defaultAxisBtn() {
            let index = Object.keys(this.$refs);
            for(let i = 1; i <= index.length; i++) {
                this.$refs[i][0].$el.style.backgroundColor = this.$style.common.axisButtonItemBackgroundColor;
                this.$refs[i][0].$el.style.color = this.$style.common.axisButtonItemColor;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import './torquetemperature';
</style>
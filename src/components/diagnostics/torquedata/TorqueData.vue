<template>
    <v-layout column>
        <v-layout column>
            <v-layout>
                <v-flex class="pr-2" lg3>
                    <date-picker v-on:getDate="getPrevDate"></date-picker>
                </v-flex>
                
                <v-flex class="pl-2 pr-2" lg3>
                </v-flex>
                
                <a><img class="pt-1 pl-4 pr-2" src="@/images/selector_icon.png"/></a>
                
                <v-flex lg2>
                    <selector 
                        class="TorqueDataSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.booth`))" 
                        v-bind:selectorOptions="getBoothInfos"
                        v-on:selectedTarget="getTargetBoothId"
                    ></selector>
                </v-flex>
                
                <v-flex lg2>
                    <selector 
                        class="TorqueDataSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.zone`))" 
                        v-bind:selectorOptions="datas.getSelectedTargetZoneInfos"
                        v-on:selectedTarget="getTargetZoneId"
                    ></selector>
                </v-flex>
                
                <v-flex lg2>
                    <selector 
                        class="TorqueDataSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.robot`))" 
                        v-bind:selectorOptions="datas.getSelectedTargetRobotInfos"
                        v-on:selectedTarget="getTargetRobotId"
                    ></selector>
                </v-flex>
                <v-spacer/>
                <v-btn class="searchBtn" :color="ui.searchBtnColor"  @click="searchBtnClicked"><a class="pt-1"><img :src="ui.searchBtnIcon"></a></v-btn>
            </v-layout>
            <v-layout class="pt-4">
                <v-flex lg7>
                    <paging-data-grid
                        v-bind:headerData="datas.workInfoTableHeaderData"
                        v-bind:contentCount="datas.workInfoTableContentCount"
                        v-bind:contentData="datas.workInfoTableContentData"
                        v-on:pageNum="getWorkDataTableDatas"
                        v-on:getGridDataTableData="getWorTimeDatas"
                        v-bind:highlightFlag="true"
                    ></paging-data-grid>
                </v-flex>   
                <v-flex lg5 class="pl-4">
                    <setting-info-table
                        v-bind:contentDatas="datas.settingInfoTableDatas"
                    ></setting-info-table>
                </v-flex>
            </v-layout>
        </v-layout>
        <v-layout class="pt-3" column>
            <v-layout>
                <p 
                v-bind:style="ui.styleObject"
                class="pl-1 pt-2">{{ui.loadFactorTitle}}</p>
                <v-spacer/>
                <p v-bind:style="ui.styleObject" class="pl-1 pt-1"
                >{{ui.axisXOutputTitle + ": "}}</p>
                <auto-selector 
                    class="TorqueDataSelector pt-1 pr-3"
                    v-bind:showFlag="datas.flag.autoSelector"
                    v-bind:selectorOptions="datas.chartOutputTypes"
                    v-on:selectedItem="getChartOutputTypes"
                ></auto-selector>
                <div class="pr-2" v-for="dataByAxis in datas.datasByAxis" :key="dataByAxis.id">
                    <v-btn class="axisBtn" :ref="dataByAxis.id" @click="axisBtnClicked(dataByAxis)" flat :disabled="datas.flag.axis"> {{dataByAxis.title}} </v-btn>
                </div>
            </v-layout>
            <v-layout class="subTitle pl-1" v-if="datas.selectedWorkDatas != ''">
                <p class="jobName pr-2">{{datas.selectedWorkDatas.job_name}}</p>
                <p class="pr-2">{{'START  '+ datas.selectedWorkDatas.s_time}}</p>
                <p class="pr-2">{{'END  '+ datas.selectedWorkDatas.e_time}}</p>
                <p class="">{{'CYCLE  '+ datas.selectedWorkDatas.cycle_time}}</p>
            </v-layout>
            <load-factor-by-axis
                v-bind:chartId="'torqueDataChart'"
                v-bind:chartDatas="datas.chartDatas"
                v-bind:chartOutputType="datas.chartOutputType"
            ></load-factor-by-axis>
        </v-layout>
        <loading-dlg v-bind:loadingFlag="datas.event.dialog"></loading-dlg>
    </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import DatePicker from '@/commons/DatePicker'
import Selector from '@/commons/Selector'
import AutoSelector from '@/commons/AutoSelector'
import PagingDataGrid from '@/commons/PagingDataGrid'
import LoadingDlg from '@/commons/LoadingDlg'
import SettingInfoTable from '@/components/diagnostics/torquedata/torquedata/SettingInfoTable'
import LoadFactorByAxis from '@/components/diagnostics/torquedata/torquedata/LoadFactorByAxis'
export default {
    components: { DatePicker, Selector, AutoSelector, PagingDataGrid, LoadingDlg, SettingInfoTable, LoadFactorByAxis},
    data() {
        return {
            ui: {
                loadFactorTitle: this.$t(`diagnostics.torquedata.loadfactorbyaxis.title`),
                searchBtnIcon: require("@/images/search_icon.png"),
                searchBtnColor: "",
                axisXOutputTitle: this.$t(`diagnostics.torquedata.axisXOutputTitle`),
                styleObject: null
            },
            datas: {
                getSelectedTargetZoneInfos: [],
                getSelectedTargetRobotInfos: [],
                cardHeight: 500,
                chartHeight: 490,
                axisNum: 0,
                selectedWorkDatas: [],
                workInfoTableContentCount: 0,
                workInfoTableContentData: [],
                workInfoTableHeaderData: [
                    { text: this.$t(`diagnostics.torquedata.worktimetable.jobname`), value: 'job_name', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.torquedata.worktimetable.starttime`), value: 's_time', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.torquedata.worktimetable.endtime`), value: 'e_time', sortable: false, align: 'center'},
                    { text: this.$t(`diagnostics.torquedata.worktimetable.worktime`), value: 'cycle_time', sortable: false, align: 'center'}
                ],
                settingInfoTableDatas: [],
                chartDatas: [],
                datasByAxis: [
                    {id: '1', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.1axis`), active: false},
                    {id: '2', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.2axis`), active: false},
                    {id: '3', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.3axis`), active: false},
                    {id: '4', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.4axis`), active: false},
                    {id: '5', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.5axis`), active: false},
                    {id: '6', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.6axis`), active: false},
                    {id: '7', title: this.$t(`diagnostics.torquedata.loadfactorbyaxis.7axis`), active: false}
                ],
                searchDatas: {
                    date: '',
                    boothId: '',
                    zoneId: '',
                    robotId: ''
                },
                postDatas: {},
                chartOutputTypes: [
                    {id: "step", name: "Step Number"},
                    {id: "sec", name: "Time(sec)"}
                ],
                chartOutputType: {},
                event: {
                    dialog: false
                },
                flag: {
                    axis: true,
                    autoSelector: true
                }
            }
        }
    },

    mounted() {
        this.initializeStyle();
    },
    
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos'     
        })
    },

    methods: {
        initializeStyle() {
            this.ui.searchBtnColor = this.$style.diagnostics.torqueDataItemSearchButtonColor;
            this.ui.styleObject = this.$style.common.titleObjectItemColor;
            document.documentElement.style.setProperty("--subTitleColor", this.$style.diagnostics.torqueDataItemSubTitleColor);
            document.documentElement.style.setProperty("--btnAxisBorderColor", this.$style.common.axisButtonItemBorderColor);
            document.documentElement.style.setProperty("--axisBtnHoverBackgroundColor", this.$style.common.axisButtonItemActiveBackgroundColor);
            document.documentElement.style.setProperty("--axisBtnHoverColor", this.$style.common.axisButtonItemActiveColor);
        },

        setLoadingDialog(flag) {
            this.datas.event.dialog = flag;
        },

        setDisableAxis(flag) {
            this.datas.flag.axis = flag;
        },

        getPrevDate(prevDate) {
            this.datas.searchDatas.date = prevDate;
            this.setDisableAxis(true);
        },

        getTargetBoothId(target) {
            this.datas.getSelectedTargetZoneInfos = [];
            this.datas.searchDatas.boothId = target.target;
            this.datas.searchDatas.zoneId = undefined;
            for(let i = 0; i < this.getZoneInfos.length; i++) {
                if(this.getZoneInfos[i].booth == this.datas.searchDatas.boothId) {
                    this.datas.getSelectedTargetZoneInfos.push(this.getZoneInfos[i]);
                }
            }
            this.setDisableAxis(true);
        },

        getTargetZoneId(target) {
            this.datas.getSelectedTargetRobotInfos = [];
            this.datas.searchDatas.zoneId = target.target;
            this.datas.searchDatas.robotId = undefined;
            for(let i = 0; i < this.getRobotInfos.length; i++) {
                if(this.getRobotInfos[i].zone == this.datas.searchDatas.zoneId) {
                    this.datas.getSelectedTargetRobotInfos.push(this.getRobotInfos[i]);
                }
            }
            this.setDisableAxis(true);
        },

        getTargetRobotId(target) {
            this.datas.searchDatas.robotId = target.target;
            this.setDisableAxis(true);
        },

        getChartOutputTypes(chartOutputType) {
            this.datas.chartOutputType = chartOutputType;
        },

        checkSearchDatas(searchDatas) {
            if(searchDatas.date != undefined && searchDatas.boothId != undefined && searchDatas.zoneId != undefined && searchDatas.robotId != undefined) {
                return true;
            }
            else {
                return false;
            } 

        },

        checkTargetDatas(postDatas) {
            let targetDatas = {};
            targetDatas['factoryid'] = this.getFactoryId;
            targetDatas['prevtime'] = postDatas.date;
            targetDatas['boothid'] = postDatas.boothId;
            targetDatas['zoneid'] = postDatas.zoneId;
            targetDatas['robotid'] = postDatas.robotId;
            return targetDatas;
        },

        searchBtnClicked() {
            Object.assign(this.datas.postDatas, this.datas.searchDatas);
            if(this.checkSearchDatas(this.datas.postDatas)) {
                this.getWorkDataCount(this.datas.postDatas);
                this.getSettingInfoTableDatas(this.datas.postDatas);
            }
            else {
                this.datas.selectedWorkDatas = []
                this.datas.workInfoTableContentData = []
                this.datas.settingInfoTableDatas = []
                this.datas.chartDatas =  []
                this.defaultAxisBtn();
                this.$popmsg(this.$t(`diagnostics.torquedata.popMsg.checkSearchData`));
            }
            
        },

        getWorkDataCount(postDatas) {
            this.$http.get(`/diagnostics/worklist/count/factoryid/${this.getFactoryId}/boothid/${postDatas.boothId}/zoneid/${postDatas.zoneId}/robotid/${postDatas.robotId}/date/${postDatas.date}`).then(result => {
                if(result.data.length > 0) {
                    this.datas.workInfoTableContentCount = Number(result.data[0].count);
                    this.getWorkDataTableDatas(1);
                }
            }).catch(error => {
                this.$log.error(error);
            })
        },

         getWorkDataTableDatas(pageNum) { 
            let targetDatas = {};
            let tempIndex = 0;
            this.$http.get(`/diagnostics/worklist/paging/factoryid/${this.getFactoryId}/boothid/${this.datas.postDatas.boothId}/zoneid/${this.datas.postDatas.zoneId}/robotid/${this.datas.postDatas.robotId}/date/${this.datas.postDatas.date}/page/${pageNum}`).then(result => {
                if(result.data.length > 0) {
                    Object.keys(result.data).forEach(function eachKey(key) {
                        if (typeof result.data[key].s_time === 'string' && typeof result.data[key].e_time === 'string') {
                            result.data[key].s_time = result.data[key].s_time.replace("T", " ");
                            result.data[key].s_time = result.data[key].s_time.replace("Z", "");
                            result.data[key].e_time = result.data[key].e_time.replace("T", " ");
                            result.data[key].e_time = result.data[key].e_time.replace("Z", "");
                        }
                    });
                    let tempDatas = result.data;
                    if (tempDatas.length % 5 != 0) {
                        tempIndex = 5 - (tempDatas.length % 5);
                        for (let i = 0; i < tempIndex; i++) {
                            tempDatas.push({ job_name: '', s_time: '', e_time: '', cycle_time: '' });
                            if(i === (tempIndex-1)) {
                                for(let j = 0; j < (pageNum-1)*5; j++) {
                                    tempDatas.unshift({ job_name: '', s_time: '', e_time: '', cycle_time: '' });
                                }
                            }
                        }
                    } else {
                        for(let j = 0; j < (pageNum-1)*5; j++) {
                            tempDatas.unshift({ job_name: '', s_time: '', e_time: '', cycle_time: '' });
                        }
                    }
                    this.datas.workInfoTableContentData = tempDatas;
                    this.setDisableAxis(false);
                    this.setLoadingDialog(false);
                } else {
                    this.$popmsg(this.$t(`diagnostics.torquedata.popMsg.torqueDataGridTable`));
                    this.datas.selectedWorkDatas = [];
                    this.datas.workInfoTableContentData = [];
                    this.datas.chartDatas = [];
                    this.defaultAxisBtn();
                }
                
            }).catch(error => {
                this.$log.error(error);
            })
        },

        getSettingInfoTableDatas(postDatas) {
            let targetDatas = {};
            targetDatas = this.checkTargetDatas(postDatas);
            delete targetDatas.prevtime;
            this.$http.post(`${this.baseUrl}/diagnostics/torquedata/data/table`, targetDatas).then((result) => {
                if (result.data != '') {
                    this.datas.settingInfoTableDatas = result.data;
                } 
                else {
                    this.datas.settingInfoTableDatas = [];
                    this.$popmsg(this.$t(`diagnostics.torquedata.popMsg.settingInfoTable`));
                }
            }).catch((error) => {
                this.$log.error(error);
                this.setLoadingDialog(false);
            })
        },

        
        getWorTimeDatas(workDatas) {
            this.datas.selectedWorkDatas = workDatas;
            this.getChartDatas(workDatas, 1);
            this.axisBtnHighLight(1);
        },

        getChartDatas(postDatas, axisNum) {
            let targetDatas = {};
            this.datas.chartDatas = [];
            targetDatas = this.checkTargetDatas(this.datas.postDatas);
            targetDatas['starttime'] = postDatas.s_time;
            targetDatas['endtime'] = postDatas.e_time;
            targetDatas['jobfile'] = postDatas.job_name;
            targetDatas['axis'] = axisNum;
            this.setLoadingDialog(true);
            this.$http.get(`/diagnostics/torquedata/data/trend/factoryid/${targetDatas.factoryid}/boothid/${targetDatas.boothid}/zoneid/${targetDatas.zoneid}/robotid/${targetDatas.robotid}/axis/${targetDatas.axis}/starttime/${targetDatas.starttime}/endtime/${targetDatas.endtime}/jobfile/${targetDatas.jobfile}`)
            .then(result => {
                if(result.data.length > 0) {
                    this.datas.chartDatas = result.data;
                    this.setLoadingDialog(false);
                } else {
                    this.datas.chartDatas = [];
                    this.$popmsg(this.$t(`diagnostics.torquedata.popMsg.chartDatas`));
                    this.setLoadingDialog(false);
                }
            }).catch(error => {
                this.$log.error(error);
                this.setLoadingDialog(false);
            })
        },

        axisBtnClicked(axisData) {
            this.axisBtnHighLight(axisData.id);
            this.getChartDatas(this.datas.selectedWorkDatas, axisData.id);
        },

        axisBtnHighLight(axisNum) {
            let index = Object.keys(this.$refs)[axisNum-1];
            this.$refs[index][0].$el.style.backgroundColor = this.$style.common.axisButtonItemActiveBackgroundColor;
            this.$refs[index][0].$el.style.color = this.$style.common.axisButtonItemActiveColor;
            this.$refs[index][0].$el.style.border = 0;
            this.datas.datasByAxis[0].active = true;

            for (let i = 0; i < Object.keys(this.$refs).length; i++) {
                if (i != (axisNum-1)) {
                    this.$refs[i + 1][0].$el.style.backgroundColor =  this.$style.common.axisButtonItemBackgroundColor;
                    this.$refs[i + 1][0].$el.style.color = this.$style.common.axisButtonItemColor;
                    this.$refs[i + 1][0].$el.style.border = "";    
                }
                this.datas.datasByAxis[i].active = false;
            }
        },

        defaultAxisBtn() {
            let index = Object.keys(this.$refs);
            for(let i = 1; i < index.length; i++) {
                this.$refs[i][0].$el.style.color = "";
                this.$refs[i][0].$el.style.border = "";
                this.datas.datasByAxis[i-1].active = false;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import './torquedata';
</style>



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
                        class="AtomizerDataSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.booth`))" 
                        v-bind:selectorOptions="getBoothInfos"
                        v-on:selectedTarget="getTargetBoothId"
                    ></selector> 
                </v-flex>
                
                <v-flex lg2>
                    <selector 
                        class="AtomizerDataSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.zone`))" 
                        v-bind:selectorOptions="getSelectedTargetZoneInfos"
                        v-on:selectedTarget="getTargetZoneId"
                    ></selector>
                </v-flex>
                
                <v-flex lg2>
                    <selector 
                        class="AtomizerDataSelector pl-2 pr-2" 
                        v-bind:selectorTitle="$t(String(`selector.robot`))" 
                        v-bind:selectorOptions="getSelectedTargetRobotInfos"
                        v-on:selectedTarget="getTargetRobotId"
                    ></selector>
                </v-flex>
                <v-spacer/>
                <v-btn class="searchBtn" :color="'#237ffe'"  @click="searchBtnClicked"><a class="pt-1"><img :src="searchBtnIcon"></a></v-btn>
            </v-layout>
        </v-layout>
        <v-layout class="pt-4">
            <grid-table
                class="AtomizerDataTable"
                v-bind:headerData="atomizerTableHeaderData"
                v-bind:contentData="atomizerTableContentData"
                v-on:getGridDataTableData="getAtomizerTableSelectedDatas"
                v-bind:highlightFlag="true"
            ></grid-table>
        </v-layout>
        <v-layout class="pt-4" column>
            <v-flex lg12>
                <v-layout>
                    <p v-bind:style="styleObject">{{ui.atomizerTrendTitle + ": "}}</p>
                    <auto-selector 
                        class="AtomizerDataSelector pt-1 pl-2"
                        v-bind:showFlag="datas.flag.autoSelector"
                        v-bind:selectorOptions="datas.zoneType === 1? datas.sealerOutputTypes : datas.atomizerOutputTypes"
                        v-on:selectedItem="getChartOutputType"
                    ></auto-selector>
                    <p v-bind:style="styleObject" class="pl-3 pt-1">{{ui.axisXOutputTitle + ": "}}</p>
                    <auto-selector 
                        class="TorqueDataSelector pt-1 pl-2"
                        v-bind:showFlag="datas.flag.autoSelector"
                        v-bind:selectorOptions="datas.zoneType === 1? datas.sealerChartAxisTypes: datas.atomizerChartAxisTypes"
                        v-on:selectedItem="getChartXAxisType"
                    ></auto-selector>
                </v-layout>
                <v-layout class="subTitle pl-1" v-if="selectedAtomizerDatas != ''">
                    <p class="pr-2">{{'MODEL '+ selectedAtomizerDatas.model}}</p>
                    <p class="">{{'SESSION  '+ selectedAtomizerDatas.time_stamp}}</p>
                </v-layout> 
                <atomizer-data-chart
                    v-bind:chartId="'atomizerDataChart'"
                    v-bind:chartOutputType="datas.chartOutputType"
                    v-bind:chartXAxisType="datas.chartXAxisType"
                    v-bind:chartDatas="atomizerChartDatas"
                ></atomizer-data-chart>
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
import AutoSelector from '@/commons/AutoSelector'
import SearchBtn from '@/commons/SearchBtn'
import GridTable from '@/commons/GridTable'
import AtomizerDataChart from '@/components/diagnostics/atomizerdata/atomizerdata/AtomizerDataChart'
export default {
    components: {DatePicker, Selector, AutoSelector, SearchBtn, GridTable, AtomizerDataChart},
    data() {
        return {
            ui: {
                atomizerTrendTitle: this.$t(`diagnostics.atomizerdata.atomizerTrend.title`),
                axisXOutputTitle: this.$t(`diagnostics.atomizerdata.atomizerTrend.axisXTitle`)
            },
            searchFlag: false,
            searchBtnIcon: require("@/images/search_icon.png"),
            getSelectedTargetZoneInfos: [],
            getSelectedTargetRobotInfos: [],
            atomizerTableHeaderData: [
                { text: "", value: 'model', sortable: false, align: 'center'},
                { text: "", value: 'color', sortable: false, align: 'center'}, 
                { text: "", value: 'time_stamp', sortable: false, align: 'center'}, 
                { text: "", value: 'flow', sortable: false, align: 'center'}, 
                { text: "", value: 'gunon', sortable: false, align: 'center'}, 
                { text: "", value: 'hvolt', sortable: false, align: 'center'}, 
                { text: "", value: 'robotmovingtime', sortable: false, align: 'center'}, 
                { text: "", value: 'spraycycle', sortable: false, align: 'center'}, 
                { text: "", value: 'conveyorofftime', sortable: false, align: 'center'}
            ],
            atomizerTableContentData: [],
            atomizerChartDatas: [],
            chartTitle: '',
            selectedAtomizerDatas: [],   
            atomizerDatas: null,
            styleObject: null,
            datas: {
                searchDatas: {
                    prevDate: "",
                    boothId: "",
                    zoneId: "",
                    robotId: ""
                },
                postDatas: {},
                zoneType: "",
                atomizerOutputTypes: [
                    {id: "flow", name: this.$t(`diagnostics.atomizerdata.aotomizerTrendType.flow`)},
                    {id: "hv", name: this.$t(`diagnostics.atomizerdata.aotomizerTrendType.hv`)},
                    {id: "sa_s", name: this.$t(`diagnostics.atomizerdata.aotomizerTrendType.sa_s`)},
                    {id: "sa_v", name: this.$t(`diagnostics.atomizerdata.aotomizerTrendType.sa_v`)},
                    {id: "turbine_speed", name: this.$t(`diagnostics.atomizerdata.aotomizerTrendType.turbine_speed`)}
                ],
                sealerOutputTypes: [
                    {id: 'flow', name: 'flow'},
                    {id: 'swirl', name: 'swirl'},
                    {id: 'masking_unit_speed', name: 'masking_unit_speed'},
                    {id: 'pressure', name: 'pressure'}
                ],
                chartOutputType: "",
                atomizerChartAxisTypes: [
                    {id: "ms", name: "Time(ms)"},
                    {id: "paint_path", name: "Paint Path"}
                ],
                sealerChartAxisTypes: [
                    {id: "ms", name: "Time(ms)"}
                ],
                chartXAxisTypes: [
                    {id: "ms", name: "Time(ms)"},
                    {id: "paint_path", name: "Paint Path"}
                ],
                chartXAxisType: "",
                event: {
                    dialog: false
                },
                flag: {
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
        }),  
    },

    methods: {
        initializeStyle() {
            this.styleObject = this.$style.common.titleObjectItemColor;
            document.documentElement.style.setProperty("--subTitleColor", this.$style.common.subTitleItemColor);
        },

        setLoadingDialog(flag) {
            this.datas.event.dialog = flag;
        },
        
        getPrevDate(prevDate) {
            this.datas.searchDatas.prevDate = prevDate;
        },

        getTargetBoothId(targetId) {
            this.getSelectedTargetZoneInfos = [];
            this.datas.searchDatas.boothId = targetId.target;
            for(let i = 0; i < this.getZoneInfos.length; i++) {
                if(this.getZoneInfos[i].booth == this.datas.searchDatas.boothId) {
                    this.getSelectedTargetZoneInfos.push(this.getZoneInfos[i]);
                }
            }
        },

        getTargetZoneId(targetId) {
            this.getSelectedTargetRobotInfos = [];
            this.datas.searchDatas.zoneId = targetId.target;
            for(let i = 0; i < this.getRobotInfos.length; i++) {
                if(this.getRobotInfos[i].zone == this.datas.searchDatas.zoneId) {
                    this.getSelectedTargetRobotInfos.push(this.getRobotInfos[i]);
                }
            }
        },

        getTargetRobotId(targetId) {
            this.datas.searchDatas.robotId = targetId.target;
        },

        getChartOutputType(chartOutputType) {
            this.datas.chartOutputType = chartOutputType;
        },

        getChartXAxisType(chartXAxisType) {
            this.datas.chartXAxisType = chartXAxisType;
        },

        initAtomizerDatas() {
            this.atomizerTableContentData = [];
            this.selectedAtomizerDatas = [];
            this.atomizerChartDatas = [];
            this.atomizerTableHeaderData.forEach(headerData => {
                headerData.text = "";
            });
        },

        changeSearchFlag() {
            this.searchFlag = false;
        },

        checkSearchDatas(searchDatas) {
            if(searchDatas.prevDate != undefined && searchDatas.boothId != undefined && searchDatas.zoneId != undefined && searchDatas.robotId != undefined) {
                return true;
            }
            else {
                return false;
            } 

        },

        searchBtnClicked() {
            Object.assign(this.datas.postDatas, this.datas.searchDatas);
            if(this.checkSearchDatas(this.datas.postDatas)) {
                this.searchFlag = true;
                this.setLoadingDialog(true);
                this.getAtomizerDataTableHeaderDatas();
                this.getAtomizerDataTableDatas();
            }
            else {
                this.$popmsg(this.$t(`diagnostics.atomizerdata.popmsg.checkData`));
                this.setLoadingDialog(false);
                this.initAtomizerDatas();
            }
        },

        getAtomizerDataTableHeaderDatas() {
            let params = this.checkTargetDatas(this.datas.postDatas.boothId, this.datas.postDatas.zoneId, this.datas.postDatas.robotId, this.datas.postDatas.prevDate);
            this.$http.get(`diagnostics/atomizerdata/data/gridtable/headers/factoryid/${params.factoryid}/boothid/${params.boothid}/zoneid/${params.zoneid}`).then(res => {
                if(res.data.length > 0) {
                    if(res.data[res.data.length-1].applicatordata_header.length > 0 && res.data[res.data.length-1].applicatordata_header !== null) {
                        this.datas.zoneType = res.data[res.data.length-1].zone_type;
                        res.data[res.data.length-1].applicatordata_header.forEach((header, index) => {
                            this.atomizerTableHeaderData[index].text = header;
                        })
                    }
                }
            }).catch(error => {
                this.$log.error(error);
            })
        },

        getAtomizerDataTableDatas() {
            this.initAtomizerDatas();
            const postDatas = this.checkTargetDatas(this.datas.postDatas.boothId, this.datas.postDatas.zoneId, this.datas.postDatas.robotId, this.datas.postDatas.prevDate);
            this.$http.get(`/info/historian`).then((result) => {
                this.$http.post(`diagnostics/atomizerdata/data/gridtable`, postDatas).then((res) => {
                    if(res.data == '') {
                        this.$popmsg(this.$t(`diagnostics.atomizerdata.popmsg.atomizerDataGridTable`));
                    }
                    else {
                        this.setAtomizerDataTableDatas(result.data, res.data);
                    }
                    this.setLoadingDialog(false);
                })
            }).catch((error) => {
                this.setLoadingDialog(false);
                this.$log.error(error);
            })
        },

        setAtomizerDataTableDatas(factoryInfo, atomizerTableContentDatas) {
            if(factoryInfo == "HMMR") {
                for(let i = 0; i < atomizerTableContentDatas.length; i++) {
                    atomizerTableContentDatas[i].s_time = atomizerTableContentDatas[i].s_time.replace("T", " ").replace("Z", "");
                    atomizerTableContentDatas[i].time_stamp = atomizerTableContentDatas[i].s_time;
                    atomizerTableContentDatas[i].e_time = atomizerTableContentDatas[i].e_time.replace("T", " ").replace("Z", "");
                    atomizerTableContentDatas[i].model = atomizerTableContentDatas[i].body + " ( " + atomizerTableContentDatas[i].option + " )";
                    atomizerTableContentDatas[i].robotmovingtime = this.getMovingTime(atomizerTableContentDatas[i].s_time, atomizerTableContentDatas[i].e_time);
                }
                this.atomizerTableContentData = atomizerTableContentDatas;
            }
            else {
                for(let i = 0; i < atomizerTableContentDatas.length; i++) {
                    atomizerTableContentDatas[i].time_stamp = atomizerTableContentDatas[i].time_stamp.replace("T", " ").replace("Z", "");
                }
                this.atomizerTableContentData = atomizerTableContentDatas;
            }

            if(this.atomizerTableContentData.length % 4 != 0) {
                const tempIndex = 4 - this.atomizerTableContentData.length % 4;
                for(let i = 0; i < tempIndex; ++i) {
                    this.atomizerTableContentData.push({model: '',color: '', time_stamp: '', flow: '', gunon: '', hvolt: '', robotmovingtime: '', spraycycle: '', conveyorofftime: '' });
                }
            }
        },

        getAtomizerTableSelectedDatas(atomizerTableSelectedData) {
            if(atomizerTableSelectedData != undefined) {
                this.selectedAtomizerDatas = atomizerTableSelectedData;
                let postDatas = this.checkTrendDatas(this.datas.postDatas.boothId, this.datas.postDatas.zoneId, this.datas.postDatas.robotId);
                postDatas['selecttime'] = atomizerTableSelectedData.time_stamp;
                postDatas['interval'] = atomizerTableSelectedData.robotmovingtime;
                if(this.datas.zoneType === 1) {
                    this.getSealerChartDatas(postDatas);
                } else {
                    this.getAtomizerChartDatas(postDatas);
                }
                let index = Object.keys(this.$refs)[0];   
            }
        },

        getAtomizerChartDatas(atomizerDatas) {
            this.$http.post(`/diagnostics/atomizerdata/data/trend`, atomizerDatas)
            .then((result) => {      
                if (result.data == '') {
                    this.atomizerChartDatas = [];
                    this.$popmsg(this.$t(`diagnostics.atomizerdata.popmsg.atomizerDataGridTable`));
                } 
                else {
                    this.atomizerChartDatas = result.data;
                }
                this.setLoadingDialog(false);
            }).catch((error) => {
                this.$log.error(error);
                this.setLoadingDialog(false);
            })
        },

        getSealerChartDatas(sealerDatas) {
            this.$http.get(`/diagnostics/atomizerdata/data/sealer/trend/boothid/${sealerDatas.boothid}/zoneid/${sealerDatas.zoneid}/robotid/${sealerDatas.robotid}/timestamp/${sealerDatas.selecttime}/interval/${sealerDatas.interval}`)
            .then(res => {
                if(res.data.length > 0) {
                    this.atomizerChartDatas = res.data;
                } else {
                    this.atomizerChartDatas = [];
                }
            })
        },

        getMovingTime(s_time, e_time) {
            const startTime = new Date(s_time);
            const endTime = new Date(e_time);
            return endTime.getTime() - startTime.getTime();
        },

        checkTargetDatas(boothId, zoneId, robotId, prevdate) {
            let postDatas = {
                'factoryid': `${this.getFactoryId}`, 
                'prevtime': prevdate
            };
            if (boothId != undefined) {
                postDatas['boothid'] = boothId;
            }   
            else {
                this.$popmsg(this.$t(`common.condition.boothid`));
                return null;
            }
            if (zoneId != undefined) {
                postDatas['zoneid'] = zoneId;
            }    
            else {
                this.$popmsg(this.$t(`common.condition.zoneid`));
                return null;
            }
            if (robotId != undefined) {
                postDatas['robotid'] = robotId;
            }
            else {
                this.$popmsg(this.$t(`common.condition.robotid`));
                return null;
            }
            return postDatas;
        },

        checkTrendDatas(boothId, zoneId, robotId) {
            let postDatas = {};
            if(boothId != undefined) {
                postDatas['boothid'] = boothId;
            }
                
            if(zoneId != undefined) {
                postDatas['zoneid'] = zoneId;
            }
                
            if(robotId != undefined) {
                postDatas['robotid'] = robotId;
            }
            return postDatas;
        }
    }

}
</script>

<style scoped lang="scss">
    @import './atomizerdata';
</style>

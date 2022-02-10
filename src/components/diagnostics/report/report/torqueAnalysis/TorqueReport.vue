<template>
    <div>
        <div class="saveButton"><v-btn color="blue" @click="clickSaveButton">저장</v-btn></div>
        <v-layout>
            <v-flex class="reportHeader">{{ui.header}}</v-flex>
            <v-flex class="compareCombobox">
                <DxSelectBox
                    :data-source="datas.filteredReport"
                    display-expr="report_name"
                    value-expr="report_id"
                    width="300"
                    :value="datas.prevIndex !== null ? datas.filteredReport[datas.prevIndex].report_id : null"
                    @item-click="changeAllSelectBox"
                />
            </v-flex>
        </v-layout>

        <div v-for="(booth, boothIndex) in datas.boothInfo" :key="boothIndex">
            <div class="boothName">{{booth.name}} --------------------------------</div>
            <v-layout column v-for="(element, zoneIndex) in booth.zone" :key="zoneIndex">
                    <div class="zoneName">{{element.name}}</div>
                    <v-layout>
                        <v-flex class="zonePeriod">
                            <v-menu
                                v-model="datas.menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="700px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="datas.zonePeriod"
                                        hide-details
                                        readonly
                                        prepend-icon="event"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <torque-analysis-date-time-box :dialog.sync="datas.menu"></torque-analysis-date-time-box>
                            </v-menu>
                        </v-flex>
                    <v-flex>
                        <DxSelectBox class="prevSelectBox"
                            :data-source="datas.filteredReport"
                            width="300"
                            display-expr="report_name"
                            value-expr="report_id"
                            :value="datas.prevArray[boothIndex][zoneIndex] !== null ? datas.filteredReport[datas.prevArray[boothIndex][zoneIndex]].report_id : null"
                            @opened="setSelectBox"
                            @item-click="changeSelectBox($event,boothIndex,zoneIndex)"
                        />
                    </v-flex>
                    </v-layout>
                <v-layout>
                    <v-flex class="currentDataGrid">
                        <!-- <torque-add-report-table/> -->
                        <DxDataGrid
                            ref="currentContainer"
                            :data-source="element.robot"
                            key-expr="id"
                            :show-borders="true"
                        >
                            <DxEditing
                                mode="cell"
                            :allow-updating="true"
                            />
                            <DxColumn data-field="name" caption="" :width="50" :allow-editing="false" css-class="robot-highlighted"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[0]" caption="1축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[1]" caption="2축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[2]" caption="3축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[3]" caption="4축" :width="50" :allow-editing="false" />
                            <DxColumn data-field="violation_value.current_data.violation_count[4]" caption="5축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[5]" caption="6축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[6]" caption="7축" :width="50" :allow-editing="false"/>
                            <DxColumn caption="위험도" data-field="violation_value.current_data.danger_level"
                                :allow-editing="false"
                                cell-template="dangerTemplate"
                                :width="70"
                            >
                                <!-- <DxLookup
                                    :data-source="datas.danger_level"
                                    display-expr="name"
                                    value-expr="id"
                                /> -->
                            </DxColumn>
                            <template
                                #dangerTemplate="{data}"
                            >
                                <v-menu
                                    offset-x
                                >
                                    <template v-slot:activator="{on, attrs }">
                                        <v-btn
                                            icon
                                            small
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                        <v-layout column>
                                            <v-icon
                                                color="#129c60"
                                                v-if="data.data.violation_value.current_data.danger_level == 1"
                                            >
                                            mdi-alert
                                            </v-icon>
                                            <v-icon
                                                color="#ed5565"
                                                v-else-if="data.data.violation_value.current_data.danger_level == 2"
                                            >
                                            mdi-alert
                                            </v-icon>
                                            <v-icon
                                                color="#ffce54"
                                                v-else
                                            >
                                            mdi-alert
                                            </v-icon>
                                            <div v-if="data.data.violation_value.current_data.danger_level == 1">중</div>
                                            <div v-else-if="data.data.violation_value.current_data.danger_level == 2">상</div>
                                            <div v-else>하</div>
                                        </v-layout>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-tile
                                            v-for="(item, index) in datas.danger_level"
                                            :key="index"
                                            @click="clickDangerButton(data,item)"
                                        >
                                        <v-list-tile-title>{{item.name}}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </template>
                            <DxColumn caption="의견" data-field ="violation_value.current_data.comment" :width="300"/>
                        </DxDataGrid>
                        <div>
                            <zone-opinion
                                @inputZoneOpinion="inputZoneOpinion($event,boothIndex,zoneIndex)"
                                v-bind:robotInfo="element.robot"
                            />
                        </div>
                    </v-flex>

                    <v-flex class="compareDataGrid" v-if="datas.prevReport.length !== 0">
                        <!-- <torque-ag-prev-grid/> -->
                        <DxDataGrid
                            ref="prevContainer"
                            :data-source="element.robot"
                            key-expr="id"
                            :show-borders="true"
                        >
                            <DxColumn data-field="name" caption="" :width="50" :allow-editing="false" css-class="prevRobot-highlighted"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[0]" caption="1축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[1]" caption="2축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[2]" caption="3축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[3]" caption="4축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[4]" caption="5축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[5]" caption="6축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[6]" caption="7축" :width="50" :allow-editing="false"/>
                            <DxColumn caption="위험도" data-field="previolation_value.current_data.danger_level" cell-template="dangerPrevTemplate" :width="70"/>
                            <template
                                #dangerPrevTemplate="{data}"
                            >
                                <v-menu
                                    offset-x
                                >
                                    <template v-slot:activator="{on, attrs }">
                                        <v-btn
                                            icon
                                            small
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <v-layout column>
                                                <v-icon
                                                    color="#129c60"
                                                    v-if="data.data.previolation_value.current_data.danger_level == 1"
                                                >
                                                mdi-alert
                                                </v-icon>
                                                <v-icon
                                                    color="#ed5565"
                                                    v-else-if="data.data.previolation_value.current_data.danger_level == 2"
                                                >
                                                mdi-alert
                                                </v-icon>
                                                <v-icon
                                                    color="#ffce54"
                                                    v-else
                                                >
                                                mdi-alert
                                                </v-icon>
                                                <div v-if="data.data.previolation_value.current_data.danger_level == 1">중</div>
                                                <div v-else-if="data.data.previolation_value.current_data.danger_level == 2">상</div>
                                                <div v-else>하</div>
                                            </v-layout>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-tile
                                            v-for="(item, index) in datas.danger_level"
                                            :key="index"
                                            @click="clickPrevDangerButton(data,item)"
                                        >
                                        <v-list-tile-title>{{item.name}}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </template>
                            <DxColumn caption="의견" data-field="previolation_value.current_data.comment" :width="300"></DxColumn>
                        </DxDataGrid>
                        <zone-prev-opinion
                            @inputPrevZoneOpinion="inputPrevZoneOpinion($event,boothIndex,zoneIndex)"
                            v-bind:robotInfo="element.robot"
                            v-bind:bindingCatch="bindingCatch"
                        />
                    </v-flex>
                </v-layout>
            </v-layout>
        </div>
    </div>
</template>
<script>
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj
  }

  const result = Array.isArray(obj) ? [] : {}

  for (let key of Object.keys(obj)) {
    result[key] = deepClone(obj[key])
  }

  return result
}
import{
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
} from 'devextreme-vue/data-grid';
import DxSelectBox from 'devextreme-vue/select-box';
import 'devextreme/dist/css/dx.dark.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {mapGetters} from 'vuex';
import TorqueAnalysisDateTimeBox from '@/components/diagnostics/report/report/torqueAnalysis/TorqueAnalysisDateTimeBox';
import zoneOpinion from '@/components/diagnostics/report/report/torqueAnalysis/zoneOpinion';
import zonePrevOpinion from '@/components/diagnostics/report/report/torqueAnalysis/zonePrevOpinion';
export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxLookup,
        DxSelectBox,
        TorqueAnalysisDateTimeBox,
        zoneOpinion,
        zonePrevOpinion,
    },
    props:['selectedReport','reports','torqueAnalysisReportDetail','bindingCatch','reportType'],
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            ui : {
                header : ''
            },
            datas : {
                reportType: null,
                prevIndex: null,
                prevArray: [],
                zonePeriod: `2022-02-01 ~ 2022-02-28`,
                menu: null,
                selectedReport: {},
                reportDetail: [],
                boothInfo: [],
                robotInfo: [],
                zoneInfo: [],
                danger_level:[
                    {id: 0, name: '하'},
                    {id: 1, name: '중'},
                    {id: 2, name: '상'},
                ],
                filteredReport : [],
                prevReport: [],
                reports: [],
                allReportDetail: [],
                filteredCurrentData: [],
                filteredPrevData: [],
                torqueAnalysisReportDetail:[],
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
            reportDatas: 'getReportItems'
        }),
    },
    created(){
    },
    mounted(){
        this.datas.selectedReport = deepClone(this.selectedReport)
        this.datas.reports = deepClone(this.reports)
        this.datas.reportType = this.reportType
        this.datas.torqueAnalysisReportDetail = deepClone(this.torqueAnalysisReportDetail)
        this.setReportHeader();
        this.getReport();
    },
    watch: {
        selectedReport(){
            this.datas.selectedReport = deepClone(this.selectedReport)
            this.setReportHeader();
            this.getReport();
        },
        reports(){
            this.datas.reports = deepClone(this.reports)
        },
        torqueAnalysisReportDetail(){
            this.datas.torqueAnalysisReportDetail = deepClone(this.torqueAnalysisReportDetail)
        },
        reportType(){
            this.datas.reportType = this.reportType
        }
    },
    methods: {
        updatePeriod(period){
            this.datas.zonePeriod = period;
            var dateFrom = `${this.datas.zonePeriod.substr(0,10)} 00:00:00`;
            var dateTo = `${this.datas.zonePeriod.substr(13,23)} 23:59:59`;
            dateFrom, dateTo
            // this.findZoneData(dateFrom, dateTo);
        },
        clickDangerButton(data,item){
            switch (item.name){
                case '하':
                    data.data.violation_value.current_data.danger_level = 0
                break;
                case '중':
                    data.data.violation_value.current_data.danger_level = 1
                break;
                case '상':
                    data.data.violation_value.current_data.danger_level = 2
                break;
            default:
            }
        },
        clickPrevDangerButton(data,item){
            switch (item.name){
                case '하':
                    data.data.previolation_value.current_data.danger_level = 0
                break;
                case '중':
                    data.data.previolation_value.current_data.danger_level = 1
                break;
                case '상':
                    data.data.previolation_value.current_data.danger_level = 2
                break;
            default:
            }
        },

        inputZoneOpinion(opinion,bIndex,zIndex){
            this.datas.boothInfo[bIndex].zone[zIndex].robot.forEach(robot => {
                robot.violation_value.comment = opinion
            })
        },
        inputPrevZoneOpinion(prevOpinion,bIndex,zIndex){
            this.datas.boothInfo[bIndex].zone[zIndex].robot.forEach(robot => {
                robot.previolation_value.comment = prevOpinion
            })
        },

        async getReport(){
             //뷰엑스 설정하고 수정필요
            this.datas.boothInfo = [];
            this.datas.zoneInfo = [];
            this.datas.robotInfo = [];
            await this.getDetail();
            this.setBoothInfo();
        },
        async getDetail(){
            this.datas.allReportDetail = []
            await this.$http.get(`diagnostics/report/report/detail/type/${this.datas.reportType}`)
            .then((response) => {
                this.datas.allReportDetail = deepClone(response.data)
            })
        },
        setReportHeader(){
            this.ui.header = this.datas.selectedReport.report_name
        },
        setBoothInfo(){
            let temp = []
            this.datas.boothInfo = deepClone(this.getBoothInfos)
            this.datas.zoneInfo = deepClone(this.getZoneInfos)
            this.datas.robotInfo = deepClone(this.getRobotInfos)
            this.datas.allReportDetail.forEach(el => {
                this.datas.torqueAnalysisReportDetail.forEach(element => {
                    if(el.data_id === element.prev_data_id) {
                        temp.push(el)
                    }
                })
            })
            this.datas.prevReport = temp;
            this.datas.robotInfo.forEach(robotElement => {
                Object.assign(robotElement, { booth: this.datas.zoneInfo.filter(zone=> zone.id === robotElement.zone)[0].booth})
                Object.assign(robotElement, { violation_value: this.datas.torqueAnalysisReportDetail.filter(element => element.robot_id === robotElement.id)[0]})
                if(this.datas.prevReport.length !== 0){
                    Object.assign(robotElement, { previolation_value: this.datas.prevReport.filter(element => element.robot_id === robotElement.id)[0]})
                }
                if(robotElement.violation_value == undefined){
                    robotElement.violation_value = {
                        current_data : {violation_count : [0,0,0,0,0,0,0], comment: null, danger_level: null}
                     }
                }
            })
            this.datas.zoneInfo.forEach(zoneElement => {
                Object.assign(zoneElement, {robot: this.datas.robotInfo.filter(element => zoneElement.id === element.zone)})
            })
            this.datas.boothInfo.forEach(boothElement => {
                Object.assign(boothElement, {zone: this.datas.zoneInfo.filter(element => element.booth === boothElement.id)})
            })
            let filteredIndex = null
            this.datas.filteredReport = this.datas.reports.filter(el => el.report_id !== this.datas.selectedReport.report_id)
            this.datas.filteredReport.forEach((filteredElement, index) => {
                this.datas.prevReport.forEach(prevElement => {
                    if(filteredElement.report_id === prevElement.report_id){
                       filteredIndex = index
                    }
                })
            })
            let tempArr = []
            this.datas.boothInfo.forEach((b)=>{
                tempArr = []
                b.zone.forEach((z)=>{
                    tempArr.push(filteredIndex)
                })
                this.datas.prevArray.push(tempArr)
            })
            this.datas.prevIndex = filteredIndex
        },
        setSelectBox(){
            this.datas.filteredReport = this.datas.reports.filter(el => el.report_id !== this.datas.selectedReport.report_id)
        },
        async changeAllSelectBox(selectReport){
            this.datas.filteredReport.forEach((item, index) => {
                if(item.report_id === selectReport.itemData.report_id){
                    this.datas.prevIndex = index
                }
            })
            this.datas.prevArray = [];
            let tempArr = []
            this.datas.boothInfo.forEach((b)=>{
                tempArr = []
                b.zone.forEach((z)=>{
                    tempArr.push(this.datas.prevIndex)
                })
                this.datas.prevArray.push(tempArr)
            })
            let temp = [];
            this.datas.allReportDetail.forEach(el => {
                if(el.report_id === selectReport.itemData.report_id) {
                    temp.push(el)
                }
            })
            this.datas.prevReport = temp
            this.$refs.prevContainer.forEach(item => {
                item.instance.getDataSource().reload()
            })
            this.datas.robotInfo.forEach(robotElement => {
                delete robotElement.previolation_value
                if(this.datas.prevReport.length !== 0){
                    Object.assign(robotElement, { previolation_value: this.datas.prevReport.filter(element => element.robot_id === robotElement.id)[0]})
                }
            })
            this.$emit('bindingCatch')
        },
        async changeSelectBox(selectReport,selectedboothIndex,selectedZoneIndex){
            this.datas.filteredReport.forEach((item, index) => {
                if(item.report_id === selectReport.itemData.report_id){
                    this.datas.prevArray[selectedboothIndex][selectedZoneIndex] = index
                }
            })
            let temp = [];
            let tempArr = [];
            this.datas.allReportDetail.forEach(el => {
                if(el.report_id === selectReport.itemData.report_id) {
                    temp.push(el)
                }                                                                     // 변경할 비교 리포트
                if(el.report_id === this.datas.filteredReport[this.datas.prevIndex].report_id){
                    tempArr.push(el)
                }                                                                   // 이미 선택 되어진 비교 리포트
            })
            this.$refs.prevContainer.forEach(item => {
                item.instance.getDataSource().reload()
            })
            let array = [];
            this.datas.boothInfo[selectedboothIndex].zone[selectedZoneIndex].robot.forEach(el => {
               array = temp.filter(robotElement => robotElement.zone_id == el.zone)
            })

            array.forEach(prevReport => {
                tempArr.splice(tempArr.findIndex(item => item.robot_id == prevReport.robot_id),1)
                tempArr.push(prevReport)
            })

            this.datas.prevReport = tempArr
            this.datas.boothInfo.forEach((booth,bIndex) => {
                booth.zone.forEach((zone,zIndex) => {
                    if(selectedboothIndex == bIndex && selectedZoneIndex == zIndex){
                        zone.robot.forEach(robotElement => {
                            delete robotElement.previolation_value
                            if(this.datas.prevReport.length !== 0){
                                Object.assign(robotElement, { previolation_value: this.datas.prevReport.filter(element => element.robot_id === robotElement.id)[0]})
                            }
                        })
                    }
                })
            })
            this.$emit('bindingCatch')
        },
        async clickSaveButton(){
            if (window.confirm("저장하시겠습니까?")){
                this.datas.filteredCurrentData = [];
                this.datas.filteredPrevData = [];
                await this.getRowData();
                await this.updateCurrentReport();
                await this.updatePrevReport();
                await this.getReport();
            }
        },

        async getRowData(){
            await this.$refs.currentContainer.forEach(el => {
                el.instance.getVisibleRows().forEach(item => this.setCurrentData(item))
            })
            if(this.$refs.prevContainer !== undefined){
                await this.$refs.prevContainer.forEach(el => {
                    el.instance.getVisibleRows().forEach(item => this.setPrevData(item))
                })
            }
        },
        setCurrentData(row){
           this.datas.filteredCurrentData.push(row)
        },
        setPrevData(row){
            this.datas.filteredPrevData.push(row)
        },
        async updateCurrentReport(){
            for await(let row of this.datas.filteredCurrentData){
                let report_id = this.datas.selectedReport.report_id
                let booth_id = row.data.booth
                let zone_id = row.data.zone
                let report_type = 0
                let robot_id = row.key
                let prev_data_id = null;
                let comment = row.data.violation_value.comment
                let data_id = row.data.violation_value.data_id
                for(let i =0; i < row.values.length; i++){
                    if(row.values[i] === undefined){
                        row.values[i] = null
                    }
                }
                let current_data= {
                    danger_level: row.values[8],
                    violation_count : [
                        row.values[1],
                        row.values[2],
                        row.values[3],
                        row.values[4],
                        row.values[5],
                        row.values[6],
                        row.values[7],
                    ],
                    comment: row.values[9]
                }

                if(row.data.hasOwnProperty('previolation_value')!==true){
                    prev_data_id = null
                }
                else{
                    prev_data_id = row.data.previolation_value.data_id
                }
                if(this.datas.torqueAnalysisReportDetail.reportDetail !== ''){
                    await this.updateReport({
                        report_id,
                        booth_id,
                        zone_id,
                        robot_id,
                        report_type,
                        current_data,
                        prev_data_id,
                        data_id,
                        comment
                    })
                }
                else{
                    await this.createReport({
                        report_id,
                        booth_id,
                        zone_id,
                        robot_id,
                        report_type,
                        current_data,
                        prev_data_id,
                        data_id,
                        comment
                    })
                }
            }
        },
        async updatePrevReport(){
            for await(let row of this.datas.filteredPrevData){
                let report_id = row.data.previolation_value.report_id
                let booth_id = row.data.booth
                let zone_id = row.data.zone
                let report_type = 0
                let robot_id = row.key
                let prev_data_id = null;
                let comment = row.data.previolation_value.comment
                let data_id = row.data.previolation_value.data_id
                for(let i =0; i < row.values.length; i++){
                    if(row.values[i] === undefined){
                        row.values[i] = null
                    }
                }
                let current_data= {
                    danger_level: row.values[8],
                    violation_count : [
                        row.values[1],
                        row.values[2],
                        row.values[3],
                        row.values[4],
                        row.values[5],
                        row.values[6],
                        row.values[7],
                    ],
                    comment: row.values[9]
                }

                if(row.data.hasOwnProperty('previolation_value')!==true){
                    prev_data_id = null
                }
                else{
                    prev_data_id = row.data.previolation_value.prev_data_id
                }
                if(this.datas.torqueAnalysisReportDetail.reportDetail !== ''){
                    await this.updateReport({
                        report_id,
                        booth_id,
                        zone_id,
                        robot_id,
                        report_type,
                        current_data,
                        prev_data_id,
                        data_id,
                        comment
                    })
                }
                else{
                    await this.createReport({
                        report_id,
                        booth_id,
                        zone_id,
                        robot_id,
                        report_type,
                        current_data,
                        prev_data_id,
                        data_id,
                        comment
                    })
                }
            }
        },
        updateReport(item){
            console.log('put')
            this.$http.put(`/diagnostics/report/report/${item.report_id}`, {
                factory_id: this.getFactoryId,
                booth_id : item.booth_id,
                zone_id : item.zone_id,
                robot_id : item.robot_id,
                report_type : item.report_type,
                current_data : item.current_data,
                prev_data_id : item.prev_data_id,
                data_id : item.data_id,
                comment : item.comment
            })
            .then(() => {

            })
        },
        createReport(item){
            console.log('post')
            this.$http.post(`/diagnostics/report/report/${item.report_id}`, {
                factory_id: this.getFactoryId,
                booth_id : item.booth_id,
                zone_id : item.zone_id,
                robot_id : item.robot_id,
                report_type : item.report_type,
                current_data : item.current_data,
                prev_data_id : item.prev_data_id,
                comment : item.comment
            })
            .then(() => {

            })
        }
    },
}
</script>

<style>
    .reportHeader{
        margin-top: 20px;
        font-size: 2rem;
        font-weight: bold;
    }
    .currentDataGrid{
        width: 500px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .compareCombobox{
        display: flex;
        justify-content: right;
        margin-right: 55px !important;
        height: 30px;
        margin: auto;
    }
    .compareDataGrid{
        /* flex-grow: 1; */
        width: 500px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .zoneName{
        margin-top: 5px;
        width: 300px;
        font-size: 15px;
        font-weight: bold;
        color: rgb(210, 218, 142);
    }
    .boothName{
        margin-top: 10px;
        margin-bottom:10px;
        background-color: rgb(54, 83, 163);
        margin-right: 55px;
        font-weight: bold;
        font-size: 1.3rem;
    }
    .dateBox{
        margin: auto;
    }
    .saveButton{
        display: flex;
        justify-content: right;
        margin-right: 55px;
    }
    .v-input{
        padding-top: 0px;
        width: 250px
    }
    .prevSelectBox{
        margin-left: 50px;
        height: 30px;
    }
    .dx-data-row .robot-highlighted {
        background-color: #515dbe;
    }
    .dx-data-row .prevRobot-highlighted {
        background-color: #21976a;;
    }

/* .dx-datagrid-focus-overlay {
    border: 2px solid rgb(218, 78, 78);
} */

</style>
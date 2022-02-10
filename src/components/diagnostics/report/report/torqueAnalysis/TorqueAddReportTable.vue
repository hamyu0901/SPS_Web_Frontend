<template>
    <v-layout column>
        <div class="saveButton"><v-btn color="blue" @click="clickSaveButton">저장</v-btn></div>
            <!-- <v-menu
            ref="menu"
            v-model="datas.pickerModal"
            full-width
            max-width="290px"
            min-width="290px"
            :position-y="200"
            :position-x="300"
        >
            <torque-picker
                v-on:closeTorquePicker="closeTorquePicker"
                v-on:clickPickerMonth="clickPickerMonth"
            />
        </v-menu> -->
        <v-layout>
            <v-flex class="reportTitle">{{ui.headerTitle}}</v-flex>
            <v-flex class="prevCombobox">
                <DxSelectBox
                    :data-source="datas.filteredReport"
                    display-expr="report_name"
                    value-expr="report_id"
                    width="300"
                    @opened="setSelectBox"
                    @item-click="changeSelectBox"
                />
            </v-flex>
        </v-layout>
        <v-layout column
            v-for="(booth, boothIndex) in datas.boothInfo" :key="boothIndex"
        >
            <div class="boothName">{{booth.name}}----------------------------------------------------</div>
            <v-layout column
                class="zone"
                v-for="(element, zoneIndex) in booth.zone" :key="zoneIndex"
            >
                <v-layout>
                    <v-layout class="currentZoneName">{{element.name}}
                    </v-layout>
                    <v-flex>
                        <!-- <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="Select date"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                                range
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(date)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu> -->
                    </v-flex>
                    <!-- <v-flex class="prevCombobox">
                        <DxSelectBox
                            :data-source="datas.filteredReport"
                            display-expr="report_name"
                            value-expr="report_id"
                            width="300"
                            @opened="setSelectBox(element)"
                            @item-click="changeSelectBox($event,element)"
                        />
                    </v-flex> -->
                </v-layout>
                <v-layout>
                    <v-flex class="currentDataGrid">
                        <DxDataGrid
                            ref="currentContainer"
                            id="currentContainer"
                            :data-source="element.robot"
                            key-expr="id"
                            :show-borders="true"
                        >
                            <DxEditing
                                mode="cell"
                                :allow-updating="true"
                            />
                            <DxColumn data-field="name" caption="" :width="50" :allow-editing="false" css-class="robot-highlighted"/>
                            <DxColumn data-field="violation_value.axis1" caption="1축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.axis2" caption="2축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.axis3" caption="3축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.axis4" caption="4축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.axis5" caption="5축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.axis6" caption="6축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.axis7" caption="7축" :width="50" :allow-editing="false"/>
                            <DxColumn caption="위험도" data-field="datas.danger_level" :width="70">
                                <DxLookup
                                    :data-source="datas.danger_level"
                                    display-expr="name"
                                    value-expr="id"
                                />
                            </DxColumn>

                            <DxColumn caption="의견" data-field ="datas.description" :width="300"/>
                        </DxDataGrid>
                    </v-flex>
                    <v-flex class="prevContainer" v-if="datas.prevReport.length !==0">
                        <DxDataGrid
                            ref="prevContainer"
                            id="prevContainer"
                            :data-source="element.robot"
                            key-expr="id"
                            :show-borders="true"
                        >
                            <DxColumn data-field="name" caption="" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[0]" caption="1축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[1]" caption="2축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[2]" caption="3축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[3]" caption="4축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[4]" caption="5축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[5]" caption="6축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="previolation_value.current_data.violation_count[6]" caption="7축" :width="50" :allow-editing="false"/>
                            <DxColumn caption="위험도" data-field="previolation_value.current_data.danger_level" :width="80" >
                                <DxLookup
                                    :data-source="datas.danger_level"
                                    display-expr="name"
                                    value-expr="id"
                                />
                            </DxColumn>
                            <DxColumn caption="의견" data-field="previolation_value.current_data.comment" :width="300"></DxColumn>
                        </DxDataGrid>
                    </v-flex>
                    <!-- <v-layout column class ="prevContainer">
                        <div>
                            <DxDataGrid
                                :data-source="element.robot"
                                key-expr="id"
                                :show-borders="true"
                            >
                                <DxColumn data-field="name" caption="" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[0]" caption="1축" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[1]" caption="2축" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[2]" caption="3축" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[3]" caption="4축" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[4]" caption="5축" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[5]" caption="6축" :width="50" :allow-editing="false"/>
                                <DxColumn data-field="previolation_value.current_data.violation_count[6]" caption="7축" :width="50" :allow-editing="false"/>
                                <DxColumn caption="위험도" data-field="previolation_value.current_data.danger_level" :width="80" ></DxColumn>
                                <DxColumn caption="의견" data-field="previolation_value.current_data.comment" :width="100"></DxColumn>
                            </DxDataGrid>
                        </div>
                    </v-layout> -->

                </v-layout>
            </v-layout>
        </v-layout>
    </v-layout>
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
import TorquePicker from '@/components/diagnostics/report/report/torqueAnalysis/TorquePicker'
import{
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup
} from 'devextreme-vue/data-grid';
import DxSelectBox from 'devextreme-vue/select-box';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.dark.css';
import {mapGetters} from 'vuex';
export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxLookup,
        DxEditing,
        DxSelectBox,
        TorquePicker
    },
    props:['month','year','selectedReport','reports'],
    data(){
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            ui: {
                headerTitle: ''
            },
            datas : {
                boothInfo : [],
                zoneInfo : [],
                robotInfo : [],
                violatedAccumulation: [],
                selectedMonth: null,
                prevReport: [],
                filteredReport: [],
                filteredPrevReport: [],
                pickerModal: false,
                // test : [],
                filteredCurrentData: [],
                description: null,
                danger_level: [
                    { id: 0, name: '하'},
                    { id: 1, name: '중'},
                    { id: 2, name: '상'}
                ],
                selectedReport : [],
                reports: [],
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
    mounted(){
        this.datas.selectedMonth = this.month
        this.datas.selectedYear = this.year
        this.datas.selectedReport = this.selectedReport
        this.ui.headerTitle = this.datas.selectedReport.report_name
        this.datas.reports = this.reports
        this.getReportDetail();
        this.getViolatedAccumulation();
    },
    watch: {
        month(){
            this.datas.selectedMonth = this.month
            this.datas.selectedYear = this.year
            this.getViolatedAccumulation();
            this.getReportDetail();
        },
        selectedReport(){
            this.datas.selectedReport = this.selectedReport
            this.ui.headerTitle = this.datas.selectedReport.report_name
            this.getViolatedAccumulation();
            this.getReportDetail();
        }
    },
    methods: {
        async getViolatedAccumulation(){
            this.datas.boothInfo = [];
            this.datas.zoneInfo = [];
            this.datas.robotInfo = [];
            this.datas.violatedAccumulation = [];
            let month = this.datas.selectedMonth.substr(0, 1)
            await this.$http.get(`/torquemonitoring/factory/${this.getFactoryId}/year/${this.datas.selectedYear}/month/${month}`)
            .then((response) => {
                this.datas.violatedAccumulation = response.data
                this.setBoothInfo();
            })
            .catch((err) => {
                this.datas.violatedAccumulation = [];
                    this.getRobotInfos.forEach(el => {
                        this.datas.violatedAccumulation.push({
                            robot_id : el.id
                        })
                    })
                    this.setBoothInfo();
                // window.alert("Error Occurred - GET PROJECT MAIN PAINTS");
                // console.error(err);
            })

        },
        getReportDetail(){
        },
        // async test(){
        //     await this.$http.get(`/diagnostics/report/report/test/${this.getFactoryId}`)
        //     .then((response)=> {
        //         this.datas.test = response.data
        //     })
        //     let booth_name = ''
        //     this.datas.test.forEach(el => {
        //         switch (el.booth_id) {
        //             case 1:
        //                 booth_name = '상도'
        //             break;
        //             case 2 :
        //                 booth_name = '중도'
        //             break;
        //             case 3 :
        //                 booth_name = '하도'
        //             break;
        //             default:
        //         }
        //         Object.assign(el, {booth_name : booth_name})
        //     })
        // },

        setBoothInfo(){
            this.datas.boothInfo = deepClone(this.getBoothInfos)
            // this.test();
            this.datas.zoneInfo = deepClone(this.getZoneInfos)
            this.datas.robotInfo = deepClone(this.getRobotInfos)
            let cnt1 = 0;
            let cnt2 = 0;
            let cnt3 = 0;
            let cnt4 = 0;
            let cnt5 = 0;
            let cnt6 = 0;
            let cnt7 = 0;
            this.datas.robotInfo.forEach(el => {
                Object.assign(el, { booth: this.datas.zoneInfo.filter(zone=> zone.id === el.zone)[0].booth})
                Object.assign(el, { violation_value : this.datas.violatedAccumulation.filter(element => element.robot_id === el.id)})
                if(el.violation_value.length !== 0){
                    el.violation_value.forEach(element => {
                        switch (element.axis){
                            case 1 :
                                cnt1 ++;
                                break;
                            case 2 :
                                cnt2 ++;
                                break;
                            case 3 :
                                cnt3 ++;
                                break;
                            case 4 :
                                cnt4 ++;
                                break;
                            case 5 :
                                cnt5 ++;
                                break;
                            case 6 :
                                cnt6 ++;
                                break;
                            case 7 :
                                cnt7 ++;
                                break;
                            default:
                        }
                    })
                    el.violation_value.axis1 = cnt1; cnt1 = 0;
                    el.violation_value.axis2 = cnt2; cnt2 = 0;
                    el.violation_value.axis3 = cnt3; cnt3 = 0;
                    el.violation_value.axis4 = cnt4; cnt4 = 0;
                    el.violation_value.axis5 = cnt5; cnt5 = 0;
                    el.violation_value.axis6 = cnt6; cnt6 = 0;
                    el.violation_value.axis7 = cnt7; cnt7 = 0;
                }
                else{
                    el.violation_value.axis1 = 0;
                    el.violation_value.axis2 = 0;
                    el.violation_value.axis3 = 0;
                    el.violation_value.axis4 = 0;
                    el.violation_value.axis5 = 0;
                    el.violation_value.axis6 = 0;
                    el.violation_value.axis7 = 0;
                }
                if(this.datas.prevReport.length !== 0){
                    Object.assign(el, { previolation_value: this.datas.prevReport.filter(element => element.robot_id === el.id)[0]})
                }
            })
            this.datas.zoneInfo.forEach(el => {
                Object.assign(el, {robot: this.datas.robotInfo.filter(element => el.id === element.zone)})
            })
            this.datas.boothInfo.forEach(item => {
                Object.assign(item, {zone: this.datas.zoneInfo.filter(element => element.booth === item.id)})
            })
        },
        // async clickCompareList(zone){
        //     await this.$http.get(`/diagnostics/report/report/detail/${zone.id}`)
        //     .then((response) => {
        //         this.datas.prevReport = response.data
        //     });
        //     this.datas.prevReport.forEach(el => {
        //         this.datas.filteredReport = this.datas.reports.filter(element => element.report_id === el.report_id)
        //     })
        // },
        setSelectBox(){
            this.datas.filteredReport = this.datas.reports.filter(el => el.report_id !== this.datas.selectedReport.report_id)
        },
        async changeSelectBox(selectReport){
            this.datas.prevReport = [];
            await this.$http.get(`diagnostics/report/report/detail/${selectReport.itemData.report_id}`)
            .then((response) => {
                if(response.data !== ''){
                    response.data.forEach(el => {
                        if(el.report_type === 0){
                            this.datas.prevReport.push(el)
                        }
                    })
                }
                else{
                    this.datas.prevReport = [];
                }
                this.setBoothInfo();
            })
        },

        closeTorquePicker(){
            this.datas.pickerModal = false
        },
        clickSaveButton(){
            if (window.confirm("저장하시겠습니까?")) {
                this.datas.filteredCurrentData = [];
                this.getRowData();
                this.updateReportDatas();
			}
        },
        async getRowData(){
            await this.$refs.currentContainer.forEach(el => {
                el.instance.getVisibleRows().forEach(item => this.setCurrentData(item))
            })
        },
        setCurrentData(row){
           this.datas.filteredCurrentData.push(row)
        },
        async updateReportDatas(){
            for await(let row of this.datas.filteredCurrentData){
                let booth_id = row.data.booth
                let zone_id = row.data.zone
                let report_type = 0
                let robot_id = row.key
                let prev_data_id = null;
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
                this.$http.post(`/diagnostics/report/report/${this.datas.selectedReport.report_id}`, {
                    factory_id: this.getFactoryId,
                    booth_id : booth_id,
                    zone_id : zone_id,
                    robot_id : robot_id,
                    report_type : report_type,
                    current_data : current_data,
                    prev_data_id : prev_data_id
                })
                .then(() => {
                    this.getReportDetail();
                });
            }
        },
    },
}
</script>
<style scoped>
    .saveButton {
        display: flex;
        justify-content: right;
    }
    .reportTitle{
        font-size: 2rem;
        font-weight: bold;
    }
    .currentZoneName{
        width: 100px;
        margin: auto;
    }
    .currentDataGrid{
        width: 500px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 10px;
    }
    .boothName{
        margin-top: 10px;
        margin-bottom:10px;
        background-color: rgb(54, 83, 163);
        font-weight: bold;
        font-size: 1.3rem;
    }
    .prevContainer {
        margin-top: 5px;
        width: 500px;
    }
    .v-input {
        width: 200px;
        margin: auto;
    }
    .prevCombobox{
        flex-grow: 2;
        display: flex;
        justify-content: right;
        margin-right: 35px !important;
        height: 30px;
        margin: auto;
    }
    .danger{
        height: 10;
    }
    .dx-data-row .robot-highlighted {
        background-color: #515dbe;
    }
</style>
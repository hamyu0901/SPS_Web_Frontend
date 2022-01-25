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
                    @opened="setSelectBox"
                    @item-click="changeSelectBox"
                />
            </v-flex>
        </v-layout>
        <!-- <div class="reportHeader">{{ui.header}}</div> -->
        <div v-for="(booth, boothIndex) in datas.boothInfo" :key="boothIndex">
            <div class="boothName">{{booth.name}} --------------------------------</div>
            <v-layout column v-for="(element, zoneIndex) in booth.zone" :key="zoneIndex">
                <v-layout>
                    <div class="zoneName">{{element.name}}</div>
                    <!-- <v-flex class="dateBox">
                        <v-menu
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
                                    label="Picker in menu"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
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
                        </v-menu>
                    </v-flex> -->
                    <!-- <v-flex class="compareCombobox">
                        <DxSelectBox
                            :items="datas.simpleProducts"
                            width="300"
                        />
                    </v-flex> -->
                </v-layout>
                <v-layout>
                    <v-flex class="currentDataGrid">
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
                            <DxColumn data-field="name" caption="" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[0]" caption="1축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[1]" caption="2축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[2]" caption="3축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[3]" caption="4축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[4]" caption="5축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[5]" caption="6축" :width="50" :allow-editing="false"/>
                            <DxColumn data-field="violation_value.current_data.violation_count[6]" caption="7축" :width="50" :allow-editing="false"/>
                            <DxColumn caption="위험도" data-field="violation_value.current_data.danger_level" :width="70">
                                <DxLookup
                                    :data-source="datas.danger_level"
                                    display-expr="name"
                                    value-expr="id"
                                />
                            </DxColumn>
                            <DxColumn caption="의견" data-field ="violation_value.current_data.comment" :width="300"/>
                        </DxDataGrid>
                    </v-flex>
                    <v-flex class="compareDataGrid" v-if="datas.prevReport.length !==0">
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
import {mapGetters} from 'vuex';
export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxLookup,
        DxSelectBox
    },
    props:['selectedReport','reports'],
    data() {
        return {
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            ui : {
                header : ''
            },
            datas : {
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
        this.datas.selectedReport = deepClone(this.selectedReport)
        this.datas.reports = deepClone(this.reports)
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
        }
    },
    methods: {
        async getReport(){
             //뷰엑스 설정하고 수정필요
            this.datas.reportDetail = [];
            this.datas.reportDetail = deepClone(this.reportDatas.selectedReport.reportDetail)
            this.datas.boothInfo = [];
            this.datas.zoneInfo = [];
            this.datas.robotInfo = [];
            await this.getDetail();
            this.setBoothInfo();
        },
        async getDetail(){
            this.datas.allReportDetail = []
            await this.$http.get(`diagnostics/report/report/detail/type/${this.reportDatas.selectedReport.report_type}`)
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
                this.datas.reportDetail.forEach(element => {
                    if(el.data_id === element.prev_data_id) {
                        temp.push(el)
                    }
                })
            })
            this.datas.prevReport = temp;
            this.datas.robotInfo.forEach(robotElement=> {
                Object.assign(robotElement, { booth: this.datas.zoneInfo.filter(zone=> zone.id === robotElement.zone)[0].booth})
                Object.assign(robotElement, { violation_value: this.datas.reportDetail.filter(element => element.robot_id === robotElement.id)[0]})
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
        },
        setSelectBox(){
            this.datas.filteredReport = this.datas.reports.filter(el => el.report_id !== this.datas.selectedReport.report_id)
        },
        async changeSelectBox(selectReport){
            let temp = [];
            this.datas.allReportDetail.forEach(el => {
                if(el.report_id === selectReport.itemData.report_id) {
                    temp.push(el)
                }
            })
            this.datas.prevReport = temp
            this.datas.robotInfo.forEach(robotElement => {
                delete robotElement.previolation_value
                if(this.datas.prevReport.length !== 0){
                    Object.assign(robotElement, { previolation_value: this.datas.prevReport.filter(element => element.robot_id === robotElement.id)[0]})
                }
            })
        },
        clickSaveButton(){
            // this.datas.filteredCurrentData = [];
            // this.getRowData();
            // this.updateReportDatas();
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
                if(this.datas.reportDetail.reportDetail !== ''){
                    console.log('put')
                    this.$http.put(`/diagnostics/report/report/${this.datas.selectedReport.report_id}`, {
                        factory_id: this.getFactoryId,
                        booth_id : booth_id,
                        zone_id : zone_id,
                        robot_id : robot_id,
                        report_type : report_type,
                        current_data : current_data,
                        prev_data_id : prev_data_id
                    })
                    .then(() => {
                        // 뷰엑스 디스패치
                    });
                }
                else{
                    console.log('post')
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
                        // 뷰엑스 디스패치
                    });
                }
            }
        },
    },
}
</script>

<style scoped>
    .reportHeader{
        margin-top: 20px;
        font-size: 2rem;
        font-weight: bold;
    }
    .currentDataGrid{
        width: 500px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 10px;
    }
    .compareCombobox{
        flex-grow: 2;
        display: flex;
        justify-content: right;
        margin-right: 35px !important;
        height: 30px;
        margin: auto;
    }
    .compareDataGrid{
        width: 500px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .zoneName{
        width: 300px;
        /* margin: auto; */
    }
    .boothName{
        margin-top: 10px;
        margin-bottom:10px;
        background-color: rgb(54, 83, 163);
        font-weight: bold;
        font-size: 1.3rem;
    }
    .dateBox{
       margin: auto;
    }
    .saveButton{
        display: flex;
        justify-content: right;
    }
</style>

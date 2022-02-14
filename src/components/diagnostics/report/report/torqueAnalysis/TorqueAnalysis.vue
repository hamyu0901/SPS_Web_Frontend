<template>
    <div>
        <div class="torqueReport">
            <torque-report
            />
        </div>
        <div>
            <torque-report-table
                v-if="datas.reportSwitch === 1"
                v-bind:selectedReport="datas.selectedReport"
                v-bind:reports="datas.reports"
                v-bind:torqueAnalysisReportDetail="datas.torqueAnalysisReportDetail"
                @bindingCatch="bindingCatch"
                v-bind:bindingCatch="datas.rerender"
                v-bind:reportType="reportType"
                v-bind:reportSwitch="datas.reportSwitch"
                v-bind:selectedMonth="datas.selectedMonth"
                v-bind:selectedYear="datas.selectedYear"
            />
        </div>
        <div v-if="datas.reportSwitch === 0">
            <div class="combobox">
                <div class="yearCombobox">
                    <v-combobox
                        v-model="datas.selectedYear"
                        label="Select year"
                        outlined
                        :rules="[v => !!v || 'year is required']"
                        :items="years"
                    >
                    </v-combobox>
                </div>
                <div>
                    <v-combobox
                        v-model="datas.selectedMonth"
                        @click="clickMonth"
                        label="Select Month"
                        outlined
                        :items="datas.months"
                    >
                    </v-combobox>
                </div>
            </div>
        </div>
        <div>
            <torque-add-report-table
                v-if="datas.selectedMonth !== null"
                v-bind:selectedReport="datas.selectedReport"
                v-bind:reports="datas.reports"
                v-bind:selectedMonth="datas.selectedMonth"
                v-bind:selectedYear="datas.selectedYear"
                v-bind:torqueAnalysisReportDetail="datas.torqueAnalysisReportDetail"
                @bindingCatch="bindingCatch"
                v-bind:bindingCatch="datas.rerender"
                v-bind:reportType="reportType"
            />
        </div>
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
        <v-spacer></v-spacer>
    </div>
</template>

<script>

// import TorquePicker from '@/components/diagnostics/report/report/torqueAnalysis/TorquePicker'

import {mapGetters} from 'vuex';
// import TorqueReportDlg from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReportDlg'
import TorqueReportAddDlg from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReportAddDlg'
import TorqueAddReportTable from '@/components/diagnostics/report/report/torqueAnalysis/TorqueAddReportTable'
import TorqueReport from './TorqueReport.vue';
import TorqueReportTable from './TorqueReportTable.vue';
import{
    DxDataGrid,
    DxColumn,
    DxEditing
} from 'devextreme-vue/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.dark.css';
export default {
  components: {
    //   TorqueReportDlg,
      TorqueReportAddDlg,
      TorqueAddReportTable,
      TorqueReport,
      TorqueReportTable,
            DxDataGrid,
            DxColumn,
            DxEditing,
  },
  props:['reportSwitch','selectedReport','reports','torqueAnalysisReportDetail','reportType'],
  data(){
      return{
          ui: {
              headerTitle : ''
          },
          datas: {
              torequeReportAddDlg: false,
              reports: [],
              selectedReport : {},
              reportSwitch: null,
              selectedYear: null,
              selectedMonth : null,
              months: [],
              torqueAnalysisReportDetail:[],
              rerender : 0
          }
      }
  },
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos'
        }),
        years(){
            let years = [];
            years.push(Number(new Date().getFullYear()),Number(new Date().getFullYear())-1)
            return years
        },
    },
    mounted(){
        this.datas.reportSwitch = this.reportSwitch
        this.datas.selectedReport = this.selectedReport
        this.datas.reports = this.reports
        this.datas.torqueAnalysisReportDetail= this.torqueAnalysisReportDetail
    },
    watch: {
        reportSwitch(){
            this.datas.reportSwitch = this.reportSwitch
        },
        selectedReport(){
            this.datas.selectedReport = this.selectedReport
        },
        torqueAnalysisReportDetail(){
            this.datas.torqueAnalysisReportDetail= this.torqueAnalysisReportDetail
        }
    },
    methods:{
    //   closeTorquePicker(){
    //       this.datas.pickerModal = false
    //   },
        // clickPickerMonth(date){
        //     this.datas.date = date
        //     this.getViolatedAccumulation();
        // },
        bindingCatch(){
            this.datas.rerender ++;
        },
        clickMonth(){
            this.datas.month = [];
            if(this.datas.selectedYear !== null){
                this.datas.months = ['01월','02월','03월','04월','05월','06월','07월','08월','09월','10월','11월','12월']
            }
            else{
                window.alert('Year is Required')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
  @import './torqueAnalysis';
</style>
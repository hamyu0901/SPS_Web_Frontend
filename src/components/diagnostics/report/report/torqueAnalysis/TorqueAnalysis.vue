<template>
    <div>
        <div>
            <torque-report
                v-if="datas.reportSwitch === 1"
                v-bind:selectedReport="datas.selectedReport"
                v-bind:reports="datas.reports"
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
                v-if="datas.selectedMonth !== null && datas.reportSwitch === 0 "
                v-bind:selectedReport="datas.selectedReport"
                v-bind:month="datas.selectedMonth"
                v-bind:year="datas.selectedYear"
                v-bind:reports="datas.reports"
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
import TorqueReport from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReport'

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
            DxDataGrid,
            DxColumn,
            DxEditing
  },
  props:['reportSwitch','selectedReport','reports'],
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
    },
    watch: {
        reportSwitch(){
            this.datas.reportSwitch = this.reportSwitch
        },
        selectedReport(){
            this.datas.selectedReport = this.selectedReport
        },
    },
    methods:{
    //   closeTorquePicker(){
    //       this.datas.pickerModal = false
    //   },
        // clickPickerMonth(date){
        //     this.datas.date = date
        //     this.getViolatedAccumulation();
        // },
        clickMonth(){
            this.datas.month = [];
            if(this.datas.selectedYear !== null){
                this.datas.months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
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
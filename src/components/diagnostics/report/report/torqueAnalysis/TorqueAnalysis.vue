<template>
    <div class = "container">
        <!-- <v-text-field
            class="fieldDate"
            v-model="datas.date"
            label="Select Month"
            prepend-icon="event"
            readonly
            @click.stop="datas.pickerModal = true"
        ></v-text-field> -->
        <div class="header">
            <div class="reportDlgButton">
                <v-dialog
                    v-model="datas.torequeReportDlg"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div class="button">
                            <v-btn
                                class="Btn"
                                v-on="on"
                                v-bind="attrs"
                                elevation="0"
                            >리포트 조회</v-btn>
                        </div>
                    </template>
                    <torque-report-dlg
                        @closeTorqueReportDlg="closeTorqueReportDlg"
                    />
                </v-dialog>
            </div>
            <div class="reportAddDlgButton">
                <v-dialog
                    width="1000"
                    v-model="datas.torequeReportAddDlg"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div class="button">
                            <v-btn
                                class="Btn"
                                v-on="on"
                                v-bind="attrs"
                                elevation="0"
                            >리포트 생성</v-btn>
                        </div>
                    </template>
                    <torque-report-add-dlg
                        @closeTorqueReportAddDlg="closeTorqueReportAddDlg"
                        @clickReportAddButton="clickReportAddButton"
                    />
                </v-dialog>
            </div>
        </div>
        <div v-if="ui.headerTitle !== ''">
            <div class="reportTitle">{{ui.headerTitle}}</div>
            <div
            v-for="(booth, boothIndex) in datas.boothInfo" :key="boothIndex"
            class="boothHeader"
            >
                {{booth.name}}----------------------------------------------------
                <div v-for="(zone, zoneIndex) in datas.filteredZoneInfo" :key="zoneIndex">
                    {{datas.filteredZoneInfo[boothIndex][zoneIndex].name}}
                </div>
            </div>
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
        <div class="container">
            <torque-report-table-result
                v-if="datas.date"
                v-bind:selectedCurrentDate="datas.date"
                v-on:showGridData="showGridData"
            />
        </div>
        <div>
            <torque-report-chart-result
                v-if="datas.selectedGridData"
                v-bind:selectedGridData="datas.selectedGridData"
            />
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
// import TorquePicker from '@/components/diagnostics/report/report/torqueAnalysis/TorquePicker'
import TorqueReportTableResult from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReportTableResult'
import TorqueReportChartResult from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReportChartResult'
import {mapGetters} from 'vuex';
import TorqueReportDlg from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReportDlg'
import TorqueReportAddDlg from '@/components/diagnostics/report/report/torqueAnalysis/TorqueReportAddDlg'
export default {
  components: {
    //   TorquePicker,
      TorqueReportTableResult,
      TorqueReportChartResult,
      TorqueReportDlg,
      TorqueReportAddDlg
  },
  data(){
      return{
          ui: {
              headerTitle : ''
          },
          datas: {
              date: "",
            //   pickerModal: false,
              selectedGridData : null,
              violatedAccumulation : [], // 적산 경고값 다 가져온 data
              filteredViolatedAccum : [], // 해당 날짜로 filter된 data
              torequeReportDlg : false,
              torequeReportAddDlg: false,
              boothInfo: [],
              zoneInfo: [],
              filteredZoneInfo: [],
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
    },
    methods:{
    //   closeTorquePicker(){
    //       this.datas.pickerModal = false
    //   },
        clickPickerMonth(date){
            this.datas.date = date
            this.getViolatedAccumulation();
        },
        showGridData(data){
            this.datas.selectedGridData = data
        },
        closeTorqueReportDlg(){
            this.datas.torequeReportDlg = false
        },
        closeTorqueReportAddDlg(){
             this.datas.torequeReportAddDlg = false
            this.ui.headerTitle = 'Report Name'
        },
        clickReportAddButton(title){
            this.ui.headerTitle = title
            this.datas.torequeReportAddDlg = false
            this.setBoothInfo();
        },
        setBoothInfo(){
            this.datas.boothInfo = deepClone(this.getBoothInfos)
            this.datas.zoneInfo = deepClone(this.getZoneInfos)
            this.datas.boothInfo.forEach((el,index) => {this.datas.filteredZoneInfo.push(index)})
            for(let i = 0; i < this.datas.filteredZoneInfo.length; i ++) {
                this.datas.filteredZoneInfo[0] = this.datas.zoneInfo.filter(el => el.booth === 1)
                this.datas.filteredZoneInfo[1] = this.datas.zoneInfo.filter(el => el.booth === 2)
                this.datas.filteredZoneInfo[2] = this.datas.zoneInfo.filter(el => el.booth === 3)
            }
            this.getViolatedAccumulation()
      },

      async getViolatedAccumulation(){

        await this.$http.get(`/torquemonitoring/factory/${this.getFactoryId}`).then((response) => {
              this.datas.violatedAccumulation = response.data
        });
        this.setViolatedAccumulation();
      },
        setViolatedAccumulation(){
            Object.assign(this.datas.filteredZoneInfo[0], {value: this.datas.violatedAccumulation.filter(el => el.booth_id ===1)});
            // this.datas.filteredZoneInfo[0].push(this.datas.violatedAccumulation.filter(el => el.booth_id ===1))
        }
    }
}
</script>
<style lang="scss" scoped>
  @import './torqueAnalysis';
</style>
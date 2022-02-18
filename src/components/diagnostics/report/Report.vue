<template>
    <div id="reportMainContainer">
        <v-dialog
            v-model="datas.reportDlg"
            width="1000"
        >
            <template v-slot:activator="{ on, attrs }">
                <div>
                    <v-btn
                        v-on="on"
                        v-bind="attrs"
                        elevation="0"
                    >리포트 조회 / 생성</v-btn>
                </div>
            </template>
            <report-dialog
                @closeReportDialog="closeReportDialog"
                @clickConfirmButton="clickConfirmButton"
                @getReport="getReport"
            />
        </v-dialog>
        <div id="tabMenuBox">
            <v-btn-toggle rounded color="transparent" style="background:transparent" v-model="datas.toggle">
                <v-btn @click="clickTorqueAnalysis" :ripple="false" color="primary">토크 분석</v-btn>
                <v-btn @click="clickTempAnalysis" :ripple="false" color="primary">온도 분석</v-btn>
                <v-btn @click="clickAlarmAnalysis" :ripple="false" color="primary">알람 분석</v-btn>
            <!-- <v-btn @click="clickTorqueAnalysis" class="btnStyle" :ripple="false" color="primary" :to="{name: 'torqueAnalysis'}">토크 분석</v-btn> -->
            <!-- <v-btn class="btnStyle" :ripple="false" color="primary" :to="{name: 'tempAnalysis'}">온도 분석</v-btn>
            <v-btn class="btnStyle" :ripple="false" color="primary" :to="{name: 'alarmAnalysis'}">알람 분석</v-btn> -->
            </v-btn-toggle>
        </div>
        <v-divider></v-divider>
        <div>
            <torque-analysis
                v-if="datas.reportType === 0"
                v-bind:reportSwitch="datas.reportSwitch"
                v-bind:selectedReport="datas.selectedReport"
                v-bind:reports="datas.reports"
                v-bind:torqueAnalysisReportDetail="datas.torqueAnalysisReportDetail"
                v-bind:reportType="datas.reportType"
            />
        </div>
        <div>
            <temp-analysis 
                v-if="datas.reportType === 1"
                :reports="datas.reports"
            
            ></temp-analysis>
        </div>
        <div v-if="datas.reportType === 2">알람 분석</div>
        <!-- <div id="reportRouterbox"> -->
            <!-- <router-view></router-view> -->
        <!-- </div> -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import ReportDialog from '@/components/diagnostics/report/report/ReportDialog';
import TorqueAnalysis from '@/components/diagnostics/report/report/torqueAnalysis/TorqueAnalysis';
import TempAnalysisVue from './report/tempAnalysis/TempAnalysis.vue';
export default {
    components: {
        ReportDialog,
        TorqueAnalysis,
        TempAnalysis: TempAnalysisVue,
    },
    data(){
        return{
            datas: {
                toggle: null,
                reportDlg: false,
                reportSwitch : null,
                selectedReport : {},
                reports: [],
                reportType: null,
                torqueAnalysisReportDetail: [],
            }
        }
    },
    computed: {
        ...mapGetters({
            reportDatas: 'getReportItems'
        })
    },

    methods:{
        clickTorqueAnalysis(){
            this.reportDatas.selectedReport.report_type = 0
            this.datas.reportType = 0
        },
        clickTempAnalysis(){
            this.reportDatas.selectedReport.report_type = 1
            this.datas.reportType = 1
        },
        clickAlarmAnalysis(){
            this.reportDatas.selectedReport.report_type = 2
            this.datas.reportType = 2
        },
        closeReportDialog(){
            this.datas.reportDlg = false
        },
        clickConfirmButton(item){
            this.datas.reportDlg = false
            this.datas.selectedReport = item.selectedReport
            this.datas.reportSwitch = item.reportSwitch
            this.datas.torqueAnalysisReportDetail = item.torqueAnalysisReportDetail
        },
        getReport(reports){
            this.datas.reports = reports
        }
    }
}
</script>
<style lang="scss" scoped>
  @import './report';
</style>
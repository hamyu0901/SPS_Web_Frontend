<template>
    <v-card>
        <v-card-title>
            리포트 조회
            <v-spacer/>
			<!-- <v-btn icon ><v-icon>mdi-close</v-icon></v-btn> -->
        </v-card-title>
        <div class ="reportList">
            <DxDataGrid
                :data-source="datas.reports"
                key-expr="reportNumber"
                :show-borders="true"
                :width="1000"
                @selection-changed="selectReport"
            >
                <DxColumn data-field="reportNumber" :width="100" caption="No"/>
                <DxColumn data-field="report_name" caption="제목"/>
                <DxColumn data-field="update_time" caption="등록일"/>
                <DxSelection
                    mode="single"
                    :width="50"
                    show-check-boxes-mode="always"
                />
            </DxDataGrid>
        </div>
        <div class= "buttton">
            <v-btn @click="clickConfirmButton">확인</v-btn>
            <v-btn @click="clickCloseButton">취소</v-btn>
        </div>
    </v-card>
</template>
<script>

import { DxButton } from 'devextreme-vue/button';
import{
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    DxToolbar,
    DxItem,
    DxSelection
} from 'devextreme-vue/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.dark.css';
export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxLookup,
        DxToolbar,
        DxItem,
        DxButton,
        DxSelection
    },
    props: ['reports'],
    data () {
        return {
            datas : {
                reports: [],
                reportList: [],
                selectedReport:{}
            }
        }
    },
    mounted(){
        // console.log(this.reports)
        // this.datas.reports = this.reports
        // this.setDataGrid();
    },
    watch: {
        reports() {
            if(this.reports !== []){
                this.datas.reports = this.reports
                 this.setDataGrid();
            }
        }
    },
    methods : {
        selectReport(report){
            this.datas.selectedReport = report.selectedRowsData[0]
            // this.$emit('selectedReportInfo',report.selectedRowsData[0])
        },
        clickCloseButton(){
            this.$emit('closeTorqueReportDlg');
        },
        setDataGrid(){
            // this.datas.reportList = [];
            // this.datas.reportList = deepClone(this.datas.reports)
            this.datas.reports.forEach((el,index) => {
                el.update_time = el.update_time.substr(0, 10),
                Object.assign(el, {reportNumber : index+1})
            })
        },
        clickConfirmButton(){
            this.$emit('selectedReportInfo', this.datas.selectedReport)
        }
    }
}
</script>
<style scoped>
.buttton{
    display: flex;
    justify-content: right;
}
.reportList{
    display: flex;
    justify-content: center;
}
</style>
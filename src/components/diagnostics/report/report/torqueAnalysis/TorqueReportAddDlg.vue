<template>
    <v-card class = "container">
        <v-card-title>
            리포트 정보 입력
            <v-spacer/>
			<v-btn icon @click="clickCloseButton"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-form
            ref="form"
            v-model="datas.valid"
            lazy-validation
        >
            <v-text-field
                v-model="datas.reportName"
                :counter="30"
                :rules="nameRules"
                label="Report Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="datas.currentDate"
                label="Today Date"
                readonly
            ></v-text-field>
        </v-form>
        <div class= "addButton">
            <v-btn @click="clickReportAddButton">생성</v-btn>
        </div>
    </v-card>
</template>
<script>


export default {
    data() {
        return {
            ui : {
                headerTitle : ''
            },
            datas: {
                valid : true,
                reportName: '',
                currentDate: '',
            }
        }
    },
    mounted(){
        this.getCurrentDate();
    },
    methods: {
        clickCloseButton(){
            this.$emit('closeTorqueReportAddDlg')
        },
        getCurrentDate(){
            let today = new Date();
            let year = today.getFullYear(); // 년도
            let month = today.getMonth() + 1;  // 월
            let date = today.getDate();  // 날짜
            this.datas.currentDate = year + '-' + month + '-' + date
        },
        clickReportAddButton(){
            this.ui.headerTitle = this.datas.reportName
            this.$emit('clickReportAddButton',this.ui.headerTitle)
        }
    }
}
</script>
<style scoped>
    .addButton{
        display: flex;
        justify-content: right;
    }
</style>
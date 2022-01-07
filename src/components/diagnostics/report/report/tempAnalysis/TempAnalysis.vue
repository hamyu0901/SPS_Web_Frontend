<template>
  <div id="tempMainContainer">
      
    <div id="header">
        <v-menu
        v-model="menu"
        :close-on-content-click="false"
        lazy
        attach
        transition="scale-transition"
        bottom offset-y
    >
        <template v-slot:activator="{ on }">
            <label @click="decreaseMonth()" style="margin-right: 30px">{{'<'}}</label>
            <label v-on="on">{{selectedMonth.format('YYYY년 MM월')}}</label>
            <label @click="increaseMonth()" style="margin-left: 30px">{{'>'}}</label>
        </template>
        <v-date-picker v-model="month" color="green lighten-1" type="month" locale="ko-kr" id="dateHeader">
             <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">취소</v-btn>
          <v-btn flat color="primary" @click="changeMonth()">확인</v-btn>
        </v-date-picker>
    </v-menu>
    </div>
    <div id="tableContainer">
        <div id="tablePrensent">
            <div class="periodBox">{{curr_month.format('MM')}}월 축별 온도 평균 데이터</div>
            <div class="tableBox">
                <table-vue :propsTableData="propsTableData"></table-vue>
            </div>
        </div>
        <div id="tableBefore">
            <div class="periodBox">{{curr_month.subtract(1, 'M').format('MM')}}월 축별 온도 평균 데이터</div>
            <div class="tableBox">
                <table-vue :propsTableData="propsTableData"></table-vue>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment';
import TableVue from '../../../../../commons/Table.vue'
export default {
    components: {
        TableVue: TableVue
    },
    data: () => ({
        month: new Date().toISOString().substr(0, 7),
        selectedMonth: moment(),
        curr_month: moment(),
        menu: false,
        propsTableData:{
            x_Headers:[
                {name: '1축'},
                {name: '2축'},
                {name: '3축'},
                {name: '4축'},
                {name: '5축'},
                {name: '6축'},
            ],
            y_Headers:[
                {name: 'L1'},
                {name: 'R1'},
                {name: 'L2'},
                {name: 'R2'},
                {name: 'L3'},
                {name: 'R3'},
                {name: 'L4'},
                {name: 'R4'},
            ]
        }
    }),
    methods:{
        changeMonth(){
            this.selectedMonth = moment(this.month);
            this.curr_month = moment(this.month);
            this.menu = false;
        },
        increaseMonth(){
            this.month = moment(this.month).add(1, 'M');
            this.selectedMonth = this.month;
            this.curr_month = moment(this.month);
        },
        decreaseMonth(){
            this.month = moment(this.month).subtract(1, 'M');
            this.selectedMonth = this.month;
            this.curr_month = moment(this.month);
        }

    }
}
</script>
<style lang="scss" scoped>
  @import './tempAnalysis';
</style>
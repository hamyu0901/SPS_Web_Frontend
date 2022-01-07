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
            <v-btn @click="decreaseMonth()" color="grey darken-1" :ripple="false">
                <v-icon class="no-drag">arrow_back_ios</v-icon>
            </v-btn>
            <label class="no-drag" v-on="on">{{curr_month.format('YYYY년 MM월')}}</label>
            <v-btn @click="increaseMonth()" color="grey darken-1" :ripple="false">
                <v-icon class="no-drag">arrow_forward_ios</v-icon>
            </v-btn>
        </template>
        <v-date-picker v-model="time" color="green lighten-1" type="month" locale="ko-kr" id="dateHeader">
             <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">취소</v-btn>
          <v-btn flat color="primary" @click="changeMonth()">확인</v-btn>
        </v-date-picker>
    </v-menu>
    </div>ㄴ
    <div id="tableContainer">
        <div id="tablePrensent">
            <div class="periodBox">{{curr_month.format('YYYY년 MM')}}월 축별 온도 평균 데이터</div>
            <div class="tableBox">
                <table-vue :propsTableData="propsTableData"></table-vue>
            </div>
        </div>
        <div id="tableBefore">
            <div class="periodBox">{{prev_month}}월 축별 온도 평균 데이터</div>
            <div class="tableBox">
                <table-vue :propsTableData="propsTableData"></table-vue>
            </div>
        </div>
    </div>
    <div id="chartContainer">
        <bar-chart></bar-chart>
    </div>
  </div>
</template>
ㄴ
<script>
import moment from 'moment';
import TableVue from '../../../../../commons/Table.vue'
import BarChartVue from '../../../../../commons/BarChart.vue';
export default {
    components: {
        TableVue: TableVue,
        barChart: BarChartVue
    },
    data: () => ({
        time: null,
        selectedMonth: null,
        curr_month: null,
        prev_month: null,
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
                {
                    name: 'L1',
                    dataList: [8, 3, 3, 40, 2, 11]    
                },
                {
                    name: 'R1',
                    dataList: [2, 10, 3, 13, 2, 11]    
                },
                {
                    name: 'L2',
                    dataList: [33, 11, 7, 43, 2, 11]    
                },
                {
                    name: 'R2',
                    dataList: [1, 15, 3, 43, 2, 11]    
                },
                {
                    name: 'L3',
                    dataList: [12, 1, 3, 43, 2, 11]    
                },
                {
                    name: 'R3',
                    dataList: [21, 0, 3, 43, 2, 11]    
                },
                {
                    name: 'L4',
                    dataList: [18, 10, 3, 43, 2, 11]    
                },
                {
                    name: 'R4',
                    dataList: [9, 10, 3, 43, 2, 11]    
                },
            ]
        }
    }),
    created(){
        this.time = new Date().toISOString();
        this.curr_month = moment(this.time);
        this.prev_month = moment(this.time).subtract(1, 'M').format('YYYY년 MM');
    },
    methods:{
        changeMonth(){
            this.curr_month = moment(this.time);
            this.prev_month = moment(this.time).subtract(1, 'M').format('YYYY년 MM');
            this.menu = false;
        },
        increaseMonth(){
            this.time.setMonth(this.time.getMonth() + 1);
            this.curr_month = moment(this.time);
            this.prev_month = moment(this.time).subtract(1, 'M').format('YYYY년 MM');
        },
        decreaseMonth(){
            this.time.setMonth(this.time.getMonth() - 1);
            this.curr_month = moment(this.time);
            this.prev_month = moment(this.time).subtract(1, 'M').format('YYYY년 MM');
        }

    }
}
</script>
<style lang="scss" scoped>
  @import './tempAnalysis';
</style>
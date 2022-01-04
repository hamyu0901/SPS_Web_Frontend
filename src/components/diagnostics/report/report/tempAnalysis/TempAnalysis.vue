<template>
  <div id="tempMainContainer">
    <div id="header">< 날짜 ></div>
    <div id="tableContainer">
        <div id="tablePrensent">
            <div class="periodBox">11월 축별 온도 평균 데이터</div>
            <div class="tableBox">
                <table-vue :propsTableData="propsTableData"></table-vue>
            </div>
        </div>
        <div id="tableBefore">
            <div class="periodBox">10월 축별 온도 평균 데이터</div>
            <div class="tableBox">
                <table-vue :propsTableData="propsTableData"></table-vue>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import TableVue from '../../../../../commons/Table.vue'
export default {
    components: {
        TableVue: TableVue
    },
    data(){
        return{
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
        }
    },
    methods:{


    }
}
</script>
<style lang="scss" scoped>
  @import './tempAnalysis';
</style>
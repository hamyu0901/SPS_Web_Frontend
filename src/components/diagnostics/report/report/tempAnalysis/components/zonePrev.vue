<template>
    <div id="zonePrevBox">
        <div id="zoneComboBox">
            <selector-vue :noDataText="'조회 가능한 리포트가 없습니다.'"></selector-vue>
            <v-text-field
                v-model="zonePeriod"
                hide-details
                readonly
                prepend-icon="event"
            ></v-text-field>
        </div>
        <div id="zoneTableBox">
            <table-vue :withRowHeaders="true" :isEditable="false" :propsColumn_x="column_x" :propsColumn_y="robots" :propsData="tableData" :propsTheme="'dark'" :propsFormat="`°c`"/>
        </div>
        <div id="opinionBox">
            <zone-opinion-vue></zone-opinion-vue>
        </div>
    </div>
</template>

<script>
import DateFromToVue from '../../../../../../commons/DateFromTo.vue';
import report_selectorVue from '../../../../../../commons/report_selector.vue';
import TableVue from '../../../../../../commons/Table.vue'
import zoneOpinionVue from './zoneOpinion.vue';

export default {
    props:['robotInfo'],
    components: {
        selectorVue: report_selectorVue,
        tableVue: TableVue,
        DateFromToVue: DateFromToVue,
        zoneOpinionVue: zoneOpinionVue,
    },
    data(){
        return{
            zonePeriod:null,
            menu:false,
            boothId: null,
            zoneId: null,
            zoneName: null,
            column_x:[
                {
                    colname: '1축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '2축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '3축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '4축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '5축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '6축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '7축',
                    key: 'temperature',
                    colWidth: 5,
                },
                {
                    colname: '위험도',
                    key:'severity',
                    colWidth: 5,
                },
                {
                    colname: '의견',
                    key:'comment',
                    colWidth: 30,
                }
            ],

            column_y:[
                {
                    colname: 'L1',
                    key: 'robot_id',
                    value: 0
                },
                {
                    colname: 'R1',
                    key: 'robot_id',
                    value: 1
                },
                {
                    colname: 'L2',
                    key: 'robot_id',
                    value: 2
                },
                {
                    colname: 'R2',
                    key: 'robot_id',
                    value: 3
                },
                {
                    colname: 'L3',
                    key: 'robot_id',
                    value: 4
                },
                {
                    colname: 'R3',
                    key: 'robot_id',
                    value: 5
                },
                {
                    colname: 'L4',
                    key: 'robot_id',
                    value: 6
                },
                {
                    colname: 'R4',
                    key: 'robot_id',
                    value: 7
                }
            ],

            tableData: [],
            testList: [
                ],
            
        }
    },
    created(){
        this.setThisZone();
        this.initializeData();
    },
    computed:{
        robots(){
            if(this.column_y.length !== 0){
                this.column_y.splice(0);
            }

            for(const robot of this.robotInfo){
                this.column_y.push(robot);
            }
            return this.column_y;
        }
    },
    methods:{
        onSave() {
            console.log("부모 컴포넌트에서 직접 발생시킨 이벤트2");
        },
        setThisZone(){
            this.zoneId = this.zoneInfo.zoneId;
            this.boothId = this.zoneInfo.boothId;
            this.zoneName = this.zoneInfo.zoneName;
        },
        initializeData(){
            this.findZoneData();
            // this.zonePeriod = this.zoneInfo.period !== null ? this.zoneInfo.period : null;
        },
        findZoneData(){
            //zone_id, booth_id 그리고 factory_id로 리포트 타입에 맞게 찾는다.
            if(this.tableData.length !== 0){
                this.tableData.splice(0);
            }
            this.zonePeriod = '2022-01-01 ~ 2021-01-21';

            for(const list of this.testList){
                this.tableData.push(list);
            }
            
        },
        updatePeriod(period){
            this.zonePeriod = period;
        }
    }

}
</script>

<style lang="scss" scoped>
#zonePrevBox{
    width: inherit; display: flex; flex-direction: column;
    #zoneComboBox{
        height: 50px;
        display: flex;
        align-items: center;
    }
    #zoneComboBox > div{
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        padding:0 !important;
    }

    #zoneComboBox > div:first-child{
        padding:13px 30px 0 0 !important;
    }

    #zoneComboBox >>> input{
        cursor: default !important;
    }

    #zoneComboBox >>> .primary--text{
        color: white !important;
        caret-color: white !important;
    }

    #zoneComboBox >>> .v-input__slot:before, #zoneComboBox >>> .v-input__slot:after{
        display: none;
    }
}
</style>
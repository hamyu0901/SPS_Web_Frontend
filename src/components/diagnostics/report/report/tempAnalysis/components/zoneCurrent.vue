<template>
    <div id="zoneCurrentBox">
        <div id="zoneDataBox">
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="700px"
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="zonePeriod"
                        hide-details
                        readonly
                        prepend-icon="event"
                        v-on="on"
                    ></v-text-field>
                </template>
                <date-from-to-vue :dialog.sync="menu" @updatePeriod="updatePeriod"></date-from-to-vue>
            </v-menu>
        </div>
        <div id="zoneTableBox">
            <table-vue ref="table" :withRowHeaders="true" :isEditable="true" :propsColumn_x="column_x" :propsColumn_y="robots" :propsData="tableData" :propsTheme="'dark'" :propsFormat="`°c`"/>
        </div>
        <div id="opinionBox">
            <zone-opinion-vue :disable="disableTextArea" :opinionInput="opinionInput" @updateText="updateText"></zone-opinion-vue>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DateFromToVue from '../../../../../../commons/DateFromTo.vue';
import TableVue from '../../../../../../commons/Table.vue'
import zoneOpinionVue from './zoneOpinion.vue';

export default {
    props:['zoneInfo', 'robotInfo', 'quickPeriod'],
    components: {
        tableVue: TableVue,
        DateFromToVue: DateFromToVue,
        zoneOpinionVue: zoneOpinionVue,
    },
    data(){
        return{
            opinionInput: null,
            zonePeriod:null,
            menu:false,
            boothId: null,
            zoneId: null,
            disableTextArea:true,
            zoneName: null,
            tableData:[
                // {
                //     robot_id: 1,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 1,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 2,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 0,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 3,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 1,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 4,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 0,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 41,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 1,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 42,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 0,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 43,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 0,
                //     comment:'특이사항 없음'

                // },
                // {
                //     robot_id: 44,
                //     avg_temperature:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     violation:[
                //         {
                //             axis1: 1,
                //             axis2: 1,
                //             axis3: 1,
                //             axis4: 1,
                //             axis5: 1,
                //             axis6: 1,
                //             axis7: 1,
                //         }
                //     ],
                //     severity: 0,
                //     comment:'특이사항 없음'

                // }
            ],
            column_x:[
                {
                    colname: '1축',
                    array_key: 'axis1',
                    key: ['avg_temperature', 'violation'],
                    colWidth: 5,
                },
                {
                    colname: '2축',
                    array_key: 'axis2',
                    key: ['avg_temperature', 'violation'],
                    colWidth: 5,
                },
                {
                    colname: '3축',
                    array_key: 'axis3',
                    key: ['avg_temperature', 'violation'],
                    colWidth: 5,
                },
                {
                    colname: '4축',
                    array_key: 'axis4',
                    key: ['avg_temperature', 'violation'],
                    colWidth: 5,
                },
                {
                    colname: '5축',
                    array_key: 'axis5',
                    key: ['avg_temperature', 'violation'],
                    colWidth: 5,
                },
                {
                    colname: '6축',
                    array_key: 'axis6',
                    key: ['avg_temperature', 'violation'],
                    colWidth: 5,
                },
                {
                    colname: '7축',
                    array_key: 'axis7',
                    key: ['avg_temperature', 'violation'],
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
            testList: [
                ],
            
        }
    },
    created(){
        this.setThisZone();
        
    },
    computed:{
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getBoothInfos: 'getBoothInfos',
            getZoneInfos: 'getZoneInfos',
            getRobotInfos: 'getRobotInfos',
        }),
        robots(){
            if(this.column_y.length !== 0){
                this.column_y.splice(0);
            }

            for(const robot of this.robotInfo){
                this.column_y.push(robot);
            }
            return this.column_y;
        },
        
    },
    watch:{
        quickPeriod(){
            var quickDate;
            var date = new Date();
            const formatDate = (date)=>{
                let formatted_date = date.getFullYear() + "-" + (("00"+ (date.getMonth() + 1))).slice(-2)  
                return formatted_date;
            }
            var quick_today = (this.quickPeriod.quickYear.toString()+"-"+this.quickPeriod.quickMonth.toString());
            if(formatDate(date) === quick_today){
                quickDate = (("00"+ date.getDate())).slice(-2);
            }else{
                switch(this.quickPeriod.quickMonth){
                    case '01':
                    case '03':
                    case '05':
                    case '07':
                    case '08':
                    case '10':
                    case '12':{
                        quickDate = 31;
                        break;
                    }
                    default:{
                        quickDate = 30;
                        break;
                    }

                }
            }
            
            this.zonePeriod = `${this.quickPeriod.quickYear}-${this.quickPeriod.quickMonth}-01 ~ ${this.quickPeriod.quickYear}-${this.quickPeriod.quickMonth}- ${quickDate}`;
            var dateFrom = `${this.quickPeriod.quickYear}-${this.quickPeriod.quickMonth}-01 00:00:00`;
            var dateTo = `${this.quickPeriod.quickYear}-${this.quickPeriod.quickMonth}-31 23:59:59`;
            this.findZoneData(dateFrom, dateTo);
        }
    },
    methods:{
        updateText(txt){
            this.opinionInput = txt;
        },
        childFunc(){
            this.$refs.table.childFunc();
        },
        onSave() {
            const value = {
                report_id: this.report_id,
                report_type: 1,
                factory_id: this.getFactoryId,
                booth_id: this.booth_id,
                zone_id: this.factory_id,
                robot_id_list:this.getRobotList(),
                /*[1,2,3,4,41,42,43,44]*/
                data_list:[

                ],
                /*
                {
                    avg_temperature:[
                        {
                            axis1: 1,
                            axis2: 1,
                            axis3: 1,
                            axis4: 1,
                            axis5: 1,
                            axis6: 1,
                            axis7: 1,
                        }
                    ],
                    violation:[
                        {
                            axis1: 1,
                            axis2: 1,
                            axis3: 1,
                            axis4: 1,
                            axis5: 1,
                            axis6: 1,
                            axis7: 1,
                        }
                    ],
                    severity: 0,
                    comment:'특이사항 없음'
                }
                
                */
                robot_coment_list:[],
                robot_severity_list:[],
                current_data_range:`[${this.zonePeriod.substr(0,10)}, ${this.zonePeriod.substr(13,23)}]`,
                comment:[this.opinionInput],
            }
        },
        setThisZone(){
            this.zoneId = this.zoneInfo.zone_id;
            this.boothId = this.zoneInfo.booth_id;
            this.zoneName = this.zoneInfo.zone_name;
        },
        initializeData(){
            this.findZoneData();
            // this.zonePeriod = this.zoneInfo.period !== null ? this.zoneInfo.period : null;
        },
        findZoneData(dateFrom, dateTo){
            //zone_id, booth_id 그리고 factory_id로 리포트 타입에 맞게 찾는다.
            
            
            const variable ={
                factory_id: 2,
                booth_id: this.boothId,
                zone_id: this.zoneId,
                fromDate: dateFrom,
                toDate: dateTo
            }
            this.$http.post(`/diagnostics/datareport/temperature/analyze`, variable).then(result => {
                if(this.tableData.length !== 0){
                    this.tableData.splice(0);
                }

                for(const list of result.data){
                    this.tableData.push(list.robot_info);
                }
                this.disableTextArea = false;
                console.log(this.tableData);
            })


            
        },
        updatePeriod(period){
            this.zonePeriod = period;
            var dateFrom = `${this.zonePeriod.substr(0,10)} 00:00:00`;
            var dateTo = `${this.zonePeriod.substr(13,23)} 23:59:59`;
            this.findZoneData(dateFrom, dateTo);
        }
    }

}
</script>

<style lang="scss" scoped>
#zoneCurrentBox{
    width: inherit; display: flex; flex-direction: column;
    #zoneDataBox{
        width:fit-content;
        height: 50px;
        display: flex;
        align-items: center;
    }
     #zoneDataBox >>> .v-text-field{
         padding: 0 !important;
         margin: 0 !important;
     }
    #zoneDataBox >>> input{
        cursor: pointer !important;
        width: 200px !important;
    }
    #zoneDataBox >>> .v-input__slot:before, #zoneDataBox >>> .v-input__slot:after{
        display: none;
    }
    
}
</style>
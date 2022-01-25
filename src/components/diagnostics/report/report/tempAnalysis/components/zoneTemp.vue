<template>
    <div id="zoneBox">
        <div id="zoneTitleBox">
            <h1>{{zoneName}}</h1>
        </div>
        <div id="compareBox">
            <current-zone :zoneInfo="zoneInfo" :robotInfo="robotInfo" :quickPeriod="quickPeriod" ref="current" @onSave="onSave"></current-zone>
            <prev-zone :robotInfo="robotInfo" ref="prev"></prev-zone>
        </div>
    </div>
</template>

<script>
import zoneCurrentVue from './zoneCurrent.vue';
import zonePrevVue from './zonePrev.vue';


export default {
    props:['zoneInfo', 'quickPeriod'], 
    components: {
        currentZone: zoneCurrentVue,
        prevZone: zonePrevVue,
    },
    data(){
        return{
            zoneName: null,
            robotInfo: []
            
        }
    },
    created(){
        this.setThisZone();
        this.getRobots();
    },
    computed:{
        
    },
    methods:{
        onSave(value){

            value.prev_data_id = null;
            this.$http.post(`/diagnostics/datareport/temperature/save`, value).then(result => {
                // if(this.tableData.length !== 0){
                //     this.tableData.splice(0);
                // }

                // for(const list of result.data){
                //     this.tableData.push(list.robot_info);
                // }
                // this.disableTextArea = false;
            })
        },
        childFunc() {
            this.$refs.prev.onSave();
           this.$refs.current.childFunc();
           
        },
        setThisZone(){
            this.zoneName = this.zoneInfo.zone_name;
            this.zoneId = this.zoneInfo.zone_id;
            this.boothId = this.zoneInfo.booth_id;
        },
        getRobots(){ //존별 로봇 데이터 가지고 옴
            this.$http.get(`/diagnostics/datareport/temperature/robotInfo/booth_id/${this.boothId}/zone_id/${this.zoneId}`).then(result => {
                if(this.robotInfo.length !== 0){
                    this.robotInfo.splice(0)
                }

                for(const data of result.data){
                    this.robotInfo.push(data.robot_info);
                }
            })
        },
    }

}
</script>

<style lang="scss" scoped>
#zoneBox{
    display: flex; flex-direction: column;
    border: 1px solid white;
    border-radius: 10px;
    #zoneTitleBox{
        color: orange;
        font-size: 20px;
        font-weight: 700;
        margin-left: 30px;
        margin-top: 20px;
    }
    #compareBox{
        width: 100%;
        display: flex;
    }
    #compareBox > div{
        padding: 30px !important;
    }
}
</style>
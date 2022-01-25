<template>
  <div id="boothBox">
      <div id="boothTitleBox">
          <h1>{{boothInfo.booth_name}}</h1>
          <v-divider></v-divider>
      </div>
      <zone-vue v-for="(zone, index) in zones" :zoneInfo="zone" :key="index" :quickPeriod="quickPeriod" ref="child_component"></zone-vue>
  </div>
</template>

<script>
import zoneTempVue from './zoneTemp.vue'
export default {
    props:['boothInfo', 'quickPeriod'],
    components:{
        zoneVue: zoneTempVue,
    },
    data(){
        return{
            boothId: null,
            boothName: null,
            zones:[],
        } 
    },
    created(){
        this.initializeZones();
    },
    methods:{
        childFunc() {
            for(const child_comp of this.$refs.child_component){
                child_comp.childFunc();
            }
        },
        initializeZones(){
            this.boothId = this.boothInfo.booth_id;
            this.boothName = this.boothInfo.booth_name;

            if(this.zones.length !== 0){
                this.zones.splice(0);
            }

            for(let zone of this.boothInfo.zones){
                zone.booth_id = this.boothId;
                this.zones.push(zone);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#boothTitleBox{
    display: flex;
    align-items: center;
    h1{
        font-size: 35px;
        font-weight: 800;
        color: #08E8EA;
    }
}
#boothTitleBox >>> .v-divider{
    margin-left: 15px;
    border: 1px dashed #08E8EA;
}
#boothTitleBox ~ div{
    margin: 30px !important;
}
</style>
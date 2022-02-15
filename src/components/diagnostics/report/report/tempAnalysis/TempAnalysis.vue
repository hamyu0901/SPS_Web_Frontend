<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div id="tempMainContainer" v-if="report_id !== null && report_id !== undefined" >
      <div id="tempHeader">
        <quick-combo-vue @quickSetting="quickSetting"></quick-combo-vue>
        <save-reset-vue @onSave="onSave" @onReset="onReset"></save-reset-vue>
      </div>
      <booth-vue  v-for="(booth, index) in boothes"  :key="index"  :boothInfo="booth" :quickPeriod="quickPeriod" ref="child_component"></booth-vue>
  </div>
</template>
<script>
import boothTempVue from './components/boothTemp.vue';
import quickSetterVue from './components/quickSetter.vue';
import saveResetVue from './components/saveReset.vue';
import {mapGetters} from 'vuex';
export default {
    components: {
        quickComboVue: quickSetterVue,
        boothVue: boothTempVue,
        saveResetVue: saveResetVue,
    },
    data(){
        return{
          report_id:null,
          boothes:[
          ],
          quickPeriod: null,
        }
    },
    created(){
        this.initializeBoothes();
        this.initializeReportData();
    },
    computed: {
      ...mapGetters({
        getReportItems : 'getReportItems'
      }),
      reportDatas(){
        return this.$store.state.reportItems.selectedReport;
      }
    },
    watch:{
      reportDatas(){
        this.report_id = this.getReportItems.selectedReport.report_id;
      },
    },
    methods:{
      initializeReportData(){
        this.report_id = this.getReportItems.selectedReport.report_id;
      },
      initializeBoothes(){
          this.$http.get(`/diagnostics/datareport/temperature/factoryInfo`).then(result => {
              if(this.boothes.length !== 0){
                this.boothes.splice(0);
              }

              for(const data of result.data){
                this.boothes.push(data.booth);
              }
          })
      },
      quickSetting(quickPeriod){
        this.quickPeriod = quickPeriod;
      },
      onSave(){
        for(var i = 0; i < this.$refs.child_component.length; i++){
          this.$refs.child_component[i].childFunc()
        }
      },
      onReset(){
        
      }
    }

}
</script>
<style lang="scss" scoped>
  @import './tempAnalysis';
</style>
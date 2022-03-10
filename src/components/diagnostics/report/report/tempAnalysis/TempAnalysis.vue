<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div id="tempMainContainer" v-if="report.report_id" >
      <div id="tempHeader" class="ml-3">
        <div id="report-title-box">
          {{report.report_name}}
        </div>
        <v-spacer/>
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
          report:null,
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
        getReport : 'getReport'
      }),
      reportDatas(){
        return this.$store.getters['getReport'];
      }
    },
    watch:{
      reportDatas(){
        this.report = this.$store.getters['getReport'];
      },
    },
    methods:{
      initializeReportData(){
        this.report = this.$store.getters['getReport'];
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
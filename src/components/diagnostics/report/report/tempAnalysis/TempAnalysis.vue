<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div id="tempMainContainer" v-if="report.report_id" >
      <div id="tempHeader" class="ml-3">
        <div id="report-title-box">
          {{report.report_name}}
        </div>
        <v-spacer/>
        <quick-combo-vue @quickSetting="quickSetting" @selectMonth="selectMonth"></quick-combo-vue>
        <save-reset-vue @onSave="onSave" @onReset="onReset"></save-reset-vue>
      </div>
      <booth-vue
        v-for="(booth, index) in boothes"  :key="index"
        :boothInfo="booth"
        :quickPeriod="quickPeriod"
        ref="child_component"
        @successUpdate="successUpdate"
        @getViolatedData="getViolatedData"
        :violatedDataLength="violatedDataLength"
        >
      </booth-vue>
  </div>
</template>
<script>
import boothTempVue from './components/boothTemp.vue';
import quickSetterVue from './components/quickSetter.vue';
import saveResetVue from './components/saveReset.vue';
import {mapGetters} from 'vuex';
import EventBus from "@/commons/EventBus";
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
          saveCount: 0,
          violatedDataLength: 0,
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
        this.violatedDataLength = 0 ;
      },
    },
    methods:{
      initializeReportData(){
        this.report = this.$store.getters['getReport'];
      },
      selectMonth(){
        this.violatedDataLength = 0;
        EventBus.$emit('loadingSwitch')
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
      async onSave(){
        this.saveCount = 0;
        for(var i = 0; i < this.$refs.child_component.length; i++){
          this.$refs.child_component[i].childFunc()
        }
      },
      onReset(){

      },
      successUpdate(successedStatus){
        this.saveCount += successedStatus
        if(this.saveCount == 2000){
          window.alert('저장되었습니다.')
        }
      },
      getViolatedData(violatedTemp){
        this.violatedDataLength += violatedTemp
      }
    }
}
</script>
<style lang="scss" scoped>
  @import './tempAnalysis';
</style>
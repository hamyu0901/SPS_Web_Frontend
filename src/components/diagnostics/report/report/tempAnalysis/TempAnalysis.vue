<template>
  <div id="tempMainContainer">
      <div id="tempHeader">
        <quick-combo-vue @quickSetting="quickSetting"></quick-combo-vue>
        <save-reset-vue @onSave="onSave" @onReset="onReset"></save-reset-vue>
      </div>
      <booth-vue v-for="(booth, index) in boothes" :key="index" :boothInfo="booth" :quickPeriod="quickPeriod" ref="child_component"></booth-vue>
  </div>
</template>
<script>
import boothTempVue from './components/boothTemp.vue';
import quickSetterVue from './components/quickSetter.vue';
import saveResetVue from './components/saveReset.vue';
export default {
    components: {
        quickComboVue: quickSetterVue,
        boothVue: boothTempVue,
        saveResetVue: saveResetVue,
    },
    data(){
        return{
          boothes:[
            
          ],
          quickPeriod: null,
        }
    },
    created(){
        this.initializeBoothes();
    },
    methods:{
      
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
        for(const booth_comp of this.$refs.child_component){
          booth_comp.childFunc();
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
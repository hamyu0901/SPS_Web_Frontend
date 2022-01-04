<template>
  <div id="reportMainContainer">
    <div id="tabMenuBox">
      <v-btn-toggle rounded color="transparent" style="background:transparent">
        <v-btn class="btnStyle" :ripple="false" color="primary" :to="{name: 'torqueAnalysis'}">토크 분석</v-btn>
        <v-btn class="btnStyle" :ripple="false" color="primary" :to="{name: 'tempAnalysis'}">모터 온도 분석</v-btn>
        <v-btn class="btnStyle" :ripple="false" color="primary" :to="{name: 'alarmAnalysis'}">알람 분석</v-btn>
      </v-btn-toggle>
    </div>
    <v-divider></v-divider>
    <div id="reportRouterbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  methods:{


  }
}
</script>
<style lang="scss" scoped>
  @import './report';
</style>
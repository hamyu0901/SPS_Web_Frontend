<template>
  <v-container fluid fill-height id="diagnosticsMainContainer">
    <v-navigation-drawer 
    app stateless 
    class="navigationDrawer elevation-0" 
    :clipped="clipped" 
    v-model="drawer" 
    value="true" width="260" v-bind="changeDrawerFlag"
    v-bind:style="{ backgroundColor: ui.menu.color }">
      <v-list class="pt-3">
        <v-list-tile 
          :class="getTheme === false ? 'dy_navText_light--text' : 'dy_white--text'"
          :active-class="getTheme === false ? 'dy_navigationDrawer_over--text dy_navArea_light' : 'dy_navigationDrawer_over--text dy_navArea_dark'"
          v-for="(listData, index) in getDiagnosticsMenuItems" 
          :key="index" 
          v-show="listData.show"
          v-model="listData.active" 
          @click="listDataClicked(index)"
          >
          <v-list-tile-action>
            <a><img class="pt-1 pr-2" :src='listData.normalImg' ref="navIcons"/></a>
          </v-list-tile-action>
          <v-list-tile-content class="navigationListTitle">
            <v-list-tile-title>{{ $t('diagnostics.drawertitle.'+listData.id) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>      
    </v-navigation-drawer>
    <router-view/>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {  
          ui: {
            menu: {
              color: ''
            }
          },
          clipped: true,
          drawer: true,
          path: "",
          listDatas: [
            {title: this.$t(`diagnostics.drawertitle.predict`), normalImg: require("@/images/navicons/nav_predict_normal.png"), overImg: require("@/images/navicons/nav_predict_over.png"), active: false, path:'/sps/diagnostics/predict'},
            {title: this.$t(`diagnostics.drawertitle.torquedata`), normalImg: require("@/images/navicons/nav_torquedata_normal.png"), overImg: require("@/images/navicons/nav_torquedata_over.png"), active: false, path:'/sps/diagnostics/torquedata'},
            {title: this.$t(`diagnostics.drawertitle.torquerange`), normalImg: require("@/images/navicons/nav_torquerange_normal.png"), overImg: require("@/images/navicons/nav_torquerange_over.png"), active: false, path:'/sps/diagnostics/torquerange'},
            {title: this.$t(`diagnostics.drawertitle.torquesimilarity`), normalImg: require("@/images/navicons/nav_torquesimilarity_normal.png"), overImg: require("@/images/navicons/nav_torquesimilarity_over.png"), active: false, path:'/sps/diagnostics/torquesimilarity'},
            {title: this.$t(`diagnostics.drawertitle.torqueloadfactor`), normalImg: require("@/images/navicons/nav_torqueloadfactor_normal.png"), overImg: require("@/images/navicons/nav_torqueloadfactor_over.png"), active: false, path:'/sps/diagnostics/torqueloadfactor'},
            {title: this.$t(`diagnostics.drawertitle.torquetemperature`), normalImg: require("@/images/navicons/nav_torquetemperature_normal.png"), overImg: require("@/images/navicons/nav_torquetemperature_over.png"), active: false, path:'/sps/diagnostics/torquetemperature'},
            {title: this.$t(`diagnostics.drawertitle.atomizerdata`), normalImg: require("@/images/navicons/nav_atomizer_normal.png"), overImg: require("@/images/navicons/nav_atomizer_over.png"), active: false, path:'/sps/diagnostics/atomizerdata'},
            {title: this.$t(`diagnostics.drawertitle.alarmstatistics`), normalImg: require("@/images/navicons/nav_alarmstatistics_normal.png"), overImg: require("@/images/navicons/nav_alarmstatistics_over.png"), active: false, path:'/sps/diagnostics/alarmstatistics'},
            {title: this.$t(`diagnostics.drawertitle.report`), normalImg: require("@/images/navicons/nav_alarmstatistics_normal.png"), overImg: require("@/images/navicons/nav_alarmstatistics_over.png"), active: false, path:'/sps/diagnostics/report'},
             // {title: `Histogram`, normalImg: require("@/images/navicons/nav_alarmstatistics_normal.png"), overImg: require("@/images/navicons/nav_alarmstatistics_over.png"), active: false, path:'/sps/diagnostics/histogram'}
          ],
        }
    },

    created() {
      this.checkedPath();
    },
    
    mounted() {
      this.$emit('mountedTab');
      this.initializeStyle();
      this.initNavIcons();
    },

    updated() {
      this.checkedPath();
      this.initNavIcons();
    },

    computed: {
      ...mapGetters({
        getTheme: 'getTheme',
        getNavigationFlag: 'getNavigationFlag',
        getDiagnosticsMenuItems: 'getDiagnosticsMenuItems',
      }),

      changeDrawerFlag() {
        this.drawer = this.getNavigationFlag;
      },

      setNavigationDrawer() {
        if(this.$vuetify.breakpoint.width < this.$vuetify.breakpoint.thresholds.md) {
            this.drawer = false;
        }
        else {
          this.drawer = true;
        }
      }
     
    },

    methods: {
      initializeStyle() {
        this.ui.menu.color = this.$style.diagnostics.sideMenuBackgroundColor;
        document.documentElement.style.setProperty("--navigationDrawerBorderColor", this.$style.diagnostics.sideMenuBorderRightColor);
      },
      checkedPath() {
        console.log(window.location.pathname);
        this.path = window.location.pathname;
        for(let i = 0; i < this.listDatas.length; i++) {
          if(this.listDatas[i].path == this.path) {
            this.listDatas[i].active = true;
          } else {
            this.listDatas[i].active = false;
          }
        }
      },

      initNavIcons() {
        for(let i = 0; i < this.listDatas.length; i++) {
          if(this.$router.currentRoute.path == this.listDatas[i].path) {
            this.$refs.navIcons[i].src = this.listDatas[i].overImg;
          } else {
            this.$refs.navIcons[i].src = this.listDatas[i].normalImg;
          }
        }
      },

      listDataClicked(index) {
        for(let i = 0; i < this.listDatas.length; i++) {
          if(index == i) {
            this.listDatas[i].active = true;
            this.$refs.navIcons[i].src = this.listDatas[i].overImg;
            this.$router.push(this.listDatas[i].path);
          }else {
            this.listDatas[i].active = false;
            this.$refs.navIcons[i].src = this.listDatas[i].normalImg;
          }
        }
      },

    }
}
</script>

<style scoped lang="scss">
  @import './diagnostics';
</style>


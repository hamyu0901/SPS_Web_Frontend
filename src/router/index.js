import Vue from 'vue';
import Router from 'vue-router';
import LoginContainer from '../LoginContainer.vue';
import MainContainer from '../MainContainer.vue';
import Home from '../components/home/Home.vue';

import Monitoring from '../components/monitoring/Monitoring.vue'
import Allmonitoring from '../components/monitoring/monitoring/Allmonitoring.vue'
import ZoneMonitoring from '../components/monitoring/monitoring/ZoneMonitoring.vue'
import RobotDetail from '../components/monitoring/monitoring/RobotDetail.vue'

import torqueMonitoring from '../components/torquemonitoring/Monitoring.vue'
import torqueAllmonitoring from '../components/torquemonitoring/monitoring/TorqueAllmonitoring.vue'

import Review from '../components/review/Review.vue'

import Diagnostics from '../components/diagnostics/Diagnostics.vue'
import Predict from '../components/diagnostics/predict/Predict.vue'
import TorqueData from '../components/diagnostics/torquedata/TorqueData.vue'
import AtomizerData from '../components/diagnostics/atomizerdata/AtomizerData.vue'
import AlarmStatistics from '../components/diagnostics/alarmstatistics/AlarmStatistics.vue'
import TorqueRange from '../components/diagnostics/torquerange/TorqueRange.vue'
import TorqueSimilarity from '../components/diagnostics/torquesimilarity/TorqueSimilarity.vue'
import TorqueLoadFactor from '../components/diagnostics/torqueloadfactor/TorqueLoadFactor.vue'
import TorqueTemperature  from '../components/diagnostics/torquetemperature/TorqueTemperature.vue'
import Report from '../components/diagnostics/report/Report.vue'

// import TorqueAnalaysis from '../components/diagnostics/report/report/torqueAnalysis/torqueAnalysis.vue'
// import AlarmAnalaysis from '../components/diagnostics/report/report/alarmAnalysis/AlarmAnalysis.vue'
// import TempAnalaysis from '../components/diagnostics/report/report/tempAnalysis/TempAnalysis.vue'

import RealTimeView from '../components/realtimeview/RealTimeView.vue'
import RealTimeTorque from '../components/realtimeview/realtimetorque/RealTimeTorque.vue'

import Alarm from '../components/alarm/Alarm.vue'
import AlarmView from '../components/alarm/alarmview/AlarmView.vue'
import AlarmInfos from '../components/alarm/alarminfos/AlarmInfos.vue'
import AlarmManual from '../components/alarm/alarmmanual/AlarmManual.vue'
import PredictAlarm from '../components/alarm/predictalarm/PredictAlarm.vue'

import Maintenance from '../components/maintenance/Maintenance.vue'
import PostHistory from '../components/posthistory/PostHistory.vue'
import SparePart from '../components/sparepart/SparePart.vue'
import Manual from '../components/manual/Manual.vue'
import BackupView from '../components/backupview/BackupView.vue'

import store from '../store/store';
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: 'login' },
    { path: '/login', name: 'login', component: LoginContainer },
    { path: '/sps',
      name: 'sps',
      component: MainContainer,
      children: [
        { path: 'home', name: 'home', component: Home },
        { path: 'monitoring',
          name: 'monitoring',
          component: Monitoring,
          redirect: 'monitoring/allmonitoring',
          children: [
            { path: 'allmonitoring', name: 'allmonitoring', component: Allmonitoring },
            { path: 'zonemonitoring', name: 'zonemonitoring', component: ZoneMonitoring },
            { path: 'robotdetail', name: 'robotdetail', component: RobotDetail}
          ]
        },
        { path: 'torquemonitoring',
          name: 'torquemonitoring',
          component: torqueMonitoring,
          redirect: 'torquemonitoring/torqueallmonitoring',
          children: [
            { path: 'torqueallmonitoring', name: 'torqueallmonitoring', component: torqueAllmonitoring },
          ]
        },
        { path: 'realtime',
          name: 'realtime',
          component: RealTimeView,
          redirect: 'realtime/torque',
          children: [
            { path: 'torque', name: 'realtimetorque', component: RealTimeTorque },
          ]
        },
        { path: 'review', name: 'review', component:Review },
        { path: 'diagnostics',
          name: 'diagnostics',
          component: Diagnostics,
          redirect: to => {
            for(let i = 0; i < store.getters.getDiagnosticsMenuItems.length; i++) {
              if(store.getters.getDiagnosticsMenuItems[i].show === true) {
                return store.getters.getDiagnosticsMenuItems[i].path;
                break;
              }
            }
          },
          children: [
            {path: 'predict', name: 'predict', component: Predict},
            {path: 'torquedata', name: 'torquedata', component: TorqueData},
            {path: 'atomizerdata', name: 'atomizerdata', component: AtomizerData},
            {path: 'alarmstatistics', name: 'alarmstatistics', component: AlarmStatistics},
            {path: 'torquerange', name: 'torquerange', component: TorqueRange},
            {path: 'torquesimilarity', name: 'torquesimilarity', component: TorqueSimilarity},
            {path: 'torqueloadfactor', name: 'torqueloadfactor', component: TorqueLoadFactor},
            {path: 'torquetemperature', name: 'torquetemperature', component: TorqueTemperature},
            { path: 'report', name: 'report', component: Report,
              // redirect:'report/torqueAnalysis',
              // children: [
              //   {path: 'torqueAnalysis', name: 'torqueAnalysis', component: TorqueAnalaysis},
              //   {path: 'tempAnalysis', name: 'tempAnalysis', component: TempAnalaysis},
              //   {path: 'alarmAnalysis', name: 'alarmAnalysis', component: AlarmAnalaysis}
              // ]
            },
          ]
        },
        { path: 'maintenance', name: 'maintenance', component: Maintenance },
        { path: 'alarm',
          name: 'alarm',
          component: Alarm,
          redirect: 'alarm/alarmview',
          children: [
            {path: 'alarmview', name: 'alarmview', component: AlarmView},
            {path: 'alarminfos', name: 'alarminfos', component: AlarmInfos},
            {path: 'alarmmanual', name: 'alarmmanual', component: AlarmManual},
            {path: 'predictalarm', name: 'predictalarm', component: PredictAlarm}
          ]
        },
        { path: 'posthistory', name: 'posthistory', component: PostHistory },
        { path: 'sparepart', name: 'sparepart', component: SparePart },
        { path: 'manual', name: 'manual', component: Manual },
        { path: 'backupview', name: 'backupview', component: BackupView }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  Vue.prototype.$http.get('info/active/pid').then(res => {
    if(res.data !== "" && res.data.length > 0) {
      res.data.forEach(data => {
        Vue.prototype.$http.get(`info/active/kill/${data.pid}`).then(res => {

        })
      })
    }
  })
  next();
})
export default router;
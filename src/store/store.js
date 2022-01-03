import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'
import i18n from '@/plugins/i18n';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
const ls = new SecureLS({isCompression: false});
Vue.use(Vuex)

let baseAddress = '';

const state = {
    baseUrl: baseAddress,
    factory_id: '',
    auth: 0,
    booth_infos: [],
    zone_infos: [],
    robot_infos: [],
    theme: false, // light,
    language: 'kr',
    navigationFlag: true, // navigation drawer flag
    mainMenuItems: [
        {id: 'home', name: i18n.t(`tabtitle.home`), target: "/sps/home", show: true, active: false, normalImg: require("@/images/tabicons/tab_home_normal.png"), overImg: require("@/images/tabicons/tab_home_over.png"), menuImg: require("@/images/menuicons/main_menu_home.png"), menuLightImg: require("@/images/menuicons/main_menu_home_light.png")},
        {id: 'monitoring', name: i18n.t(`tabtitle.monitoring`),  target: "/sps/monitoring", show: true, active: false, normalImg: require("@/images/tabicons/tab_monitoring_normal.png"), overImg: require("@/images/tabicons/tab_monitoring_over.png"), menuImg: require("@/images/menuicons/main_menu_monitoring.png"), menuLightImg: require("@/images/menuicons/main_menu_monitoring_light.png")},
        // {name: "torquemonitoring",  target: "/sps/torquemonitoring", active: false, normalImg: require("@/images/tabicons/tab_monitoring_normal.png"), overImg: require("@/images/tabicons/tab_monitoring_over.png")},
        {id: 'realtime', name: i18n.t(`tabtitle.realtime`), target: "/sps/realtime", show: true, active: false, normalImg: require("@/images/tabicons/tab_realtimeview_normal.png"), overImg: require("@/images/tabicons/tab_realtimeview_over.png"), menuImg: require("@/images/menuicons/main_menu_realtime.png"), menuLightImg: require("@/images/menuicons/main_menu_realtime_light.png")},
        {id: 'diagnostics', name: i18n.t(`tabtitle.diagnostics`), target: "/sps/diagnostics", show: true, active: false, normalImg: require("@/images/tabicons/tab_diagnostics_normal.png"), overImg: require("@/images/tabicons/tab_diagnostics_over.png"), menuImg: require("@/images/menuicons/main_menu_diagnostics.png"), menuLightImg: require("@/images/menuicons/main_menu_diagnostics_light.png")},
        {id: 'maintenance', name: i18n.t(`tabtitle.maintenance`), target: "/sps/maintenance", show: true, active: false, normalImg: require("@/images/tabicons/tab_maintenance_normal.png"), overImg: require("@/images/tabicons/tab_maintenance_over.png"), menuImg: require("@/images/menuicons/main_menu_maintenance.png"), menuLightImg: require("@/images/menuicons/main_menu_maintenance_light.png")},
        {id: 'alarm', name: i18n.t(`tabtitle.alarm`), target: "/sps/alarm", show: true, active: false, normalImg: require("@/images/tabicons/tab_alarmview_normal.png"), overImg: require("@/images/tabicons/tab_alarmview_over.png"), menuImg: require("@/images/menuicons/main_menu_alarm.png"), menuLightImg: require("@/images/menuicons/main_menu_alarm_light.png")},
        {id: 'posthistory', name: i18n.t(`tabtitle.posthistory`), target: "/sps/posthistory", show: true, active: false, normalImg: require("@/images/tabicons/tab_posthistory_normal.png"), overImg: require("@/images/tabicons/tab_posthistory_over.png"), menuImg: require("@/images/menuicons/main_menu_posthistory.png"), menuLightImg: require("@/images/menuicons/main_menu_posthistory_light.png")},
        {id: 'manual', name: i18n.t(`tabtitle.manual`), target: "/sps/manual", show: true, active: false, normalImg: require("@/images/tabicons/tab_manual_normal.png"), overImg: require("@/images/tabicons/tab_manual_over.png"), menuImg: require("@/images/menuicons/main_menu_manual.png"), menuLightImg: require("@/images/menuicons/main_menu_manual_light.png")},
        {id: 'backupview', name: i18n.t(`tabtitle.backupview`), target: "/sps/backupview", show: true, active: false, normalImg: require("@/images/tabicons/tab_backupview_normal.png"), overImg: require("@/images/tabicons/tab_backupview_over.png"), menuImg: require("@/images/menuicons/main_menu_backupview.png"), menuLightImg: require("@/images/menuicons/main_menu_backupview_light.png")}
    ],
    diagnosticsMenuItems: [
        {id: 'predict', title: i18n.t(`diagnostics.drawertitle.predict`), path:'/sps/diagnostics/predict', show: true, active: false, normalImg: require("@/images/navicons/nav_predict_normal.png"), overImg: require("@/images/navicons/nav_predict_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_predict.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_predict_light.png")},
        {id: 'torquedata', title: i18n.t(`diagnostics.drawertitle.torquedata`), path:'/sps/diagnostics/torquedata', show: true, active: false, normalImg: require("@/images/navicons/nav_torquedata_normal.png"), overImg: require("@/images/navicons/nav_torquedata_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_torquedata.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_torquedata_light.png")},
        {id: 'torquerange', title: i18n.t(`diagnostics.drawertitle.torquerange`), path:'/sps/diagnostics/torquerange', show: true, active: false, normalImg: require("@/images/navicons/nav_torquerange_normal.png"), overImg: require("@/images/navicons/nav_torquerange_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_torquerange.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_torquerange_light.png")},
        {id: 'torquesimilarity', title: i18n.t(`diagnostics.drawertitle.torquesimilarity`), path:'/sps/diagnostics/torquesimilarity', show: true, active: false, normalImg: require("@/images/navicons/nav_torquesimilarity_normal.png"), overImg: require("@/images/navicons/nav_torquesimilarity_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_torquesimilarity.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_torquesimilarity_light.png")},
        {id: 'torqueloadfactor', title: i18n.t(`diagnostics.drawertitle.torqueloadfactor`), path:'/sps/diagnostics/torqueloadfactor', show: true, active: false, normalImg: require("@/images/navicons/nav_torqueloadfactor_normal.png"), overImg: require("@/images/navicons/nav_torqueloadfactor_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_torqueloadfactor.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_torqueloadfactor_light.png")},
        {id: 'torquetemperature', title: i18n.t(`diagnostics.drawertitle.torquetemperature`), path:'/sps/diagnostics/torquetemperature', show: true, active: false, normalImg: require("@/images/navicons/nav_torquetemperature_normal.png"), overImg: require("@/images/navicons/nav_torquetemperature_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_motortemperature.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_motortemperature_light.png")},
        {id: 'atomizerdata', title: i18n.t(`diagnostics.drawertitle.atomizerdata`), path:'/sps/diagnostics/atomizerdata', show: true, active: false, normalImg: require("@/images/navicons/nav_atomizer_normal.png"), overImg: require("@/images/navicons/nav_atomizer_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_atomizerdata.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_atomizerdata_light.png")},
        {id: 'alarmstatistics', title: i18n.t(`diagnostics.drawertitle.alarmstatistics`), path:'/sps/diagnostics/alarmstatistics', show: true, active: false, normalImg: require("@/images/navicons/nav_alarmstatistics_normal.png"), overImg: require("@/images/navicons/nav_alarmstatistics_over.png"), menuImg: require("@/images/menuicons/diagnostics_menu_alarmstatistics.png"), menuLightImg: require("@/images/menuicons/diagnostics_menu_alarmstatistics_light.png")},
        // {title: `Histogram`, normalImg: require("@/images/navicons/nav_alarmstatistics_normal.png"), overImg: require("@/images/navicons/nav_alarmstatistics_over.png"), active: false, path:'/sps/diagnostics/histogram'}
    ]
}
export default new Vuex.Store({
    state,
    getters: {
        getBaseUrl(state) {
            return state.baseUrl;
        },
        
        getAuth(state) {
            return state.auth;
        },

        getTheme(state) {
            return state.theme;
        },

        getLanguage(state) {
            return state.language;
        },

        getFactoryId(state) {
            return state.factory_id;
        },

        getBoothInfos(state) {
            return state.booth_infos;
        },

        getZoneInfos(state) {
            return state.zone_infos;
        },

        getRobotInfos(state) {
            return state.robot_infos;
        },
        
        getNavigationFlag(state) {
            return state.navigationFlag;
        },

        getMainMenuItems(state) {
            return state.mainMenuItems;
        },

        getDiagnosticsMenuItems(state) {
            return state.diagnosticsMenuItems;
        },
    },
    
    mutations: {
        setFactoryId(state, payload) {
            state.factory_id = payload;
        },

        setAuth(state, payload) {
            state.auth = payload;
        },

        changeTheme(state, payload) {
            // false - light, true - dark
            state.theme = payload;
        },

        setLanguage(state, payload) {
            state.language = payload;
        },

        setBoothInfos(state, payload) {
            state.booth_infos = payload;
        },

        setZoneInfos(state, payload) {
            state.zone_infos = payload;
        },

        setRobotInfos(state, payload) {
            state.robot_infos = payload;
        },

        resetFactoryInfos(state) {
            state.factory_id = '';
            state.booth_infos = [];
            state.zone_infos = [];
            state.robot_infos = [];
        },

        changeNavigationFlag(state, payload) {
            state.navigationFlag = payload;
        },

        setMainMenuItems(state, payload) {
            state.mainMenuItems = payload;
        },
        
        setDiagnosticsMenuItems(state, payload) {
            state.diagnosticsMenuItems = payload;
        }
    },

    actions: {
        setFactoryId(context, payload) {
            return context.commit('setFactoryId', payload);
        },

        setAuth(context, payload) {
            return context.commit('setAuth', payload);
        },

        changeTheme(context, payload) {
            return context.commit('changeTheme', payload);
        },

        setLanguage(context, payload) {
            return context.commit('setLanguage', payload);
        },

        setBoothInfos(context, payload) {
            return context.commit('setBoothInfos', payload);
        },

        setZoneInfos(context, payload) {
            return context.commit('setZoneInfos', payload);
        },

        setRobotInfos(context, payload) {
            return context.commit('setRobotInfos', payload);
        },

        resetFactoryInfos(context) {
            return context.commit('resetFactoryInfos');
        },

        changeNavigationFlag(context, payload) {
            return context.commit('changeNavigationFlag', payload);
        },

        setMainMenuItems(context, payload) {
            return context.commit('setMainMenuItems', payload);
        },

        setDiagnosticsMenuItems(context, payload) {
            return context.commit('setDiagnosticsMenuItems', payload);
        }
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
})
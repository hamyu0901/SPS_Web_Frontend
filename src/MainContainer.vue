<template>
    <v-app id="mainContainer" :dark="getTheme">
        <v-toolbar class="header elevation-0"  fixed app tabs height="40" :color="headerColor" clipped-left :inverted-scroll="tabShowFlag">
            <a><img class="sideIcon pr-4" src="@/images/tabicons/toolbar_side_icon.png" @click.stop="navigationFlagClicked" v-show="diagnosticsFlag"/></a>
            <a  class="tabLogo pr-5"><img :src="ui.tabLogoImg"/></a>
            <v-toolbar-items>
                <v-tabs height="40" hide-slider :color="headerColor">
                    <v-tab
                        class="pr-3 tabItem"
                        v-bind:style="ui.tabStyle"
                        active-class="dy_mainTab_over--text"
                        :ripple="false"
                        v-for="(tabItem, index) in getMainMenuItems" 
                        v-show="tabItem.show"
                        :key="index"
                        :to="tabItem.target"
                        @click="getTabNames(tabItem), tabClicked(index)"
                    >
                        <a href="@"><img class="pt-1 pr-2" :src='tabItem.normalImg' ref="tabIcons" /></a>
                        <p class="tabTitle pt-3"> {{$t('tabtitle.'+tabItem.id)}} </p>
                    </v-tab>
                </v-tabs>
            </v-toolbar-items>
            <v-spacer/>
            <a class="pr-2"><img class="pt-1" src="@/images/tabicons/tab_setting.png"  @click="settingBtnClicked"/></a>
            <span class="mainTabSpan pr-3">{{ui.userid}}</span>
            <span class="mainTabSpan pr-3">{{ui.version}}</span>
            <a><img class="pt-1" src="@/images/tabicons/tab_logout.png" @click="logoutClicked"/></a>
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
                <v-card color="primary" dark>
                    <v-card-text>
                        Reconnecting...
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-model="flag.settingDlg" hide-overlay persistent width="1800">
                <setting-dlg
                  v-if="flag.settingDlg"
                  v-on:settingValues="getSettingValues"
                  v-on:closeSettingDlg="closeSettingDlg"
                ></setting-dlg>
            </v-dialog>
        </v-toolbar>
        <v-content id="main">
            <v-tabs-items touchless>
                <v-tab-item><router-view v-on:mountedTab="mountedTab"/></v-tab-item>
            </v-tabs-items>    
        </v-content>
        <v-footer dark app :color="footerColor">
            <span id="footerText" class="footerTextColor pr-5">&copy; {{ui.year}} <span id="footerCIText" class="footerNameColor">DOOLIM-YASKAWA.</span> All rights reserved.</span>
            <v-spacer/><clock></clock>
        </v-footer>
    </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import clock from '@/commons/DigitalClock'
import SettingDlg from '@/commons/SettingDlg'
export default {
    components: {clock, SettingDlg},
    data() {
        return {
            ui: {
                userid: '',
                version: '',
                year: '',
                tabStyle: null,
                tabLogoImg: '',
            },
            dialog: false,
            tab: '',
            active: false,
            tabShowFlag: false,
            drawer: true,
            isVisible: false,
            tabItems: [],
            headerColor: '',
            footerColor: '',
            address: '',
            diagnosticsFlag: false,
            flag: {
                alive: true,
                settingDlg: false
            },
            menus: [ // items => premium items
                {type: 'main', items: ['maintenance']},
                {type: 'diagnostics', items: ['torquesimilarity', 'torqueloadfactor', 'atomizerdata', 'alarmstatistics']}
            ]
        }
    },
    sockets: {
        connect() {
            if (this.flag.alive == false) {
                this.flag.alive = true;
                this.$networkError('Network Error');
            }
            this.dialog = false;
        },
        disconnect() {
            // this.dialog = true;
            // this.flag.alive = false;
        },
    },
    created() {
        this.getFactoryInfos();
        this.setLanguage();
        this.setCopyRight();
        this.setLogoImg();
    },
    mounted() {
        this.initTabs();        
        this.setVersion();
        this.getUserID();
        this.initializeStyle();
        this.sockets.subscribe('alarm', (data) => {
            // let recvData = {
            //     time_stamp : this.$moment(data.time_stamp).format('YYYY-MM-DD hh:mm:ss'),
            //     alarm_code: data.alarm_code,
            //     alarm_name: data.alarm_name,
            // }
            // this.sockets.unsubscribe('alarm');
        })
    },
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getTheme: 'getTheme',
            getLanguage: 'getLanguage',
            getFactoryId: 'getFactoryId',
            getMainMenuItems: 'getMainMenuItems',
            getDiagnosticsMenuItems: 'getDiagnosticsMenuItems',
            getAuth: 'getAuth'
        }),
    },
    destroyed() {
        this.destroyHandle();
        this.destorySocket();
    },
    methods: {
        ...mapActions({
            resetALL: 'resetALL',
        }),
        initializeStyle() {
            const main = document.querySelector('#main');
            main.style.backgroundColor = this.$style.mainContainerMainStyle;
            this.headerColor = this.$style.maincontainer.header;
            this.footerColor = this.$style.mainContainerFooterStyle;

            const footerText = document.querySelector('#footerText');
            footerText.style.color = this.$style.mainContainerFooterTextStyle.copyright;

            const footerCIText = document.querySelector('#footerCIText');
            footerCIText.style.color = this.$style.mainContainerFooterTextStyle.CI;

            document.documentElement.style.setProperty("--mainTabSpanColor", this.$style.maincontainer.menuItemFontColor);
        },

        setLogoImg() {
            this.ui.tabLogoImg = require('@/images/tabicons/tab_logo_premium.png');
            // if(Boolean(this.getAuth)) {
            //     this.ui.tabLogoImg = require('@/images/tabicons/tab_logo_premium.png');
            // } else {
            //      this.ui.tabLogoImg = require('@/images/tabicons/tab_logo_basic.png');
            // }
        },

        destroyHandle() {
            
        },

        destorySocket() {
            this.$socket.emit('disconnect');
        },

        setVersion() {
            this.$http.get(`${this.baseUrl}/auth/ver`).then((result) => {
               if (result.data == '') {

               }
               else {
                    this.$release.setVersion(result.data);
                    this.ui.version = this.$release.getVersion();
               }
            }).catch((error) => {
                
            })
        },

        getUserID() {
            this.ui.userid = sessionStorage.getItem('userid');
        },

        setCopyRight() {
            this.$http.get(`${this.baseUrl}/info/copyright`).then((result) => {
                if (result.data === '') {
                    throw new Error('No CopyRight');
                }
                this.ui.year = result.data;
            }).catch((error) => {
                this.$log.error(error);
            });
        },
        
        //팩토리 정보 불러오기
        getFactoryInfos() {
            this.$http.get(`${this.baseUrl}/info/factorys`).then((res) => { //팩토리 수 가져오기
                this.$store.dispatch('resetFactoryInfos'); 
                this.$store.dispatch('setFactoryId', res.data);
                Promise.all([
                this.$http.post(`${this.baseUrl}/info/booths`, {factoryid: this.getFactoryId}),
                this.$http.post(`${this.baseUrl}/info/zones`, {factoryid: this.getFactoryId}),
                this.$http.post(`${this.baseUrl}/info/robots`, {factoryid: this.getFactoryId}),
                this.$http.get(`/info/factoryid/${this.getFactoryId}/auth`)
                ])
                .then(([resBooths, resZones, resRobots, resAuth]) => {
                    this.$store.dispatch('setBoothInfos', resBooths.data);
                    this.$store.dispatch('setZoneInfos', resZones.data);
                    this.$store.dispatch('setRobotInfos', resRobots.data);
                    // this.setSPSType(1);
                })
            });
        },

        initTabs() {
            this.ui.tabStyle = this.$style.getTabMenuStyle();
            for(let i = 0; i < this.tabItems.length; i++) {
                if(this.tabItems[i].name == window.location.pathname.split('/')[2]) {
                    this.getTabNames(this.tabItems[i]);
                    this.$refs.tabIcons[i].src = this.tabItems[i].overImg;
                } else {
                    this.$refs.tabIcons[i].src = this.tabItems[i].normalImg;
                }
            }
        },

        tabShowFlagClicked() {
            this.tabShowFlag = !this.tabShowFlag;
        },

        getTabNames(tabItem) {
            if(tabItem.name == 'diagnostics') {
                this.diagnosticsFlag = true;
            } 
            else {
                this.diagnosticsFlag = false;
            }
        },

        tabClicked(index) {
            for(let i = 0; i < this.tabItems.length; i++) {
                if(index == i) {
                    this.$refs.tabIcons[i].src = this.tabItems[i].overImg;
                }else {
                    this.$refs.tabIcons[i].src = this.tabItems[i].normalImg;
                }
            }
        },

        mountedTab() {
            this.initTabs();
        },

        navigationFlagClicked() {
            this.drawer = !this.drawer;
            this.$store.dispatch('changeNavigationFlag', this.drawer);
        },

        settingBtnClicked(){
            this.flag.settingDlg = true;
        },

        logoutClicked() {
            this.$http.post(`${this.baseUrl}/auth/logout`, {}).then((result) => {
                    if (result.data == 'logout') {
                        this.resetALL();
                        sessionStorage.clear();
                        this.$router.push('/login');
                        this.$notify({
                            group: 'push',
                            text: 'Log out',
                            type: 'alarm'
                        });
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },

        changeTheme(themeFlag) {
            this.$store.dispatch('changeTheme', themeFlag);
        },

        setLanguage() {
            this.$language();
        },

        getSettingValues(settingValues) {
            this.$emit('themeItem', settingValues.theme);
            this.$emit('languageItem', settingValues.multilingual);
        },

        closeSettingDlg() {
            this.flag.settingDlg = false;
        },

        setSPSType(authType) { // store set auth
            // this.$store.dispatch('setAuth', authType);
            this.changePremiumMenuItems();
            // this.$store.dispatch('setAuth', authType);
            // if(Boolean(authType)) {
            //     // Premium
            //     this.changePremiumMenuItems();
            // }
            // else {
            //     // Basic
            //     // main: maintenance / diagnostics: similarity, accum, atomizer, statistics
            //     this.changeBasicMenuItems();
            // }
        },

        changePremiumMenuItems() {
            this.getMainMenuItems.forEach(mainMenuItem => {
                mainMenuItem.show = true;
            }) 
            this.getDiagnosticsMenuItems.forEach(diagnosticsMenuItem => {
                diagnosticsMenuItem.show = true;
            })
        },

        changeBasicMenuItems() {
            this.getMainMenuItems.forEach(mainMenuItem => {
                this.menus[0].items.forEach(menuItem => {
                    if(mainMenuItem.target.split("/sps/")[1] === menuItem) {
                        mainMenuItem.show = false;
                    }
                })
            })
            this.getDiagnosticsMenuItems.forEach(diagnosticsMenuItem => {
                this.menus[1].items.forEach(menuItem => {
                    if(diagnosticsMenuItem.path.split('/sps/diagnostics/')[1] === menuItem) {
                        diagnosticsMenuItem.show = false;
                    }
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">  
    @import './maincontainer';
</style>

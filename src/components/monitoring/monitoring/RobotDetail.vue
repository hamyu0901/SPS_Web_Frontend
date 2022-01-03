<template>
    <v-container fluid fill-height>
        <v-layout column v-bind="initialize">
            <v-layout>
                <v-flex lg2 class="pr-1">
                        <v-card 
                        class="hscMenuStyle"
                        elevation="0"
                        slot="activator">
                            <v-layout>
                                <p class="pt-3 pl-3" v-bind:style="{fontSize: ui.card.title.text.size}">BOOTH {{ui.card.info.booth}}</p>
                            </v-layout>
                        </v-card>
                </v-flex>
                <v-flex lg2 class="pl-2 pr-1">
                        <v-card 
                        class="hscMenuStyle"
                        elevation="0"
                        slot="activator">
                            <v-layout>
                                <p class="pt-3 pl-3" v-bind:style="{fontSize: ui.card.title.text.size}">ZONE {{ui.card.info.zone}}</p>
                            </v-layout>
                        </v-card>
                </v-flex>
                <v-flex lg2 class="pl-2">
                    <hsc-menu-style-white class="menuZDirection">
                        <hsc-menu-bar class="elevation-0" v-bind:style="{ height: ui.card.menu.height, width: ui.card.list.width, backgroundColor: ui.hscMenu.backgroundColor, color: ui.hscMenu.color }">
                            <hsc-menu-bar-item class="pt-3 pb-3" :label="ui.card.info.robot" v-bind:style="{ fontSize: ui.card.title.text.size, width: ui.card.list.width, backgroundColor: ui.hscMenu.backgroundColor, color:ui.hscMenu.color }">
                                <hsc-menu-item 
                                v-bind:style="{ fontSize: ui.card.title.text.size, width: ui.card.list.width }"
                                :label="item.title" v-for="(item, index) in items" :key="index" @click="moveRobot(item.title)">
                                </hsc-menu-item>
                            </hsc-menu-bar-item>
                        </hsc-menu-bar>
                    </hsc-menu-style-white>
                </v-flex>
                <v-flex lg4 class="pl-3">
                    <v-card class="infoStyle" elevation="0" slot="activator">
                        <v-layout wrap row>
                            <p class="pt-3 pl-3">ROBOT MODE</p>
                            <div class="pt-1 pl-1" v-for="robotStatus in robotStatuses" :key="robotStatus.id">
                                <v-chip label v-bind="getRobotMode(robotStatus)" v-bind:color="robotStatus.color" text-color="white">
                                    <font>
                                        <B>{{robotStatus.name}}</B>
                                    </font>
                                </v-chip>
                            </div>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex lg2 class="pl-2">
                    <v-card class="infoStyle" elevation="0" slot="activator">
                        <v-layout wrap row>
                            <v-flex >
                                <p class="pt-3 pl-3">ROBOT STATUS </p>
                            </v-flex>
                            <v-flex>
                                <div class="pt-2">
                                    <v-chip label 
                                    text-color="white"
                                    v-bind:color="ui.status.color">
                                        <font>{{ui.status.text}}</font>
                                    </v-chip>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex lg6 class="pt-4" grow>
                    <v-flex lg12 class="pb-4">
                        <robot-infos :boothid="datas.boothid" :zoneid="datas.zoneid" :robotid="datas.robotid" />
                    </v-flex>
                    <v-flex lg12 class="pt-3">
                        <robot-alarms v-bind:contentData="datas.infoAlarmTableContentData"/>
                    </v-flex>
                </v-flex>
                <v-flex lg6 class="pl-4">
                    <v-layout>
                        <br/>
                    </v-layout>
                    <v-layout>
                        <v-flex lg6>
                            <v-card class="temperatureCard" elevation="0">
                                <v-card-title class="temperatureCardTitle pb-2" v-bind:style="ui.titleStyle"> {{"TEMPERATURE"}}</v-card-title>
                                <v-layout column>
                                    <v-layout class="temperatureCardItem">
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">1 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[0]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="temperatureCardItem">
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">2 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[1]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="temperatureCardItem">
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">3 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[2]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="temperatureCardItem">
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">4 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[3]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="temperatureCardItem">
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">5 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[4]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout class="temperatureCardItem">
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">6 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[5]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs1>
                                            <img class="pt-3 pl-3" width="40px" :src="ui.images.temp()"/>
                                        </v-flex>
                                        <v-flex>
                                            <p class="pt-3 pl-3">7 AXIS</p>
                                        </v-flex>
                                        <v-flex>
                                            <p class="tempFont pt-2 pl-3">{{datas.temp[6]}} ℃</p>
                                        </v-flex>
                                    </v-layout>
                                </v-layout>
                            </v-card>
                        
                        </v-flex>
                        <v-flex lg6 class="pl-4">
                            <past-robot-state-time :cardHeight="428" :chartHeight="290" :boothid="datas.boothid" :zoneid="datas.zoneid" :robotid="datas.robotid"
                            />
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout v-if="datas.info.robotType == defines.robot.type.opener" class="pt-4">
                
            </v-layout>
            <v-layout v-else-if="datas.info.robotType == defines.robot.type.painter && Boolean(getAuth)" class="pt-4">
                <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'flow'" :robotType="datas.info.robotType" :title="'Flow'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
                <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'sa_s'" :robotType="datas.info.robotType" :title="'Sa_s'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
                    <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'hvolt'" :robotType="datas.info.robotType" :title="'Hvolt'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
                <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'turbin_speed'" :robotType="datas.info.robotType" :title="'Turbine Speed'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
            </v-layout>
            <v-layout v-else-if="datas.info.robotType == defines.robot.type.sealer && Boolean(getAuth)" class="pt-4">
                <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'flow'" :robotType="datas.info.robotType" :title="'Flow'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
                <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'swirl'" :robotType="datas.info.robotType" :title="'Swirl'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
                    <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'maskingunitspeed'" :robotType="datas.info.robotType" :title="'Masking Unit Speed'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
                <v-flex lg3 class="chartArea">
                    <atomizer-realtime-chart :id="'pressure'" :robotType="datas.info.robotType" :title="'Pressure'" :height="356" :robotInfo="this.datas.processInfo"/>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    import PastRobotStateTime from '@/components/monitoring/monitoring/robotdetail/PastRobotStateTime'
    import RealtimeLineCharts from '@/components/monitoring/monitoring/RealtimeLineCharts'
    import RobotInfos from '@/components/monitoring/monitoring/robotdetail/RobotInfos'
    import RobotAlarms from '@/components/monitoring/monitoring/robotdetail/robotAlarms'
    import AtomizerRealtimeChart from '@/components/monitoring/monitoring/robotdetail/AtomizerRealtimeChart'

    export default {
        components: {
            PastRobotStateTime, 
            RealtimeLineCharts, 
            RobotInfos, 
            RobotAlarms,
            AtomizerRealtimeChart
        },
        data() {
            return {
                defines: {
                    robot: {
                        type: {
                            opener: 0,
                            painter: 1,
                            sealer: 2,
                        }
                    }
                },
                robotStatuses: [
                    { id: 'home', name: 'HOME', status: '', color: '#fff' },
                    { id: 'run', name: 'RUN', status: '', color: '#fff' },
                    { id: 'bypass', name: 'BY PASS', status: '', color: '#fff' },
                    { id: 'auto', name: 'AUTO', status: '', color: '#fff' },
                    { id: 'teach', name: 'TEACH', status: '', color: '#fff' },
                    { id: 'rinsing', name: 'RINSING', status: '', color: '#fff' }
                ],
                ui: {
                    titleStyle: null,
                    backBtn: this.$t(`monitoring.child.robotDetail.moveZone`),
                    hscMenu: {
                        backgroundColor: "",
                        color: ""
                    },
                    card: {
                        width: '100%',
                        height: '100%',
                        color: '',
                        list: {
                            width: '303px',
                            statusWidth: '100%',
                            color: ''
                        },
                        title: {
                            booth: this.$t(`monitoring.child.robotDetail.booth`),
                            zone: this.$t(`monitoring.child.robotDetail.zone`),
                            robot: this.$t(`monitoring.child.robotDetail.robot`),
                            text: {
                                color: '',
                                height: '40px',
                                size: 'large'
                            },
                            temp: {
                                height: '57px',
                                width: '100%'
                            }
                        },
                        info: {
                            booth: '',
                            zone: '',
                            robot: ''
                        },
                        menu: {
                            height: '100%'
                        }
                    },
                    images: {
                        temp() {
                            if(this.getTheme === true) {
                                return require("@/images/temperature.png");
                            } else {
                                return require("@/images/temperature_light.png");
                            }
                        }
                    },
                    status: {
                        text: '',
                        color: ''
                    }
                },
                datas: {
                    factoryid: '',
                    boothid: '',
                    zoneid: '',
                    robotid: '',
                    robotname: '',
                    processInfo: {},
                    temp: [],
                    info: {
                        robotType: 0,
                    },
                    infoAlarmTableContentData: []
                },
                items: [],
                handle: {
                    robot: {
                        status: null
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                baseUrl: 'getBaseUrl',
                getFactoryId: 'getFactoryId',
                getTheme: 'getTheme',
                getAuth: 'getAuth'
            }),
            initialize() {
                this.datas.robotname = this.$route.query.robotname;
                this.ui.card.info.robot = "ROBOT " + this.$route.query.robotname + '▽';
                this.datas.processInfo = {
                    factoryid : this.datas.factoryid = this.$route.query.factoryid,
                    boothid : this.datas.boothid = this.$route.query.boothid,
                    zoneid : this.datas.zoneid = this.$route.query.zoneid,
                    robotid : this.datas.robotid = this.$route.query.robotid
                }
                this.getAllInfo();
                this.getInfo(this.datas.processInfo);
                this.initData(this.datas.processInfo);                
            }
        },
        created() {
            
        },
        mounted() {
            this.initializeStyle();
            this.handle.robot.status = setInterval(this.update, 1000);
        },
        destroyed() {
            clearInterval(this.handle.robot.status);
        },
        methods: {
            initializeStyle() {
                // this.ui.card.color = '#21263a';
                this.ui.card.color = '#21263a';
                this.ui.card.list.color = '#203556';
                this.ui.card.title.text.color = '#ffffff';

                this.ui.titleStyle = this.$style.common.titleObjectItemColor;
                this.ui.hscMenu.backgroundColor = this.$style.monitoring.robotDetailItemHscMenuStyleBackgroundColor;
                this.ui.hscMenu.color = this.$style.monitoring.robotDetailItemHscMenuStyleColor;
                document.documentElement.style.setProperty("--hscMenuStyleBackgroundColor", this.$style.monitoring.robotDetailItemHscMenuStyleBackgroundColor);
                document.documentElement.style.setProperty("--hscMenuStyleColor", this.$style.monitoring.robotDetailItemHscMenuStyleColor);
                document.documentElement.style.setProperty("--hscMenuStyleBorderColor", this.$style.monitoring.robotDetailItemHscMenuStyleBorderColor);
                document.documentElement.style.setProperty("--infoStyleBackgroundColor", this.$style.monitoring.robotDetailItemInfoStyleBackgroundColor);
                document.documentElement.style.setProperty("--infoStyleColor", this.$style.monitoring.robotDetailItemInfoStyleColor);
                document.documentElement.style.setProperty("--infoStyleBorderColor", this.$style.monitoring.robotDetailItemInfoStyleBorderColor);
                document.documentElement.style.setProperty("--temperatureCardBackgroundColor", this.$style.monitoring.robotDetailItemTemperatureCardBackgroundColor);
                document.documentElement.style.setProperty("--temperatureCardColor", this.$style.monitoring.robotDetailItemTemperatureCardColor);
                document.documentElement.style.setProperty("--temperatureCardBorderColor", this.$style.monitoring.robotDetailItemTemperatureCardBorderColor);
                document.documentElement.style.setProperty("--temperatureCardTitleBackgroundColor", this.$style.monitoring.robotDetailItemTemperatureCardTitleBackgroundColor);
                document.documentElement.style.setProperty("--temperatureCardTitleColor", this.$style.monitoring.robotDetailItemTemperatureCardTitleColor);
            },
            initData(processInfo) {
                this.$http.post(`${this.baseUrl}/robotdetails/robotinfo/table`, processInfo).then((result) => {
                    if (result.data == '') {
                        
                    }
                    else {
                        this.robotStatuses[0].status = (result.data[0].robot_mode_home == null)     ? 0 : result.data[0].robot_mode_home;
                        this.robotStatuses[1].status = (result.data[0].robot_mode_run  == null)     ? 0 : result.data[0].robot_mode_run;
                        this.robotStatuses[2].status = (result.data[0].robot_mode_bypass == null)   ? 0 : result.data[0].robot_mode_bypass;
                        this.robotStatuses[3].status = (result.data[0].robot_mode_auto == null)     ? 0 : result.data[0].robot_mode_auto;
                        this.robotStatuses[4].status = (result.data[0].robot_mode_teach == null)    ? 0 : result.data[0].robot_mode_teach;
                        this.robotStatuses[5].status = (result.data[0].robot_mode_rins == null)     ? 0 : result.data[0].robot_mode_rins;
                        this.getRobotType(processInfo);
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            getRobotType(params) {
                this.$http.post(`${this.baseUrl}/robotdetails/robot/type`, params).then((result) => {
                    if (result.data == '') {
                        
                    }
                    else {
                        this.datas.info.robotType = result.data[0].robot_type;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            getTemperature(params) {                
                this.$http.post(`${this.baseUrl}/robotdetails/robot/temperature`, params).then((result) => {
                    if (result.data == '') {
                        this.datas.temp.push('');
                    }
                    else {
                        this.datas.temp = [];
                        for (let idx = 0; idx < result.data[0].encoder_temper.length; ++idx) {
                            this.datas.temp.push(result.data[0].encoder_temper[idx]);
                        }
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            getAllInfo() {
                let params = {
                    factoryid: this.datas.factoryid,
                    boothid: this.datas.boothid,
                    zoneid: this.datas.zoneid
                }
                this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, params).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`monitoring.child.robotDetail.popMsg.zoneRobotList`));
                    }
                    else {
                        for (let idx = 0; idx < result.data.length; ++idx) {
                            this.items.push({
                                title: result.data[idx].robot_name,
                                boothid: result.data[idx].booth_id,
                                zoneid: result.data[idx].zone_id,
                                robotid: result.data[idx].robot_id
                            });
                        }
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            getRobotMode(robotStatus) {
                if (robotStatus.status == '0') {
                    robotStatus.color = "dark";
                }
                else {
                    robotStatus.color = "#237ffe";
                }
            },
            getRobotStatus() {
                let params = {
                    boothid: this.datas.boothid,
                    zoneid: this.datas.zoneid,
                    robotid: this.datas.robotid
                };
                this.$http.post(`${this.baseUrl}/robotdetails/robot/info/status`, params).then((result) => {
                    if (result.data == '') {
                        
                    }
                    else {
                        switch (result.data[0].robot_status) {
                            case 0: 
                                this.ui.status.text = 'OFFLINE';
                                this.ui.status.color = '#53636F';
                                break;
                            case 1: 
                                this.ui.status.text = 'WAITING'
                                this.ui.status.color = '#FEC706';
                                break;
                            case 2:
                                this.ui.status.text = 'ACTION'
                                this.ui.status.color = '#06A43E';
                                break;
                            case 3:
                                this.ui.status.text = 'HOLD'
                                this.ui.status.color = '#E64107';
                                break;
                            case 4:
                                this.ui.status.text = 'ALARM'
                                this.ui.status.color = '#E64107';
                                break;
                            case 5:
                                this.ui.status.text = 'ALARM'
                                this.ui.status.color = '#E64107';
                                break;
                            case 6:
                                this.ui.status.text = 'OFFLINE'
                                this.ui.status.color = '#2195F3';
                                break;
                        }
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            update() {
                let params = {
                    factoryid: this.getFactoryId,
                    boothid: this.datas.boothid,
                    zoneid: this.datas.zoneid,
                    robotid: this.datas.robotid
                };
                this.$http.post(`${this.baseUrl}/monitoring/zone/data`, params).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`monitoring.child.robotDetail.popMsg.zoneData`));
                    }
                    else {
                        for (let idx = 0; idx < result.data.length; ++idx) {
                            if (result.data[idx].robot_id == this.datas.robotid) {
                                this.robotStatuses[0].status = (result.data[idx].robot_mode_home == null)   ? 0 : result.data[idx].robot_mode_home;
                                this.robotStatuses[1].status = (result.data[idx].robot_mode_run  == null)   ? 0 : result.data[idx].robot_mode_run;
                                this.robotStatuses[2].status = (result.data[idx].robot_mode_bypass == null) ? 0 : result.data[idx].robot_mode_bypass;
                                this.robotStatuses[3].status = (result.data[idx].robot_mode_auto == null)   ? 0 : result.data[idx].robot_mode_auto;
                                this.robotStatuses[4].status = (result.data[idx].robot_mode_teach == null)  ? 0 : result.data[idx].robot_mode_teach;
                                this.robotStatuses[5].status = (result.data[idx].robot_mode_rins == null)   ? 0 : result.data[idx].robot_mode_rins;
                                this.getRobotMode(this.robotStatuses[0]);
                                this.getRobotMode(this.robotStatuses[1]);
                                this.getRobotMode(this.robotStatuses[2]);
                                this.getRobotMode(this.robotStatuses[3]);
                                this.getRobotMode(this.robotStatuses[4]);
                                this.getRobotMode(this.robotStatuses[5]);
                            }
                        }
                        this.getTemperature(params);
                        this.getRobotStatus();
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
                this.updateAlarm();
            },
            updateAlarm() {
                let params = {
                    factoryid: this.getFactoryId,
                    boothid: this.datas.boothid,
                    zoneid: this.datas.zoneid,
                    robotid: this.datas.robotid
                };
                let timestamp = null;
                this.datas.infoAlarmTableContentData = [];
                this.$http.post(`${this.baseUrl}/monitoring/alarm`, params).then((result) => {
                    if (result.data == '') {
                        // this.datas.infoAlarmTableContentData.push('');
                    }
                    else {
                        for (let idx = 0; idx < result.data.length; ++idx) {
                            timestamp = result.data[idx].time_stamp.replace("T", " ");
                            timestamp = timestamp.replace("Z", " ");
                            this.datas.infoAlarmTableContentData.push({
                                timestamp: timestamp,
                                alarm: result.data[idx].alarm_name,
                                booth: result.data[idx].booth_name,
                                zone: result.data[idx].zone_name,
                                robot: result.data[idx].robot_name,
                                processInfo: result.data[idx].robot_name,
                                alarmcode: result.data[idx].alarm_code,
                                desc: result.data[idx].alarm_content,
                                alarmid: result.data[idx].alarm_id,
                                alarmType: result.data[idx]['type_name_'+ this.getLanguage],
                                alarmStatus: result.data[idx].alarm_status
                            });
                        }
                        
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            backwardClicked() {
                this.$router.push({ path: '/sps/monitoring/ZoneMonitoring' });
            },
            getInfo(params) {
                this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, params).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`monitoring.child.robotDetail.popMsg.zoneRobotList`));
                    }
                    else {
                        this.ui.card.info.booth = result.data[0].booth_name;
                        this.ui.card.info.zone = result.data[0].zone_name;
                        this.ui.card.info.robot = "ROBOT " + result.data[0].robot_name + "▽";
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            moveRobot(name) {
                let robotid;
                for (let idx = 0; idx < this.items.length; ++idx) {
                    if (this.items[idx].title == name) {
                        robotid = this.items[idx].robotid;
                    }
                }
                this.items = [];
                this.$router.push({
                    path: '/sps/monitoring/robotdetail', query: {
                        factoryid: this.getFactoryId,
                        boothid: this.datas.boothid,
                        zoneid: this.datas.zoneid,
                        robotid: robotid
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './robotdetail'
</style>

<template>
    <v-container fluid class="conveyorOption">
        <div v-bind="initialize" class="layer" v-show="ui.loading.running">
            <moon-loader :color="ui.loading.color"></moon-loader>
            <p>LOADING...</p>
        </div>
        <div class="mapOffset" v-show="datas.visible.conveyor" v-bind:style="{ border: background.border, backgroundColor: background.color }">
            <v-layout v-if="sector == 1">
                <v-flex>
                    <img v-show="datas.visible.robotL1" :src="datas.images.L1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex>
                    <img v-show="datas.visible.robotL2" :src="datas.images.L2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex>
                    <img v-show="datas.visible.robotL3" :src="datas.images.L3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex>
                    <img v-show="datas.visible.robotL4" :src="datas.images.L4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex>
                    <img v-show="datas.visible.robotL5" :src="datas.images.L5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
            </v-layout>
            <v-layout v-else-if="sector == 2">
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL1" :src="datas.images.L1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL2" :src="datas.images.L2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL3" :src="datas.images.L3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL4" :src="datas.images.L4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL5" :src="datas.images.L5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
            </v-layout>
            <v-layout v-else-if="sector == 3">
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL1" :src="datas.images.L1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL2" :src="datas.images.L2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL3" :src="datas.images.L3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL4" :src="datas.images.L4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL5" :src="datas.images.L5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
            </v-layout>
            <v-layout v-else-if="sector == 4">
                <v-flex xs2 class="flexWidth">
                    <img v-show="datas.visible.robotL1" :src="datas.images.L1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex xs2 class="flexWidth">
                    <img v-show="datas.visible.robotL2" :src="datas.images.L2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex xs2 class="flexWidth">
                    <img v-show="datas.visible.robotL3" :src="datas.images.L3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex xs2 class="flexWidth">
                    <img v-show="datas.visible.robotL4" :src="datas.images.L4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex xs2 class="flexWidth">
                    <img v-show="datas.visible.robotL5" :src="datas.images.L5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
            </v-layout>
            <v-layout v-else-if="sector == 5">
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL1" :src="datas.images.L1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL2" :src="datas.images.L2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL3" :src="datas.images.L3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL4" :src="datas.images.L4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL5" :src="datas.images.L5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
            </v-layout>
            <v-layout>
                <div v-bind:style="{ backgroundColor: ui.conveyor.color, width: ui.conveyor.width, height: ui.conveyor.height }">
                </div>
            </v-layout>
            <v-layout v-if="sector == 1">
                    <v-flex>
                        <img v-show="datas.visible.robotR1" :src="datas.images.R1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex>
                        <img v-show="datas.visible.robotR2" :src="datas.images.R2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex>
                        <img v-show="datas.visible.robotR3" :src="datas.images.R3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex>
                        <img v-show="datas.visible.robotR4" :src="datas.images.R4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex>
                        <img v-show="datas.visible.robotR5" :src="datas.images.R5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                </v-layout>
                <v-layout v-else-if="sector == 2">
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR1" :src="datas.images.R1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR2" :src="datas.images.R2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR3" :src="datas.images.R3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR4" :src="datas.images.R4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR5" :src="datas.images.R5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                </v-layout>
                <v-layout v-else-if="sector == 3">
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR1" :src="datas.images.R1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR2" :src="datas.images.R2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR3" :src="datas.images.R3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR4" :src="datas.images.R4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR5" :src="datas.images.R5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                </v-layout>
                <v-layout v-else-if="sector == 4">
                    <v-flex xs2 class="flexWidth">
                        <img v-show="datas.visible.robotR1" :src="datas.images.R1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex xs2 class="flexWidth">
                        <img v-show="datas.visible.robotR2" :src="datas.images.R2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex xs2 class="flexWidth">
                        <img v-show="datas.visible.robotR3" :src="datas.images.R3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex xs2 class="flexWidth">
                        <img v-show="datas.visible.robotR4" :src="datas.images.R4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex xs2 class="flexWidth">
                        <img v-show="datas.visible.robotR5" :src="datas.images.r5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                </v-layout>
                <v-layout v-else-if="sector == 5">
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR1" :src="datas.images.R1" @error="setEmptyArea" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR2" :src="datas.images.R2" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR3" :src="datas.images.R3" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR4" :src="datas.images.R4" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                    <v-flex class="flexWidth">
                        <img v-show="datas.visible.robotR5" :src="datas.images.R5" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                </v-layout>
            </div>
            <div>
                <v-layout fluid>
                    <v-flex lg12>
                        <v-chip label class="zoneName" color="#374876" text-color="white">{{ui.zone.name}}</v-chip>
                    </v-flex>
                </v-layout>
            </div>
    </v-container>
</template>

<script>
    import anime from 'animejs';
    import moonLoader from 'vue-spinner/src/MoonLoader.vue'
    import { mapGetters } from 'vuex';
    export default {
        props: ['boothid', 'zoneid', 'conveyorid', 'startcount', 'endcount', 'width', 'number', 'sector'],
        components: {
            moonLoader
        },
        data() {
            return {
                manage: {
                    handle: false
                },
                defines: {
                    zone: {
                        paintInt: 0,
                        sealer: 1,
                        paintExt: 2,
                    }
                },
                zoneType: null,
                ui: {
                    images: {
                        offRobot: require("@/images/robot_offline.png"),
                        waitRobot: require("@/images/robot_waiting.png"),
                        remoteRobot: require("@/images/robot_action.gif"),
                        errorRobot: require("@/images/robot_error.png"),
                        stopRobot: require("@/images/robot_alarm.png"),
                        readyRobot: require("@/images/robot_ready.png"),
                        remoteSprayOn: require("@/images/spray_on.gif"),
                        remoteSprayOff: require("@/images/spray_off.gif"),
                        emptyArea: require('@/images/empty_area.png'),
                        size: 'max-width: 50px; height: auto',
                        sealer: {
                            readyRobot: require('@/images/sealerrobot/img_sealing_action_stop.png'),
                            offRobot: require('@/images/sealerrobot/img_sealing_offline.png'),
                            waitRobot: require('@/images/sealerrobot/img_sealing_wait.png'),
                            remoteSprayOff: require('@/images/sealerrobot/img_sealing_action_sprayoff.gif'),
                            remoteSprayOn: require('@/images/sealerrobot/img_sealing_action_sprayon.gif'),
                            errorRobot: require('@/images/sealerrobot/img_sealing_error.png'),
                            stopRobot: require('@/images/sealerrobot/img_sealing_alarm.png'),
                            allAlarmRobot: require('@/images/sealerrobot/img_sealing_alarm_allblink.gif'),
                            alarmRobot: require('@/images/sealerrobot/img_sealing_alarm_robotblink.gif'),
                            sealerAlarmRobot: require('@/images/sealerrobot/img_sealing_alarm_sealerblink.gif')
                        },
                        paint: {
                            readyRobot: require('@/images/paintrobot/img_paint_action_stop.png'),
                            offRobot: require('@/images/paintrobot/img_paint_offline.png'),
                            waitRobot: require('@/images/paintrobot/img_paint_wait.png'),
                            remoteSprayOff: require('@/images/paintrobot/img_paint_action_sprayoff.gif'),
                            remoteSprayOn: require('@/images/paintrobot/img_paint_action_sprayon.gif'),
                            errorRobot: require('@/images/paintrobot/img_paint_error.png'),
                            stopRobot: require('@/images/paintrobot/img_paint_alarm.png'),
                            allAlarmRobot: require('@/images/paintrobot/img_paint_alarm_allblink.gif'),
                            alarmRobot: require('@/images/paintrobot/img_paint_alarm_robotblink.gif'),
                            atomizerAlarmRobot: require('@/images/paintrobot/img_paint_alarm_atomblink.gif')
                        },
                        opener: {
                            readyRobot: require('@/images/openerrobot/img_opener_action_stop.png'),
                            remoteRobot: require('@/images/openerrobot/img_opener_action_.gif'),
                            offRobot: require('@/images/openerrobot/img_opener_offline.png'),
                            waitRobot: require('@/images/openerrobot/img_opener_wait.png'),
                            errorRobot: require('@/images/openerrobot/img_opener_error.png'),
                            stopRobot: require('@/images/openerrobot/img_opener_alarm.png'),
                            allAlarmRobot: require('@/images/openerrobot/img_opener_alarm_allblink.gif'),
                        }
                    },
                    conveyor: {
                        color: '',
                        width: '100%',
                        height: '30px'
                    },
                    robot: {
                        size: null,
                        height: null
                    },
                    loading: {
                        running: true,
                        color: ''
                    },
                    booth: {
                        name: ''
                    },
                    zone: {
                        name: ''
                    }
                },
                datas: {
                    images: {
                        L1: '',
                        R1: '',
                        L2: '',
                        R2: '',
                        L3: '',
                        R3: '',
                        L4: '',
                        R4: '',
                        L5: '',
                        R5: ''
                    },
                    visible: {
                        body: {
                            move: false
                        },
                        robotL1: false,
                        robotR1: false,
                        robotL2: false,
                        robotR2: false,
                        robotL3: false,
                        robotR3: false,
                        robotL4: false,
                        robotR4: false,
                        robotL5: false,
                        robotR5: false,
                        conveyor: false,
                    },
                    handle: null
                },
                background: {
                    border: '',
                    color: ''
                },
            }
        },
        created() {
            this.setRobot();
        },
        computed: {
            ...mapGetters({
                baseUrl: 'getBaseUrl',
                getFactoryId: 'getFactoryId',
            }),
            initialize() {
                if (this.getFactoryId != '') {                    
                    this.handle = setInterval(this.update, 3000);
                    this.initializeRobotSize();
                    this.manage.handle = true;
                }
                if (this.getFactoryId != '' && this.zoneid != '' && this.boothid != '') {
                    this.getZoneConfig();
                }
            }
        },
        mounted() {
            this.initializeStyle();
        },
        destroyed() {
            this.destroyHandle();
        },
        methods: {
            initializeStyle() {
                this.ui.conveyor.color = '#3b3f58';
                this.ui.loading.color = '#ffffff';
                this.background.border = '2px dashed grey';
                this.background.color = '#1d202f';
            },
            destroyHandle() {
                this.manage.handle = false;
                clearInterval(this.handle);
                this.handle = null;
            },
            initializeRobotSize() {
                this.ui.robot.size = '50px';
                this.ui.robot.height = '50px';
            },
            setEmptyArea(event) {
               event.target.src = this.ui.images.emptyArea;
            },
            setRobot() {
                let param = {
                    factoryid: this.getFactoryId,
                    boothid: this.boothid,
                    zoneid: this.zoneid
                };
                this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, param).then((result) => {
                    if (result.data == '') {
                        this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneRobotList`));
                    }
                    else {
                        let data = result.data;
                        for (let idx = 0; idx < data.length; ++idx) {
                            if (data[idx].robot_type === 2) {
                                this.updateVisibleRobot(data[idx].visible, this.ui.images.sealer.readyRobot);
                            }
                            else if (data[idx].robot_type === 1) {
                                this.updateVisibleRobot(data[idx].visible, this.ui.images.paint.readyRobot);
                            }
                            else if (data[idx].robot_type === 0) {
                                this.updateVisibleRobot(data[idx].visible, this.ui.images.opener.readyRobot);
                            }
                        }
                        this.isOnlyOneRobot(data);
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            updatePLCData() {
                this.$http.get(`${this.baseUrl}/torquemonitoring/zone/data`, {
                    params: {
                        factoryid: this.getFactoryId,
                        boothid: this.boothid,
                        zoneid: this.zoneid,
                    }
                }).then((result) => {
                    if (result.data === '') {
                        
                    }
                    else {
                        let data = result.data;
                        for (let idx = 0; idx < data.length; ++idx) {
                            if (data[idx].predict_alarm === 1) {
                                if (data[idx].robot_type === 1) {
                                    this.updateVisibleRobot(data[idx].robot_name, this.ui.images.paint.allAlarmRobot);
                                } else if (data[idx].robot_type === 2) {
                                    this.updateVisibleRobot(data[idx].robot_name, this.ui.images.sealer.allAlarmRobot);
                                } else if (data[idx].robot_type === 3) {
                                    this.updateVisibleRobot(data[idx].robot_name, this.ui.images.opener.allAlarmRobot);
                                }
                            } else {
                                if (data[idx].robot_type === 1) {
                                    this.updateVisibleRobot(data[idx].robot_name, this.ui.images.paint.readyRobot);
                                } else if (data[idx].robot_type === 2) {
                                    this.updateVisibleRobot(data[idx].robot_name, this.ui.images.sealer.readyRobot);
                                } else if (data[idx].robot_type === 3) {
                                    this.updateVisibleRobot(data[idx].robot_name, this.ui.images.opener.readyRobot);
                                }
                            }
                        }
                        this.isOnlyOneRobot(data);
                        this.ui.loading.running = false;
                        this.datas.visible.conveyor = true;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                });
            },
            getZoneConfig() {
                let params = {
                    factoryid: this.getFactoryId,
                    boothid: this.boothid,
                    zoneid: this.zoneid
                };
                this.$http.post(`${this.baseUrl}/monitoring/zone/config`, params).then((result) => {
                    if (result.data == '') {
                        this.$log.warn(this.$t(`monitoring.miniZone.logMsg.zoneConfig`));
                    }
                    else {
                        this.zoneType = result.data[0].zone_type;
                        this.ui.booth.name = result.data[0].boothname;
                        this.ui.zone.name = result.data[0].zonename;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            update() {
                if (this.manage.handle == true) {
                    this.updatePLCData();
                }
            },
            updateVisibleRobot(robotpos, robotstatus) {
                switch (robotpos) {
                    case 1:
                        this.datas.visible.robotL1 = true;
                        this.datas.images.L1 = robotstatus;
                        break;
                    case 2:
                        this.datas.visible.robotR1 = true;
                        this.datas.images.R1 = robotstatus;
                        break;
                    case 3:
                        this.datas.visible.robotL2 = true;
                        this.datas.images.L2 = robotstatus;
                        break;
                    case 4:
                        this.datas.visible.robotR2 = true;
                        this.datas.images.R2 = robotstatus;
                        break;
                    case 5:
                        this.datas.visible.robotL3 = true;
                        this.datas.images.L3 = robotstatus;
                        break;
                    case 6:
                        this.datas.visible.robotR3 = true;
                        this.datas.images.R3 = robotstatus;
                        break;
                    case 7:
                        this.datas.visible.robotL4 = true;
                        this.datas.images.L4 = robotstatus;
                        break;
                    case 8:
                        this.datas.visible.robotR4 = true;
                        this.datas.images.R4 = robotstatus;
                        break;
                    case 9:
                        this.datas.visible.robotL5 = true;
                        this.datas.images.L5 = robotstatus;
                        break;
                    case 10:
                        this.datas.visible.robotR5 = true;
                        this.datas.images.R5 = robotstatus;
                        break;
                }
            },
            getSector() {
                return this.sector;
            },
            isOnlyOneRobot(data) {
                if (data[0].robot_name == 1) {
                    this.datas.visible.robotR1 = true;
                }
                else if (data[0].robot_name == 2){
                    this.datas.visible.robotL1 = true;
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import './minizone';
</style>
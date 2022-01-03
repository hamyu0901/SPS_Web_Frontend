<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <v-container fluid>
        <v-layout v-bind="initialize">
            <v-flex lg1 class="pb-5">
                <hsc-menu-style-white class="menuZDirection" :style="{ left: ui.menuLayout.boothDisplayBtn }">
                    <hsc-menu-bar class="elevation-0" v-bind:style="{ height: ui.card.height, width: ui.card.list.width, backgroundColor: ui.card.color }">
                        <hsc-menu-bar-item :label="ui.card.title.booth" v-bind:style="{ height: ui.card.text.height, backgroundColor: ui.card.color, color:ui.card.text.color }">
                            <hsc-menu-item 
                            v-bind:style="{ height: ui.card.height, width: ui.card.list.width }"
                            :label="datas.boothPage[index]" 
                            v-for="(item, index) in datas.boothPage" 
                            :key="index"
                            @click="moveBoothPage((index+1))">
                            </hsc-menu-item>
                        </hsc-menu-bar-item>
                    </hsc-menu-bar>
                </hsc-menu-style-white>
            </v-flex>
            <v-flex lg1>
                    <hsc-menu-style-white 
                    class="menuZDirection"
                    :style="{ left: ui.menuLayout.zoneDisplayBtn }">
                            <hsc-menu-bar class="elevation-0" v-bind:style="{ height: ui.card.height, width: ui.card.list.width, backgroundColor: ui.card.color }">
                                <hsc-menu-bar-item :label="ui.card.title.zone" v-bind:style="{ height: ui.card.text.height, backgroundColor: ui.card.color, color:ui.card.text.color }">
                                    <hsc-menu-item 
                                    v-bind:style="{ height: ui.card.height, width: ui.card.list.width }"
                                    :label="item.booth" v-for="(item, index) in datas.list.boothList" :key="index">
                                        <div v-if="item.booth == data.booth" v-for="(data, idx) in datas.list.booth" :key="idx">
                                            <hsc-menu-item
                                            v-bind:style="{ height: ui.card.height }"
                                            :label="data.zone"
                                            @click="moveZone(data.zone)"/>
                                        </div>
                                    </hsc-menu-item>
                                </hsc-menu-bar-item>
                            </hsc-menu-bar>
                        </hsc-menu-style-white>
            </v-flex>
            <v-flex lg1>
                    <hsc-menu-style-white 
                    class="menuZDirection"
                    :style="{ left: ui.menuLayout.robotDisplayBtn }">
                            <hsc-menu-bar class="elevation-0" v-bind:style="{ height: ui.card.height, width: ui.card.list.width, backgroundColor: ui.card.color }">
                                <hsc-menu-bar-item :label="ui.card.title.robot" v-bind:style="{ height: ui.card.text.height, backgroundColor: ui.card.color, color:ui.card.text.color }">
                                    <hsc-menu-item 
                                    v-bind:style="{ height: ui.card.height, width: ui.card.list.width }"
                                    :label="item.zone" v-for="(item, index) in datas.list.arr" :key="index">
                                        <div v-if="item.zone == data.zone" v-for="(data, idx) in datas.list.zone" :key="idx">
                                            <hsc-menu-item
                                            v-bind:style="{ height: ui.card.height }"
                                            :label="data.robot"
                                            @click="moveRobot(data.boothid, data.zoneid, data.robotid, data.robot)"/>
                                        </div>
                                    </hsc-menu-item>
                                </hsc-menu-bar-item>
                            </hsc-menu-bar>
                        </hsc-menu-style-white>
            </v-flex>
            <v-flex lg10>
                <v-layout>
                    <v-spacer/>
                    <v-flex lg3 class="statusBar mr-2" v-if="Boolean(getAuth)">
                        <status-table
                            v-bind:type="'predict'"
                            v-bind:title="ui.predictStatusTitle"
                            v-bind:statusTitleItems="ui.predictStatusTypes"
                            v-bind:statusTableItems="ui.predictStatusItems"
                        ></status-table>
                    </v-flex>
                    <v-flex lg4 class="statusBar">
                        <status-table
                            v-bind:type="'robot'"
                            v-bind:title="ui.robotStatusTitle"
                            v-bind:statusTableItems="ui.boothStatusTypes"
                        ></status-table>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout class="pl-3">
            <v-flex lg12>
                <div
                  class="layoutZDirection"
                  v-bind:style="{ left: ui.boothLayout.left, width: ui.boothLayout.width, height: ui.boothLayout.height, borderRadius: ui.boothLayout.radius }" 
                >
                    <v-layout wrap row v-for="(boothname, index) in datas.collect.data.zone" :key="index">
                        <v-flex lg12 class="pl-5">
                            <div v-bind:style="{ width: ui.boothLayout.booth.width, height: ui.boothLayout.booth.height, borderRadius: ui.boothLayout.booth.radius}">
                                <v-layout>
                                    <v-chip label :class="'boothNameOffset' + index" :color="ui.boothNameTag.backgroundColor" :text-color="ui.boothNameTag.color">
                                        {{datas.boothNameList[index]}}
                                        <img v-if="getBoothType(datas.boothNameList[index]) == 'sealer'" :src="getSealerRobotImg" :style="{ position: ui.boothNameTag.position.position, top: ui.boothNameTag.position.top, left: ui.boothNameTag.position.left }">    
                                        <img v-else :src="getPaintRobotImg" :style="{ position: ui.boothNameTag.position.position, top: ui.boothNameTag.position.top, left: ui.boothNameTag.position.left }">    
                                    </v-chip>
                                    <v-flex v-for="(zonename, idx) in boothname" :key="idx">
                                        <div v-bind:style="{ backgroundColor: ui.zoneLayout.color, width: ui.zoneLayout.width, height: ui.zoneLayout.height}">
                                            <div 
                                              v-if="(index == 0 && idx == 0)"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-0 
                                                        v-bind:boothid="collectBoothID[index]" 
                                                        v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                        v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                        v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                        v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                        v-bind:width="defines.currentZoneWidth"
                                                        v-bind:number="0"
                                                        v-bind:sector="datas.sector"
                                                        v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-0>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext0 
                                                        v-bind:boothid="collectBoothID[index]" 
                                                        v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                        v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                        v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                        v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                        v-bind:width="defines.currentZoneWidth"
                                                        v-bind:number="0"
                                                        v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext0>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 0 && idx == 1)"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-1 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="1"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-1>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext1 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="1"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext1>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 0 && idx == 2)"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-2 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="2"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-2>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext2 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="2"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext2>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 0 && idx == 3)"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-3 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="3"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-3>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext3 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="3"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext3>
                                                </div>
                                            </div>
                                            <div
                                            v-if="(index == 0 && idx == 4)"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-4 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="4"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-4>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext4 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="4"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext4>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 1 && idx == 0)"
                                            class="zoneIndex1"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-5 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="5"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-5>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext5 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="5"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext5>
                                                </div>
                                            </div>
                                            <div
                                            v-if="(index == 1 && idx == 1)"
                                            class="zoneIndex1"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-6 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="6"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-6>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext6 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="6"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext6>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 1 && idx == 2)"
                                            class="zoneIndex1"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-7 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="7"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-7>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext7 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="7"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext7>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 1 && idx == 3)"
                                            class="zoneIndex1"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-8 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="8"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-8>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext8 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="8"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext8>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 1 && idx == 4)"
                                            class="zoneIndex1"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-9 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="9"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-9>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext9 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="9"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext9>
                                                </div>
                                            </div>
                                            <div                                        
                                            v-if="(index == 2 && idx == 0)"
                                            class="zoneIndex2"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-10 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:beUse="true"
                                                    v-bind:number="10"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-10>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext10 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:beUse="true"
                                                    v-bind:number="10"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext10>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 2 && idx == 1)"
                                            class="zoneIndex2"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-11 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="11"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-11>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext11 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="11"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext11>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 2 && idx == 2)"
                                            class="zoneIndex2"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-12 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="12"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-12>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext12 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="12"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext12>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 2 && idx == 3)"
                                            class="zoneIndex2"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-13 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="13"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-13>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext13 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="13"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext13>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 2 && idx == 4)"
                                            class="zoneIndex2"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-14 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="14"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-14>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext14 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="14"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext14>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 3 && idx == 0)"
                                            class="zoneIndex3"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-15 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="15"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-15>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext15 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="15"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext15>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 3 && idx == 1)"
                                            class="zoneIndex3"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-16 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="16"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-16>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext16 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="16"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext16>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 3 && idx == 2)"
                                            class="zoneIndex3"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-17 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="17"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-17>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext17 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="17"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext17>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 3 && idx == 3)"
                                            class="zoneIndex3"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-18 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="18"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-18>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext18 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="18"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext18>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 3 && idx == 4)"
                                            class="zoneIndex3"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-19 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="19"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-19>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext19 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="19"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext19>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 4 && idx == 0)"
                                            class="zoneIndex4"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-20 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="20"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-20>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext20 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="20"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext20>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 4 && idx == 1)"
                                            class="zoneIndex4"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-21 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="21"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-21>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext21 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="21"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext21>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 4 && idx == 2)"
                                            class="zoneIndex4"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-22 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="22"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-22>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext22 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="22"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext22>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 4 && idx == 3)"
                                            class="zoneIndex4"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-23 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="23"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-23>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext23 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="23"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext23>
                                                </div>
                                            </div>
                                            <div 
                                            v-if="(index == 4 && idx == 4)"
                                            class="zoneIndex4"
                                            >
                                                <div v-if="datas.page.zone.extend == false">
                                                    <mini-Zone-24 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="24"
                                                    v-bind:sector="datas.sector"
                                                    v-on:miniZoneInfos="getMiniZoneInfos"
                                                    ></mini-Zone-24>
                                                </div>
                                                <div v-else>
                                                    <mini-Zone-Ext24 
                                                    v-bind:boothid="collectBoothID[index]" 
                                                    v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                    v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                    v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                    v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                    v-bind:width="defines.currentZoneWidth"
                                                    v-bind:number="24"
                                                    v-bind:sector="datas.sector"
                                                    ></mini-Zone-Ext24>
                                                </div>
                                            </div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </v-flex>
        </v-layout>
        <v-layout class="alarmZDirection">
            <slide-up-down v-show="this.ui.alarm.popup" class="alarmPushSize" :active="this.ui.alarm.popup" :duration="1000">
                <v-card v-bind:style="{ backgroundColor: ui.alarm.color }">
                    <v-card-title class="alarmDlgCardTitle pb-2" v-bind:style="ui.titleStyle">{{ui.alarm.title}}</v-card-title>
                    <v-layout>
                        <v-flex>
                            <robot-Alarms v-bind:contentData="datas.infoAlarmTableContentData"></robot-Alarms>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            <v-btn class="buttonItem" flat @click="closeAlarm(datas.infoAlarmTableContentData)">
                                Close
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </slide-up-down>
        </v-layout>
        <v-layout>
            <v-flex lg11></v-flex>
            <v-flex lg1>
                <v-btn 
                v-show="datas.page.moveBtnFlag"
                color="primary"
                class="pageMoveBtn"
                @click="moveBoothPageForBtn">Page Move</v-btn>
            </v-flex>
        </v-layout>

        <!-- 존 선택시 나오는 다이얼 로그 -->
        <select-option-dlg
            v-bind:flag="flags.selectOptionDlg"
            v-bind:selectOptionDatas="datas.miniZoneInfos"
            v-on:moveZone="getMoveZoneFlag"
            v-on:movePredict="getMovePredictFlag"
            v-on:closeDlg="closeSelectOptionDlg"
        ></select-option-dlg>
    </v-container>
</template>

<script>
//0 오프라인 #53636F
//1 대기 #FEC706
//2 동작 #06A43E
//3 홀드(멈춤) 
//4 알람 #E64107
//5 알람(에러) #E64107
//6 통신오류 #2195F3
import { mapGetters } from 'vuex';
import moonLoader from 'vue-spinner/src/MoonLoader.vue'
import miniZone0 from './allmonitoring/MiniZone.vue'
import miniZone1 from './allmonitoring/MiniZone.vue'
import miniZone2 from './allmonitoring/MiniZone.vue'
import miniZone3 from './allmonitoring/MiniZone.vue'
import miniZone4 from './allmonitoring/MiniZone.vue'

import miniZone5 from './allmonitoring/MiniZone.vue'
import miniZone6 from './allmonitoring/MiniZone.vue'
import miniZone7 from './allmonitoring/MiniZone.vue'
import miniZone8 from './allmonitoring/MiniZone.vue'
import miniZone9 from './allmonitoring/MiniZone.vue'

import miniZone10 from './allmonitoring/MiniZone.vue'
import miniZone11 from './allmonitoring/MiniZone.vue'
import miniZone12 from './allmonitoring/MiniZone.vue'
import miniZone13 from './allmonitoring/MiniZone.vue'
import miniZone14 from './allmonitoring/MiniZone.vue'

import miniZone15 from './allmonitoring/MiniZone.vue'
import miniZone16 from './allmonitoring/MiniZone.vue'
import miniZone17 from './allmonitoring/MiniZone.vue'
import miniZone18 from './allmonitoring/MiniZone.vue'
import miniZone19 from './allmonitoring/MiniZone.vue'

import miniZone20 from './allmonitoring/MiniZone.vue'
import miniZone21 from './allmonitoring/MiniZone.vue'
import miniZone22 from './allmonitoring/MiniZone.vue'
import miniZone23 from './allmonitoring/MiniZone.vue'
import miniZone24 from './allmonitoring/MiniZone.vue'



import miniZoneExt0 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt1 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt2 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt3 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt4 from './allmonitoring/MiniZoneExtend.vue'

import miniZoneExt5 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt6 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt7 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt8 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt9 from './allmonitoring/MiniZoneExtend.vue'

import miniZoneExt10 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt11 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt12 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt13 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt14 from './allmonitoring/MiniZoneExtend.vue'

import miniZoneExt15 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt16 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt17 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt18 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt19 from './allmonitoring/MiniZoneExtend.vue'

import miniZoneExt20 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt21 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt22 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt23 from './allmonitoring/MiniZoneExtend.vue'
import miniZoneExt24 from './allmonitoring/MiniZoneExtend.vue'

import SelectOptionDlg from '@/components/monitoring/monitoring/allmonitoring/SelectOptionDlg'
import StatusTable from './allmonitoring/StatusTable.vue'
import robotAlarm from './robotdetail/robotAlarms.vue'
export default {
    components: {
        robotAlarm,
        miniZone0,
        miniZone1,
        miniZone2,
        miniZone3,
        miniZone4,
        miniZone5,
        miniZone6,
        miniZone7,
        miniZone8,
        miniZone9,
        miniZone10,
        miniZone11,
        miniZone12,
        miniZone13,
        miniZone14,
        miniZone15,
        miniZone16,
        miniZone17,
        miniZone18,
        miniZone19,
        miniZone20,
        miniZone21,
        miniZone22,
        miniZone23,
        miniZone24,
        miniZoneExt0,
        miniZoneExt1,
        miniZoneExt2,
        miniZoneExt3,
        miniZoneExt4,
        miniZoneExt5,
        miniZoneExt6,
        miniZoneExt7,
        miniZoneExt8,
        miniZoneExt9,
        miniZoneExt10,
        miniZoneExt11,
        miniZoneExt12,
        miniZoneExt13,
        miniZoneExt14,
        miniZoneExt15,
        miniZoneExt16,
        miniZoneExt17,
        miniZoneExt18,
        miniZoneExt19,
        miniZoneExt20,
        miniZoneExt21,
        miniZoneExt22,
        miniZoneExt23,
        miniZoneExt24,
        moonLoader,
        SelectOptionDlg,
        StatusTable
    },
    data () {
        return {
            ui: {
                titleStyle: null,
                alarm: {
                    popup: false,
                    color: '',
                    width: '1000px',
                    mode: '',
                    timeout: 60000,
                    title: this.$t(`monitoring.child.robotAlarm.title`),
                },
                card: {
                    width: '100%',
                    height: '100%',
                    color: '',
                    list: {
                        width: '100%',
                        color: ''
                    },
                    title: {
                        booth: this.$t(`monitoring.allMonitoring.selectBoothPage`),
                        zone: this.$t(`monitoring.allMonitoring.selectZonePage`),
                        robot: this.$t(`monitoring.allMonitoring.selectRobotPage`),
                    },
                    text: {
                        color: '',
                        height: '40px'
                    }
                },
                menuLayout: {
                    boothDisplayBtn: '10px',
                    zoneDisplayBtn: '180px',
                    robotDisplayBtn: '342px',
                },
                boothLayout: {
                    nameTag: 'rotate(-0.25turn)',
                    color: '',
                    width: '1820px',
                    height: '900px',
                    radius: '5px',
                    left: '85px',
                    border: '',
                    booth: {
                        color: '',
                        width: '100%',
                        height: '165px',
                        border: ''
                    },
                    next: {
                        color: '',
                        width: '100%',
                        height: '650px',
                        radius: '5px'
                    }
                },
                boothStatusTypes: [ 
                    { id: '0', text: this.$t(`monitoring.allMonitoring.robotStatus.action`), img: require("@/images/state_motion.png") },
                    { id: '1', text: this.$t(`monitoring.allMonitoring.robotStatus.ready`), img: require("@/images/state_ready.png") },
                    { id: '2', text: this.$t(`monitoring.allMonitoring.robotStatus.alarm`), img: require("@/images/state_alarm.png") },
                    { id: '3', text: this.$t(`monitoring.allMonitoring.robotStatus.offline`), img: require("@/images/state_offline.png") },
                    { id: '4', text: this.$t(`monitoring.allMonitoring.robotStatus.error`), img: require("@/images/state_error.png") },
                ],
                boothNameTag: {
                    backgroundColor: '',
                    color: '',
                    position: {
                        position: 'absolute',
                        top: '110px',
                        left: '0px'
                    }
                },
                boothSector: {
                    sector: []
                },
                zoneLayout: {
                    color: '',
                    width: '99%',
                    height: '150px'
                },
                images: {
                    position: 'absolute',
                    body: require("@/images/body_zone.png"),
                    size: 'max-width: 50px; height: auto'
                },
                predictStatusTitle: this.$t(`monitoring.allMonitoring.predictStatusTitle`),
                robotStatusTitle: this.$t(`monitoring.allMonitoring.robotStatusTitle`),
                predictStatusItems: [
                    {id: 'range', text: this.$t(`monitoring.allMonitoring.predictStatusItems.range`)},
                    {id: 'motor_temperature', text: this.$t(`monitoring.allMonitoring.predictStatusItems.motor_temperature`)},
                    {id: 'accum', text: this.$t(`monitoring.allMonitoring.predictStatusItems.accum`)}
                ],
                predictStatusTypes: [
                    {id: 'normal', text: this.$t(`monitoring.allMonitoring.predictStatusTypes.normal`), color: this.$style.monitoring.predictStatusItemNormalColor},
                    {id: 'alarm', text: this.$t(`monitoring.allMonitoring.predictStatusTypes.alarm`), color: this.$style.monitoring.predictStatusItemAlarmColor}
                ]
            },
            defines: {
                zoneWidth: {
                    sector1: '1824px',
                    sector2: '912px',
                    sector3: '603px',
                    sector4: '456px',
                    sector5: '355px'
                },
                currentZoneWidth: '',
                page: {
                    index: 0,
                    count: 0
                },
                boothType: []
            },
            datas: {
                page: {
                    standard: null,
                    record: null,
                    zone: {
                        extend: false
                    },
                    moveBtnFlag: false
                },
                collect: {
                    zone: {
                        zone: [],
                        conveyor: [],
                        startCount: [],
                        endCount: [],
                    },
                    data: {
                        zone: [],
                        conveyor: [],
                        startCount: [],
                        endCount: []
                    }
                },
                reserve: {
                    booth: [],
                    zone: {
                        zone: [],
                        conveyor: [],
                        startCount: [],
                        endCount: [],
                    },
                    data: {
                        zone: [],
                        conveyor: [],
                        startCount: [],
                        endCount: []
                    }
                },
                items: [],
                robotItems: [],
                boothPage: [],
                boothSector: {
                    sector: []
                },
                infoAlarmTableContentData: [],
                sector: 1,
                list: {
                    boothList: [],
                    booth: [],
                    zone: [],
                    arr: []
                },
                boothNameList: [],
                alarmOccurTime: '',
                miniZoneInfos: null
            },
            collectBoothID: [],  // 실제 부스 아이디 수집
            handle: {
                alarm: null
            },
            async: {
                pageMove: false
            },
            flags: {
                selectOptionDlg: false
            }
        }
    },
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getLanguage: 'getLanguage',
            getTheme: 'getTheme',
            getAuth: 'getAuth'
        }),
        initialize() {
            if (this.getFactoryId != '') {
                this.getExtendZone();
                this.setZone();
                this.getAllZone();
                this.getAllRobot();
                this.setTitleBooth();
                this.createHandle();
            }
        },
        arrowDown() {
            return 'keyboard_arrow_down';
        },
        getPaintRobotImg() {
            if(this.getTheme === true) {
                return require("@/images/img_painting_robot.png");
            } else {
                return require("@/images/img_painting_robot_light.png");
            }
        },
        getSealerRobotImg() {
            if(this.getTheme === true) {
                return require("@/images/img_sealing_robot.png");
            } else {
                return require("@/images/img_sealing_robot_light.png");
            }
        }
    },
    created() {
        
    },
    mounted() {
        this.initializeStyle();
    },
    destroyed () {
        this.destroyHandle();
        this.ui.alarm.popup = false;
    },
    methods: {
        initializeStyle() {
            this.ui.titleStyle = this.$style.common.titleObjectItemColor;
            this.ui.alarm.color = this.$style.monitoring.allMonitoringItemAlarmDlgBackgroundColor;
            this.ui.card.color = this.$style.monitoring.allMonitoringItemHscMenuStyleBackgroundColor;
            this.ui.card.text.color = this.$style.monitoring.allMonitoringItemHscMenuStyleColor;
            this.ui.zoneLayout.color = this.$style.monitoring.allMonitoringItemZoneLayoutBackgroundColor;
            this.ui.boothNameTag.backgroundColor = this.$style.monitoring.allMonitoringItemBoothInfoBackgroundColor;
            this.ui.boothNameTag.color = this.$style.monitoring.allMonitoringItemBoothInfoColor;

            document.documentElement.style.setProperty("--hscMenuStyleBorderColor", this.$style.common.cardItemBorderColor);
            document.documentElement.style.setProperty("--boothLayoutBackgroundColor", this.$style.common.allMonitoringItemBackgroundColor);
            document.documentElement.style.setProperty("--alarmDlgCardTitleBackgroundColor",this.$style.common.allMonitoringItemAlarmDlgTitleBackgroundColor);
            document.documentElement.style.setProperty("--alarmDlgCardTitleColor", this.$style.common.allMonitoringItemAlarmDlgTitleColor);
            document.documentElement.style.setProperty("--buttonItemColor", this.$style.common.buttonItemColor);
            document.documentElement.style.setProperty("--statusBarBorderColor", this.$style.monitoring.allMonitoringItemStatusBarBorderColor);
        },
        initializeBoothPageList() {
            this.datas.boothPage = [];
        },
        initializeBoothInfo() {
            this.datas.collect.zone.zone = [];
            this.datas.collect.zone.conveyor = [];
            this.datas.collect.zone.startCount = [];
            this.datas.collect.zone.endCount = [];
        },
        getBoothType(boothName) {
            return window.sessionStorage.getItem(boothName);
        },
        getExtendZone() {
            this.$http.get(`${this.baseUrl}/info/extend/zone`).then((result) => {
                if (result.data != 'STANDARD') {
                    this.datas.page.zone.extend = true;
                }
                else {
                    this.datas.page.zone.extend = false;
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        setPages(page) {
            switch (page) {
                case 1:
                    this.defines.page.index = 0;
                    break;
                case 2:
                    this.defines.page.index = 5;
                    break;
            }
        },
        setZone() {
            let arr = [];
            this.collectBoothID = [];
            let boothParams = {
                factoryid: this.getFactoryId,
            };
            this.$http.post(`${this.baseUrl}/monitoring/booth/list`, boothParams).then(async (result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.boothList`));
                }
                else {
                    this.getPageMoveList();
                    this.getPageCount(result.data.length);
                    let printZoneCount = 0;

                    for (let idx = this.defines.page.index; idx < result.data.length; ++idx) {
                        if (printZoneCount < 5) { // 부스 화면 5개로 늘림
                            let zoneParams = {
                                factoryid: this.getFactoryId,
                                boothid: result.data[idx].boothid
                            };
                            let ret = await this.sync(zoneParams, result, idx, arr);
                            printZoneCount++;
                        }
                    }
                    this.async.pageMove = false;
                    this.getBoothName();
                }
                }).catch((error) => {
                this.$log.error(error);
            })
        },
        sync(zoneParams, boothData, idx, arr) {
            return this.$http.post(`${this.baseUrl}/monitoring/zone/list`, zoneParams).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneList`));
                }
                else {
                    this.collectBoothID.push(boothData.data[idx].boothid);
                    this.initializeBoothInfo();
                    for (let cnt = 0; cnt < result.data.length; ++cnt) {
                        this.datas.collect.zone.zone.push(result.data[cnt].zone_id);
                        this.datas.collect.zone.conveyor.push(result.data[cnt].conveyor_id);
                        this.datas.collect.zone.startCount.push(result.data[cnt].start_count);
                        this.datas.collect.zone.endCount.push(result.data[cnt].end_count);
                    }                    
                    this.datas.collect.data.zone.push(this.datas.collect.zone.zone);
                    this.datas.collect.data.conveyor.push(this.datas.collect.zone.conveyor);
                    this.datas.collect.data.startCount.push(this.datas.collect.zone.startCount);
                    this.datas.collect.data.endCount.push(this.datas.collect.zone.endCount);
                    arr.push(result.data.length);
                }
                this.width(arr);
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        getAllZone() {
            let params = {
                factoryid: this.getFactoryId,
            };
            this.$http.post(`${this.baseUrl}/monitoring/booth/list`, params).then((boothListResult) => {
                if (boothListResult.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.boothList`));
                }
                else {
                    for (let i = 0; i < boothListResult.data.length; ++i) {
                        this.datas.list.boothList.push({
                            booth: boothListResult.data[i].boothname   
                        });
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        getPageMoveList() {
            let params = {
                factoryid: this.getFactoryId
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneRobotList`));
                }
                else {
                    this.getZoneListLoop(result);
                    this.getRobotListLoop(result);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        getZoneListLoop(result) {
            let tempBooth = null;
            let tempZone = null;
            for (let idx = 0; idx < result.data.length; ++idx) {
                if (idx == 0) {
                    tempBooth = result.data[idx].booth_name;
                    tempZone = result.data[idx].zone_name;
                    this.getBoothListPushZoneItem(result, idx);
                }
                else {
                    if (tempBooth == result.data[idx].booth_name) {
                        if (tempZone != result.data[idx].zone_name) {
                            this.getBoothListPushZoneItem(result, idx);
                            tempZone = result.data[idx].zone_name;
                        }
                    }
                    else {
                        tempBooth = result.data[idx].booth_name;
                        tempZone = result.data[idx].zone_name;
                        this.getBoothListPushZoneItem(result, idx);
                    }
                }
            }
        },
        getRobotListLoop(result) {
            let temp = null;
            let cnt = 0;
            this.initializeRobotList();
            for (let idx = 0; idx < result.data.length; ++idx) {
                if (idx == 0) {
                    temp = result.data[idx].zone_name;
                    this.getRobotListArrPushItem(result, idx);
                    this.getRobotListZonePushItem(result, idx);
                }
                else {
                    if (temp == result.data[idx].zone_name) {
                        this.getRobotListZonePushItem(result, idx);
                    }
                    else {
                        this.getRobotListArrPushItem(result, idx);
                        this.getRobotListZonePushItem(result, idx);
                        temp = result.data[idx].zone_name;
                        cnt = idx;
                    }
                }
            }
        },
        getBoothListPushZoneItem(obj, idx) {
            this.datas.list.booth.push({
                booth: obj.data[idx].booth_name,
                zone: obj.data[idx].zone_name,
                boothid: obj.data[idx].booth_id,
                zoneid: obj.data[idx].zone_id
            });
        },
        initializeRobotList() {
            this.datas.list.arr = [];
        },
        getRobotListArrPushItem(obj, idx) {
            this.datas.list.arr.push({
                zone: obj.data[idx].zone_name
            });
        },
        getRobotListZonePushItem(obj, idx) {
            this.datas.list.zone.push({
                zone: obj.data[idx].zone_name,
                robot: obj.data[idx].robot_name,
                boothid: obj.data[idx].booth_id,
                zoneid: obj.data[idx].zone_id,
                robotid: obj.data[idx].robot_id
            });
        },
        getAllRobot() {
            let params = {
                factoryid: this.getFactoryId,
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneRobotList`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.datas.robotItems.push({
                            title: result.data[idx].booth_name + '/' + result.data[idx].zone_name + '/' + result.data[idx].robot_name,
                            boothid: result.data[idx].booth_id,
                            zoneid: result.data[idx].zone_id,
                            robotid: result.data[idx].robot_id
                        })
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        setTitleBooth() {
            let params = {
                factoryid: this.getFactoryId,
            };
            return this.$http.post(`${this.baseUrl}/monitoring/booth/list`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.boothList`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.ui.boothSector.sector[idx] = result.data[idx].boothname;
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
       
        setWidth(count) {
            switch (count) {
                case 1:
                    this.ui.boothLayout.booth.width = this.defines.zoneWidth.sector1;
                    this.ui.zoneLayout.width = this.defines.zoneWidth.sector1;
                break;
                case 2:
                    this.ui.boothLayout.booth.width = this.defines.zoneWidth.sector2;
                    this.ui.zoneLayout.width = this.defines.zoneWidth.sector2;
                break;
                case 3:
                    this.ui.boothLayout.booth.width = this.defines.zoneWidth.sector3;
                    this.ui.zoneLayout.width = this.defines.zoneWidth.sector3;
                break;
                case 4:
                    this.ui.boothLayout.booth.width = this.defines.zoneWidth.sector4;
                    this.ui.zoneLayout.width = this.defines.zoneWidth.sector4;
                break;
                case 5:
                    this.ui.boothLayout.booth.width = this.defines.zoneWidth.sector5;
                    this.ui.zoneLayout.width = this.defines.zoneWidth.sector5;
                break;
            }
            this.defines.currentZoneWidth = this.ui.zoneLayout.width;
            this.setSector(count);
        },
        setSector(data) {
            this.datas.sector = data;
        },
        width(arr) {
            let max = Math.max.apply(null, arr);
            this.setWidth(max);
        },
        moveBoothPage(index) {
            this.initializeBoothPageList();
            this.setPages(index);
            this.initializeBoothInfo();
            this.datas.collect.data.zone = [];
            this.datas.collect.data.conveyor = [];
            this.datas.collect.data.startCount = [];
            this.datas.collect.data.endCount = [];
            this.setZone();
            
            this.datas.page.record = index;
        },
        moveBoothPageForBtn() {
            if (this.async.pageMove != true) {
                this.async.pageMove = true;
            let index = 1;
            if (this.datas.page.record == null) {
                index = this.datas.page.record = this.datas.boothPage.length;
            }
            else {
                index = this.datas.boothPage.length-1;
                this.datas.page.record = null;
            }
            this.initializeBoothPageList();
            this.setPages(index);
            this.initializeBoothInfo();
            this.datas.collect.data.zone = [];
            this.datas.collect.data.conveyor = [];
            this.datas.collect.data.startCount = [];
            this.datas.collect.data.endCount = [];
            this.setZone();     
            }       
        },
        setMovePageBtnFlag(flag) {
            this.datas.page.moveBtnFlag = flag;
        },
        isPageMoveBtn(count) {
            if (count > 1) {
                this.setMovePageBtnFlag(true);
            }
        },
        getPageCount(length) {
            this.defines.page.count = Math.ceil(length / 5);
            this.isPageMoveBtn(this.defines.page.count);
            for (let idx = 0; idx < this.defines.page.count; ++idx) {
                this.datas.boothPage.push(this.$t(`monitoring.allMonitoring.page`) + (idx+1));
            }
        },
        moveZone(zone) {
            let params = {
                zonename: zone
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/info`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneInfo`));
                }
                else {
                    this.moveZonePage(
                        result.data[0].booth_id, 
                        result.data[0].zone_id, 
                        result.data[0].conveyor_id, 
                        result.data[0].start_count, 
                        result.data[0].end_count);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        moveZonePage(boothid, zoneid, conveyorid, startcount, endcount) {
            this.$http.get(`${this.baseUrl}/info/extend/zone`).then((result) => {
                let address = null;
                if (result.data === 'STANDARD') {
                    address = '/sps/monitoring/ZoneMonitoring';
                }
                else if (result.data === 'CHERRY') {
                    address = '/sps/monitoring/ZoneMonitoringExt';
                }
                this.$router.push({
                    path: address, query: {
                        factoryid: this.getFactoryId,
                        boothid: boothid,
                        zoneid: zoneid,
                        conveyorid: conveyorid,
                        startcount: startcount,
                        endcount: endcount,
                        zoneparent: this.datas.list.boothList,
                        zonechild: this.datas.list.booth,
                        robotparent: this.datas.list.arr,
                        robotchild: this.datas.list.zone
                    }
                });
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        moveRobot(boothid, zoneid, robotid, robotname) {
            this.moveRobotPage(boothid, zoneid, robotid, robotname);
        },
        moveRobotPage(boothid, zoneid, robotid, robotname) {
            this.$router.push({path: '/sps/monitoring/robotdetail', query : { 
                factoryid: this.getFactoryId,
                boothid: boothid,
                zoneid: zoneid,
                robotid: robotid,
                robotname: robotname
            }});
        },
        createHandle() {
            this.handle.alarm = setInterval(this.update, 3000);
        },
        destroyHandle() {
            clearInterval(this.handle.alarm);
        },
        update() {
            this.updateAlarm();
            this.updateRobotStatus();
        },
        updateRobotStatus() {
            let params = {
                    factoryid: this.getFactoryId
                };
                this.$http.post(`${this.baseUrl}/monitoring/zone/data`, params).then((result) => {
                    if (result.data == '') {
                        this.$log.warn('No Robot data available.');
                    }
                    else {
                        this.ui.boothStatusTypes[0].text = this.$t(`monitoring.allMonitoring.robotStatus.action`) + ': ' + result.data[0].action;
                        this.ui.boothStatusTypes[1].text = this.$t(`monitoring.allMonitoring.robotStatus.ready`) + ': ' + result.data[0].waiting;
                        this.ui.boothStatusTypes[2].text = this.$t(`monitoring.allMonitoring.robotStatus.alarm`) + ': ' + result.data[0].alarm;
                        this.ui.boothStatusTypes[3].text = this.$t(`monitoring.allMonitoring.robotStatus.offline`) + ': ' + result.data[0].offline;
                        this.ui.boothStatusTypes[4].text = this.$t(`monitoring.allMonitoring.robotStatus.error`) + ': ' + result.data[0].error;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
        },
        updateAlarm() {
            let params = {
                factoryid: this.getFactoryId
            };
            let timestamp = null;
            this.datas.infoAlarmTableContentData = [];
            this.$http.post(`${this.baseUrl}/monitoring/alarm`, params).then((result) => {
                if (result.data == '') {
                    this.popupAlarm(false);
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
                            processInfo: "[" + result.data[idx].booth_name + "] / [" + result.data[idx].zone_name + "] / [" + result.data[idx].robot_name + "]",
                            alarmcode: result.data[idx].alarm_code,
                            desc: result.data[idx].alarm_content,
                            alarmid: result.data[idx].alarm_id,
                            alarmType: result.data[idx]['type_name_'+ this.getLanguage],
                            alarmStatus: result.data[idx].alarm_status
                        });
                    }
                    if (this.datas.alarmOccurTime == (result.data[0].time_stamp.replace("T", " ").replace("Z", " "))) {
                        this.popupAlarm(false);
                    }
                    else {
                        this.popupAlarm(true);
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        popupAlarm(flag) {
            this.ui.alarm.popup = flag;
        },
        closeAlarm(data) {
            this.datas.alarmOccurTime = data[0].timestamp;
            this.popupAlarm(false);
        },
        getBoothName() {
            this.datas.boothNameList = [];
            let page = this.defines.page.index;
            switch (page) {
                case 0: 
                    for (let idx = 0; idx < 5; ++idx) {
                        if (this.datas.list.boothList[idx] != undefined) {
                            this.datas.boothNameList.push(this.datas.list.boothList[idx].booth);
                        }
                    }
                    break;
                case 5: 
                    for (let idx = 5; idx < 9; ++idx) {
                        if (this.datas.list.boothList[idx] != undefined) {
                            this.datas.boothNameList.push(this.datas.list.boothList[idx].booth);
                        }
                    }
                    break;
            }
        },

        getMiniZoneInfos(miniZoneInfos) {
            this.datas.miniZoneInfos = miniZoneInfos;
            if(Boolean(this.getAuth)) {
                this.flags.selectOptionDlg = true;
            } else {
                this.getMoveZoneFlag(miniZoneInfos);
            }
        },

        getZoneName(boothid, zoneid) {
            return new Promise((resolve, reject) => {
                this.$http.get(`/monitoring/boothid/${boothid}/zoneid/${zoneid}/zonename`).then((res) => {
                    if(res.data.length > 0) {
                        resolve(res.data[0].zone_name);
                    }
                }).catch(error => {
                    this.$log.error(error);
                    reject(error);
                })
            })
        },

        async getMoveZoneFlag(selectOptionDatas) {
            let zonename = await this.getZoneName(selectOptionDatas.boothid, selectOptionDatas.zoneid);
            this.moveZone(zonename);
        },

        getMovePredictFlag(selectOptionDatas) {
            this.$router.push({ name: 'predict', params: { predictOptionDatas: selectOptionDatas }});
        },

        closeSelectOptionDlg() {
            this.flags.selectOptionDlg = false;
        }
    }
}
</script>

<style scoped lang="scss">
    @import './allmonitoring';
</style>
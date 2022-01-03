<template>
    <v-container fluid>
        <v-layout v-bind="initialize">
            <v-flex lg2 class="pt-3">
                <h4 class="display-1">{{ui.text.title.functionTitle}}</h4>
            </v-flex>
            <v-flex lg2>
                <v-checkbox :label="`${ui.text.title.accumFunction.toString()}`"
                v-model="datas.check.accum"
                :readonly="true"
                ></v-checkbox>
                </v-flex>
            <v-flex lg1>
                
                </v-flex>
            <v-flex lg7>
                <v-layout wrap row>
                    <v-spacer/>
                    <div class="pr-3" v-for="boothStatusType in ui.boothStatusTypes" :key="boothStatusType.id">
                        <a class="pr-2">
                            <img :src='boothStatusType.img' />
                        </a>
                        {{boothStatusType.text}}
                    </div>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout class="pl-3">
            <v-flex lg12>
            <div
            class="layoutZDirection"
            v-bind:style="{ left: ui.boothLayout.left, border: ui.boothLayout.border, width: ui.boothLayout.width, height: ui.boothLayout.height, borderRadius: ui.boothLayout.radius }">
                <v-layout wrap row
                v-for="(boothname, index) in datas.collect.data.zone" :key="index">
                    <v-flex lg12 class="pl-5">
                        <div v-bind:style="{ border: ui.boothLayout.booth.border, width: ui.boothLayout.booth.width, height: ui.boothLayout.booth.height, borderRadius: ui.boothLayout.booth.radius }">
                        <v-layout>
                                <v-chip label :class="'boothNameOffset' + index" color="#415288" text-color="white">
                                    {{datas.boothNameList[index]}}
                                    <img v-if="getBoothType(datas.boothNameList[index]) == 'sealer'" :src="ui.boothNameTag.images.sealerRobot" :style="{ position: ui.boothNameTag.position.position, top: ui.boothNameTag.position.top, left: ui.boothNameTag.position.left }">    
                                    <img v-else :src="ui.boothNameTag.images.paintingRobot" :style="{ position: ui.boothNameTag.position.position, top: ui.boothNameTag.position.top, left: ui.boothNameTag.position.left }">    
                                </v-chip>
                            <v-flex 
                            v-for="(zonename, idx) in boothname" 
                            :key="idx">
                                <div v-bind:style="{ backgroundColor: ui.zoneLayout.color, width: ui.zoneLayout.width, height: ui.zoneLayout.height }">
                                    <div v-if="(index == 0 && idx == 0)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-0 
                                                v-bind:boothid="collectBoothID[index]" 
                                                v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                                v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                                v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                                v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                                v-bind:width="defines.currentZoneWidth"
                                                v-bind:number="0"
                                                v-bind:sector="datas.sector">
                                            </mini-Zone-0>
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
                                                v-bind:sector="datas.sector">
                                                </mini-Zone-Ext0>
                                            </div>
                                        </div>
                                    <div v-if="(index == 0 && idx == 1)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-1 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="1"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-1>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext1>
                                        </div>
                                    </div>
                                    <div v-if="(index == 0 && idx == 2)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-2 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="2"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-2>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext2>
                                        </div>
                                    </div>
                                    <div v-if="(index == 0 && idx == 3)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-3 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="3"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-3>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext3>
                                        </div>
                                    </div>
                                    <div v-if="(index == 0 && idx == 4)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-4 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="4"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-4>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext4>
                                        </div>
                                    </div>
                                    <div v-if="(index == 1 && idx == 0)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-5 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="5"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-5>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext5>
                                        </div>
                                    </div>
                                    <div v-if="(index == 1 && idx == 1)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-6 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="6"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-6>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext6>
                                        </div>
                                    </div>
                                    <div v-if="(index == 1 && idx == 2)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-7 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="7"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-7>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext7>
                                        </div>
                                    </div>
                                    <div v-if="(index == 1 && idx == 3)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-8 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="8"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-8>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext8>
                                        </div>
                                    </div>
                                    <div v-if="(index == 1 && idx == 4)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-9 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="9"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-9>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext9>
                                        </div>
                                    </div>
                                    <div v-if="(index == 2 && idx == 0)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-10>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext10>
                                        </div>
                                    </div>
                                    <div v-if="(index == 2 && idx == 1)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-11 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="11"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-11>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext11>
                                        </div>
                                    </div>
                                    <div v-if="(index == 2 && idx == 2)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-12 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="12"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-12>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext12>
                                        </div>
                                    </div>
                                    <div v-if="(index == 2 && idx == 3)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-13 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="13"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-13>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext13>
                                        </div>
                                    </div>
                                    <div v-if="(index == 2 && idx == 4)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-14 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="14"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-14>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext14>
                                        </div>
                                    </div>
                                    <div v-if="(index == 3 && idx == 0)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-15 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="15"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-15>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext15>
                                        </div>
                                    </div>
                                    <div v-if="(index == 3 && idx == 1)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-16 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="16"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-16>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext16>
                                        </div>
                                    </div>
                                    <div v-if="(index == 3 && idx == 2)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-17 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="17"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-17>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext17>
                                        </div>
                                    </div>
                                    <div v-if="(index == 3 && idx == 3)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-18 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="18"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-18>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext18>
                                        </div>
                                    </div>
                                    <div v-if="(index == 3 && idx == 4)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-19 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="19"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-19>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext19>
                                        </div>
                                    </div>
                                    <div v-if="(index == 4 && idx == 0)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-20 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="20"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-20>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext20>
                                        </div>
                                    </div>
                                    <div v-if="(index == 4 && idx == 1)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-21 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="21"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-21>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext21>
                                        </div>
                                    </div>
                                    <div v-if="(index == 4 && idx == 2)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-22 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="22"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-22>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext22>
                                        </div>
                                    </div>
                                    <div v-if="(index == 4 && idx == 3)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-23 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="23"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-23>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext23>
                                        </div>
                                    </div>
                                    <div v-if="(index == 4 && idx == 4)"
                                    @click="moveZonePage(collectBoothID[index], datas.collect.data.zone[index][idx], datas.collect.data.conveyor[index][idx], datas.collect.data.startCount[index][idx], datas.collect.data.endCount[index][idx])">
                                        <div v-if="datas.page.zone.extend == false">
                                            <mini-Zone-24 
                                            v-bind:boothid="collectBoothID[index]" 
                                            v-bind:zoneid="datas.collect.data.zone[index][idx]" 
                                            v-bind:conveyorid="datas.collect.data.conveyor[index][idx]" 
                                            v-bind:startcount="datas.collect.data.startCount[index][idx]"
                                            v-bind:endcount="datas.collect.data.endCount[index][idx]"
                                            v-bind:width="defines.currentZoneWidth"
                                            v-bind:number="24"
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-24>
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
                                            v-bind:sector="datas.sector">
                                            </mini-Zone-Ext24>
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

                <v-dialog v-model="ui.signal.accum" 
                :width="ui.size.setAllDataTable.width"
                :height="ui.size.setAllDataTable.height"
                persistent>
                <v-card class="dialogContent" dark>
                    <v-card-text>
                        <div id="dyGridAccum" :style="ui.style.dyGrid"></div>    
                        <v-btn id="dyGridDlgClose" @click="onCloseBtn" color="primary">종료</v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>

            </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import moonLoader from 'vue-spinner/src/MoonLoader.vue'
import miniZone0 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone1 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone2 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone3 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone4 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'

import miniZone5 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone6 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone7 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone8 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone9 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'

import miniZone10 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone11 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone12 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone13 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone14 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'

import miniZone15 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone16 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone17 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone18 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone19 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'

import miniZone20 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone21 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone22 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone23 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'
import miniZone24 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZone'


import miniZoneExt0 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt1 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt2 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt3 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt4 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'

import miniZoneExt5 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt6 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt7 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt8 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt9 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'

import miniZoneExt10 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt11 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt12 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt13 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt14 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'

import miniZoneExt15 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt16 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt17 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt18 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt19 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'

import miniZoneExt20 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt21 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt22 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt23 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'
import miniZoneExt24 from '@/components/torquemonitoring/monitoring/allmonitoring/MiniZoneExtend'

import * as dyGrid from 'cheetah-grid';
export default {
    components: {
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
        moonLoader
    },
    data () {
        return {
            records: [],
            ui: {
                style: {
                    dyGrid: `border: solid 1px #2a2f44;`,
                },
                size: {
                    setDataTable: {
                        width: 400,
                    },
                    setAllDataTable: {
                        width: 1500,
                        height: 400,
                    },
                    setAllDataTableCloseBtn: {
                        xPos: null,
                    },
                    setAllWarningDataDlg: {
                        width: 400,
                    },
                },
                text: {
                    title: {
                        setAbnormalStandard: this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAbnormalStandard`),
                        functionTitle: this.$t(`torqueMonitoring.torqueAllMonitoring.functionTitle`),
                        accumFunction: this.$t(`torqueMonitoring.torqueAllMonitoring.accumFunction`),
                    },
                    setAllDataTable: {
                        booth: this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAllDataTable.booth`),
                        zone: this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAllDataTable.zone`),
                        robot: this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAllDataTable.robot`),
                        job: this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAllDataTable.job`),
                        axis: this.$t(`diagnostics.torqueLoadFactor.child.abnormalStandardSettingTable.setAllDataTable.axis`),
                        violationTime: this.$t(`torqueMonitoring.torqueAllMonitoring.violationTime`),
                        violationValue: this.$t(`torqueMonitoring.torqueAllMonitoring.violationValue`),
                        violationType: this.$t(`torqueMonitoring.torqueAllMonitoring.violationType`),
                        cumulativeWarningValue: this.$t(`torqueMonitoring.torqueAllMonitoring.cumulativeWarningValue`),
                    },
                    },
                signal: {
                    accum: false,
                },
                alarm: {
                    popup: false,
                    color: '',
                    width: '1000px',
                    mode: '',
                    timeout: 60000,
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
                        robot: this.$t(`monitoring.allMonitoring.selectRobotPage`)
                    },
                    text: {
                        color: '',
                        height: '40px'
                    }
                },
                menuLayout: {
                    boothDisplayBtn: '10px',
                    zoneDisplayBtn: '180px',
                    robotDisplayBtn: '335px',
                },
                boothLayout: {
                    nameTag: 'rotate(-0.25turn)',
                    color: '',
                    width: '1820px',
                    height: '850px',
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
                    { id: '1', text: this.$t(`monitoring.allMonitoring.robotStatus.alarm`), img: require("@/images/state_alarm.png") },
                ],
                boothNameTag: {
                    images: {
                        paintingRobot: require("@/images/img_painting_robot.png"),
                        sealerRobot: require("@/images/img_sealing_robot.png")
                    },
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
                }
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
                check: {
                    accum: true,
                },
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
                alarmOccurTime: ''
            },
            collectBoothID: [],  // 실제 부스 아이디 수집
            handle: {
                dyGrid: null,
                alarm: null,
            },
            async: {
                pageMove: false,
            },
            userTheme: {
                color: '#ffffff',
                frozenRowsColor: '#ffffff',
                defaultBgColor: '#21263a',
                frozenRowsBgColor: '#2a2f44',
                selectionBgColor: '#393B58',
                highlightBgColor: '#2a2f44',
                underlayBackgroundColor: '#21263a',
                frozenRowsBorderColor(args) {
                const {
                    row,
                    grid: {frozenRowCount}
                } = args;
                if (frozenRowCount - 1 === row) {
                    return ['#2a2f44', '#2a2f44', '2a2f44'];
                } else {
                    return '#2a2f44';
                }
                },
                borderColor(args) {
                const {
                    col,
                    grid: {colCount}
                } = args;
                if (colCount - 1 === col) {
                    return ['#2a2f44', '#2a2f44', '#2a2f44', '#2a2f44'];
                } else {
                    return ['#2a2f44', '#2a2f44'];
                }
                },
                highlightBorderColor: '#ffffff',
                checkbox: {
                uncheckBgColor: '#ffffff',
                checkBgColor: 'rgb(255, 73, 72)',
                borderColor: 'ffffff',
                },
                button: {
                color: '#000000',
                bgColor: '#A3A5AD',
                },
                header: {
                sortArrowColor: '#000000'
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            baseUrl: 'getBaseUrl',
            getFactoryId: 'getFactoryId',
            getLanguage: 'getLanguage'
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
        }
    },
    mounted() {
        this.initializeStyle();
        this.onCreate();
        const closeBtn = document.querySelector('#dyGridDlgClose');
        closeBtn.style.left = `${(this.ui.size.setAllDataTable.width - 140)}px`;        
    },
    destroyed () {
        this.destroyHandle();
        this.ui.alarm.popup = false;
    },
    methods: {
        initializeStyle() {
            this.ui.alarm.color = '#C00000';
            this.ui.card.color = '#21263a';
            this.ui.card.list.color = '#203556';
            this.ui.card.text.color = '#ffffff';
            this.ui.boothLayout.color = '#21263a';
            this.ui.boothLayout.border = '5px #203556';
            this.ui.boothLayout.booth.color = '#203556';
            this.ui.boothLayout.booth.border = '1px #000';
            this.ui.boothLayout.next.color = '#21263a';
            this.ui.zoneLayout.color = '#171A29';
        },
        getData(boothid, zoneid) {
            this.$http.get(`${this.baseUrl}/torquemonitoring/zone/detail/data`, {
                params: {
                    factoryid: this.getFactoryId,
                    boothid: boothid,
                    zoneid: zoneid,
                    date: `'1 day'`,
                }
            }).then((result) => {
                if (result.data === '') {
                    this.invalidate();
                }
                else {
                    let data = result.data;
                    for (let idx = 0; idx < data.length; ++idx) {
                    this.records.push({
                        date: result.data[idx].time_stamp,
                        booth: result.data[idx].booth,
                        zone: result.data[idx].zone,
                        robot: result.data[idx].robot,
                        boothid: result.data[idx].booth_id,
                        zoneid: result.data[idx].zone_id,
                        robotid: result.data[idx].robot_id,
                        job: result.data[idx].job_name,
                        axis: result.data[idx].axis,
                        violation: result.data[idx].violation_value,
                        type: result.data[idx].accum_type,
                        config: result.data[idx].config_value,
                    });
                    }
                }
            }).then(() => {
                this.invalidate();
                this.handle.dyGrid.records = this.records;
            }).catch((error) => {
                this.$log.error(error);
            });
        },
        onCreate() {
            const inputEditor = new dyGrid.columns.action.InlineInputEditor();
            const gridWidth = ((this.ui.size.setAllDataTable.width-20) / 9);
            const inner = this;
            this.handle.dyGrid = new dyGrid.ListGrid({
            parentElement: document.querySelector('#dyGridAccum'),
            header: [
                {
                field: 'date', 
                caption: this.ui.text.setAllDataTable.violationTime, 
                width: gridWidth, 
                headerStyle: { textAlign: 'center' },
                },
                {
                field: 'booth', 
                caption: this.ui.text.setAllDataTable.booth, 
                width: gridWidth, 
                headerStyle: { textAlign: 'center' },
                },
                {
                field: 'zone', 
                caption: this.ui.text.setAllDataTable.zone, 
                width: gridWidth, 
                headerStyle: { textAlign: 'center' },
                },
                {
                field: 'robot', 
                caption: this.ui.text.setAllDataTable.robot, 
                width: gridWidth, 
                headerStyle: {textAlign: 'center'},
                },
                {
                field: 'job', 
                caption: this.ui.text.setAllDataTable.job, 
                width: gridWidth, 
                headerStyle: {textAlign: 'center'},
                },
                {
                field: 'axis', 
                caption: this.ui.text.setAllDataTable.axis, 
                width: gridWidth, 
                headerStyle: {textAlign: 'center'},
                },
                {
                field: 'type', 
                caption: this.ui.text.setAllDataTable.violationType, 
                width: gridWidth, 
                headerStyle: {textAlign: 'center'},
                },
                {
                field: 'violation', 
                caption: this.ui.text.setAllDataTable.violationValue, 
                width: gridWidth, 
                headerStyle: {textAlign: 'center'},
                },
                {
                field: 'config', 
                caption: this.ui.text.setAllDataTable.cumulativeWarningValue, 
                width: gridWidth, 
                headerStyle: {textAlign: 'center'},
                action: new dyGrid.columns.action.ButtonAction({
                    action(rec) {
                        inner.movePage(rec);
                    },
                }),
                },
            ],
            frozenColCount: 1,
            });
            this.handle.dyGrid.theme = this.userTheme;
            this.handle.dyGrid.canvas.id = `dyCanvas`;
            const grid = document.querySelector('#dyGridAccum');
            const fitToGrid = (grid) => {
                grid.style.height = `${inner.ui.size.setAllDataTable.height}px`;
            }
            const gridScrollable = document.querySelector('.grid-scrollable');
            const fitToGridScrollable = (gridScrollable) => {
                gridScrollable.style.overflowX = "hidden";
            }
            const canvas = document.querySelector('#dyCanvas');
            const fitToCanvas = (canvas) => {
                canvas.style.width = `${inner.ui.size.setAllDataTable.width-45}px`;
                canvas.style.height = `${inner.ui.size.setAllDataTable.height}px`;
                canvas.width = `${inner.ui.size.setAllDataTable.width-45}`;
                canvas.height = `${inner.ui.size.setAllDataTable.height}`;
            }
            fitToGrid(grid);
            fitToCanvas(canvas);
            fitToGridScrollable(gridScrollable);
            },
        invalidate() {
            let inner = this;
            this.handle.dyGrid.canvas.id = `dyCanvas`;
            const grid = document.querySelector('#dyGridAccum');
            const fitToGrid = (grid) => {
                grid.style.height = `${inner.ui.size.setAllDataTable.height}px`;
            }
            const gridScrollable = document.querySelector('.grid-scrollable');
            const fitToGridScrollable = (gridScrollable) => {
                gridScrollable.style.overflowX = "hidden";
            }
            const canvas = document.querySelector('#dyCanvas');
            const fitToCanvas = (canvas) => {
                canvas.style.width = `${inner.ui.size.setAllDataTable.width-45}px`;
                canvas.style.height = `${inner.ui.size.setAllDataTable.height}px`;
                canvas.width = `${inner.ui.size.setAllDataTable.width-45}`;
                canvas.height = `${inner.ui.size.setAllDataTable.height}`;
            }
            fitToGrid(grid);
            fitToCanvas(canvas);
            fitToGridScrollable(gridScrollable);
            this.handle.dyGrid.invalidate();
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
                            this.datas.boothSector.sector.push(result.data[idx].boothname);
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
                    this.$http.post(`${this.baseUrl}/monitoring/zone/list`, params).then((zoneListResult) => {
                        if (zoneListResult.data == '') {
                            this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneList`));
                        }
                        else {
                            for (let cnt = 0; cnt < zoneListResult.data.length; ++cnt) {
                                this.datas.items.push(zoneListResult.data[cnt].boothname + '/' + zoneListResult.data[cnt].zonename);
                            }
                        }
                    }).catch((error) => {
                        this.$log.error(error);
                    })
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
        setBoothName() {
            for (let idx = 0; idx < this.datas.boothSector.sector.length; ++idx) {
                this.ui.boothSector.sector[idx] = this.datas.boothSector.sector[idx];
            }
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
        moveZonePage(boothid, zoneid, conveyorid, startcount, endcount) {
            this.ui.signal.accum = true;
            this.getData(boothid, zoneid);
        },
        createHandle() {
            this.handle.alarm = setInterval(this.update, 3000);
        },
        destroyHandle() {
            clearInterval(this.handle.alarm);
        },
        update() {
            this.updateRobotStatus();
        },
        updateRobotStatus() {
            this.$http.get(`${this.baseUrl}/torquemonitoring/factory/data`).then((result) => {
                if (result.data.length === 0) {

                } else {
                    this.ui.boothStatusTypes[0].text = this.$t(`monitoring.allMonitoring.robotStatus.action`) + ': ' + String(Number(result.data[0].all_robot) - Number(result.data[0].predict_alarm_robot));
                    this.ui.boothStatusTypes[1].text = this.$t(`monitoring.allMonitoring.robotStatus.alarm`) + ': ' + result.data[0].predict_alarm_robot;
                }
            }).catch((error) => {
                this.$log.error(error);
            });
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
        onCloseBtn() {
            this.records = [];
            this.handle.dyGrid.records = [];
            this.ui.signal.accum = false;
        },
        movePage(obj) {
            this.$router.push({
                path: '/sps/diagnostics/torqueloadfactor', 
                query : { 
                    factoryid: this.getFactoryId,
                    date: obj.date,
                    boothid: obj.boothid,
                    zoneid: obj.zoneid,
                    robotid: obj.robotid,
                    job: obj.job,
                    axis: obj.axis,
            }});
        }
    }
}
</script>

<style scoped lang="scss">
    @import "./torqueallmonitoring";
</style>
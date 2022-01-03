<template>
    <v-container fluid>
        <v-layout>
            <v-flex lg2>
                    <v-card 
                    v-bind="initializeZone" 
                    v-bind:style="{ height: card.zoneHeight, width: card.width, backgroundColor: card.color }"
                    slot="activator">
                        <v-layout>
                            <p class="pt-3 pl-3" v-bind:style="{ fontSize: card.text.fontSize }">BOOTH {{ui.booth}}</p>
                        </v-layout>
                    </v-card>
            </v-flex>
            <v-flex lg2 class="pl-2">
                <hsc-menu-style-white class="menuZDirection">
                    <hsc-menu-bar v-bind:style="{ height: ui.size.height, width: ui.size.zoneWidth, backgroundColor: card.color }">
                        <hsc-menu-bar-item class="pt-3" :label="ui.zone" v-bind:style="{ fontSize: ui.title.text.size, width: ui.size.zoneWidth, color:ui.title.text.color }">
                            <hsc-menu-item 
                            v-bind:style="{ fontSize: ui.title.text.size, width: ui.size.zoneWidth }"
                            :label="item.title" v-for="(item, index) in items" :key="index" @click="moveZone(item.title)">
                            </hsc-menu-item>
                        </hsc-menu-bar-item>
                    </hsc-menu-bar>
                </hsc-menu-style-white>
            </v-flex>
            <v-flex lg8 class="pt-4">
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
        <v-layout class="pt-1">
            <v-flex lg12>
                <div v-bind:style="{ border: background.border, backgroundColor: background.color, width: background.width, height: background.height, borderRadius: background.radius }">
                    <div class="zone layoutZDirection">
                        <v-flex lg2>
                            <div v-show="visible.robotL1Table">
                                <div class="L1">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.L[0])">
                                        <img class="robotSize" :src="datas.L1.IMAGE"/>
                                        <figcaption>
                                            <a>{{datas.robot.L[0]}} Robot</a>
                                        </figcaption>
                                        <a href="#"></a>
                                    </figure>
                                    <div class="robotInfoL1Status">
                                        <v-layout>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L1.POSITION.home" text-color="white">HOME</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L1.POSITION.run" text-color="white">RUN</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L1.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L1.POSITION.auto" text-color="white" >AUTO</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L1.POSITION.teach" text-color="white">TEACH</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L1.POSITION.rins" text-color="white">RINS</v-chip>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </div>
                                <div v-if="visible.atomizer.L1 == true">
                                <img class="atomInfoL1" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                    <font class="atomInfoL1HV"><img width="7px" :src="images.hv"/> HV : {{datas.L1.CMD.hv}} / {{datas.L1.FEEDBACK.hv}}</font>
                                    <font class="atomInfoL1SAS"><img width="20px" :src="datas.L1.SAS"/> S/A[S] : {{datas.L1.CMD.sas}} / {{datas.L1.FEEDBACK.sas}}</font>
                                    <font class="atomInfoL1HVC">HVC : {{datas.L1.FEEDBACK.hv_c}}</font>
                                    <font class="atomInfoL1SAV"><img width="20px" :src="datas.L1.SAV"/> S/A[V] : {{datas.L1.CMD.sav}} / {{datas.L1.FEEDBACK.sav}}</font>
                                    <font class="atomInfoL1FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L1.CMD.flow}} / {{datas.L1.FEEDBACK.flow}}</font>
                                    <font class="atomInfoL1TURBINESPEED">TURBINE SPEED : {{datas.L1.CMD.turbineSpeed}} / {{datas.L1.FEEDBACK.turbineSpeed}}</font>
                                </div>
                                <div v-else-if="zoneType == defines.zone.sealer">
                                    <font class="atomInfoL1HV">SWIRL : {{datas.L1.CMD.swirl}} / {{datas.L1.FEEDBACK.swirl}}</font>
                                    <font class="atomInfoL1SAS">MUS : {{datas.L1.CMD.maskingUnitSpeed}}</font>
                                    <font class="atomInfoL1SAV">PRESSURE : {{datas.L1.FEEDBACK.pressure}}</font>
                                    <font class="atomInfoL1FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L1.CMD.flow}} / {{datas.L1.FEEDBACK.flow}}</font>
                                </div>
                                </div>
                            </div>
                            <div v-show="loading.L1" class="L1">
                                <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                            <div v-show="visible.robotL2Table">
                                <div class="L2">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.L[1])">
                                            <img class="robotSize" :src="datas.L2.IMAGE"/>
                                            <figcaption>
                                                <a>{{datas.robot.L[1]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoL2Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L2.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L2.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L2.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L2.POSITION.auto" text-color="white">AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L2.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L2.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.L2 == true">
                                <img class="atomInfoL2" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoL2HV"><img width="7px" :src="images.hv"/> HV : {{datas.L2.CMD.hv}} / {{datas.L2.FEEDBACK.hv}}</font>
                                        <font class="atomInfoL2SAS"><img width="20px" :src="datas.L2.SAS"/> S/A[S] : {{datas.L2.CMD.sas}} / {{datas.L2.FEEDBACK.sas}}</font>
                                        <font class="atomInfoL2HVC">HVC : {{datas.L2.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoL2SAV"><img width="20px" :src="datas.L2.SAV"/> S/A[V] : {{datas.L2.CMD.sav}} / {{datas.L2.FEEDBACK.sav}}</font>
                                        <font class="atomInfoL2FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L2.CMD.flow}} / {{datas.L2.FEEDBACK.flow}}</font>
                                        <font class="atomInfoL2TURBINESPEED">TURBINE SPEED : {{datas.L2.CMD.turbineSpeed}} / {{datas.L2.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoL2HV">SWIRL : {{datas.L2.CMD.swirl}} / {{datas.L2.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoL2SAS">MUS : {{datas.L2.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoL2SAV">PRESSURE : {{datas.L2.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoL2FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L2.CMD.flow}} / {{datas.L2.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.L2" class="L2">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                            <div v-show="visible.robotL3Table">
                                <div class="L3">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.L[2])">
                                        <img class="robotSize" :src="datas.L3.IMAGE" />
                                        <figcaption>
                                            <a>{{datas.robot.L[2]}} Robot</a>
                                        </figcaption>
                                        <a href="#"></a>
                                    </figure>
                                    <div class="robotInfoL3Status">
                                        <v-layout>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L3.POSITION.home" text-color="white">HOME</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L3.POSITION.run" text-color="white">RUN</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L3.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L3.POSITION.auto" text-color="white" >AUTO</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L3.POSITION.teach" text-color="white">TEACH</v-chip>
                                            </v-flex>
                                            <v-flex>
                                                <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L3.POSITION.rins" text-color="white">RINS</v-chip>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </div>
                                <div v-if="visible.atomizer.L3 == true">
                                <img class="atomInfoL3" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoL3HV"><img width="7px" :src="images.hv"/> HV : {{datas.L3.CMD.hv}} / {{datas.L3.FEEDBACK.hv}}</font>
                                        <font class="atomInfoL3SAS"><img width="20px" :src="datas.L3.SAS"/> S/A[S] : {{datas.L3.CMD.sas}} / {{datas.L3.FEEDBACK.sas}}</font>
                                        <font class="atomInfoL3HVC">HVC : {{datas.L3.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoL3SAV"><img width="20px" :src="datas.L3.SAV"/> S/A[V] : {{datas.L3.CMD.sav}} / {{datas.L3.FEEDBACK.sav}}</font>
                                        <font class="atomInfoL3FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L3.CMD.flow}} / {{datas.L3.FEEDBACK.flow}}</font>
                                        <font class="atomInfoL3TURBINESPEED">TURBINE SPEED : {{datas.L3.CMD.turbineSpeed}} / {{datas.L3.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoL3HV">SWIRL : {{datas.L3.CMD.swirl}} / {{datas.L3.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoL3SAS">MUS : {{datas.L3.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoL3SAV">PRESSURE : {{datas.L3.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoL3FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L3.CMD.flow}} / {{datas.L3.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.L3" class="L3">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                            <div v-show="visible.robotL4Table">
                                <div class="L4">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.L[3])">
                                            <img class="robotSize" :src="datas.L4.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.L[3]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoL4Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L4.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L4.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L4.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L4.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L4.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L4.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.L4 == true">
                                <img class="atomInfoL4" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoL4HV"><img width="7px" :src="images.hv"/> HV : {{datas.L4.CMD.hv}} / {{datas.L4.FEEDBACK.hv}}</font>
                                        <font class="atomInfoL4SAS"><img width="20px" :src="datas.L4.SAS"/> S/A[S] : {{datas.L4.CMD.sas}} / {{datas.L4.FEEDBACK.sas}}</font>
                                        <font class="atomInfoL4HVC">HVC : {{datas.L4.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoL4SAV"><img width="20px" :src="datas.L4.SAV"/> S/A[V] : {{datas.L4.CMD.sav}} / {{datas.L4.FEEDBACK.sav}}</font>
                                        <font class="atomInfoL4FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L4.CMD.flow}} / {{datas.L4.FEEDBACK.flow}}</font>
                                        <font class="atomInfoL4TURBINESPEED">TURBINE SPEED : {{datas.L4.CMD.turbineSpeed}} / {{datas.L4.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoL4HV">SWIRL : {{datas.L4.CMD.swirl}} / {{datas.L4.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoL4SAS">MUS : {{datas.L4.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoL4SAV">PRESSURE : {{datas.L4.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoL4FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L4.CMD.flow}} / {{datas.L4.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.L4" class="L4">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                            <div v-show="visible.robotL5Table">
                                <div class="L5">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.L[4])">
                                            <img class="robotSize" :src="datas.L5.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.L[4]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoL5Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L5.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L5.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L5.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L5.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L5.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L5.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.L5 == true">
                                <img class="atomInfoL5" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoL5HV"><img width="7px" :src="images.hv"/> HV : {{datas.L5.CMD.hv}} / {{datas.L5.FEEDBACK.hv}}</font>
                                        <font class="atomInfoL5SAS"><img width="20px" :src="datas.L5.SAS"/> S/A[S] : {{datas.L5.CMD.sas}} / {{datas.L5.FEEDBACK.sas}}</font>
                                        <font class="atomInfoL5HVC">HVC : {{datas.L5.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoL5SAV"><img width="20px" :src="datas.L5.SAV"/> S/A[V] : {{datas.L5.CMD.sav}} / {{datas.L5.FEEDBACK.sav}}</font>
                                        <font class="atomInfoL5FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L5.CMD.flow}} / {{datas.L5.FEEDBACK.flow}}</font>
                                        <font class="atomInfoL5TURBINESPEED">TURBINE SPEED : {{datas.L5.CMD.turbineSpeed}} / {{datas.L5.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoL5HV">SWIRL : {{datas.L5.CMD.swirl}} / {{datas.L5.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoL5SAS">MUS : {{datas.L5.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoL5SAV">PRESSURE : {{datas.L5.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoL5FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L5.CMD.flow}} / {{datas.L5.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.L5" class="L5">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                            <div v-show="visible.robotL6Table">
                                <div class="L6">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.L[5])">
                                            <img class="robotSize" :src="datas.L6.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.L[5]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoL6Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L6.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L6.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L6.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L6.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L6.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.L6.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.L6 == true">
                                <img class="atomInfoL6" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoL6HV"><img width="7px" :src="images.hv"/> HV : {{datas.L6.CMD.hv}} / {{datas.L6.FEEDBACK.hv}}</font>
                                        <font class="atomInfoL6SAS"><img width="20px" :src="datas.L6.SAS"/> S/A[S] : {{datas.L6.CMD.sas}} / {{datas.L6.FEEDBACK.sas}}</font>
                                        <font class="atomInfoL6HVC">HVC : {{datas.L6.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoL6SAV"><img width="20px" :src="datas.L6.SAV"/> S/A[V] : {{datas.L6.CMD.sav}} / {{datas.L6.FEEDBACK.sav}}</font>
                                        <font class="atomInfoL6FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L6.CMD.flow}} / {{datas.L6.FEEDBACK.flow}}</font>
                                        <font class="atomInfoL6TURBINESPEED">TURBINE SPEED : {{datas.L6.CMD.turbineSpeed}} / {{datas.L6.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoL6HV">SWIRL : {{datas.L6.CMD.swirl}} / {{datas.L6.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoL6SAS">MUS : {{datas.L6.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoL6SAV">PRESSURE : {{datas.L6.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoL6FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.L6.CMD.flow}} / {{datas.L6.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.L6" class="L6">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                            <div v-show="visible.robotR1Table">
                                <div class="R1">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.R[0])">
                                            <img class="robotSize" :src="datas.R1.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.R[0]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoR1Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R1.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R1.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R1.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R1.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R1.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R1.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.R1 == true">
                                <img class="atomInfoR1" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoR1HV"><img width="7px" :src="images.hv"/> HV : {{datas.R1.CMD.hv}} / {{datas.R1.FEEDBACK.hv}}</font>
                                        <font class="atomInfoR1SAS"><img width="20px" :src="datas.R1.SAS"/> S/A[S] : {{datas.R1.CMD.sas}} / {{datas.R1.FEEDBACK.sas}}</font>
                                        <font class="atomInfoR1HVC">HVC : {{datas.R1.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoR1SAV"><img width="20px" :src="datas.R1.SAV"/> S/A[V] : {{datas.R1.CMD.sav}} / {{datas.R1.FEEDBACK.sav}}</font>
                                        <font class="atomInfoR1FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R1.CMD.flow}} / {{datas.R1.FEEDBACK.flow}}</font>
                                        <font class="atomInfoR1TURBINESPEED">TURBINE SPEED : {{datas.R1.CMD.turbineSpeed}} / {{datas.R1.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoR1HV">SWIRL : {{datas.R1.CMD.swirl}} / {{datas.R1.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoR1SAS">MUS : {{datas.R1.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoR1SAV">PRESSURE : {{datas.R1.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoR1FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R1.CMD.flow}} / {{datas.R1.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.R1" class="R1">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>
                        <v-flex lg2>
                            <div v-show="visible.robotR2Table">
                                <div class="R2">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.R[1])">
                                            <img class="robotSize" :src="datas.R2.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.R[1]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoR2Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R2.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R2.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R2.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R2.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R2.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R2.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.R2 == true">
                                <img class="atomInfoR2" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoR2HV"><img width="7px" :src="images.hv"/> HV : {{datas.R2.CMD.hv}} / {{datas.R2.FEEDBACK.hv}}</font>
                                        <font class="atomInfoR2SAS"><img width="20px" :src="datas.R2.SAS"/> S/A[S] : {{datas.R2.CMD.sas}} / {{datas.R2.FEEDBACK.sas}}</font>
                                        <font class="atomInfoR2HVC">HVC : {{datas.R2.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoR2SAV"><img width="20px" :src="datas.R2.SAV"/> S/A[V] : {{datas.R2.CMD.sav}} / {{datas.R2.FEEDBACK.sav}}</font>
                                        <font class="atomInfoR2FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R2.CMD.flow}} / {{datas.R2.FEEDBACK.flow}}</font>
                                        <font class="atomInfoR2TURBINESPEED">TURBINE SPEED : {{datas.R2.CMD.turbineSpeed}} / {{datas.R2.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoR2HV">SWIRL : {{datas.R2.CMD.swirl}} / {{datas.R2.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoR2SAS">MUS : {{datas.R2.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoR2SAV">PRESSURE : {{datas.R2.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoR2FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R2.CMD.flow}} / {{datas.R2.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.R2" class="R2">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>
                        <v-flex lg2>
                            <div v-show="visible.robotR3Table">
                                <div class="R3">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.R[2])">
                                            <img class="robotSize" :src="datas.R3.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.R[2]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoR3Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R3.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R3.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R3.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R3.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R3.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R3.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.R3 == true">
                                <img class="atomInfoR3" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoR3HV"><img width="7px" :src="images.hv"/> HV : {{datas.R3.CMD.hv}} / {{datas.R3.FEEDBACK.hv}}</font>
                                        <font class="atomInfoR3SAS"><img width="20px" :src="datas.R3.SAS"/> S/A[S] : {{datas.R3.CMD.sas}} / {{datas.R3.FEEDBACK.sas}}</font>
                                        <font class="atomInfoR3HVC">HVC : {{datas.R3.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoR3SAV"><img width="20px" :src="datas.R3.SAV"/> S/A[V] : {{datas.R3.CMD.sav}} / {{datas.R3.FEEDBACK.sav}}</font>
                                        <font class="atomInfoR3FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R3.CMD.flow}} / {{datas.R3.FEEDBACK.flow}}</font>
                                        <font class="atomInfoR3TURBINESPEED">TURBINE SPEED : {{datas.R3.CMD.turbineSpeed}} / {{datas.R3.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoR3HV">SWIRL : {{datas.R3.CMD.swirl}} / {{datas.R3.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoR3SAS">MUS : {{datas.R3.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoR3SAV">PRESSURE : {{datas.R3.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoR3FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R3.CMD.flow}} / {{datas.R3.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.R3" class="R3">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>
                        <v-flex lg2>
                            <div v-show="visible.robotR4Table">
                                <div class="R4">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.R[3])">
                                            <img class="robotSize" :src="datas.R4.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.R[3]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoR4Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R4.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R4.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R4.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R4.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R4.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R4.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.R4 == true">
                                <img class="atomInfoR4" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoR4HV"><img width="7px" :src="images.hv"/> HV : {{datas.R4.CMD.hv}} / {{datas.R4.FEEDBACK.hv}}</font>
                                        <font class="atomInfoR4SAS"><img width="20px" :src="datas.R4.SAS"/> S/A[S] : {{datas.R4.CMD.sas}} / {{datas.R4.FEEDBACK.sas}}</font>
                                        <font class="atomInfoR4HVC">HVC : {{datas.R4.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoR4SAV"><img width="20px" :src="datas.R4.SAV"/> S/A[V] : {{datas.R4.CMD.sav}} / {{datas.R4.FEEDBACK.sav}}</font>
                                        <font class="atomInfoR4FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R4.CMD.flow}} / {{datas.R4.FEEDBACK.flow}}</font>
                                        <font class="atomInfoR4TURBINESPEED">TURBINE SPEED : {{datas.R4.CMD.turbineSpeed}} / {{datas.R4.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoR4HV">SWIRL : {{datas.R4.CMD.swirl}} / {{datas.R4.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoR4SAS">MUS : {{datas.R4.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoR4SAV">PRESSURE : {{datas.R4.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoR4FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R4.CMD.flow}} / {{datas.R4.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.R4" class="R4">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>
                        <v-flex lg2>
                            <div v-show="visible.robotR5Table">
                                <div class="R5">
                                    <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.R[4])">
                                            <img class="robotSize" :src="datas.R5.IMAGE" />
                                            <figcaption>
                                                <a>{{datas.robot.R[4]}} Robot</a>
                                            </figcaption>
                                            <a href="#"></a>
                                        </figure>
                                        <div class="robotInfoR5Status">
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R5.POSITION.home" text-color="white">HOME</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R5.POSITION.run" text-color="white">RUN</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R5.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R5.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R5.POSITION.teach" text-color="white">TEACH</v-chip>
                                                </v-flex>
                                                <v-flex>
                                                    <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R5.POSITION.rins" text-color="white">RINS</v-chip>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                </div>
                                <div v-if="visible.atomizer.R5 == true">
                                <img class="atomInfoR5" :src="images.atomizer" />
                                <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                        <font class="atomInfoR5HV"><img width="7px" :src="images.hv"/> HV : {{datas.R5.CMD.hv}} / {{datas.R5.FEEDBACK.hv}}</font>
                                        <font class="atomInfoR5SAS"><img width="20px" :src="datas.R5.SAS"/> S/A[S] : {{datas.R5.CMD.sas}} / {{datas.R5.FEEDBACK.sas}}</font>
                                        <font class="atomInfoR5HVC">HVC : {{datas.R5.FEEDBACK.hv_c}}</font>
                                        <font class="atomInfoR5SAV"><img width="20px" :src="datas.R5.SAV"/> S/A[V] : {{datas.R5.CMD.sav}} / {{datas.R5.FEEDBACK.sav}}</font>
                                        <font class="atomInfoR5FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R5.CMD.flow}} / {{datas.R5.FEEDBACK.flow}}</font>
                                        <font class="atomInfoR5TURBINESPEED">TURBINE SPEED : {{datas.R5.CMD.turbineSpeed}} / {{datas.R5.FEEDBACK.turbineSpeed}}</font>
                                    </div>
                                    <div v-else-if="zoneType == defines.zone.sealer">
                                        <font class="atomInfoR5HV">SWIRL : {{datas.R5.CMD.swirl}} / {{datas.R5.FEEDBACK.swirl}}</font>
                                        <font class="atomInfoR5SAS">MUS : {{datas.R5.CMD.maskingUnitSpeed}}</font>
                                        <font class="atomInfoR5SAV">PRESSURE : {{datas.R5.FEEDBACK.pressure}}</font>
                                        <font class="atomInfoR5FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R5.CMD.flow}} / {{datas.R5.FEEDBACK.flow}}</font>
                                    </div>
                                </div>
                            </div>
                            <div v-show="loading.R5" class="R5">
                                    <pulse-loader :color="loading.color"></pulse-loader>
                            </div>
                        </v-flex>

                        <v-flex lg2>
                                <div v-show="visible.robotR5Table">
                                    <div class="R6">
                                        <figure class="robotImageHover" v-on:click="moveRobotPage(datas.robot.R[5])">
                                                <img class="robotSize" :src="datas.R6.IMAGE" />
                                                <figcaption>
                                                    <a>{{datas.robot.R[5]}} Robot</a>
                                                </figcaption>
                                                <a href="#"></a>
                                            </figure>
                                            <div class="robotInfoR5Status">
                                                <v-layout>
                                                    <v-flex>
                                                        <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R6.POSITION.home" text-color="white">HOME</v-chip>
                                                    </v-flex>
                                                    <v-flex>
                                                        <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R6.POSITION.run" text-color="white">RUN</v-chip>
                                                    </v-flex>
                                                    <v-flex>
                                                        <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R6.POSITION.bypass" text-color="white">BYPASS</v-chip>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout>
                                                    <v-flex>
                                                        <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R6.POSITION.auto" text-color="white" >AUTO</v-chip>
                                                    </v-flex>
                                                    <v-flex>
                                                        <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R6.POSITION.teach" text-color="white">TEACH</v-chip>
                                                    </v-flex>
                                                    <v-flex>
                                                        <v-chip v-bind:style="styleObject" class="status" label v-bind:color="datas.R6.POSITION.rins" text-color="white">RINS</v-chip>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                    </div>
                                    <div v-if="visible.atomizer.R6 == true">
                                    <img class="atomInfoR6" :src="images.atomizer" />
                                    <div v-if="zoneType == defines.zone.paintExt || zoneType == defines.zone.paintInt">
                                            <font class="atomInfoR6HV"><img width="7px" :src="images.hv"/> HV : {{datas.R6.CMD.hv}} / {{datas.R6.FEEDBACK.hv}}</font>
                                            <font class="atomInfoR6SAS"><img width="20px" :src="datas.R5.SAS"/> S/A[S] : {{datas.R6.CMD.sas}} / {{datas.R6.FEEDBACK.sas}}</font>
                                            <font class="atomInfoR6HVC">HVC : {{datas.R6.FEEDBACK.hv_c}}</font>
                                            <font class="atomInfoR6SAV"><img width="20px" :src="datas.R5.SAV"/> S/A[V] : {{datas.R6.CMD.sav}} / {{datas.R6.FEEDBACK.sav}}</font>
                                            <font class="atomInfoR6FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R6.CMD.flow}} / {{datas.R6.FEEDBACK.flow}}</font>
                                            <font class="atomInfoR6TURBINESPEED">TURBINE SPEED : {{datas.R6.CMD.turbineSpeed}} / {{datas.R6.FEEDBACK.turbineSpeed}}</font>
                                        </div>
                                        <div v-else-if="zoneType == defines.zone.sealer">
                                            <font class="atomInfoR6HV">SWIRL : {{datas.R6.CMD.swirl}} / {{datas.R6.FEEDBACK.swirl}}</font>
                                            <font class="atomInfoR6SAS">MUS : {{datas.R6.CMD.maskingUnitSpeed}}</font>
                                            <font class="atomInfoR6SAV">PRESSURE : {{datas.R6.FEEDBACK.pressure}}</font>
                                            <font class="atomInfoR6FLOW"><img width="20px" :src="images.flow"/> FLOW : {{datas.R6.CMD.flow}} / {{datas.R6.FEEDBACK.flow}}</font>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="loading.R6" class="R6">
                                        <pulse-loader :color="loading.color"></pulse-loader>
                                </div>
                            </v-flex>

                        <div v-bind:style="{ position: conveyor.position, backgroundColor: conveyor.color, top: conveyor.top, left: conveyor.left, width: conveyor.width, height: conveyor.height }">

                        </div>

                        <div v-show="getVisibleBody(1)" class="body1" v-bind:style="{ position: body.position, top: body.top, left: body.left, width: body.width, height: body.height }">
                            <img :src="images.body" v-bind:style="{ position: body.position, width: body.width, height: body.height }">
                            <table class="bodyTable">
                                <tr>
                                    <td :style=" { width : ui.body.table.td.width }">
                                        <font color="#25273e">{{datas.body.vinNumberUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.vinNumberData[0]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e"> {{datas.body.modelNumberData[0]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorData[0]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionData[0]}}</font>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div v-show="getVisibleBody(2)" class="body2" v-bind:style="{ position: body.position, top: body.top, left: body.left, width: body.width, height: body.height }">
                            <img :src="images.body" v-bind:style="{ position: body.position, width: body.width, height: body.height }">
                            <table class="bodyTable">
                                <tr>
                                    <td :style=" { width : ui.body.table.td.width }">
                                        <font color="#25273e">{{datas.body.vinNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.vinNumberData[1]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberData[1]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorData[1]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionData[1]}}</font>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div v-show="getVisibleBody(3)" class="body3" v-bind:style="{ position: body.position, top: body.top, left: body.left, width: body.width, height: body.height }">
                            <img :src="images.body" v-bind:style="{ position: body.position, width: body.width, height: body.height }">
                            <table class="bodyTable">
                                <tr>
                                    <td :style=" { width : ui.body.table.td.width }">
                                        <font color="#25273e">{{datas.body.vinNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.vinNumberData[2]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberData[2]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorData[2]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionData[2]}}</font>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div v-show="getVisibleBody(4)" class="body4" v-bind:style="{ position: body.position, top: body.top, left: body.left, width: body.width, height: body.height }">
                            <img :src="images.body" v-bind:style="{ position: body.position, width: body.width, height: body.height }">
                            <table class="bodyTable">
                                <tr>
                                    <td :style=" { width : ui.body.table.td.width }">
                                        <font color="#25273e">{{datas.body.vinNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.vinNumberData[3]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberData[3]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorData[3]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionUI}}</font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionData[3]}}</font>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div v-show="getVisibleBody(5)" class="body5" v-bind:style="{ position: body.position, top: body.top, left: body.left, width: body.width, height: body.height }">
                            <img :src="images.body" v-bind:style="{ position: body.position, width: body.width, height: body.height }">
                            <table class="bodyTable">
                                <tr>
                                    <td :style=" { width : ui.body.table.td.width }">
                                        <font color="#25273e">{{datas.body.vinNumberUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.vinNumberData[4]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.modelNumberData[4]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.colorData[4]}}</font>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionUI}} </font>
                                    </td>
                                    <td>
                                        <font color="#25273e">{{datas.body.optionData[4]}}</font>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex class="pt-1" lg6>
                <robot-Alarms v-bind:contentData="infoAlarmTableContentData">
                </robot-Alarms>
            </v-flex>
            <v-flex lg2 class="pl-2">
                    <v-card v-bind:style="{ height: card.plc.height, width: card.width, backgroundColor: card.color }">
                        <v-layout wrap row>
                            <v-flex xs4>
                                <p class="pt-2 pl-3">OP IP</p>
                            </v-flex>
                            <v-flex xs8>
                                <p class="pt-2" v-bind:style="{ fontSize: card.text.fontSize }">{{datas.zone.op.ip}}</p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex lg2 class="pl-2">
                    <v-card v-bind:style="{ height: card.plc.height, width: card.width, backgroundColor: card.color }">
                        <v-layout wrap row>
                            <v-flex xs4>
                                <p class="pt-2 pl-3">PLC TYPE</p>
                            </v-flex>
                            <v-flex xs8>
                                <p class="pt-2" v-bind:style="{ fontSize: card.text.fontSize }">{{datas.zone.plc.type}}</p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex lg2 class="pl-2">
                    <v-card v-bind:style="{ height: card.plc.height, width: card.width, backgroundColor: card.color }">
                        <v-layout wrap row>
                            <v-flex xs4>
                                <p class="pt-2 pl-3">PLC IP</p>
                            </v-flex>
                            <v-flex xs8>
                                <p class="pt-2" v-bind:style="{ fontSize: card.text.fontSize }">{{datas.zone.plc.ip}}</p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import anime from 'animejs';
import robotAlarms from '@/components/monitoring/monitoring/robotdetail/robotAlarms'
import pulseLoader from 'vue-spinner/src/MoonLoader.vue'
export default {
    components: {
        robotAlarms,
        pulseLoader
    },
    data() {
        return {
            manage: {
                handle: false
            },
            defines : {
                zone: { // 변경 되어야 함
                    paintInt: 0,
                    sealer: 1,
                    paintExt: 2
                }
            },
            zoneType: null,
            styleObject: {
                margin: '1px'
            },
            updateHandle: null,
            loading: {
                L1: false,
                R1: false,
                L2: false,
                R2: false,
                L3: false,
                R3: false,
                L4: false,
                R4: false,
                L5: false,
                R5: false,
                L6: false,
                color: ''
            },
            items: [],
            robotItems: [],
            list: { 
                zonename: [],
                boothid: [],
                zoneid: [],
                conveyorid: [],
                startcount: [],
                endcount: []
            },
            ui: {
                booth: '',
                zone: '',
                title: {
                    width: '345px',
                    booth: this.$t(`monitoring.allMonitoring.selectBoothPage`),
                    zone: this.$t(`monitoring.allMonitoring.selectZonePage`),
                    robot: this.$t(`monitoring.allMonitoring.selectRobotPage`),
                    text: {
                        color: '',
                        height: '40px',
                        size: '17px'
                    }
                },
                size: {
                    height: '59px',
                    width: '100%',
                    zoneWidth: '295px'
                },
                boothStatusTypes: [ 
                    { id: '0', text: this.$t(`monitoring.allMonitoring.robotStatus.action`), img: require("@/images/state_motion.png") },
                    { id: '1', text: this.$t(`monitoring.allMonitoring.robotStatus.ready`), img: require("@/images/state_ready.png") },
                    { id: '2', text: this.$t(`monitoring.allMonitoring.robotStatus.alarm`), img: require("@/images/state_alarm.png") },
                    { id: '3', text: this.$t(`monitoring.allMonitoring.robotStatus.offline`), img: require("@/images/state_offline.png") },
                    { id: '4', text: this.$t(`monitoring.allMonitoring.robotStatus.error`), img: require("@/images/state_error.png") },
                ],
                body: {
                    table: {
                        td: {
                            width: '45px'
                        }
                    }
                }
            },
            infoAlarmTableContentData: [],
            zoneInfo: { 
                color: '',
                boothid: 1,
                zoneid: 1,
                conveyorid: 1,
                robotname: [],
                robotid: [],
                startcount: 1,
                endcount: 3000
            },
            card: {
                zoneWidth: '100%',
                zoneHeight: '100%',
                height: '100%',
                width: '100%',
                color: '',
                images: {
                    height: '50px',
                    width: '50px'
                },
                text: {
                    site: '',
                    robot: this.$t(`monitoring.zoneMonitoring.selectRobot`),
                    fontSize: 'large',
                    infoFontSize: 'small'
                },
                plc: {
                    width: '100%',
                    height: '45px'
                }
            },
            robotStatus: {
                color: {
                    home: '',
                    auto: '',
                    teach: '',
                    run: '',
                    rins: '',
                    bypass: ''
                }
            },
            background: {
                color: '',
                width: '100%',
                height: '625px',
                radius: '5px',
                border: ''
            },
            conveyor: {
                color: '',
                width: '1800px',
                height: '160px',
                top: '305px',
                left: '55px',
                position: 'absolute'
            },
            timeInfo: {
                color: '',
                height: '200px'
            },
            images: {
                body: require("@/images/body_zone.png"),
                robot: '',
                offRobot: require("@/images/robot_offline_zone.png"),
                waitRobot: require("@/images/robot_waiting_zone.png"),
                remoteSprayOn: require("@/images/spray_on.gif"),
                remoteSprayOff: require("@/images/spray_off.gif"),
                errorRobot: require("@/images/robot_error_zone.png"),
                stopRobot: require("@/images/robot_alarm_zone.png"),
                readyRobot: require("@/images/robot_ready_zone.png"),
                atomizer: require("@/images/atomizer.png"),
                hv: require("@/images/hv.png"),
                sas: require("@/images/sa_s.png"),
                sason: require("@/images/sas_on.gif"),
                sav: require("@/images/sa_v.png"),
                savon: require("@/images/sav_on.gif"),
                flow: require("@/images/flow.png")
            },
            body: {
                position: 'absolute',
                top: '310px',
                left: '50px',
                width: '300px',
                height: '150px'
            },
            visible: {
                body1: false,
                body2: false,
                body3: false,
                body4: false,
                body5: false,
                robotL1Table: false,
                robotL2Table: false,
                robotL3Table: false,
                robotL4Table: false,
                robotL5Table: false,
                robotL6Table: false,
                robotR1Table: false,
                robotR2Table: false,
                robotR3Table: false,
                robotR4Table: false,
                robotR5Table: false,
                robotR6Table: false,
                atomizer: {
                    L1: false,
                    L2: false,
                    L3: false,
                    L4: false,
                    L5: false,
                    L6: false,
                    R1: false,
                    R2: false,
                    R3: false,
                    R4: false,
                    R5: false,
                    R6: false,
                }
            },
            bodyHandle: null,
            l1Handle: null,
            r1Handle: null,
            l1Body: null,
            plcUpdateHandle: null,
            bodyUpdateHandle: null,
            bodyList: [],
            datas: {
                zoneparent: [],
                zonechild: [],
                robotparent: [],
                robotchild: [],
                change: false,
                idx: 0,
                zone: {
                    op: {
                        ip: ''
                    },
                    plc: {
                        type: '',
                        ip: ''
                    },
                    URL: '/sps/monitoring/ZoneMonitoring'
                },
                robot: {
                    L: [],
                    R: [],
                },
                body: {
                    vinNumberUI: this.$t(`monitoring.zoneMonitoring.vinNumber`),
                    modelNumberUI: this.$t(`monitoring.zoneMonitoring.modelInfo`),
                    colorUI: this.$t(`monitoring.zoneMonitoring.color`),
                    optionUI: this.$t(`monitoring.zoneMonitoring.option`),
                    vinNumberData : [],
                    modelNumberData : [],
                    colorData : [],
                    optionData : []
                },
                L1: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    COLOR: '',
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                L2: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                L3: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                L4: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                L5: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                L6: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                R1: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                R2: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                R3: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                R4: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                R5: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
                },
                R6: {
                    POSITION: {
                        home: '',
                        run: '',
                        bypass: '',
                        auto: '',
                        teach: '',
                        rins: ''
                    },
                    CMD: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        maskingUnitSpeed: ''
                    },
                    FEEDBACK: {
                        flow: '',
                        turbineSpeed: '',
                        sas: '',
                        sav: '',
                        hv: '',
                        hv_c: '',
                        swirl: '',
                        pressure: ''
                    },
                    IMAGE: '',
                    SAS: '',
                    SAV: ''
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
        iconSite() {
            return 'location_city';
        },
        initializeZone() {
            if (this.$route.query.boothid       != undefined && 
                this.$route.query.zoneid        != undefined && 
                this.$route.query.conveyorid    != undefined && 
                this.$route.query.startcount    != undefined &&
                this.$route.query.endcount      != undefined) {
                this.zoneInfo.boothid = this.$route.query.boothid;
                this.zoneInfo.zoneid = this.$route.query.zoneid;
                this.zoneInfo.conveyorid = this.$route.query.conveyorid;
                this.zoneInfo.startcount = this.$route.query.startcount;
                this.zoneInfo.endcount = this.$route.query.endcount;
                this.datas.zoneparent = this.$route.query.zoneparent;
                this.datas.zonechild = this.$route.query.zonechild;
                this.datas.robotparent = this.$route.query.robotparent;
                this.datas.robotchild = this.$route.query.robotchild;
                $('.zone .body1').clearQueue();
                $('.zone .body1').stop();
                $('.zone .body2').clearQueue();
                $('.zone .body2').stop();
                $('.zone .body3').clearQueue();
                $('.zone .body3').stop();
                $('.zone .body4').clearQueue();
                $('.zone .body4').stop();
                $('.zone .body5').clearQueue();
                $('.zone .body5').stop();
                this.manage.handle = true;
            }
            this.getExtendZone();
            this.setRobot();
            this.setZoneList();
            this.setRobotList();
            this.requestZoneConfig();
        }
    },
    created() { 

    },
    mounted() {
        this.initializeStyle();
    },  
    destroyed () {
        this.destroyHandle();
    },
    methods: {
        initializeStyle() {
            this.loading.color = '#237ffe';
            this.ui.title.text.color = '#ffffff';
            this.zoneInfo.color = '#171A29';
            this.card.color = '#21263a';
            this.robotStatus.color.home = '#171A29';
            this.robotStatus.color.auto = '#171A29';
            this.robotStatus.color.teach = '#171A29';
            this.robotStatus.color.run = '#171A29';
            this.robotStatus.color.rins = '#171A29';
            this.robotStatus.color.bypass = '#171A29';
            this.background.color = '#171A29';
            this.background.border = '5px dotted #203556';
            this.conveyor.color = '#203556';
            this.timeInfo.color = '#21263a';
        },
        destroyHandle() {
            this.manage.handle = false;
            clearInterval(this.updateHandle);
            this.updateHandle = null;
        },
        getExtendZone() {
            this.$http.get(`${this.baseUrl}/info/extend/zone`).then((result) => {
                if (result.data != 'STANDARD') {
                    this.datas.zone.URL = '/sps/monitoring/ZoneMonitoringExt';
                }
                else {
                    this.datas.zone.URL = '/sps/monitoring/ZoneMonitoring';
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        setRobot() {
            let param = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, param).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneRobotList`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.updateVisibleRobot(
                            result.data[idx].visible, 
                            result.data[idx].robot_name, 
                            result.data[idx].robot_status, 
                            result.data[idx].robot_mode_run,
                            result.data[idx].robot_type);
                        this.zoneInfo.robotname.push(result.data[idx].robot_name);
                        this.zoneInfo.robotid.push(result.data[idx].robot_id);
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        setZoneList() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid
            }
            this.items = [];
            this.$http.post(`${this.baseUrl}/monitoring/zone/list`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneList`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.items.push({
                            title: result.data[idx].zonename
                        });
                        this.list.zonename.push(result.data[idx].zonename);
                        this.list.boothid.push(result.data[idx].booth_id);
                        this.list.zoneid.push(result.data[idx].zone_id);
                        this.list.conveyorid.push(result.data[idx].conveyor_id);
                        this.list.startcount.push(result.data[idx].start_count);
                        this.list.endcount.push(result.data[idx].end_count);
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        setRobotList() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid
            }
            this.robotItems = [];
            
            this.$http.post(`${this.baseUrl}/monitoring/zone/robot/list`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneRobotList`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.robotItems.push({
                            title: result.data[idx].robot_name
                        });
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        resetData() {
            this.zoneInfo.boothid = 0;
            this.zoneInfo.zoneid = 0;
            this.zoneInfo.conveyorid = 0;
            this.zoneInfo.startcount = 0;
            this.zoneInfo.endcount = 0;
        },
        moveZone(zone) {
            this.resetVisibleRobot();
            this.setOffVisibleBody(1);
            this.setOffVisibleBody(2);
            this.setOffVisibleBody(3);
            this.setOffVisibleBody(4);
            this.setOffVisibleBody(5);
            
            this.ui.zone = "ZONE " + zone;
            
            for (let idx = 0; idx < this.list.zonename.length; ++idx) {
                if (this.list.zonename[idx] == zone) {
                    this.destroyHandle();
                    this.$router.push({
                        path: this.datas.zone.URL, query: {
                            factoryid: this.getFactoryId,
                            boothid: this.list.boothid[idx],
                            zoneid: this.list.zoneid[idx],
                            conveyorid: this.list.conveyorid[idx],
                            startcount: this.list.startcount[idx],
                            endcount: this.list.endcount[idx]
                        }
                    });
                }
            }
        },
        moveRobot(name) {
            this.destroyHandle();
            let robot = name.split('/');
            this.moveRobotPage(robot[2]);
        },
        requestZoneConfig() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/config`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneConfig`));
                }
                else {
                    this.card.text.site = result.data[0].boothname + '/' + result.data[0].zonename;
                    this.ui.booth = result.data[0].boothname;
                    this.ui.zone = "ZONE " + result.data[0].zonename + "▽";
                    this.datas.zone.op.ip = result.data[0].opip;
                    this.datas.zone.plc.type = (result.data[0].plctype == null) ? 'No data available.' : result.data[0].plctype;
                    this.datas.zone.plc.ip = (result.data[0].plcip == null) ? 'No data available.' : result.data[0].plcip;
                    this.zoneType = result.data[0].zone_type;
                    this.update();
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        resetVisibleRobot() {
            this.visible.robotL1Table = false;
            this.visible.robotL2Table = false;
            this.visible.robotL3Table = false;
            this.visible.robotL4Table = false;
            this.visible.robotL5Table = false;
            this.visible.robotL6Table = false;
            this.visible.robotR1Table = false;
            this.visible.robotR2Table = false;
            this.visible.robotR3Table = false;
            this.visible.robotR4Table = false;
            this.visible.robotR5Table = false;
            this.visible.robotR6Table = false;
            this.visible.atomizer.L1 = false;
            this.visible.atomizer.L2 = false;
            this.visible.atomizer.L3 = false;
            this.visible.atomizer.L4 = false;
            this.visible.atomizer.L5 = false;
            this.visible.atomizer.L6 = false;
            this.visible.atomizer.R1 = false;
            this.visible.atomizer.R2 = false;
            this.visible.atomizer.R3 = false;
            this.visible.atomizer.R4 = false;
            this.visible.atomizer.R5 = false;
            this.visible.atomizer.R6 = false;
        },
        updateVisibleRobot(robotpos, robotname, robotstatus, robotmoderun, robot_type) {
            switch (robotpos) {
                case 1:
                    this.visible.robotL1Table = true;
                    this.loading.L1 = true;
                    this.datas.robot.L[0] = robotname;
                    this.datas.L1.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.L1 = true;
                    }
                    break;
                case 2:
                    this.visible.robotR1Table = true;
                    this.loading.R1 = true;
                    this.datas.robot.R[0] = robotname;
                    this.datas.R1.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.R1 = true;
                    }
                    break;
                case 3:
                    this.visible.robotL2Table = true;
                    this.loading.L2 = true;
                    this.datas.robot.L[1] = robotname;
                    this.datas.L2.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.L2 = true;
                    }
                    break;
                case 4:
                    this.visible.robotR2Table = true;
                    this.loading.R2 = true;
                    this.datas.robot.R[1] = robotname;
                    this.datas.R2.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.R2 = true;
                    }
                    break;
                case 5:
                    this.visible.robotL3Table = true;
                    this.loading.L3 = true;
                    this.datas.robot.L[2] = robotname;
                    this.datas.L3.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.L3 = true;
                    }
                    break;
                case 6:
                    this.visible.robotR3Table = true;
                    this.loading.R3 = true;
                    this.datas.robot.R[2] = robotname;
                    this.datas.R3.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.R3 = true;
                    }
                    break;
                case 7:
                    this.visible.robotL4Table = true;
                    this.loading.L4 = true;
                    this.datas.robot.L[3] = robotname;
                    this.datas.L4.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.L4 = true;
                    }
                    break;
                case 8:
                    this.visible.robotR4Table = true;
                    this.loading.R4 = true;
                    this.datas.robot.R[3] = robotname;
                    this.datas.R4.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.R4 = true;
                    }
                    break;
                case 9:
                    this.visible.robotL5Table = true;
                    this.loading.L5 = true;
                    this.datas.robot.L[4] = robotname;
                    this.datas.L5.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.L5 = true;
                    }
                    break;
                case 10:
                    this.visible.robotR5Table = true;
                    this.loading.R5 = true;
                    this.datas.robot.R[4] = robotname;
                    this.datas.R5.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.R5 = true;
                    }
                    break;
                case 11:
                    this.visible.robotL6Table = true;
                    this.loading.L6 = true;
                    this.datas.robot.L[5] = robotname;
                    this.datas.L6.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.L6 = true;
                    }
                    break;
                case 12:
                    this.visible.robotR6Table = true;
                    this.loading.R6 = true;
                    this.datas.robot.R[5] = robotname;
                    this.datas.R6.IMAGE = this.getStatus(robotstatus, robotmoderun);
                    if (robot_type != 0) {
                        this.visible.atomizer.R6 = true;
                    }
                    break;
            }
        },
        update() {
            this.updateHandle = setInterval(this.updateData, 3000);
        },
        updateData() {
            if (this.manage.handle == true) {
            if (this.zoneType == this.defines.zone.paintExt || this.zoneType == this.defines.zone.paintInt) {
                this.updatePLCData();
            }
            else if (this.zoneType == this.defines.zone.sealer) {
                 this.updatePLCDataForSealer();
            }
            this.requestBodyData();
            this.updateAlarmData();
            }
        },
        requestBodyData() {
            let params = {
                factoryid : this.getFactoryId,
                boothid : this.zoneInfo.boothid,
                conveyorid: this.zoneInfo.conveyorid,
                zoneid : this.zoneInfo.zoneid,
                startcount: this.zoneInfo.startcount,
                endcount: this.zoneInfo.endcount
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/body/update`, params).then((result) => {
                if (result.data == '') {
                    
                }
                else {
                    if (this.zoneType == this.defines.zone.paintExt || this.zoneType == this.defines.zone.paintInt) {
                     this.bodyFollow(result.data);
                    }
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        bodyFollow(data) {
            let conveyorWidth = this.conveyor.width.split('px');
            let offset = 100;
            for (let idx = 0; idx < data.length; ++idx) {
                this.setOnVisibleBody(idx+1);
                let x = Number(conveyorWidth[0])*(data[idx].count-this.zoneInfo.startcount)/(data[idx].endcount-this.zoneInfo.startcount);
                if (x >= Number(conveyorWidth[0])-offset) {
                    this.setOffVisibleBody(idx+1);
                }
                else {
                    this.moveBody(idx + 1, x, x);
                    this.bodyData(idx + 1, data[idx]);      
                }
            }
        },
        bodyData(index, data) {
            let vin = {
                number: String(data.vin).substring(String(data.vin).length, (String(data.vin).length-6))
            }
            switch(index) {
                case 1:
                    this.datas.body.vinNumberData[0] = vin.number;
                    this.datas.body.modelNumberData[0] = data.body;
                    this.datas.body.colorData[0] = data.color;
                    this.datas.body.optionData[0] = data.option;
                break;
                case 2:
                    this.datas.body.vinNumberData[1] = vin.number;
                    this.datas.body.modelNumberData[1] = data.body;
                    this.datas.body.colorData[1] = data.color;
                    this.datas.body.optionData[1] = data.option;
                break;
                case 3:
                    this.datas.body.vinNumberData[2] = vin.number;
                    this.datas.body.modelNumberData[2] = data.body;
                    this.datas.body.colorData[2] = data.color;
                    this.datas.body.optionData[2] = data.option;
                break;
                case 4:
                    this.datas.body.vinNumberData[3] = vin.number;
                    this.datas.body.modelNumberData[3] = data.body;
                    this.datas.body.colorData[3] = data.color;
                    this.datas.body.optionData[3] = data.option;
                break;
                case 5:
                    this.datas.body.vinNumberData[4] = vin.number;
                    this.datas.body.modelNumberData[4] = data.body;
                    this.datas.body.colorData[4] = data.color;
                    this.datas.body.optionData[4] = data.option;
                break;
            }
        },
        updateLoadingProgress(flag) {
            this.loading.L1 = flag;
            this.loading.L2 = flag;
            this.loading.L3 = flag;
            this.loading.L4 = flag;
            this.loading.L5 = flag;
            this.loading.L6 = flag;
            this.loading.R1 = flag;
            this.loading.R2 = flag;
            this.loading.R3 = flag;
            this.loading.R4 = flag;
            this.loading.R5 = flag;
            this.loading.R6 = flag;
        },
        updatePLCData() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/data`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneData`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.insertPLCDatas(result.data[idx]);
                    }
                    this.updateLoadingProgress(false);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        updatePLCDataForSealer() {
            let params = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid
            };
            this.$http.post(`${this.baseUrl}/monitoring/zone/data/sealer`, params).then((result) => {
                if (result.data == '') {
                    this.$popmsg(this.$t(`monitoring.allMonitoring.popMsg.zoneData`));
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        this.insertPLCDatasForSealer(result.data[idx]);
                    }
                    this.updateLoadingProgress(false);
                }
            }).catch((error) => {
                this.$log.error(error);
            })
        },
        updateAlarmData() {
            let param = {
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid
            };
            let timestamp = null;
            this.infoAlarmTableContentData = [];
            this.$http.post(`${this.baseUrl}/monitoring/alarm`, param).then((result) => {
                if (result.data == '') {
                    this.infoAlarmTableContentData.push('');
                }
                else {
                    for (let idx = 0; idx < result.data.length; ++idx) {
                        timestamp = result.data[idx].time_stamp.replace("T", " ");
                        timestamp = timestamp.replace("Z", " ");
                        this.infoAlarmTableContentData.push({
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
        moveRobotPage(type) {
            let robotid;
            for (let idx = 0; idx < this.zoneInfo.robotname.length; ++idx) {
                if (this.zoneInfo.robotname[idx] == type) {
                    robotid = this.zoneInfo.robotid[idx];
                }
            }
            this.destroyHandle();
            this.$router.push({path: '/sps/monitoring/robotdetail', query : { 
                factoryid: this.getFactoryId,
                boothid: this.zoneInfo.boothid,
                zoneid: this.zoneInfo.zoneid,
                robotid: robotid,
                robotname: type
            }});
        },
        getStatus(status, run) {
            switch(status) {
                case 0:
                    return this.images.offRobot;
                break;
                case 1:
                    return this.images.waitRobot;
                break;
                case 2:
                    if (run == 1) {
                        return this.images.remoteSprayOff;
                    }
                    else {
                        return this.images.readyRobot;
                    }
                break;
                case 3:
                    return this.images.errorRobot;
                break;
                case 4:
                    return this.images.stopRobot;
                break;
                case 5:
                    return this.images.errorRobot;
                break;
                case 6:
                    return this.images.errorRobot;
                break;
            }
        },  
        getRobotStatus(data, run) {
            if (data.atomizer_alarm == 0) {
            switch(data.robot_status) {
                case 0:
                    return this.images.offRobot;
                break;
                case 1:
                    return this.images.waitRobot;
                break;
                case 2:
                    if (run == 1) {
                        if (data.spray_onoff == 0) {
                            return this.images.remoteSprayOff;
                        }
                        else if (data.spray_onoff == null) {
                            return this.images.remoteSprayOff;
                        }
                        else if (data.spray_onoff == 1) {
                            return this.images.remoteSprayOn;
                        }
                    }
                    else {
                        return this.images.readyRobot;
                    }
                break;
                case 3:
                    return this.images.errorRobot;
                break;
                case 4:
                    return this.images.stopRobot;
                break;
                case 5:
                    return this.images.errorRobot;
                break;
                case 6:
                    return this.images.errorRobot;
                break;
            }
            }
            else if (data.atomizer_alarm == 1) {
                return this.images.stopRobot;
            }
        },  
        getRobotStatusForSealer(data, run) {
            if (data.atomizer_alarm == 0) {
                switch (data.robot_status) {
                    case 0:
                        return this.images.offRobot;
                        break;
                    case 1:
                        return this.images.waitRobot;
                        break;
                    case 2:
                        if (run == 1) {
                            if (data.sealer_on == 0) {
                                return this.images.remoteSprayOff;
                            }
                            else if (data.sealer_on == null) {
                                return this.images.remoteSprayOff;
                            }
                            else {
                                return this.images.remoteSprayOn;
                            }
                        }
                        else {
                            return this.images.readyRobot;
                        }
                        break;
                    case 3:
                        return this.images.errorRobot;
                        break;
                    case 4:
                        return this.images.stopRobot;
                        break;
                    case 5:
                        return this.images.errorRobot;
                        break;
                    case 6:
                        return this.images.errorRobot;
                        break;
                }
            }
            else if (data.atomizer_alarm == 1) {
                return this.images.stopRobot;
            }
        },  
        getAtomizerRun(lhdl, rhdl) {
            if (rhdl.spray_onoff == 0) {
                lhdl.SAS = this.images.sas;
                lhdl.SAV = this.images.sav;
                return;
            }
            else if (rhdl.spray_onoff == 1) {
                lhdl.SAS = this.images.sason;
                lhdl.SAV = this.images.savon;
                return;
            }
            else {
                this.$log.error('[WARN] Unknown Atomizer Data');
                return;
            }
        },
        insertPLCDatasForSealer(data) {
            switch (data.robot_name) {
                case 1:
                    this.datas.L1.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L1.CMD.flow = data.flow_cmd;
                    this.datas.L1.CMD.swirl = data.swirl_cmd;
                    this.datas.L1.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.L1.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L1.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.L1.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.L1.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L1, data);
                    break;
                case 2:
                    this.datas.R1.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R1.CMD.flow = data.flow_cmd;
                    this.datas.R1.CMD.swirl = data.swirl_cmd;
                    this.datas.R1.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.R1.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R1.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.R1.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.R1.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R1, data);
                    break;
                case 3:
                    this.datas.L2.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L2.CMD.flow = data.flow_cmd;
                    this.datas.L2.CMD.swirl = data.swirl_cmd;
                    this.datas.L2.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.L2.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L2.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.L2.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.L2.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L2, data);
                    break;
                case 4:
                    this.datas.R2.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R2.CMD.flow = data.flow_cmd;
                    this.datas.R2.CMD.swirl = data.swirl_cmd;
                    this.datas.R2.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.R2.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R2.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.R2.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.R2.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R2, data);
                    break;
                case 5:
                    this.datas.L3.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L3.CMD.flow = data.flow_cmd;
                    this.datas.L3.CMD.swirl = data.swirl_cmd;
                    this.datas.L3.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.L3.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L3.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.L3.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.L3.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L3, data);
                    break;
                case 6:
                    this.datas.R3.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R3.CMD.flow = data.flow_cmd;
                    this.datas.R3.CMD.swirl = data.swirl_cmd;
                    this.datas.R3.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.R3.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R3.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.R3.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.R3.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R3, data);
                    break;
                case 7:
                    this.datas.L4.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L4.CMD.flow = data.flow_cmd;
                    this.datas.L4.CMD.swirl = data.swirl_cmd;
                    this.datas.L4.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.L4.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L4.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.L4.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.L4.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L4, data);
                    break;
                case 8:
                    this.datas.R4.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R4.CMD.flow = data.flow_cmd;
                    this.datas.R4.CMD.swirl = data.swirl_cmd;
                    this.datas.R4.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.R4.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R4.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.R4.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.R4.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R4, data);
                    break;
                case 9:
                    this.datas.L5.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L5.CMD.flow = data.flow_cmd;
                    this.datas.L5.CMD.swirl = data.swirl_cmd;
                    this.datas.L5.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.L5.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L5.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.L5.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.L5.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L5, data);
                    break;
                case 10:
                    this.datas.R5.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R5.CMD.flow = data.flow_cmd;
                    this.datas.R5.CMD.swirl = data.swirl_cmd;
                    this.datas.R5.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.R5.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R5.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.R5.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.R5.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R5, data);
                    break;
                case 11:
                    this.datas.L6.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L6.CMD.flow = data.flow_cmd;
                    this.datas.L6.CMD.swirl = data.swirl_cmd;
                    this.datas.L6.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.L6.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L6.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.L6.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.L6.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L6, data);
                    break;
                case 12:
                    this.datas.R6.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R6.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R6.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R6.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R6.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R6.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R6.CMD.flow = data.flow_cmd;
                    this.datas.R6.CMD.swirl = data.swirl_cmd;
                    this.datas.R6.CMD.maskingUnitSpeed = data.masking_unit_speed_cmd;
                    this.datas.R6.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R6.FEEDBACK.swirl = data.swirl_feedback;
                    this.datas.R6.FEEDBACK.pressure = data.pressure_feedback;
                    this.datas.R6.IMAGE = this.getRobotStatusForSealer(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R6, data);
                    break;
            }
        },
        insertPLCDatas(data) {
            switch (data.robot_name) {
                case 1:
                    this.datas.L1.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L1.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L1.CMD.flow = data.flow_cmd;
                    this.datas.L1.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.L1.CMD.sas = data.sa_s_cmd;
                    this.datas.L1.CMD.sav = data.sa_v_cmd;
                    this.datas.L1.CMD.hv = data.hv_cmd;
                    this.datas.L1.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L1.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.L1.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.L1.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.L1.FEEDBACK.hv = data.hv_feedback;
                    this.datas.L1.FEEDBACK.hv_c = data.hvc_feedback
                    this.datas.L1.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L1, data);
                    break;
                case 2:
                    this.datas.R1.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R1.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R1.CMD.flow = data.flow_cmd;
                    this.datas.R1.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.R1.CMD.sas = data.sa_s_cmd;
                    this.datas.R1.CMD.sav = data.sa_v_cmd;
                    this.datas.R1.CMD.hv = data.hv_cmd;
                    this.datas.R1.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R1.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.R1.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.R1.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.R1.FEEDBACK.hv = data.hv_feedback;
                    this.datas.R1.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.R1.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R1, data);
                    break;
                case 3:
                    this.datas.L2.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L2.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L2.CMD.flow = data.flow_cmd;
                    this.datas.L2.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.L2.CMD.sas = data.sa_s_cmd;
                    this.datas.L2.CMD.sav = data.sa_v_cmd;
                    this.datas.L2.CMD.hv = data.hv_cmd;
                    this.datas.L2.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L2.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.L2.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.L2.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.L2.FEEDBACK.hv = data.hv_feedback;
                    this.datas.L2.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.L2.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L2, data);
                    break;
                case 4:
                    this.datas.R2.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R2.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R2.CMD.flow = data.flow_cmd;
                    this.datas.R2.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.R2.CMD.sas = data.sa_s_cmd;
                    this.datas.R2.CMD.sav = data.sa_v_cmd;
                    this.datas.R2.CMD.hv = data.hv_cmd;
                    this.datas.R2.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R2.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.R2.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.R2.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.R2.FEEDBACK.hv = data.hv_feedback;
                    this.datas.R2.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.R2.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R2, data);
                    break;
                case 5:
                    this.datas.L3.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L3.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L3.CMD.flow = data.flow_cmd;
                    this.datas.L3.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.L3.CMD.sas = data.sa_s_cmd;
                    this.datas.L3.CMD.sav = data.sa_v_cmd;
                    this.datas.L3.CMD.hv = data.hv_cmd;
                    this.datas.L3.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L3.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.L3.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.L3.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.L3.FEEDBACK.hv = data.hv_feedback;
                    this.datas.L3.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.L3.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L3, data);
                    break;
                case 6:
                    this.datas.R3.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R3.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R3.CMD.flow = data.flow_cmd;
                    this.datas.R3.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.R3.CMD.sas = data.sa_s_cmd;
                    this.datas.R3.CMD.sav = data.sa_v_cmd;
                    this.datas.R3.CMD.hv = data.hv_cmd;
                    this.datas.R3.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R3.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.R3.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.R3.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.R3.FEEDBACK.hv = data.hv_feedback;
                    this.datas.R3.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.R3.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R3, data);
                    break;
                case 7:
                    this.datas.L4.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L4.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L4.CMD.flow = data.flow_cmd;
                    this.datas.L4.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.L4.CMD.sas = data.sa_s_cmd;
                    this.datas.L4.CMD.sav = data.sa_v_cmd;
                    this.datas.L4.CMD.hv = data.hv_cmd;
                    this.datas.L4.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L4.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.L4.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.L4.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.L4.FEEDBACK.hv = data.hv_feedback;
                    this.datas.L4.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.L4.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L4, data);
                    break;
                case 8:
                    this.datas.R4.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R4.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R4.CMD.flow = data.flow_cmd;
                    this.datas.R4.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.R4.CMD.sas = data.sa_s_cmd;
                    this.datas.R4.CMD.sav = data.sa_v_cmd;
                    this.datas.R4.CMD.hv = data.hv_cmd;
                    this.datas.R4.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R4.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.R4.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.R4.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.R4.FEEDBACK.hv = data.hv_feedback;
                    this.datas.R4.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.R4.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R4, data);
                    break;
                case 9:
                    this.datas.L5.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L5.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L5.CMD.flow = data.flow_cmd;
                    this.datas.L5.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.L5.CMD.sas = data.sa_s_cmd;
                    this.datas.L5.CMD.sav = data.sa_v_cmd;
                    this.datas.L5.CMD.hv = data.hv_cmd;
                    this.datas.L5.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L5.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.L5.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.L5.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.L5.FEEDBACK.hv = data.hv_feedback;
                    this.datas.L5.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.L5.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L5, data);
                    break;
                case 10:
                    this.datas.R5.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.R5.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.R5.CMD.flow = data.flow_cmd;
                    this.datas.R5.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.R5.CMD.sas = data.sa_s_cmd;
                    this.datas.R5.CMD.sav = data.sa_v_cmd;
                    this.datas.R5.CMD.hv = data.hv_cmd;
                    this.datas.R5.FEEDBACK.flow = data.flow_feedback;
                    this.datas.R5.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.R5.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.R5.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.R5.FEEDBACK.hv = data.hv_feedback;
                    this.datas.R5.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.R5.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.R5, data);
                    break;
                case 11:
                    this.datas.L6.POSITION.home = (data.robot_mode_home == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.run = (data.robot_mode_run == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.bypass = (data.robot_mode_bypass == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.auto = (data.robot_mode_auto == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.teach = (data.robot_mode_teach == 1) ? '#237ffe' : '';
                    this.datas.L6.POSITION.rins = (data.robot_mode_rins == 1) ? '#237ffe' : '';
                    this.datas.L6.CMD.flow = data.flow_cmd;
                    this.datas.L6.CMD.turbineSpeed = data.turbine_speed_cmd;
                    this.datas.L6.CMD.sas = data.sa_s_cmd;
                    this.datas.L6.CMD.sav = data.sa_v_cmd;
                    this.datas.L6.CMD.hv = data.hv_cmd;
                    this.datas.L6.FEEDBACK.flow = data.flow_feedback;
                    this.datas.L6.FEEDBACK.turbineSpeed = data.turbine_speed_feedback;
                    this.datas.L6.FEEDBACK.sas = data.sa_s_feedback;
                    this.datas.L6.FEEDBACK.sav = data.sa_v_feedback;
                    this.datas.L6.FEEDBACK.hv = data.hv_feedback;
                    this.datas.L6.FEEDBACK.hv_c = data.hvc_feedback;
                    this.datas.L6.IMAGE = this.getRobotStatus(data, data.robot_mode_run);
                    this.getAtomizerRun(this.datas.L6, data);
                    break;
            }
        },
        setOnVisibleBody(num) {
            switch (num) {
                case 1: 
                    this.visible.body1 = true; 
                    break;
                case 2: 
                    this.visible.body2 = true; 
                    break;
                case 3: 
                    this.visible.body3 = true; 
                    break;
                case 4:
                    this.visible.body4 = true;
                    break;
                case 5:
                    this.visible.body5 = true;
                    break;
            }
        },
        setOffVisibleBody(num) {
            switch (num) {
                case 1: 
                    this.visible.body1 = false; 
                    break;
                case 2: 
                    this.visible.body2 = false; 
                    break;
                case 3: 
                    this.visible.body3 = false; 
                    break;
                case 4:
                    this.visible.body4 = false;
                    break;
                case 5:
                    this.visible.body5 = false;
                    break;
            }
        },
        getVisibleBody(num) {
            switch (num) {
                case 1:
                    return this.visible.body1;
                    break;
                case 2:
                    return this.visible.body2;
                    break;
                case 3:
                    return this.visible.body3;
                    break;
                case 4:
                    return this.visible.body4;
                    break;
                case 5:
                    return this.visible.body5;
                    break;
            }
        },
        moveBody(body, x1, x2) {
            switch (body) {
                case 1:
                    anime({
                        targets: '.zone .body1',
                        translateX: [x1, x2],
                        easing: 'easeInOutQuad'
                    });
                    break;
                case 2:
                    anime({
                        targets: '.zone .body2',
                        translateX: [x1, x2],
                        easing: 'easeInOutQuad'
                    });
                    break;
                case 3:
                    anime({
                        targets: '.zone .body3',
                        translateX: [x1, x2],
                        easing: 'easeInOutQuad'
                    });
                    break;
                case 4:
                    anime({
                        targets: '.zone .body4',
                        translateX: [x1, x2],
                        easing: 'easeInOutQuad'
                    });
                    break;
                case 5:
                    anime({
                        targets: '.zone .body5',
                        translateX: [x1, x2],
                        easing: 'easeInOutQuad'
                    });
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import './zonemonitoringextend';
</style>
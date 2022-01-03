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
                <v-flex>
                    <img v-show="datas.visible.robotL6" :src="datas.images.L6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL6" :src="datas.images.L6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL6" :src="datas.images.L6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL6" :src="datas.images.L6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                <v-flex class="flexWidth">
                    <img v-show="datas.visible.robotL6" :src="datas.images.L6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                </v-flex>
            </v-layout>
            <v-layout>
                <div v-bind:style="{ backgroundColor: ui.conveyor.color, width: ui.conveyor.width, height: ui.conveyor.height }">
                    <div v-if="number == 0">
                        <div v-show="datas.visible.body1" class="body1 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body2" class="body2 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body3" class="body3 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body4" class="body4 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body5" class="body5 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 1">
                        <div v-show="datas.visible.body6" class="body6 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body7" class="body7 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body8" class="body8 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body9" class="body9 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body10" class="body10 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 2">
                        <div v-show="datas.visible.body11" class="body11 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body12" class="body12 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body13" class="body13 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body14" class="body14 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body15" class="body15 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 3">
                        <div v-show="datas.visible.body16" class="body16 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body17" class="body17 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body18" class="body18 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body19" class="body19 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body20" class="body20 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 4">
                        <div v-show="datas.visible.body21" class="body21 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body22" class="body22 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body23" class="body23 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body24" class="body24 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body25" class="body25 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 5">
                        <div v-show="datas.visible.body26" class="body26 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body27" class="body27 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body28" class="body28 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body29" class="body29 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body30" class="body30 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 6">
                        <div v-show="datas.visible.body31" class="body31 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body32" class="body32 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body33" class="body33 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body34" class="body34 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body35" class="body35 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 7">
                        <div v-show="datas.visible.body36" class="body36 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body37" class="body37 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body38" class="body38 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body39" class="body39 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body40" class="body40 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 8">
                        <div v-show="datas.visible.body41" class="body41 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body42" class="body42 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body43" class="body43 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body44" class="body44 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body45" class="body45 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 9">
                        <div v-show="datas.visible.body46" class="body46 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body47" class="body47 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body48" class="body48 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body49" class="body49 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body50" class="body50 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 10">
                        <div v-show="datas.visible.body51" class="body51 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body52" class="body52 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body53" class="body53 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body54" class="body54 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body55" class="body55 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 11">
                        <div v-show="datas.visible.body56" class="body56 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body57" class="body57 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body58" class="body58 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body59" class="body59 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body60" class="body60 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 12">
                        <div v-show="datas.visible.body61" class="body61 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body62" class="body62 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body63" class="body63 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body64" class="body64 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body65" class="body65 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 13">
                        <div v-show="datas.visible.body66" class="body66 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body67" class="body67 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body68" class="body68 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body69" class="body69 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body70" class="body70 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 14">
                        <div v-show="datas.visible.body71" class="body71 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body72" class="body72 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body73" class="body73 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body74" class="body74 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body75" class="body75 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 15">
                        <div v-show="datas.visible.body76" class="body76 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body77" class="body77 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body78" class="body78 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body79" class="body79 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body80" class="body80 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 16">
                        <div v-show="datas.visible.body81" class="body81 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body82" class="body82 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body83" class="body83 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body84" class="body84 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body85" class="body85 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 17">
                        <div v-show="datas.visible.body86" class="body86 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body87" class="body87 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body88" class="body88 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body89" class="body89 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body90" class="body90 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 18">
                        <div v-show="datas.visible.body91" class="body91 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body92" class="body92 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body93" class="body93 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body94" class="body94 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body95" class="body95 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 19">
                        <div v-show="datas.visible.body96" class="body96 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body97" class="body97 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body98" class="body98 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body99" class="body99 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body100" class="body100 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 20">
                        <div v-show="datas.visible.body101" class="body101 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body102" class="body102 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body103" class="body103 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body104" class="body104 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body105" class="body105 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 21">
                        <div v-show="datas.visible.body106" class="body106 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body107" class="body107 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body108" class="body108 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body109" class="body109 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body110" class="body110 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 22">
                        <div v-show="datas.visible.body111" class="body111 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body112" class="body112 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body113" class="body113 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body114" class="body114 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body115" class="body115 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 23">
                        <div v-show="datas.visible.body116" class="body116 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body117" class="body117 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body118" class="body118 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body119" class="body119 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body120" class="body120 positionBody15">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

                    <div v-if="number == 24">
                        <div v-show="datas.visible.body121" class="body121 positionBody1">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body122" class="body122 positionBody2">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body123" class="body123 positionBody3">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body124" class="body124 positionBody4">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                        <div v-show="datas.visible.body125" class="body125 positionBody5">
                            <img :src="ui.images.body" :style="ui.images.size" />
                        </div>
                    </div>

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
                    <v-flex>
                            <img v-show="datas.visible.robotR6" :src="datas.images.R6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                    <v-flex class="flexWidth">
                            <img v-show="datas.visible.robotR6" :src="datas.images.R6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                    <v-flex class="flexWidth">
                            <img v-show="datas.visible.robotR6" :src="datas.images.R6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                    <v-flex class="flexWidth">
                            <img v-show="datas.visible.robotR6" :src="datas.images.R6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
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
                    <v-flex class="flexWidth">
                            <img v-show="datas.visible.robotR6" :src="datas.images.R6" v-bind:style="{ height: ui.robot.height , width: ui.robot.size }" />
                    </v-flex>
                </v-layout>
            </div>
            <div>
                <v-layout fluid>
                    <v-flex lg12>
                        <v-chip label class="zoneName">{{ui.zone.name}}</v-chip>
                    </v-flex>
                </v-layout>
            </div>
            <div v-show="datas.visible.body.move">
                <img class="moveZoneBody" :src="ui.images.body" :style="ui.images.size" />
                <p class="moveZoneText">BODY MOVE</p>
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
                        body: require("@/images/body_zone.png"),
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
                        R5: '',
                        L6: '',
                        R6: ''
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
                        robotL6: false,
                        robotR6: false,
                        conveyor: false,
                        body1: false,
                        body2: false,
                        body3: false,
                        body4: false,
                        body5: false,
                        body6: false,
                        body7: false,
                        body8: false,
                        body9: false,
                        body10: false,
                        body11: false,
                        body12: false,
                        body13: false,
                        body14: false,
                        body15: false,
                        body16: false,
                        body17: false,
                        body18: false,
                        body19: false,
                        body20: false,
                        body21: false,
                        body22: false,
                        body23: false,
                        body24: false,
                        body25: false,
                        body26: false,
                        body27: false,
                        body28: false,
                        body29: false,
                        body30: false,
                        body31: false,
                        body32: false,
                        body33: false,
                        body34: false,
                        body35: false,
                        body36: false,
                        body37: false,
                        body38: false,
                        body39: false,
                        body40: false,
                        body41: false,
                        body42: false,
                        body43: false,
                        body44: false,
                        body45: false,
                        body46: false,
                        body47: false,
                        body48: false,
                        body49: false,
                        body50: false,
                        body51: false,
                        body52: false,
                        body53: false,
                        body54: false,
                        body55: false,
                        body56: false,
                        body57: false,
                        body58: false,
                        body59: false,
                        body60: false,
                        body61: false,
                        body62: false,
                        body63: false,
                        body64: false,
                        body65: false,
                        body66: false,
                        body67: false,
                        body68: false,
                        body69: false,
                        body70: false,
                        body71: false,
                        body72: false,
                        body73: false,
                        body74: false,
                        body75: false,
                        body76: false,
                        body77: false,
                        body78: false,
                        body79: false,
                        body80: false,
                        body81: false,
                        body82: false,
                        body83: false,
                        body84: false,
                        body85: false,
                        body86: false,
                        body87: false,
                        body88: false,
                        body89: false,
                        body90: false,
                        body91: false,
                        body92: false,
                        body93: false,
                        body94: false,
                        body95: false,
                        body96: false,
                        body97: false,
                        body98: false,
                        body99: false,
                        body100: false,
                        body101: false,
                        body102: false,
                        body103: false,
                        body104: false,
                        body105: false,
                        body106: false,
                        body107: false,
                        body108: false,
                        body109: false,
                        body110: false,
                        body111: false,
                        body112: false,
                        body113: false,
                        body114: false,
                        body115: false,
                        body116: false,
                        body117: false,
                        body119: false,
                        body120: false,
                        body121: false,
                        body122: false,
                        body123: false,
                        body124: false,
                        body125: false
                    },
                    handle: null
                },
                background: {
                    border: ''
                },
            }
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
                    this.moveBodyLoadingImage(false);
                    this.manage.handle = true;
                }
                if (this.getFactoryId != '' && this.zoneid != '' && this.boothid != '') {
                    this.getZoneConfig();
                }
            }
        },
        created() {
            this.setRobot();
            this.initTextAnimation();
        },
        mounted() {
            this.initializeStyle();
        },
        destroyed() {
            this.destroyHandle();
        },
        methods: {
            initializeStyle() {
                this.ui.conveyor.color = this.$style.monitoring.miniZoneItemConveyorColor;
                this.ui.loading.color = this.$style.monitoring.miniZoneItemLoadingColor;
                this.background.border = "1px dashed" + this.$style.monitoring.miniZoneItemBorderColor;
                this.background.color = this.$style.monitoring.miniZoneItemBackgroundColor;

                document.documentElement.style.setProperty("--zoneNameTagBackgroundColor", this.$style.monitoring.miniZoneItemZoneNameTagBackgroundColor);
                document.documentElement.style.setProperty("--zoneNameTagColor", this.$style.monitoring.miniZoneItemZoneNameTagColor);
                document.documentElement.style.setProperty("--bodyMoveColor", this.$style.monitoring.miniZoneItemBodyMoveTextColor);
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
            initTextAnimation() {
                anime.timeline({
                    loop: true
                }).add({
                    targets: '.moveZoneText .letter',
                    scale: [4, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 100,
                    delay: function (el, i) {
                        return 70 * i;
                    }
                }).add({
                    targets: '.moveZoneText',
                    opacity: 0,
                    duration: 100,
                    easing: "easeOutExpo",
                    delay: 1000
                });
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
                                this.updateVisibleRobot(data[idx].visible, this.getRobotStatusSealer(data[idx], data[idx].robot_mode_run));
                            }
                            else if (data[idx].robot_type === 1) {
                                this.updateVisibleRobot(data[idx].visible, this.getRobotStatusPaint(data[idx], data[idx].robot_mode_run));
                            }
                            else if (data[idx].robot_type === 0) {
                                this.updateVisibleRobot(data[idx].visible, this.getRobotStatusOpener(data[idx], data[idx].robot_mode_run));
                            }
                        }
                        this.isOnlyOneRobot(data);
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            updatePLCDataPaint() {
                let params = {
                    factoryid: this.getFactoryId,
                    boothid: this.boothid,
                    zoneid: this.zoneid
                };
                this.$http.post(`${this.baseUrl}/monitoring/zone/data`, params).then((result) => {
                    if (result.data == '') {
                        this.$log.warn(this.$t(`monitoring.miniZone.logMsg.zoneData`));
                    }
                    else {
                        let data = result.data;
                        for (let idx = 0; idx < data.length; ++idx) {
                            if (data[idx].robot_type === 0) {
                                this.updateVisibleRobot(data[idx].robot_name, this.getRobotStatusOpener(data[idx], data[idx].robot_mode_run));
                            }
                            else if (data[idx].robot_type === 1) {
                                this.updateVisibleRobot(data[idx].robot_name, this.getRobotStatusPaint(data[idx], data[idx].robot_mode_run));
                            }
                        }
                        this.isOnlyOneRobot(data);
                        this.ui.loading.running = false;
                        this.datas.visible.conveyor = true;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            updatePLCDataSealer() {
                let params = {
                    factoryid: this.getFactoryId,
                    boothid: this.boothid,
                    zoneid: this.zoneid
                };
                this.$http.post(`${this.baseUrl}/monitoring/zone/data/sealer`, params).then((result) => {
                    if (result.data == '') {
                        this.$log.warn(this.$t(`monitoring.miniZone.logMsg.zoneData`));
                    }
                    else {
                        let data = result.data;
                        for (let idx = 0; idx < data.length; ++idx) {
                            if (data[idx].robot_type === 0) {
                                this.updateVisibleRobot(data[idx].robot_name, this.getRobotStatusOpener(data[idx], data[idx].robot_mode_run));
                            }
                            else if (data[idx].robot_type === 2) {
                                this.updateVisibleRobot(data[idx].robot_name, this.getRobotStatusSealer(data[idx], data[idx].robot_mode_run));
                            }
                        }
                        this.isOnlyOneRobot(data);
                        this.ui.loading.running = false;
                        this.datas.visible.conveyor = true;
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
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
                    if (this.zoneType == this.defines.zone.paintExt || this.zoneType == this.defines.zone.paintInt) {
                        this.updatePLCDataPaint();
                    }
                    else if (this.zoneType == this.defines.zone.sealer) {
                        this.updatePLCDataSealer();
                    }
                    this.updateData();
                }
            },
            updateData() {
                let params = {
                    factoryid: this.getFactoryId,
                    boothid: this.boothid,
                    conveyorid: this.conveyorid,
                    zoneid: this.zoneid,
                    startcount: this.startcount,
                    endcount: this.endcount
                };
                
                this.$http.post(`${this.baseUrl}/monitoring/zone/body/update`, params).then(async(result) => {
                    if (result.data != '') {
                        let ret = await this.syncUpdateZone(result.data[0].zonetype, result);
                    }
                }).catch((error) => {
                    this.$log.error(error);
                })
            },
            syncUpdateZone(zoneType, result) {
                if (zoneType == this.defines.zone.paintExt || zoneType == this.defines.zone.paintInt) {
                    this.bodyFollow(result.data);
                }
                return ;
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
                    case 11:
                        this.datas.visible.robotL6 = true;
                        this.datas.images.L6 = robotstatus;
                        break;
                    case 12:
                        this.datas.visible.robotR6 = true;
                        this.datas.images.R6 = robotstatus;
                        break;
                }
            },  
            getRobotStatusPaint(data, run) {
                if (data.atomizer_alarm == 0) {
                    switch (data.robot_status) {
                        case 0:
                            return this.ui.images.paint.offRobot;
                        case 1:
                            return this.ui.images.paint.waitRobot;
                        case 2:
                            if (run == 1) {
                                if (data.spray_onoff == 0) {
                                    return this.ui.images.paint.remoteSprayOff;
                                }
                                else {
                                    return this.ui.images.paint.remoteSprayOn;
                                }
                            }
                            else {
                                return this.ui.images.paint.readyRobot;
                            }
                        case 3:
                            return this.ui.images.paint.errorRobot;
                        case 4:
                            return this.ui.images.paint.alarmRobot;
                        case 5:
                            return this.ui.images.paint.errorRobot;
                        case 6:
                            return this.ui.images.paint.errorRobot;
                    }
                }
                else if (data.atomizer_alarm == 1) {
                    return this.ui.images.paint.allAlarmRobot;
                }
            },
            getRobotStatusSealer(data, run) {
                if (data.atomizer_alarm == 0) {
                    switch (data.robot_status) {
                        case 0:
                            return this.ui.images.sealer.offRobot;
                        case 1:
                            return this.ui.images.sealer.waitRobot;
                        case 2:
                            if (run == 1) {
                                if (data.sealer_on == 0) {
                                    return this.ui.images.sealer.remoteSprayOff;
                                }
                                else if (data.sealer_on == null) {
                                    return this.ui.images.sealer.remoteSprayOn;
                                }
                                else {
                                    return this.ui.images.sealer.remoteSprayOn;
                                }
                            }
                            else {
                                return this.ui.images.sealer.readyRobot;
                            }
                        case 3:
                            return this.ui.images.sealer.errorRobot;
                        case 4:
                            return this.ui.images.sealer.alarmRobot;
                        case 5:
                            return this.ui.images.sealer.errorRobot;
                        case 6:
                            return this.ui.images.sealer.errorRobot;
                    }
                }
                else if (data.atomizer_alarm == 1) {
                    return this.ui.images.sealer.allAlarmRobot;
                }
            },
            getRobotStatusOpener(data, run) {
                if (data.atomizer_alarm == 0) {
                    switch (data.robot_status) {
                        case 0:
                            return this.ui.images.opener.offRobot;
                        case 1:
                            return this.ui.images.opener.waitRobot;
                        case 2:
                            if (run == 1) {
                                return this.ui.images.opener.remoteRobot;
                            }
                            else {
                                return this.ui.images.opener.readyRobot;
                            }
                        case 3:
                            return this.ui.images.opener.errorRobot;
                        case 4:
                            return this.ui.images.opener.stopRobot;
                        case 5:
                            return this.ui.images.opener.errorRobot;
                        case 6:
                            return this.ui.images.opener.errorRobot;
                    }
                }
                else if (data.atomizer_alarm == 1) {
                    return this.ui.images.opener.allAlarmRobot;
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
            bodyFollow(data) {
                let conveyorWidth = this.width.split('px');
                let offset = Number(conveyorWidth[0]) - 50;
                let x = null;
                for (let idx = 0; idx < data.length; ++idx) {
                    x = Number(conveyorWidth[0]) * (data[idx].count - this.startcount) / (data[idx].endcount - this.startcount);
                    if (x >= offset) {
                        this.moveBodyLoadingImage(true);
                        this.setVisibleBody((idx + ((this.number * 5) + 1)), false);
                    }
                    else {
                        this.moveBodyLoadingImage(false);
                        this.setVisibleBody((idx + ((this.number * 5) + 1)), true);
                    }
                    this.moveBody((idx + ((this.number * 5) + 1)), x, x);
                }
            },
            moveBodyLoadingImage(flag) {
                this.datas.visible.body.move = flag;
            },
            moveBody(body, x1, x2) {
                anime({
                    targets: '.body' + String(body),
                    translateX: [x1, x2],
                    easing: 'easeInOutQuad'
                });
            },
            setVisibleBody(num, flag) {
                switch (num) {
                    case 1:
                        this.datas.visible.body1 = flag;
                        break;
                    case 2:
                        this.datas.visible.body2 = flag;
                        break;
                    case 3:
                        this.datas.visible.body3 = flag;
                        break;
                    case 4:
                        this.datas.visible.body4 = flag;
                        break;
                    case 5:
                        this.datas.visible.body5 = flag;
                        break;
                    case 6:
                        this.datas.visible.body6 = flag;
                        break;
                    case 7:
                        this.datas.visible.body7 = flag;
                        break;
                    case 8:
                        this.datas.visible.body8 = flag;
                        break;
                    case 9:
                        this.datas.visible.body9 = flag;
                        break;
                    case 10:
                        this.datas.visible.body10 = flag;
                        break;

                    case 11:
                        this.datas.visible.body11 = flag;
                        break;
                    case 12:
                        this.datas.visible.body12 = flag;
                        break;
                    case 13:
                        this.datas.visible.body13 = flag;
                        break;
                    case 14:
                        this.datas.visible.body14 = flag;
                        break;
                    case 15:
                        this.datas.visible.body15 = flag;
                        break;

                    case 16:
                        this.datas.visible.body16 = flag;
                        break;
                    case 17:
                        this.datas.visible.body17 = flag;
                        break;
                    case 18:
                        this.datas.visible.body18 = flag;
                        break;
                    case 19:
                        this.datas.visible.body19 = flag;
                        break;
                    case 20:
                        this.datas.visible.body20 = flag;
                        break;

                    case 21:
                        this.datas.visible.body21 = flag;
                        break;
                    case 22:
                        this.datas.visible.body22 = flag;
                        break;
                    case 23:
                        this.datas.visible.body23 = flag;
                        break;
                    case 24:
                        this.datas.visible.body24 = flag;
                        break;
                    case 25:
                        this.datas.visible.body25 = flag;
                        break;

                    case 26:
                        this.datas.visible.body26 = flag;
                        break;
                    case 27:
                        this.datas.visible.body27 = flag;
                        break;
                    case 28:
                        this.datas.visible.body28 = flag;
                        break;
                    case 29:
                        this.datas.visible.body29 = flag;
                        break;
                    case 30:
                        this.datas.visible.body30 = flag;
                        break;

                    case 31:
                        this.datas.visible.body31 = flag;
                        break;
                    case 32:
                        this.datas.visible.body32 = flag;
                        break;
                    case 33:
                        this.datas.visible.body33 = flag;
                        break;
                    case 34:
                        this.datas.visible.body34 = flag;
                        break;
                    case 35:
                        this.datas.visible.body35 = flag;
                        break;

                    case 36:
                        this.datas.visible.body36 = flag;
                        break;
                    case 37:
                        this.datas.visible.body37 = flag;
                        break;
                    case 38:
                        this.datas.visible.body38 = flag;
                        break;
                    case 39:
                        this.datas.visible.body39 = flag;
                        break;
                    case 40:
                        this.datas.visible.body40 = flag;
                        break;

                    case 41:
                        this.datas.visible.body41 = flag;
                        break;
                    case 42:
                        this.datas.visible.body42 = flag;
                        break;
                    case 43:
                        this.datas.visible.body43 = flag;
                        break;
                    case 44:
                        this.datas.visible.body44 = flag;
                        break;
                    case 45:
                        this.datas.visible.body45 = flag;
                        break;

                    case 46:
                        this.datas.visible.body46 = flag;
                        break;
                    case 47:
                        this.datas.visible.body47 = flag;
                        break;
                    case 48:
                        this.datas.visible.body48 = flag;
                        break;
                    case 49:
                        this.datas.visible.body49 = flag;
                        break;
                    case 50:
                        this.datas.visible.body50 = flag;
                        break;

                    case 51:
                        this.datas.visible.body51 = flag;
                        break;
                    case 52:
                        this.datas.visible.body52 = flag;
                        break;
                    case 53:
                        this.datas.visible.body53 = flag;
                        break;
                    case 54:
                        this.datas.visible.body54 = flag;
                        break;
                    case 55:
                        this.datas.visible.body55 = flag;
                        break;

                    case 56:
                        this.datas.visible.body56 = flag;
                        break;
                    case 57:
                        this.datas.visible.body57 = flag;
                        break;
                    case 58:
                        this.datas.visible.body58 = flag;
                        break;
                    case 59:
                        this.datas.visible.body59 = flag;
                        break;
                    case 60:
                        this.datas.visible.body60 = flag;
                        break;

                    case 61:
                        this.datas.visible.body61 = flag;
                        break;
                    case 62:
                        this.datas.visible.body62 = flag;
                        break;
                    case 63:
                        this.datas.visible.body63 = flag;
                        break;
                    case 64:
                        this.datas.visible.body64 = flag;
                        break;
                    case 65:
                        this.datas.visible.body65 = flag;
                        break;

                    case 66:
                        this.datas.visible.body66 = flag;
                        break;
                    case 67:
                        this.datas.visible.body67 = flag;
                        break;
                    case 68:
                        this.datas.visible.body68 = flag;
                        break;
                    case 69:
                        this.datas.visible.body69 = flag;
                        break;
                    case 70:
                        this.datas.visible.body70 = flag;
                        break;

                    case 71:
                        this.datas.visible.body71 = flag;
                        break;
                    case 72:
                        this.datas.visible.body72 = flag;
                        break;
                    case 73:
                        this.datas.visible.body73 = flag;
                        break;
                    case 74:
                        this.datas.visible.body74 = flag;
                        break;
                    case 75:
                        this.datas.visible.body75 = flag;
                        break;
                    case 76:
                        this.datas.visible.body76 = flag;
                        break;
                    case 77:
                        this.datas.visible.body77 = flag;
                        break;
                    case 78:
                        this.datas.visible.body78 = flag;
                        break;
                    case 79:
                        this.datas.visible.body79 = flag;
                        break;
                    case 80:
                        this.datas.visible.body80 = flag;
                        break;
                    case 81:
                        this.datas.visible.body81 = flag;
                        break;
                    case 82:
                        this.datas.visible.body82 = flag;
                        break;
                    case 83:
                        this.datas.visible.body83 = flag;
                        break;
                    case 84:
                        this.datas.visible.body84 = flag;
                        break;
                    case 85: 
                        this.datas.visible.body85 = flag;
                        break;
                    case 86: 
                        this.datas.visible.body86 = flag;
                        break;
                    case 87: 
                        this.datas.visible.body87 = flag;
                        break;
                    case 88: 
                        this.datas.visible.body88 = flag;
                        break;
                    case 89:
                        this.datas.visible.body89 = flag;
                        break;
                    case 90:
                        this.datas.visible.body90 = flag;
                        break;
                    case 91:
                        this.datas.visible.body91 = flag;
                        break;
                    case 92:
                        this.datas.visible.body92 = flag;
                        break;
                    case 93: 
                        this.datas.visible.body93 = flag;
                        break;
                    case 94:
                        this.datas.visible.body94 = flag;
                        break;
                    case 95:
                        this.datas.visible.body95 = flag;
                        break;
                    case 96:
                        this.datas.visible.body96 = flag;
                        break;
                    case 97:
                        this.datas.visible.body97 = flag;
                        break;
                    case 98:
                        this.datas.visible.body98 = flag;
                        break;
                    case 99:
                        this.datas.visible.body99 = flag;
                        break;
                    case 100:
                        this.datas.visible.body100 = flag;
                        break;
                    case 101:
                        this.datas.visible.body101 = flag;
                        break;
                    case 102:
                        this.datas.visible.body102 = flag;
                        break;
                    case 103:
                        this.datas.visible.body103 = flag;
                        break;
                    case 104:
                        this.datas.visible.body104 = flag;
                        break;
                    case 105:
                        this.datas.visible.body105 = flag;
                        break;
                    case 106:
                        this.datas.visible.body106 = flag;
                        break;
                    case 107:
                        this.datas.visible.body107 = flag;
                        break;
                    case 108:
                        this.datas.visible.body108 = flag;
                        break;
                    case 109:
                        this.datas.visible.body109 = flag;
                        break;
                    case 110:
                        this.datas.visible.body110 = flag;
                        break;
                    case 111:
                        this.datas.visible.body111 = flag;
                        break;
                    case 112:
                        this.datas.visible.body112 = flag;
                        break;
                    case 113:
                        this.datas.visible.body113 = flag;
                        break;
                    case 114:
                        this.datas.visible.body114 = flag;
                        break;
                    case 115:
                        this.datas.visible.body115 = flag;
                        break;
                    case 116:
                        this.datas.visible.body116 = flag;
                        break;
                    case 117:
                        this.datas.visible.body117 = flag;
                        break;
                    case 118:
                        this.datas.visible.body118 = flag;
                        break;
                    case 119:
                        this.datas.visible.body119 = flag;
                        break;
                    case 120:
                        this.datas.visible.body120 = flag;
                        break;
                    case 121:
                        this.datas.visible.body121 = flag;
                        break;
                    case 122:
                        this.datas.visible.body122 = flag;
                        break;
                    case 123:
                        this.datas.visible.body123 = flag;
                        break;
                    case 124:
                        this.datas.visible.body124 = flag;
                        break;
                    case 125:
                        this.datas.visible.body125 = flag;
                        break;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import './minizone';
</style>
<template>
    <v-dialog persistent v-model="getFlag" :width="ui.dialogWidth" v-bind="getSelectOptionDatas">
        <v-card class="selectOptionDlgCard py-2">
            <v-layout column class="selectOptionDlgCardContents mx-3 my-2">
                <v-btn class="selectOptionDlgBtn buttonItem mt-3" flat @click="moveZoneBtnClicked">
                    <a class="pt-2 pr-2"><img :src="ui.moveZoneIcon"></a>
                    {{ui.moveZoneText}}
                </v-btn>
                <v-btn class="selectOptionDlgBtn buttonItem mt-2 mb-0" flat @click="movePredictBtnClicked">
                    <a class="pt-2 pr-2"><img :src="ui.movePredictIcon"></a>
                    {{ui.movePredictText}}
                </v-btn>
                <v-layout class="selectOptionDlgPredictStatus mx-2 mb-3" justify-center align-center>
                    <div class="my-2" v-for="predictStatusItem in datas.predictStatusItems" :key="predictStatusItem.id">
                        <v-btn 
                            depressed
                            class="predictIcon"
                            fab
                            :color="predictStatusItem.value === 0 ? ui.predictStatusColor.normal : ui.predictStatusColor.alarm"
                        ></v-btn>
                        <span class="mr-2">{{predictStatusItem.name}}</span>
                    </div>
                </v-layout>
            </v-layout>
            <v-layout>
                <v-spacer/>
                <v-btn class="buttonItem" @click="closeDlg">{{ui.closeBtnText}}</v-btn>
            </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['flag', 'selectOptionDatas'],
    data() {
        return {
            ui: {
                closeBtnText: this.$t(`monitoring.allMonitoring.closeBtnText`),
                dialogWidth: "400px",
                moveZoneText: this.$t(`monitoring.child.selectOptionDlg.moveZoneText`),
                movePredictText: this.$t(`monitoring.child.selectOptionDlg.movePredictText`),
                moveZoneIcon: require("@/images/move_zone.png"),
                movePredictIcon: require("@/images/move_predict.png"),
                predictStatusColor: {
                    normal: this.$style.monitoring.predictStatusItemNormalColor,
                    alarm: this.$style.monitoring.predictStatusItemAlarmColor
                }
            },
            datas: {
               predictStatusItems: [
                    {id: 'p001', name: this.$t(`monitoring.allMonitoring.predictStatusItems.range`), value: null},
                    {id: 'p002', name: this.$t(`monitoring.allMonitoring.predictStatusItems.motor_temperature`), value: null},
                    {id: 'p005', name: this.$t(`monitoring.allMonitoring.predictStatusItems.accum`), value: null}
               ]
            },
            flags: {
                dialog: false
            }
        }
    },

    created() {

    },

    mounted() {
        this.initializeStyle();
    },

    computed: {
        getFlag() {
            this.flags.dialog = this.flag;
            return this.flags.dialog;
        },

        getSelectOptionDatas() {
            if(this.selectOptionDatas !== null) {
                this.datas.predictStatusItems.forEach(predictStatusItem => {
                    if(this.selectOptionDatas.predictStatus[predictStatusItem.id] !== undefined) {
                        predictStatusItem.value = this.selectOptionDatas.predictStatus[predictStatusItem.id];
                    }
                })
            }
        }
    },

    methods: {
        initializeStyle() {
            document.documentElement.style.setProperty("--cardBackgroundColor", this.$style.monitoring.selectOptionDlgItemCardBackgroundColor);
            document.documentElement.style.setProperty("--cardColor", this.$style.monitoring.selectOptionDlgItemCardColor);
            document.documentElement.style.setProperty("--cardContentsBackgroundColor", this.$style.monitoring.selectOptionDlgItemCardContentsBackgroundColor);
            document.documentElement.style.setProperty("--predictStatusBorderColor", this.$style.monitoring.selectOptionDlgItemCardPredictStatusBorderColor);
            document.documentElement.style.setProperty("--buttonBackgroundColor", this.$style.common.buttonItemBackgroundColor);
            document.documentElement.style.setProperty("--buttonColor", this.$style.common.buttonItemColor);
        },

        moveZoneBtnClicked() {
            this.$emit('moveZone', this.selectOptionDatas);
            this.closeDlg();
        },

        movePredictBtnClicked() {
            this.$emit('movePredict', this.selectOptionDatas);
            this.closeDlg();
        },

        closeDlg() {
            this.$emit('closeDlg');
        }
    }
}
</script>

<style scoped lang="scss">
    @import "./selectoptiondlg.scss";
</style>
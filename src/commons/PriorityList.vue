<template>
    <v-card class="priorityListCard" elevation="0" v-bind="initialize">
        <v-card-title :style="ui.tableHeaderStyle" class="priorityListTitle justify-center">{{priorityTitle}}</v-card-title>
        <v-list class="priorityList">
            <v-list-tile class="priorityListTile pt-5" v-for="(data, index) in datas" :key="index">
                <v-list-tile-content> 
                  <v-list-tile-title class="tileDatas">
                      <v-btn class="tileDatasBtn" flat round v-if="data.option != ''" @click="itemClicked(data)">{{data.option}}
                      </v-btn>
                    </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-avatar class="body-1 pt-1">{{data.value}}</v-list-tile-avatar>
            </v-list-tile>   
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: ['priorityTitle', 'priorityDatas', 'dataValue'],
    data() {
        return {
            ui: {
                tableHeaderStyle: null
            },
            datas: []
        }
    },
    mounted() {
        this.initializeStyle();
        this.initDatas();
    },
    computed: {
        initialize() {
            this.getPriorityDatas();
        }
    },
    methods: {
        initializeStyle() {
            this.ui.tableHeaderStyle = this.$style.common.tableHeaderStyleColor;
            document.documentElement.style.setProperty("--priorityListBackgroundColor", this.$style.common.priorityListItemBackgroundColor);
            document.documentElement.style.setProperty("--priorityListTitleBackgroundColor", this.$style.common.priorityListItemTitleBackgroundColor);
            document.documentElement.style.setProperty("--priorityListColor", this.$style.common.priorityListItemColor);
            document.documentElement.style.setProperty("--priorityListButtonBorderColor", this.$style.common.priorityListItemButtonBorderColor);
            document.documentElement.style.setProperty("--priorityListButtonHoverColor", this.$style.common.priorityListItemButtonHoverColor);
            document.documentElement.style.setProperty("--priorityListActiveButtonBackgroundrColor", this.$style.common.priorityListItemButtonHoverBackgroundColor);
            document.documentElement.style.setProperty("--priorityListCardBorderColor", this.$style.common.cardItemBorderColor);
        },
        initDatas() {
            for (let i = 0; i < 5; i++) {
                this.datas.push({'option': '', 'value': ''});
            }
        },
        getPriorityDatas() {
            if (this.priorityDatas.length != 0) {
                this.datas = [];
                for (let i = 0; i < this.priorityDatas.length; i++) {
                    for (let j = 0; j < Object.keys(this.priorityDatas[i]).length; j++) {
                        if (Object.keys(this.priorityDatas[i])[j] != this.dataValue) {
                            this.datas.push({
                                'option': this.priorityDatas[i][Object.keys(this.priorityDatas[i])[j]], 
                                'value': this.priorityDatas[i][this.dataValue], 
                                alarm_type: this.priorityDatas[i]['alarm_type']
                                });
                            break;
                        } 
                    }                
                }
                if (this.datas.length < 5) {
                    let index = 5-this.datas.length;
                    for (let i = 0; i < index; i++) {
                        this.datas.push({'option': '', 'value': ''});
                    }
                }
            } 
            else {
                this.datas = [];
                for (let i = 0; i < 5; i++) {
                    this.datas.push({'option': '', 'value': ''});
                }
            }
        },
        itemClicked(data) {
           this.$emit('selectedPriorityData', data);
           this.$emit('priorityFlag', this.priorityTitle);
        }
    }
}
</script>

<style scoped lang="scss">
    @import './prioritylist';
</style>

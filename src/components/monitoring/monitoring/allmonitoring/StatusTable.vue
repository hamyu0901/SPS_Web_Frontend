<template>
    <v-layout column fill-height justify-center align-center>
        <v-layout v-if="type === datas.statusTypes.robot" class="statusTableTitle" justify-center align-center>
            <h4>{{ui.title}}</h4>
        </v-layout>
        <v-layout v-else class="statusTableTitle" justify-center align-center>
            <h4 class="pr-2">{{ui.title}}</h4>
            <h4>
                <v-layout>
                    (
                    <div class="pr-2 pl-2" v-for="statusTitleItem in datas.statusTitleItems" :key="statusTitleItem.id">
                        <v-btn
                            class="predictIcon mr-1"
                            depressed
                            fab
                            :color="statusTitleItem.color"
                        ></v-btn>
                        {{statusTitleItem.text}}
                    </div>
                    )
                </v-layout>
            </h4>
        </v-layout>
        <v-layout v-if="type === datas.statusTypes.robot" class="statusTableContents" justify-center align-center>
            <div class="pr-2" v-for="statausTableItem in datas.statusTableItems" :key="statausTableItem.id">
                <a class="pr-1">
                    <img :src='statausTableItem.img' />
                </a>
                {{statausTableItem.text}}
            </div>
        </v-layout>
        <v-layout v-else class="statusTableContents" justify-center align-center>
            <div class="pr-3" v-for="statausTableItem in datas.statusTableItems" :key="statausTableItem.id">
                <v-btn
                    class="predictIcon mr-1"
                    depressed
                    fab
                    :color="ui.predictIconColor"
                ></v-btn>
                {{statausTableItem.text}}
            </div>
        </v-layout>
    </v-layout>
</template>

<script>
export default {
    props: ['type', 'title', 'statusTitleItems', 'statusTableItems'],
    data() {
        return {
            ui: {
                title: this.title,
                predictIconColor: this.$style.monitoring.statusTableItemPredictIconColor
            },
            datas: {
                statusTypes: {
                    robot: 'robot',
                    predict: 'predict'
                },
                statusTitleItems: this.statusTitleItems,
                statusTableItems: this.statusTableItems
            }
        }
    },
    created() {

    },
    mounted() {
        this.initializeStyle();
    },
    computed: {

    },

    methods: {
        initializeStyle() {
            document.documentElement.style.setProperty("--statusTableTitleBorderBottomColor", this.$style.monitoring.statusTableItemBorderColor);
        }
    }
}
</script>

<style scoped lang="scss">
    @import "./statustable.scss";
</style>
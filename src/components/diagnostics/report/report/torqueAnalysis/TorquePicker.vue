<template>
    <v-date-picker
        v-model="datas.date"
        type="month"
        scrollable
        @click:month="clickPickerMonth"
    >
        <div>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="clickCancelButton">Cancel</v-btn>
            <v-btn flat color="primary" @click="clickOkayButton">OK</v-btn>
        </div>
    </v-date-picker>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: [],
    data() {
        return {
            datas: {
                date: new Date().toISOString().substr(0, 7),
                modal: false,
            }
        }
    },
    computed: {
        ...mapGetters ({
            getTheme: "getTheme",
            getLanguage: "getLanguage"
        }),
    },
    mounted() {

    },
    methods: {
        clickCancelButton(){
            this.$emit('closeTorquePicker');
        },
        clickOkayButton(){
            this.$emit('closeTorquePicker');
        },
        clickPickerMonth(date){
            this.$emit('clickPickerMonth', date)
        }
    }
}
</script>

<style scoped lang="scss">
   @import './torquepicker';
</style>
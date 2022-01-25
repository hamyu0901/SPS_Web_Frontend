<template>
<div id="textBox">
    <v-text-field 
        v-model="inputModel"
        outlined
        hide-details
        clearable
        @input="changeInput"
    ></v-text-field>
</div>
    
</template>
<script>
export default {
    props:['model', 'robotId'],
    data(){
        return{
            inputModel: null,
        }
    },
    created(){
        this.initializeInputModel();
    },
    watch:{
        model(){
            this.inputModel = this.model;
        },
    },
    methods:{
        changeInput(inputModel){
            this.$emit('changeInput', {robot_id: this.robotId, value: inputModel})
        },
        initializeInputModel(){
            this.inputModel = this.model !== null ? this.model : null;
        }
    }
}
</script>
<style lang="scss" scoped>
#textBox{
    margin: 0 !important;
    padding: 0 2% !important;
}
#textBox >>> input {
    text-align: left;
    font-size: 13px;
}
#textBox >>> i {
    color:white !important;
}
#textBox >>> .v-input {
    padding: 0 !important;
    caret-color: white !important;
}
#textBox >>> .v-input__slot:before, #textBox >>> .v-input__slot:after{
    display: none;
}
</style>
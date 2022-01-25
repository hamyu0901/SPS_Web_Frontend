<template>
  <div id="btnBox">
      <v-btn @click="resetData" :ripple="false"><v-icon>refresh</v-icon><label>리셋</label></v-btn>
      <v-btn @click="saveData" :ripple="false"><v-icon>file_upload</v-icon><label>저장</label></v-btn>
  </div>
</template>

<script>
export default {
    date(){
        return{

        }
    },
    methods:{
        saveData(){
            this.$emit('onSave');
        },
        resetData(){
            this.$emit('onReset');
        }
    }
}
</script>

<style lang="scss" scoped>
#btnBox{
    display: flex;
    align-items:  center;
    column-gap: 15px;
    margin-right: 20px;
    button{
        
        padding: 0 !important;
        margin: 0 !important;
        background: transparent;
        border-style: none !important;
        min-height: 0 !important;
        min-width:0 !important;
        width:fit-content !important;
        height:fit-content !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;

        label{
            margin-left: 5px;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
        }
    }

    button:before{
        content: none !important;
    }

    
    
    
}
</style>
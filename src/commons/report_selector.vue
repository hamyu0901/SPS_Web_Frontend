<template>
<div id="selectorBox">
<v-select
      id="selector"
      v-model="itemSelected"
      :items="items"
      :item-text="'name'"
      outline
      :attach="false"
      :dense="true"
      :hide-details="true"
      :no-data-text="noDataText"
      return-object
      @change="changeSelect"
      :menu-props="{top: false, offsetY: true, closeOnClick: false }"
    >
    <template v-slot:item="{ item }">
          <div>
            {{item.name}}
          </div>
    </template>
    </v-select>
</div>
    
    
</template>
<script>
export default {
    props:['items', 'selectedItem', 'noDataText', 'robotId'],
    data(){
        return{
            itemSelected: null,
        }
    },
    created(){
      this.initializeSelectedItem();
    },
    watch:{
      selectedItem(){
        this.itemSelected = this.objectFindByKey(this.items, 'index', this.selectedItem);
      }
    },
    methods:{
      changeSelect(changedItem){
        this.$emit('changeSelect', {robot_id: this.robotId, value: changedItem.index});
      },
      initializeSelectedItem(){
        this.itemSelected = this.selectedItem !== null ? this.objectFindByKey(this.items, 'index', this.selectedItem) : null;
      },
      objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        },
      
    }
}
</script>
<style lang="scss" scoped>
#selectorBox{
  width: 100%;
  height: 100%;
  padding: 2% 5%;
  
}
#selectorBox >>> #selector{
  display: none !important;
}
.v-input >>> .v-input__control .v-input__slot{
  min-height:0 !important;
}
.v-input >>> .v-input__control .v-input__slot .v-select__slot{
  height: 25px;
}
.v-input >>> .v-input__control .v-input__slot .v-select__slot .v-select__selections {
  padding-top:0 !important;
  justify-content: center !important;
  font-size: 13px;
}
.v-input >>> .v-input__control .v-input__slot .v-select__slot .v-input__append-inner{
  margin: auto !important;

  i{
    font-size: 17px;
  }
}  


</style>
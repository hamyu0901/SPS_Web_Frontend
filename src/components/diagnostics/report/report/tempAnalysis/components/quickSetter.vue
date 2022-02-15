<template>
  <div id="quickCombo">
        <p>퀵 콤보: </p>
        <v-select
          :items="years"
          outline
          :attach="false"
          :dense="true"
          :hide-details="true"
          :no-data-text="noDataTextYear"
          return-object
          @change="getMonth"
          :menu-props="{top: false, offsetY: true, closeOnClick: false }"
        >
          <template v-slot:item="{ item }">
            <div>
              {{ item['years']}}년
            </div>
          </template>
          <template v-slot:selection="{ item }">
            <div>
              {{ item['years']}}년
            </div>
          </template>
        </v-select>
        <v-select
          :items="monthes"
          :disabled="!isYearSelected"
          outline
          :attach="false"
          :dense="true"
          :hide-details="true"
          :no-data-text="noDataTextMonth"
          return-object
          @change="findData"
          :menu-props="{top: false, offsetY: true, closeOnClick: false }"
        >
          <template v-slot:item="{ item }">
            <div>
              {{ item['monthes']}}월
            </div>
          </template>
          <template v-slot:selection="{ item }">
            <div>
              {{ item['monthes']}}월
            </div>
          </template>
        </v-select>
      </div>
</template>

<script>
export default {
    data(){
        return{
            datesList:[],
            years:[],
            monthes:[],
            isYearSelected : false,
            noDataTextYear: '연도 정보가 없습니다.',
            noDataTextMonth: '월 정보가 없습니다.'
        }
    },
    created(){
        this.getYears();
    },
    methods:{
        getYears(){
            this.$http.get(`/diagnostics/datareport/temperature/quick/getYearsMonthes`).then(result => {
                if(this.years.length !== 0){
                    this.years.splice(0);
                }
                this.datesList.push(result.data[0].dates);
                for(const data of this.datesList){
                    this.years.push({years: data.year});
                }
            })
        },
        getMonth(year){

            this.isYearSelected = true;
            this.selectedYear = year.years;

            var monthes = this.objectFindByKey(this.datesList, 'year', this.selectedYear);
            for(const data of monthes){
              if(data.toString().length === 1){
                this.monthes.push({monthes: '0' + data.toString()});
              }else{
                this.monthes.push({monthes: data});
              }
            }

            // this.$http.get(`/diagnostics/datareport/temperature/quick/getMonthes/${year.years}`).then(result => {
            //     if(this.monthes.length !== 0){
            //         this.monthes.splice(0);
            //     }
            //     console.log(result.data);
            //     for(const data of result.data){
            //         this.monthes.push(data);
            //     }
            // });
        },
        objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i].monthes;
                }
            }
            return null;
        },
        findData(month){
            this.selectedMonth = month.monthes;
            const quickPeriod = {
                quickYear: this.selectedYear,
                quickMonth: this.selectedMonth,
            };

            this.$emit('quickSetting', quickPeriod);
        }
    }
}
</script>

<style lang="scss" scoped>
#quickCombo{
        width: 30%;
        display: flex;
        align-items: center;
        column-gap: 10px;
        p{
            margin: 0;
            width: 70px;
        }
        height: 100px;
    }
    .v-input >>> .v-input__control .v-input__slot{
        min-height:0 !important;
    }
    .v-input >>> .v-input__control .v-input__slot .v-select__slot{
        height: 40px;
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
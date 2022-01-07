<template>
  <table class="no-drag" style="height: 250px;">
    <thead>
        <tr style="height: 30px;">
            <th></th>
            <th v-for="(x_header, index) in propsTableData.x_Headers" :key="index" :class="x_value === index ? 'active' : null">
                <label>{{x_header.name}}</label>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(y_header, index) in propsTableData.y_Headers" :key="index" >
            <th :class="y_value === index ? 'active' : null">
                <label>{{y_header.name}}</label>
            </th>
            <td v-for="(data, data_index) in y_header.dataList" :key="data_index" @mouseover="mouseover(index, data_index)" @mouseleave="mouseleave()">
                <label>{{data}}</label>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: ["propsTableData"],
    data(){
        return{
            isActive : false,
            y_value: null,
            x_value: null,
        }
    },
    methods:{
        mouseover(y, x){
            this.y_value = y;
            this.x_value = x;

        },
        mouseleave(){
            this.y_value = null;
            this.x_value = null;
        }
    }
}
</script>

<style lang="scss" scoped>
table{
    display: table;
    width: 100%;
    margin: 20px auto;
    overflow: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    box-shadow: 0 0 20px rgba(116, 115, 115, 0.651);
    border: 1px solid white;

    thead{
        th:first-child{
            border-left: 0;
            border-bottom: 0;
        }
        th{
            border-left: 1px solid white;
            border-bottom: 1px solid white;

            &.active{
                background-color: white;
                color: black;
            }
        }
    }
    tbody{
        tr{
            border-bottom: 1px solid white;

            th{
                border-top: 1px solid white;
                border-right: 1px solid white;
                background-color: none;

                 &.active{
                    background-color: white;
                    color: black;
                }
            }
            
            
            td{
                border-right: 1px solid white;

                label{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                &:hover{
                    background-color:yellow;
                    color: black;
                }

                &:last-child{
                    border-right: none;
                }
            }

            &:last-child{
                border-bottom: none;
            }
        }
        
    }
}
</style>
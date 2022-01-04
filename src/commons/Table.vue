<template>
  <table style="height: 400px;">
    <thead>
        <tr style="height: 30px;">
            <th></th>
            <th v-for="(x_header, index) in propsTableData.x_Headers" :key="index">
                <label>{{x_header.name}}</label>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(y_header, index) in propsTableData.y_Headers" :key="index">
            <th>
                <label>{{y_header.name}}</label>
            </th>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    props: ["propsTableData"],
    data(){
        return{

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
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border: 1px solid white;

    thead{
        th:first-child{
            border-left: 0;
            border-bottom: 0;
        }
        th{
            border-left: 1px solid white;
            border-bottom: 1px solid white;
        }
    }
    tbody{
        th{
            border-top: 1px solid white;
            border-right: 1px solid white;
        }
    }
}
</style>
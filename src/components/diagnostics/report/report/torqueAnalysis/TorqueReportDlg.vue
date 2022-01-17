<template>
    <v-card class = "container">
        <v-card-title>
            리포트 조회
            <v-spacer/>
			<v-btn icon @click="clickCloseButton"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <DxDataGrid
            :data-source="datas.dataSource"
            key-expr="ID"
            :columns="datas.columns"
            :show-borders="true"
        >
            <DxSelection
                mode="multiple"
                :width="50"
                show-check-boxes-mode="always"
            />
        </DxDataGrid>
        <div class= "buttton">
            <v-btn>확인</v-btn>
            <v-btn>취소</v-btn>
        </div>
    </v-card>
</template>
<script>
import { DxButton } from 'devextreme-vue/button';
import{
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    DxToolbar,
    DxItem,
    DxSelection
} from 'devextreme-vue/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.dark.css';
    export default {
        components: {
            DxDataGrid,
            DxColumn,
            DxEditing,
            DxLookup,
            DxToolbar,
            DxItem,
            DxButton,
            DxSelection
        },
        props: [],
        data () {
            return {
                datas : {
                    dataSource : [
                        {
                            ID: 1,
                            CompanyName: 'Super Mart of the West',
                            Address: '702 SW 8th Street',
                            City: 'Bentonville',
                            State: 'Arkansas',
                            Zipcode: 72716,
                            Phone: '(800) 555-2797',
                            Fax: '(800) 555-2171',
                            Website: 'http://www.nowebsitesupermart.com',
                            }, {
                            ID: 2,
                            CompanyName: 'Electronics Depot',
                            Address: '2455 Paces Ferry Road NW',
                            City: 'Atlanta',
                            State: 'Georgia',
                            Zipcode: 30339,
                            Phone: '(800) 595-3232',
                            Fax: '(800) 595-3231',
                            Website: 'http://www.nowebsitedepot.com',
                        },
                    ],
                    columns: ['CompanyName', 'City', 'State', 'Phone', 'Fax'],
                }
            }
        },
        methods : {
            clickCloseButton(){
                this.$emit('closeTorqueReportDlg');
            }
        }
    }
</script>
<style scoped>
    .buttton{
        display: flex;
        justify-content: right;
    }
</style>
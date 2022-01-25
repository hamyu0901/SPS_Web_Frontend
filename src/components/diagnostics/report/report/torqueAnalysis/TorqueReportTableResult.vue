<template>
    <div class ="gridContainer">
         <div class="gridCurrent">
             <div class="currentTitleBar">{{ui.currentDateTitle}}</div>
            <DxDataGrid
                :ref="dataGridRef"
                :data-source="datas.gridCurrentData"
                key-expr="no"
                :show-borders="true"
                :columns="datas.columns"
                @focused-cell-changed="changeGridCell"
                @cell-dbl-click="clickGridCell"
            >
                <DxEditing
                    mode="cell"
                    :allow-updating="true"
                />
                <DxColumn data-field="robot" caption="" :width="50" :allow-editing="false"/>
                <DxColumn data-field="axis1" caption="1축" :width="70" :allow-editing="false" css-class="axis-highlighted">
                    <DxLookup
                        apply-button-text="ok"
                        apply-value-mode="useButtons"
                    />
                </DxColumn>
                <DxColumn data-field="axis2" caption="2축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis3" caption="3축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis4" caption="4축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis5" caption="5축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis6" caption="6축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn
                    data-field="dangerLevel"
                    caption="위험도"
                    :width="80"
                    :allow-editing="false"
                    css-class="danger-highlighted"
                />
                <DxColumn
                    data-field="description"
                    caption="의견"
                    css-class="description-highlighted"
                />
                <!-- <DxToolbar>
                    <DxItem
                        template="exportTemplate"
                        name="groupPanel"
                        location="after"
                    />
                </DxToolbar>
                <template #exportTemplate>
                    <DxButton
                        icon="exportpdf"
                        text="Export to PDF"
                        @click="exportDataGrid"
                    />
                </template> -->
            </DxDataGrid>
        </div>
        <div class="gridBefore">
            <div class="beforeTitleBar">{{ui.beforeDateTitle}}</div>
            <DxDataGrid
                :data-source="datas.gridCurrentData"
                key-expr="no"
                :show-borders="true"
                :columns="datas.columns"
            >
                <DxEditing
                    mode="cell"
                    :allow-updating="true"
                />
                <DxColumn data-field="robot" caption="" :width="50" :allow-editing="false"/>
                <DxColumn data-field="axis1" caption="1축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis2" caption="2축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis3" caption="3축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis4" caption="4축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis5" caption="5축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="axis6" caption="6축" :width="70" :allow-editing="false" css-class="axis-highlighted"/>
                <DxColumn data-field="dangerLevel" caption="위험도" :width="80" :allow-editing="false" css-class="danger-highlighted"/>
                <DxColumn data-field="description" caption="의견" css-class="description-highlighted"/>
            </DxDataGrid>
        </div>
    </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import {mapGetters} from 'vuex'
import { DxButton } from 'devextreme-vue/button';
import{
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    DxToolbar,
    DxItem,
} from 'devextreme-vue/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.dark.css';
const dataGridRef = 'dataGrid';
// import { themes } from "devextreme/ui/themes";
export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxLookup,
        DxToolbar,
        DxItem,
        DxButton
    },
    props: ['selectedCurrentDate'],
    data() {
        return {
            dataGridRef,
            ui: {
                currentDateTitle : "",
                beforeDateTitle : "",
            },
            datas: {
                gridCurrentData: [],
                gridBeforeData: [],
            }
        }
    },
    // created() {
        // this.themes.current("generic.contrast");
    // },
    computed: {
        ...mapGetters ({
            getTheme: "getTheme",
            getLanguage: "getLanguage"
        }),
        // dataGrid() {
        //     return this.$refs[dataGridRef].instance;
        // },
    },
    mounted() {
        this.setHeaderTitle();
        this.setGridData();
    },
    watch:{
        selectedCurrentDate(){
            this.setHeaderTitle();
            this.setGridData();
        }
    },
    methods: {
        setHeaderTitle(){
            this.ui.currentDateTitle = `${this.selectedCurrentDate.substring(6,7)}월 축별 토크 적산값 이상 경고 카운팅`
            if(this.selectedCurrentDate.substring(6,7) == 1){
                this.ui.beforeDateTitle = '12월 축별 토크 적산값 이상 경고 카운팅'
            }
            else{
                this.ui.beforeDateTitle = `${this.selectedCurrentDate.substring(6,7)-1}월 축별 토크 적산값 이상 경고 카운팅`
            }
        },
        exportDataGrid(){
            const doc = new jsPDF();
            exportDataGridToPdf({
                jsPDFDocument: doc,
                component: this.$refs[dataGridRef].instance,
            }).then(() => {
                doc.save('Customers.pdf');
            });
        },
        changeGridCell(event){
            event
            // let styleTest = document.getElementById('gridCurrent')
            // styleTest.classList.remove('changeCellColor')
            // for(let el of styleTest) {
            //     el.classList.remove('changeCellColor')
            // }
            // event.cellElement[0].classList.toggle('changeCellColor')
            // console.log(event)
        },
        clickGridCell(data){
            this.$emit('showGridData', data)
            data.component.focus(data.cellElement)
        },
        setGridData(){
            this.datas.gridCurrentData = [];
            this.datas.gridCurrentData.push({
                robot : "L1",
                no : 1,
                axis1 : 1,
                axis2 : 2,
                axis3 : 3,
                axis4 : 4,
                axis5 : 5,
                axis6 : 6,
                dangerLevel: '하',
                description: ""
            },
            {
                robot : "R1",
                no : 2,
                axis1 : 11,
                axis2 : 12,
                axis3 : 13,
                axis4 : 14,
                axis5 : 15,
                axis6 : 16,
                dangerLevel: "중",
                description: "",
            },
            {
                robot : "L2",
                no : 3,
                axis1 : 1,
                axis2 : 2,
                axis3 : 3,
                axis4 : 4,
                axis5 : 5,
                axis6 : 6,
                dangerLevel: "하",
                description: "",
            },
            {
                robot : "R2",
                no : 4,
                axis1 : 11,
                axis2 : 12,
                axis3 : 13,
                axis4 : 14,
                axis5 : 15,
                axis6 : 16,
                dangerLevel: "중",
                description: "",
            },
            )
        }
    }
}
</script>

<style>
.gridContainer {
    display:flex
}
.dx-theme-background-color  {
  background-color: green;
}
.currentTitleBar {
    color: hsl(36, 33%, 97%);
    font-size: medium;
    margin-bottom: 5px;
}
.beforeTitleBar {
    color: hsl(36, 33%, 97%);
    font-size: medium;
    margin-bottom: 5px;
}
.gridBefore {
    margin-left: 20px
}
.dx-header-row .axis-highlighted {
    background-color: #d4d4c6;
    opacity:0.6;
    color: black;
    font-weight: bold;
}
.dx-header-row .danger-highlighted {
    background-color: #ff9b52;
    opacity:0.6;
    color: black;
    font-weight: bold;
}
.dx-header-row .description-highlighted {
    background-color: #6199e6;
    opacity:0.6;
    color: black;
    font-weight: bold;
}
.dx-datagrid-focus-overlay {
    border: 2px solid rgb(218, 78, 78);
}

</style>
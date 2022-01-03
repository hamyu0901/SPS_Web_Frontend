<template>
    <v-card id="atomizerDataChart" v-bind="[getChartId, getChartOutputType, getChartXAxisType, getChartDatas]">
        <div :id="datas.chartId"></div>
    </v-card>
</template>

<script>
export default {
    props: ['chartId', 'chartOutputType', 'chartXAxisType', 'chartDatas'],
    data() {
        return {
            ui: {
                default: {
                    backgroundColor: "",
                    title: "",
                    verticalAlign: "",
                    fontColor: "",
                    fontWeight: "",
                    fontSize: "",
                    animationEnabled: "",
                    zoomEnabled: ""
                },
                axis: {
                    tickLength: "",
                    tickThickness: "",
                    labelFontColor: "",
                    labelFontSize: "",
                    axisX: {
                        lineColor: "",
                        labelWrap: "",
                        labelAutoFit: "",
                        labelAngle: "",
                        interval: ""
                    },
                    axisY: {
                        lineThickness: "",
                        gridDashType: "",
                        gridColor: ""
                    },
                },
                legend: {
                    verticalAlign: "", 
                    fontColor: ""
                },
                dataPoints: {
                    type: "",
                    lineThickness: "",
                    showInLegend: "",
                    visible: "",
                    names: {
                        cmd: "",
                        feedback: ""
                    },
                    colors: {
                        cmd: "",
                        feedback: ""
                    }
                }
            },
            datas: {
                chart: null,
                chartId: "",
                chartOutputType: "",
                chartXAxisType: "",
                chartDatas: [],
                chartOptions: {}
            }
        }
    },

    created() {
        this.initializeUI();
        this.initChartOptions();
    },

    mounted() {
        this.initializeStyle();
    },

    computed: {
        getChartId() {
            if(this.chartId !== "") {
                this.datas.chartId = this.chartId;
            }
        },

        getChartOutputType() {
            if(this.chartOutputType !== "") {
                this.datas.chartOutputType = this.chartOutputType;
            }
        },

        getChartXAxisType() {
            if(this.chartXAxisType !== "") {
                this.datas.chartXAxisType = this.chartXAxisType;
            }
        },

        getChartDatas() {
            if(this.chartDatas.length > 0) {
                this.datas.chartDatas = this.chartDatas;
                this.setChartDatas(this.datas.chartDatas);
            }
            else {
                this.initChartDatas();
            }
        }
    },

    methods: {
        initializeUI() {
            this.ui.default.backgroundColor = this.$style.diagnostics.atomizerDataChartBackgroundColor;
            this.ui.default.title = this.$t(`diagnostics.atomizerdata.child.atomizerDataChart.defaultTextMessage`);
            this.ui.default.verticalAlign = "center";
            this.ui.default.fontColor = this.$style.diagnostics.atomizerDataChartFontColor;
            this.ui.default.fontWeight = "lighter";
            this.ui.default.fontSize = 18;
            this.ui.default.animationEnabled = true;
            this.ui.default.zoomEnabled = true;

            this.ui.axis.tickLength = 15;
            this.ui.axis.tickThickness = 0;
            this.ui.axis.labelFontColor = this.$style.diagnostics.atomizerDataChartAxisLabelFontColor;
            this.ui.axis.labelFontSize = 12;

            this.ui.axis.axisX.lineColor = this.$style.diagnostics.atomizerDataChartAxisXLineColor;
            this.ui.axis.axisX.labelWrap = false;
            this.ui.axis.axisX.labelAutoFit = true;
            this.ui.axis.axisX.labelAngle = 0;
            this.ui.axis.axisX.interval = 3;

            this.ui.axis.axisY.lineThickness = 0;
            this.ui.axis.axisY.gridDashType = "dash";
            this.ui.axis.axisY.gridColor = this.$style.diagnostics.atomizerDataChartAxisYGridColor;

            this.ui.legend.verticalAlign = "top";
            this.ui.legend.fontColor = this.$style.diagnostics.atomizerDataChartLegendFontColor;
            
            this.ui.dataPoints.type = "line";
            this.ui.dataPoints.lineThickness = 2;
            this.ui.dataPoints.showInLegend = true;
            this.ui.dataPoints.visible = true;
            this.ui.dataPoints.names.cmd = this.$t(`diagnostics.atomizerdata.child.atomizerDataChart.dataPointName.cmd`);
            this.ui.dataPoints.names.feedback = this.$t(`diagnostics.atomizerdata.child.atomizerDataChart.dataPointName.feedback`);
            this.ui.dataPoints.colors.cmd = this.$style.diagnostics.atomizerDataChartDataPointsColors.cmd;
            this.ui.dataPoints.colors.feedback = this.$style.diagnostics.atomizerDataChartDataPointsColors.feedback;
        },

        initializeStyle() {
            const chartStyle = document.querySelector("#"+this.datas.chartId);
            chartStyle.style.height = "100%";
            chartStyle.style.width = "100%";

            const torqueDataChartCard = document.querySelector("#atomizerDataChart");
            torqueDataChartCard.style.height = "480px";
            torqueDataChartCard.style.border = "solid 1px" + this.$style.common.cardItemBorderColor;

        },

        initChartDatas() {
            this.datas.chartDatas = [];
            this.datas.chartOptions.data = [];
            this.renderChart();
        },

         setSubTitle() {
            if(this.datas.chartOptions.data.length === 0) {
                this.datas.chartOptions.subtitles.push({
                    text: this.ui.default.title,
                    verticalAlign : this.ui.default.verticalAlign,
                    fontColor: this.ui.default.fontColor,
                    fontWeight: this.ui.default.fontWeight,
                    fontSize: this.ui.default.fontSize
                })
            }
            else {
                this.datas.chartOptions.subtitles = [];
            }
        },

        initChartOptions() {
            this.datas.chartOptions = {
                animationEnabled: this.ui.default.animationEnabled,
                zoomEnabled: this.ui.default.zoomEnabled,
                subtitles: [],
                axisX: {
                    tickLength: this.ui.axis.tickLength,
                    tickThickness: this.ui.axis.tickThickness,
                    lineColor: this.ui.axis.axisX.lineColor,
                    labelFontColor: this.ui.axis.labelFontColor,
                    labelFontSize: this.ui.axis.labelFontSize,
                },
                axisY: {
                    tickLength: this.ui.axis.tickLength,
                    tickThickness: this.ui.axis.tickThickness,
                    lineThickness: this.ui.axis.axisY.lineThickness,
                    labelFontColor: this.ui.axis.labelFontColor,
                    labelFontSize: this.ui.axis.labelFontSize,
                    gridDashType: this.ui.axis.axisY.gridDashType,
                    gridColor: this.ui.axis.axisY.gridColor,
                },
                legend: {
                    verticalAlign: this.ui.legend.verticalAlign, 
                    fontColor: this.ui.legend.fontColor
                },
                backgroundColor:this.ui.default.backgroundColor,
                data: []
            }
            this.renderChart();
        },

        renderChart() {
            this.$nextTick(() => {
                this.setSubTitle();
                if(this.datas.chart === null) {
                    this.datas.chart = new this.$chart.Chart(this.chartId, this.datas.chartOptions);
                }
                this.datas.chart.render();
            })
        },

        setChartDatas(chartDatas) {
            let axisXLabels = this.setLabels(chartDatas);
            let atomizerDatas = this.setAtomizerDatas(chartDatas, axisXLabels);
            this.datas.chartOptions.data = [];
            this.datas.chart = null;
            this.datas.chartOptions.data.push(
                {
                    type: this.ui.dataPoints.type,
                    color: this.ui.dataPoints.colors.cmd,
                    name:  this.ui.dataPoints.names.cmd,
                    showInLegend: this.ui.dataPoints.showInLegend,
                    visible: this.ui.dataPoints.visible,
                    dataPoints: atomizerDatas.cmd
                },
                {
                    type: this.ui.dataPoints.type,
                    color: this.ui.dataPoints.colors.feedback,
                    name: this.ui.dataPoints.names.feedback,
                    showInLegend: this.ui.dataPoints.showInLegend,
                    visible: this.ui.dataPoints.visible,
                    dataPoints: atomizerDatas.feedback
                }
            )   
            this.renderChart();         
        },

        setLabels(chartDatas) {
            let labels = [];
            chartDatas.forEach(chartData => {
                labels.push(chartData[this.datas.chartXAxisType.id]);
            })
            return labels;
        },

        setAtomizerDatas(chartDatas, axisXLabels) {
            let atomizerDatas = {cmd: [], feedback: []};
            let cmd = this.datas.chartOutputType.id + "_cmd";
            let feedback = this.datas.chartOutputType.id + "_feedback";
            chartDatas.forEach((chartData, index) => {
                if(chartData[cmd] !== undefined) {
                    atomizerDatas.cmd.push({label: axisXLabels[index], y: chartData[cmd]});
                }
                if(chartData[feedback] !== undefined) {
                    atomizerDatas.feedback.push({label: axisXLabels[index], y: chartData[feedback]});
                }
            })
            return atomizerDatas;
        }
    }
}
</script>

<style scoped>
   
</style>
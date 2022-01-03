<template>
    <v-card :height="ui.height" v-bind="[getId, getRobotType, getTitle, getHeight, getRobotInfo]" :color="ui.default.backgroundColor" elevation="0">
        <v-card-text v-bind:style="ui.titleStyle">{{ui.title}}</v-card-text>
        <div :id="datas.chartId"></div>
    </v-card>
</template>

<script>
export default {
    props:['id', 'robotType', 'title', 'height', 'robotInfo'],
    data() {
        return {
            ui: {
                title: "",
                titleStyle: null,
                height: "",
                default: {
                    backgroundColor: "",
                    title: "",
                    verticalAlign: "",
                    fontColor: "",
                    fontWeight: "",
                    fontSize: ""
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
                chartId: null,
                robotType: null,
                robotInfo: null,
                atomizerDatas: {
                    flow: "flow",
                    sa_s: "sa_s",
                    hvolt: "hv",
                    turbin_speed: "turbin_speed",
                    swirl: "swirl",
                    maskingunitspeed: "masking_unit_speed",
                    pressure: "pressure"
                },
                chartDatas: [],
                chartOptions: {},
            },
            handler: {
                update: null
            }
        }
    },

    created() {
        this.initializeUI();
        
    },

    mounted() {
        this.initChartOptions();
        this.handler.update = setInterval(this.getChartDatas, 1000);
    },

    destroyed() {
        clearInterval(this.handler.update);
        this.handler.update = null;
    },

    computed: {
        getId() {
            if(this.id !== "") {
                this.datas.chartId = this.id;
            }
        },

        getRobotType() {
            if(this.robotType !== "") {
                this.datas.robotType = this.robotType;
            }
        },

        getTitle() {
            if(this.title !== "") {
                this.ui.title = this.title;
            }
        },

        getHeight() {
            if(this.height !== "") {
                this.ui.height = this.height;
            }
        },

        getRobotInfo() {
            if(this.robotInfo !== null) {
                this.datas.robotInfo = this.robotInfo;
            }
        }    
    },

    methods: {
        initializeUI() {
            this.ui.titleStyle = this.$style.common.titleObjectItemColor;

            this.ui.default.backgroundColor = this.$style.monitoring.atomizerRealTimeChartBackgroundColor;
            this.ui.default.title = this.$t(`monitoring.child.robotDetail.child.atomizerRealtimeChart.defaultTextMessage`);
            this.ui.default.verticalAlign = "center";
            this.ui.default.fontColor = this.$style.monitoring.atomizerRealTimeChartDefaultFontColor;
            this.ui.default.fontWeight = "lighter";
            this.ui.default.fontSize = 18;

            this.ui.axis.tickLength = 15;
            this.ui.axis.tickThickness = 0;
            this.ui.axis.labelFontColor = this.$style.monitoring.atomizerRealTimeChartAxisLabelColor;
            this.ui.axis.labelFontSize = 12;

            this.ui.axis.axisX.lineColor = this.$style.monitoring.atomizerRealTimeChartXAxisLineColor;
            this.ui.axis.axisX.labelWrap = false;
            this.ui.axis.axisX.labelAutoFit = true;
            this.ui.axis.axisX.labelAngle = 0;
            this.ui.axis.axisX.interval = 3;

            this.ui.axis.axisY.lineThickness = 0;
            this.ui.axis.axisY.gridDashType = "dash";
            this.ui.axis.axisY.gridColor = this.$style.monitoring.atomizerRealTimeChartYAxisGridColor;

            this.ui.legend.verticalAlign = "top";
            this.ui.legend.fontColor = this.$style.monitoring.atomizerRealTimeChartLegendFontColor;
            
            this.ui.dataPoints.type = "line";
            this.ui.dataPoints.lineThickness = 2;
            this.ui.dataPoints.showInLegend = true;
            this.ui.dataPoints.visible = true;
            this.ui.dataPoints.names.cmd = this.$t(`monitoring.child.robotDetail.child.atomizerRealtimeChart.dataPointName.cmd`);
            this.ui.dataPoints.names.feedback = this.$t(`monitoring.child.robotDetail.child.atomizerRealtimeChart.dataPointName.feedback`);
            this.ui.dataPoints.colors.cmd = this.$style.monitoring.atomizerRealTimeChartDataPointColors.cmd;
            this.ui.dataPoints.colors.feedback = this.$style.monitoring.atomizerRealTimeChartDataPointColors.feedback;
                
        },

        initChartDatas() {
            this.datas.chartDatas = [];
            this.datas.chartOptions.data = [];
            this.datas.chart = null;
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
                height: this.ui.height - 35,
                subtitles: [],
                axisX: {
                    tickLength: this.ui.axis.tickLength,
                    tickThickness: this.ui.axis.tickThickness,
                    lineColor: this.ui.axis.axisX.lineColor,
                    labelFontColor: this.ui.axis.labelFontColor,
                    labelFontSize: this.ui.axis.labelFontSize,
                    labelWrap: this.ui.axis.axisX.labelWrap,
                    labelAutoFit: this.ui.axis.axisX.labelAutoFit,
                    labelAngle: this.ui.axis.axisX.labelAngle,
                    interval: this.ui.axis.axisX.interval
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
            this.setSubTitle();
            if(this.datas.chart === null) {
                this.datas.chart = new this.$chart.Chart(this.datas.chartId, this.datas.chartOptions);
            }
            this.datas.chart.render();
        },

        getChartDatas() {
            if(this.datas.chartId !== null && this.datas.robotType !== null && this.datas.robotInfo !== null) {
               if(this.datas.robotType === 1) { // painter
                    this.$http.post(`/robotdetails/robotinfo/trend/`+ this.datas.chartId, this.datas.robotInfo).then((result) => {
                        if(result.data.length > 0) {
                            this.setDatas(this.datas.chartId, result.data);
                        }
                    }).catch((error) => {
                        this.$log.error(error);
                    })
               }
               else if(this.datas.robotType === 2) { // sealer
                     this.$http.post(`/robotdetails/robot/trend/sealer/`+ this.datas.chartId, this.datas.robotInfo).then((result) => {
                        if(result.data.length > 0) {
                            this.setDatas(this.datas.chartId, result.data);
                        }
                    }).catch((error) => {
                        this.$log.error(error);
                    })              
               }
           }
        },

        setChartDatas(chartDatas) {
            this.datas.chartOptions.data = [];
            this.datas.chartOptions.data.push(
                {
                    type: this.ui.dataPoints.type,
                    lineThickness: this.ui.dataPoints.lineThickness,
                    showInLegend: this.ui.dataPoints.showInLegend,
                    visible: this.ui.dataPoints.visible,
                    name: this.ui.dataPoints.names.cmd,
                    color: this.ui.dataPoints.colors.cmd,
                    dataPoints: chartDatas.cmds
                },
                {
                    type: this.ui.dataPoints.type,
                    lineThickness: this.ui.dataPoints.lineThickness,
                    showInLegend: this.ui.dataPoints.showInLegend,
                    visible: this.ui.dataPoints.visible,
                    name: this.ui.dataPoints.names.feedback,
                    color: this.ui.dataPoints.colors.feedback,
                    dataPoints: chartDatas.feedbacks
                }
            )
            this.renderChart();
        },

        setDatas(chartId, chartDatas) {
            let datas = {
                cmds: [],
                feedbacks: []
            };
            chartDatas.forEach((data, index) => {
                let date = data.date_trunc.split("T")[1].split(".")[0];
                datas.cmds.push(
                {label:date, y: Number(data[this.datas.atomizerDatas[chartId]+"_cmd"])}
                );
                datas.feedbacks.push(
                    {label:date, y: Number(data[this.datas.atomizerDatas[chartId]+"_feedback"])}
                );
            })
            this.setChartDatas(datas);
        },    
    }
}
</script>

<style scoped>
</style>
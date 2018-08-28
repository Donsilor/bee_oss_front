<template>
	<div class="page-content cloud-page">
		<div style="position: relative; margin-bottom: 30px">
			<el-date-picker v-model="select_date" @change="changeSelectDate" placeholder="今天">
			</el-date-picker>
			<el-select v-model="channel" placeholder="频道" @change="channelChange">
				<el-option label="Router" value="Router"></el-option>
				<el-option label="Cloud" value="Cloud"></el-option>
			</el-select>
			<el-button class="btn-right" type="text" @click="goBack">
				<<&nbsp;返回</el-button>
		</div>
		<el-row :gutter="24">
			<div id="charts-con" style="width: 100%; height: 500px"></div>
		</el-row>
	</div>
</template>
<script>
import echarts from "echarts";
import { mapActions } from "vuex";
import "../../lib/util";
import API from "../../service/index";
export default {
    data() {
        return {
            channel: "Router",
            select_date: new Date()
        };
    },
    mounted() {
        this.initEchart();
        this.changeSelectDate();
    },
    methods: {
        channelChange() {
            this.changeSelectDate();
        },
        changeSelectDate() {
            let obj = this;
            API.logRegDatas({ select_date: obj.select_date, channel: obj.channel }).then(result => {
                if (result.data && result.data.result.data) {
                    let datas = result.data.result.data;
                    let Xarrs = [];
                    let dataObj = {
                        login: {
                            title: "阶段用户登录数",
                            value: []
                        },
                        login_all: {
                            title: "用户登录总数",
                            value: []
                        },
                        register: {
                            title: "阶段用户注册数",
                            value: []
                        },
                        register_all: {
                            title: "用户注册总数",
                            value: []
                        }
                    };
                    datas.forEach(item => {
                        let currentTime = new Date(item["start_stat_time"]);
                        Xarrs.push(currentTime.Format("hh:mm:ss"));
                        dataObj["login"].value.push(item["logined_total_num"]);
                        dataObj["login_all"].value.push(item["logined_total_num_all"]);
                        dataObj["register"].value.push(item["registered_total_num"]);
                        dataObj["register_all"].value.push(item["registered_total_num_all"]);
                    });
                    obj.renderEchart(Xarrs, dataObj);
                }
            });
        },
        initEchart() {
            this.alertChart = echarts.init(document.getElementById("charts-con"));
        },
        renderEchart(Xarrs, dataObj) {
            let curSeries = [];
            let curLengen = [];
            for (let attr in dataObj) {
                curLengen.push(dataObj[attr].title);
                curSeries.push({
                    name: dataObj[attr].title,
                    type: "line",
                    data: dataObj[attr].value,
                    markPoint: {
                        data: [{ type: "max", name: "最大值" }, { type: "min", name: "最小值" }]
                    },
                    markLine: {
                        data: [{ type: "average", name: "平均值" }]
                    }
                });
            }

            this.alertChart.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: "category",
                    data: Xarrs,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: "数量",
                    type: "value",
                    // boundaryGap: [0, '100%'],
                    splitLine: {
                        show: true
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ["line", "bar"] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    show: true,
                    data: curLengen
                },
                series: curSeries
            });
        },
        goBack() {
            history.go(-1);
        }
    },
    components: {},
    ...mapActions(["logRegDatas"])
};
</script>
<style lang="less">
.cloud-page {
    .btn-right {
        position: absolute;
        right: 20px;
        top: 10px;
    }
}
</style>

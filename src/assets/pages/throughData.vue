<template>
	<div class="page-content cloud-page">
		<el-date-picker
				v-model="select_date"
				@change="changeSelectDate"
				placeholder="今天"
		>
		</el-date-picker>
		<div class="allThrougtData" style="margin-top: 15px">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane :label="'APP在线 ('+numAll.app_num+')'" name="1"></el-tab-pane>
				<el-tab-pane :label="'路由器在线 ('+numAll.router_num+')'" name="2"></el-tab-pane>
				<el-tab-pane :label="'用户注册 ('+numAll.registered_total_num+')'" name="3"></el-tab-pane>
				<el-tab-pane :label="'用户登录 ('+numAll.logined_total_num+')'" name="4"></el-tab-pane>
				<el-tab-pane :label="'家庭统计 ('+numAll.family_total+')'" name="5"></el-tab-pane>
				<el-tab-pane :label="'子设备统计 ('+numAll.device_total+')'" name="7"></el-tab-pane>
				<el-tab-pane :label="'设备操作统计 ('+numAll.device_op_num+')'" name="8"></el-tab-pane>
			</el-tabs>
		</div>
		<el-row :gutter="24">
			<el-col :span="2">&nbsp;</el-col>
			<el-col :span="20">
				<div id="charts-con" style="width: 100%"></div>
			</el-col>
			<el-col :span="2">&nbsp;</el-col>
		</el-row>
	</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {mapActions} from 'vuex';
export default {
	data () {
		return {
            activeName: '1',
            select_date: new Date(),
            numAll: {
                app_num: 0,
                router_num: 0,
                registered_total_num: 0,
                logined_total_num: 0,
                family_total: 0,
                device_total: 0,
                device_op_num: 0
			}
		}
	},
	mounted () {
	    this.getFirstDatas()
	},
	methods: {
        renderAppChart () {

		},
	    getFirstDatas () {
            let obj = this
            obj.$store.dispatch('throughDatas',{select_date: obj.select_date}).then((result) => {
                if (result) {
                    for (let attr in obj.numAll) {
                        obj.numAll[attr] = result[attr]
					}
					obj.renderAppChart()
				}
            })
		},
        changeSelectDate () {
            this.getFirstDatas()
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
        renderEchart (data) {
            this.alertChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return `${date.Format('yyyy/MM/dd hh:mm')} ${params.value[1]}`;
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: "报警次数",
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: '次数',
                        type: 'line',
                        data: data
                    }
                ]
            })
        },
        handleClick () {

		}
	},
	components: {},
    ...mapActions([
        'throughDatas',
        'deviceTotals',
		'onlineLogs'
    ])
}
</script>
<style lang="less">
.cloud-page{
 .el-tabs__active-bar{
	 height: 2px;
 }
}
</style>
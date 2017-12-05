<template>
	<div class="page-content cloud-page">
		<div style="position: relative">
			<el-date-picker
					v-model="select_date"
					@change="changeSelectDate"
					placeholder="今天"
			>
			</el-date-picker>
			<el-select v-model="channel" placeholder="频道" @change="channelChange">
				<el-option label="Router" value="Router"></el-option>
				<el-option label="Cloud" value="Cloud"></el-option>
			</el-select>
			<el-button class="btn-right" type="text" @click="goBack"><<&nbsp;返回</el-button>
		</div>
		<el-row :gutter="24">
			<div id="charts-con" style="width: 100%; height: 500px"></div>
		</el-row>
	</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {mapActions} from 'vuex';
import '../../lib/util'
export default {
	data () {
		return {
            channel: 'Router',
            select_date: new Date()
		}
	},
	mounted () {
        this.initEchart()
	    this.changeSelectDate()
	},
	methods: {
        channelChange () {
			this.changeSelectDate()
		},
        changeSelectDate () {
			let obj = this
            obj.$store.dispatch('logRegDatas',{select_date: obj.select_date, channel: obj.channel}).then((result) => {
                if (result.data && result.data.result.data) {
                    let datas = result.data.result.data
                    let Xarrs = []
                    let Apparrs = []
                    let Routerarrs = []
                    datas.forEach((item) => {
                        let currentTime = new Date(item['start_stat_time'])
                        Xarrs.push(currentTime.Format('hh:mm:ss'))
                        Routerarrs.push(item['router_num'])
                        Apparrs.push(item['app_num'])
                    })
                    obj.renderEchart(Xarrs, Apparrs, Routerarrs)
                }
            })
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
        renderEchart (Xarrs, Apparrs, Routerarrs) {
            this.alertChart.setOption({
                tooltip: {
                    trigger: 'axis',
//                    formatter: function (params) {
//                        params = params[0];
//                        var date = new Date(params.name);
//                        return `${date.Format('yyyy/MM/dd hh:mm')} ${params.value[1]}`;
//                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'category',
                    data: Xarrs,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: "数量",
                    type: 'value',
                    // boundaryGap: [0, '100%'],
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        name: '在线APP数',
                        type: 'line',
                        data: Apparrs,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '在线路由数',
                        type: 'line',
                        data: Routerarrs,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            })
        },
        goBack () {
            history.go(-1)
		}
	},
	components: {},
    ...mapActions([
		'logRegDatas'
    ])
}
</script>
<style lang="less">
.cloud-page{
	.btn-right{
		position: absolute;
		right: 20px;
		top:10px
	}
}
</style>
<template>
	<div class="page-content cloud-page">
		<div style="position: relative; margin-bottom: 30px">
			<el-date-picker
					v-model="select_date"
					@change="changeSelectDate"
					placeholder="今天"
			>
			</el-date-picker>
			<el-button class="btn-right" type="text" @click="goBack"><<&nbsp;返回</el-button>
		</div>
		<el-row :gutter="24">
			<div id="charts-con" style="width: 100%; height: 500px"></div>
		</el-row>
	</div>
</template>
<script>
import echarts from 'echarts';
import {mapActions} from 'vuex';
import '../../lib/util'
export default {
	data () {
		return {
            activeName: '1',
            select_date: new Date(),
            alertChart: null
		}
	},
	mounted () {
        this.initEchart()
	    this.changeSelectDate()
	},
	methods: {
        changeSelectDate () {
			let obj = this
            obj.$store.dispatch('onlineLogs',{select_date: obj.select_date}).then((result) => {
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
                title: {
                    text: '',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis',
//                    formatter: function (params) {
//                        params = params[0];
//                        var date = new Date(params.name);
//                        return `${date.Format('yyyy/MM/dd hh:mm')} ${params.value[1]}`;
//                    },
//                    axisPointer: {
//                        animation: false
//                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    show: true,
                    data: ['APP在线数','路由在线数']
                },
                xAxis: {
                    type: 'category',
					data: Xarrs,
                    splitLine: {
                        show: false
                    }
                },
                grid: {
                    top:80
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
                        name: 'APP在线数',
                        type: 'line',
                        data: Apparrs,
                        itemStyle: {
                            normal: {
                                color: '#81c0c0'
                            }
                        },
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
                        name: '路由在线数',
                        type: 'line',
                        data: Routerarrs,
                        itemStyle: {
                            normal: {
                                color: '#666'
                            }
                        },
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
        'deviceTotals',
		'onlineLogs'
    ])
}
</script>
<style lang="less">
.cloud-page{
	.btn-right{
		position: absolute;
		right: 0px;
		top:10px
	}
}
</style>
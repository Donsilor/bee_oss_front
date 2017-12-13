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
            alertChart: null,
            allTypes: {
                1: '空调',
                2: '窗帘',
                3: '电视',
                4: '电饭煲',
                5: '灯',
                6: '电子秤',
                7: '摄像头',
                8: '智能开关',
                9: '空气质量检测仪',
                10: '温湿度计',
                11: '路由器',
                12: '门窗传感器',
                13: '红外传感器',
                14: '可视对讲'
			}
		}
	},
	mounted () {
        this.initEchart()
	    this.changeSelectDate()
	},
	methods: {
        changeSelectDate () {
			let obj = this
            obj.$store.dispatch('deviceTotals',{select_date: obj.select_date}).then((result) => {
                if (result.data && result.data.length) {
                    let datas = result.data
					let Xarrs = []
					let dataArrs = []
                    datas.forEach((item) => {
                        Xarrs.push(obj.filterType(item['F_category_id']))
                        dataArrs.push(item['count'])
					})
                    obj.renderEchart(Xarrs, dataArrs)
				}
            })
		},
        initEchart () {
            this.alertChart = echarts.init(document.getElementById('charts-con'));
        },
        renderEchart (Xarrs, dataArrs) {
            this.alertChart.setOption({
                tooltip: {
                    position: [10, 10],
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
				grid: {
                    top:80
				},
                legend: {
                    show: true,
                    data: ['子设备按分类统计']
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
                xAxis: {
                    type: 'category',
					data: Xarrs,
//                    splitLine: {
//                        show: false
//                    }
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
                        name: '子设备按分类统计',
                        type: 'bar',
                        data: dataArrs,
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
                    }
                ]
            })
        },
        goBack () {
            history.go(-1)
		},
        filterType (val) {
            return this.allTypes[val]
		}
	},
	components: {},
    ...mapActions([
        'deviceTotals'
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
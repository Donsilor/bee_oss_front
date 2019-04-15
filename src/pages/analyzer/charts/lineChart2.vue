<template>
	<div :class="className" :id="id" :title="title" :style="{height:height,width:width}"/>
</template>

<script>
	import echarts from 'echarts'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			title: {
				type: String,
				default: ''
			},
			result: {
				type: Object,
				default () {
					return {}
				}
			},
			width: {
				type: String,
				default: '100%'
			},
			id: {
				type: String,
				default: 'chart'
			},
			height: {
				type: String,
				default: '300px'
			},
			xAxisData: {
				type: Array,
				default: [1]
			},
			chartData: {
				type: Array,
				default: [1]
			},
			chartData2: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				chart: null,
				legendData: [],
				seriesData: []
			}
		},
		mounted () {},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				let option = {
					title: {
						text: this.title,
						textStyle: {
							fontWeight: 'bolder',
							fontSize: 14,
							color: '#666666'
						},
						left: '1%'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						bottom: 0,
						icon: 'rect',
						itemWidth: 14,
						itemHeight: 5,
						itemGap: 25,
						data: ['单日', '30日'],
						left: 'center',
						textStyle: {
							fontSize: 12
						}
					},
					grid: {
						top: 50,
						left: '2%',
						right: '6%',
						bottom: '8%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: this.xAxisData
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: '单日',
						type: 'line',
						data: this.chartData
					}]
				}
				if (this.chartData2) {
					option.series.push(
						{
							name: '30日',
							type: 'line',
							data: this.chartData2
						}
					)
				}
				this.chart = echarts.init(document.getElementById(this.id))
				this.chart.setOption(option)
			}
		}
	}
</script>

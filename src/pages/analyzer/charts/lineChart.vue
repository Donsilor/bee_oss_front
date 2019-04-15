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
	}
  },
  data() {
    return {
      chart: null
    }
  },
//  mounted() {
//  	console.log(888, this.xAxisData, this.chartData)
//	this.initChart()
//  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const option = {
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
			  data: ['pageA', 'pageB', 'pageC'],
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
			  name: 'pageA',
			  type: 'line',
			  data: this.chartData
		  }]
	  }
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(option)
    }
  }
}
</script>

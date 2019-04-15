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
	}
  },
  data() {
    return {
      chart: null,
      legendData: [],
      xAxisData: [],
      seriesData: []
    }
  },
  watch: {
    result () {
      let obj = {}
      for (let key in this.result) {
        this.xAxisData.push(key)
        this.result[key].forEach((element, index) => {
          if (!obj[element.F_category_id_map]) {
            obj[element.F_category_id_map] = []
            obj[element.F_category_id_map].push(element.F_app)
          } else {
            obj[element.F_category_id_map].push(element.F_app)
          }
        })
      }
      for (let key in obj) {
        this.legendData.push(key)
        this.seriesData.push({
          name: key,
          type: 'line',
          data: obj[key]
        })
      }
      this.initChart()
      console.log(this.result, 'this.result4444')
    }
  },
<<<<<<< HEAD
  mounted() {
    // 
  },
=======
//  mounted() {
//  	console.log(888, this.xAxisData, this.chartData)
//	this.initChart()
//  },
>>>>>>> c64501e1382839aef2957f2402ce20ac473e2802
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
<<<<<<< HEAD
      this.chart.setOption({
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
          data: this.legendData,
          left: 'center',
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
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
        series: this.seriesData
      })
=======
      this.chart.setOption(option)
>>>>>>> c64501e1382839aef2957f2402ce20ac473e2802
    }
  }
}
</script>

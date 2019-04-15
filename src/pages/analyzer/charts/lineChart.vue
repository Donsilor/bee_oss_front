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
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
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
          data: ['pageA', 'pageB', 'pageC'],
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'pageA',
          type: 'line',
          data: [0, 52, 200, 334, 390, 330, 220]
        }, {
          name: 'pageB',
          type: 'line',
          data: [80, 52, 20, 304, 690, 1330, 20]
        }, {
          name: 'pageC',
          type: 'line',
          data: [30, 52, 150, 334, 630, 220, 120]
        }]
      })
    }
  }
}
</script>

<template>
  <div :class="className" :title="title" :barColor="barColor" :rotate="rotate" :id="id" :style="{height:height,width:width}"/>
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
    barColor: {
      type: String,
      default: '#3AA0FF'
    },
    rotate: {
      type: String,
      default: '0'
    },
    result: {
      type: Array,
      default () {
        return []
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
    }
  },
  watch: {
    result () {
	  this.xAxisData = [];
	  this.seriesData = [];
      for (let index = 0; index < this.result.length; index++) {
        this.xAxisData.push(this.result[index].F_category_id_map)
        this.seriesData.push(this.result[index].count)
      }
      this.initChart()
    }
  },
  data() {
    return {
      chart: null,
      xAxisData: [],
      seriesData: []
    }
  },
  mounted() {
    // console.log(this.result, 'kkkkkk')
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
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
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.xAxisData,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          axisLabel: {
            interval: 0,
            nameLocation: 'center',
            rotate: this.rotate,
            textStyle: {
              color: '#5D5D5D'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            },
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#5D5D5D'
            }
          },
          splitLine: {
            show: true,
            lineStyle:{
                type:'dashed'
            }
          }
        }],
        series: [{
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          itemStyle: {
            normal: {
              color: this.barColor
            }
          },
          data: this.seriesData
        }]
      })
    }
  }
}
</script>

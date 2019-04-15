<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
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
    }
  },
  data() {
    return {
      chart: null,
      xAxisData: [],
      legendData: [],
      seriesData: [{
        name: '',
        type: 'bar',
        stack: 'vistors',
        barWidth: '13%',
        data: []
      }]
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
            obj[element.F_category_id_map].push(element.F_cnt)
          } else {
            obj[element.F_category_id_map].push(element.F_cnt)
          }
        })
      }
      for (let key in obj) {
        this.legendData.push(key)
        this.seriesData.push({
          name: key,
          type: 'bar',
          stack: 'vistors',
          barWidth: '13%',
          data: obj[key]
        })
      }
      this.initChart()
    }
  },
  mounted() {
    
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
          text: '新增入网设备数（单位:个）',
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
          itemGap: 13,
          data: this.legendData,
          left: '4%',
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          align: 'left',
          // bottom: '3%',
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
        series: this.seriesData
      })
    }
  }
}
</script>

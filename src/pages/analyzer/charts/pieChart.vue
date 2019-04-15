<template>
  <div :class="className" :title="title" :barColor="barColor" :id="id" :style="{height:height,width:width}"/>
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
      legendData: [],
      seriesData: []
      // legendData: ['星络App', '路由器语音'],
      // seriesData: [{value: 20, name: '星络App'}, {value: 90, name: '路由器语音'}]
    }
  },
  watch: {
    result: {
      handler (newVal) {
        for (let key in newVal) {
          this.legendData.push(key=== 'app' ? '星络App' : '路由器语音')
          this.seriesData.push({
            value: newVal[key],
            name: key === 'app' ? '星络App' : '路由器语音'
          })
        }
        this.initChart()
      },
      deep: true 
    }
  },
  mounted() {
    // console.log(this.result, 'result')
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
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            // top: 'middle',
            icon: 'circle',
            bottom: 10,
            left: 'center',
            data: this.legendData
        },
        series: [{
          name:'分布情况',
          type: 'pie',
          radius : '65%',
          center: ['50%', '50%'],
          data: this.seriesData
        }]
      })
    }
  }
}
</script>

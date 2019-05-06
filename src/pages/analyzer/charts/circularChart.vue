<template>
  <div
    :id="id"
    :class="className"
    :title="title"
    :barColor="barColor"
    :style="{height:height,width:width}"
  />
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
      default() {
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
      seriesData: []
    }
  },
  watch: {
    result: {
      handler(newVal) {
        this.xAxisData = []
        this.seriesData = []
        for (let key in newVal) {
          this.xAxisData.push(key)
          this.seriesData.push({
            value: newVal[key],
            name: key
          })
        }
        this.initChart()
      },
      deep: true
    }
  },
  mounted() {
    // console.log(this.result, 'result2')
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
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
          // axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //   type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          // }
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          icon: 'circle',
          bottom: 10,
          left: 'center',
          // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          data: this.xAxisData
        },
        series: [{
          name: '分布情况',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '24',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          // itemStyle: {
          //   emphasis: {
          //     shadowBlur: 10,
          //     shadowOffsetX: 0,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)'
          //   }
          // },
          // data: [
          //   {value:335, name:'直接访问'},
          //   {value:310, name:'邮件营销'},
          //   {value:234, name:'联盟广告'},
          //   {value:135, name:'视频广告'},
          //   {value:1548, name:'搜索引擎'}
          // ]
          data: this.seriesData
        }]
      })
    }
  }
}
</script>

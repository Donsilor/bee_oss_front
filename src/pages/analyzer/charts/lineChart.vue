<template>
  <div
    :id="id"
    :class="className"
    :title="title"
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
  data () {
    return {
      chart: null,
      legendData: [],
      xAxisData: [],
      seriesData: []
    }
  },
  watch: {
    result () {
      this.xAxisData = []
      this.legendData = []
      this.seriesData = []
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
  mounted () {
    //
  },
  beforeDestroy () {
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
    }
  }
}
</script>

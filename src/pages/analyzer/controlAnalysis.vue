<template>
  <div class="page-content config-page">
    <!-- 过滤条件 -->
    <el-row>
      <el-col>
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker
              v-model="dateRange"
              :clearable="false"
              :picker-options="pickerOptions"
              placeholder="请选择时间段"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
            />
          </el-form-item>

          <!-- <el-form-item>
            <city-picker @change="onCitySelect"/>
          </el-form-item> -->

          <el-form-item style="margin-bottom:0">
            <el-button
              type="primary"
              @click="search"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 数据头部展示 -->
    <el-row>
      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>{{ equipmentAnalyzer.text }}</span>
              </el-col>
            </el-row>
            <div>{{ equipmentAnalyzer.totalCount }}</div>
            <div>截止到 {{ equipmentAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>{{ userAnalyzer.text }}</span>
              </el-col>
            </el-row>
            <div>{{ userAnalyzer.totalCount }}</div>
            <div>截止到 {{ userAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>{{ controlAnalyzer.text }}</span>
              </el-col>
            </el-row>
            <div>{{ controlAnalyzer.totalCount }}</div>
            <div>截止到 {{ controlAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 控制途径分布 && 网络制式分布 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col :span="12">
            <pie-chart
              id="pieChart1"
              :result="controlWay"
              title="控制途径分布"
              style="height:400px; width:100%;"
            />
          </el-col>
          <el-col :span="12">
            <!-- <circular-chart id="circularChart" title="网络制式分布" :result="networkType" style="height:400px; width:100%;"></circular-chart> -->
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 手机控制次数分析 && 手机控制人数分析 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col :span="12">
            <simple-chart
              id="chart1"
              :result="allAppNum"
              title="手机控制次数分析（单位：次）"
              rotate="45"
              style="height:400px; width:100%;"
            />
            <!-- <pie-chart id="pieChart111" title="手机控制次数分析（单位：次）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
          <el-col :span="12">
            <simple-chart
              id="chart12"
              :result="allAppUserNum"
              title="手机控制人数分析（单位：个）"
              rotate="45"
              bar-color="#68D388"
              style="height:400px; width:100%;"
            />
            <!-- <pie-chart id="pieChart11133" title="手机控制人数分析（单位：个）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 手机控制次数趋势图 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col>
            <line-chart
              id="phoneControlTimes"
              :result="tendencyArray"
              title="手机控制次数趋势图"
              rotate="0"
              style="height:400px; width:100%;"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 手机控制次数分析 && 手机控制人数分析 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col :span="12">
            <simple-chart
              id="voice-chart"
              :result="allRouterNum"
              title="语音控制次数分析（单位：次）"
              rotate="45"
              style="height:400px; width:100%;"
            />
            <!-- <pie-chart id="pieChart113sss1" title="语音控制次数分析（单位：次）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
          <el-col :span="12">
            <simple-chart
              id="voice-chart1"
              :result="allRouterUserNum"
              title="语音控制人数分析（单位：个）"
              rotate="45"
              bar-color="#68D388"
              style="height:400px; width:100%;"
            />
            <!-- <pie-chart id="pieChart113fff31" title="语音控制人数分析（单位：个）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import PieChart from './charts/pieChart.vue'
import SimpleChart from './charts/simpleChart.vue'
import LineChart from './charts/lineChart.vue'
import axios from 'axios'
import * as URL from '~/lib/api'
export default {
  components: {
    PieChart,
    SimpleChart,
    LineChart
  },
  data () {
    return {
      formdata: {
        date: '',
        province: '',
        city: ''
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近7天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      equipmentAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '累计入网设备数'
      },
      userAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '总控制用户数'
      },
      controlAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '总控制次数'
      },
      allAppNum: [],
      allAppUserNum: [],
      allRouterNum: [],
      allRouterUserNum: [],
      tendencyArray: {},
      networkType: {
        '2G': '',
        '3G': '',
        '4G': '',
        'WiFi': '',
        'other': ''
      },
      controlWay: {
        'app': '',
        'router': ''
      },
      dataRange: ''
    }
  },
  mounted () {
    this.getControlAnalysis()
    let end = new Date()
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
    this.equipmentAnalyzer.lastDate = this.formatDate(end)
    this.userAnalyzer.lastDate = this.formatDate(end)
    this.controlAnalyzer.lastDate = this.formatDate(end)
  },
  methods: {
    // 获取数据
    getControlAnalysis (param) {
      axios.post(URL.ControlAnalysisURL, param).then(res => {
        if (res.data.code === 200) {
          let result = res.data.result.data
          console.log(result, 'allRouterUserNum')
          this.equipmentAnalyzer.totalCount = result.summary.F_device || 0
          this.userAnalyzer.totalCount = result.summary.F_usr || 0
          this.controlAnalyzer.totalCount = result.summary.F_total || 0
          this.networkType['2G'] = result.summary.F_net_2G
          this.networkType['3G'] = result.summary.F_net_3G
          this.networkType['4G'] = result.summary.F_net_4G
          this.networkType['WiFi'] = result.summary.F_net_wifi
          this.networkType['other'] = result.summary.F_net_unknown
          this.controlWay['app'] = result.summary.F_chan_app
          this.controlWay['router'] = result.summary.F_chan_router
          this.tendencyArray = result.detail_data
          this.allAppNum = Object.values(result.category_data.F_app)
          this.allAppUserNum = Object.values(result.category_data.F_app_usr)
          this.allRouterNum = Object.values(result.category_data.F_router)
          this.allRouterUserNum = Object.values(result.category_data.F_router_usr)
          // 日期
        }
      })
    },
    // 选择开始结束日后 决定是否显示留存筛选的周月
    changeDate (date) {
      const start = date ? date[0].getTime() : ''
      const end = date ? date[1].getTime() : ''
      const diff = end - start
      // 至少2个月才显示月 至少2周才显示周
      this.isShowUnitMon = diff > 1000 * 3600 * 24 * 30 + 1000 * 3600 * 24 * 31
      this.isShowUnitWeek = diff > 1000 * 3600 * 24 * 7 * 2
    },
    onCitySelect (val) {
      this.formdata.province = val[0]
      this.formdata.city = val[1]
    },
    search () {
      const param = {
        start_time: this.dateRange[0].Format('yyyy-MM-dd'),
        end_time: this.dateRange[1].Format('yyyy-MM-dd')
      }
      this.equipmentAnalyzer.lastDate = param.end_time
      this.userAnalyzer.lastDate = param.end_time
      this.controlAnalyzer.lastDate = param.end_time
      this.getControlAnalysis(param)
    },
    // 格式化时间
    formatDate (d) {
      let padZero = num => {
        num = num + ''
        return num.length === 1 ? '0' + num : num
      }
      return d ? d.getFullYear() + '-' + padZero(d.getMonth() + 1) + '-' + padZero(d.getDate()) : ''
    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  .col-280 {
    width: 280px;
    .box-card {
      width: 260px;
      .data-list > div {
        font-size: 14px;
        color: #666666;
        &:nth-child(2) {
          color: #409eff;
          margin: 10px 0;
          font-size: 30px;
        }
      }
    }
  }
  .network-equipment {
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="page-content config-page">
    <!-- 过滤条件 -->
		<el-row>
			<el-col>
				<el-form :inline="true">
					<el-form-item>
						<el-date-picker placeholder="请选择时间段" v-model="formdata.date" @change="changeDate" type="daterange" align="left" unlink-panels range-separator="至" :clearable="false" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
						</el-date-picker>
					</el-form-item>

					<el-form-item>
						<city-picker @change="onCitySelect"></city-picker>
					</el-form-item>

					<el-form-item style="margin-bottom:0">
						<el-button type="primary" @click="search">查询</el-button>
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
            <pie-chart id="pieChart1" title="控制途径分布" :result="controlWay" style="height:400px; width:100%;"></pie-chart>
          </el-col>
          <el-col :span="12">
            <circular-chart id="circularChart" title="网络制式分布" :result="networkType" style="height:400px; width:100%;"></circular-chart>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 手机控制次数分析 && 手机控制人数分析 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col :span="12">
            <simple-chart id="chart1" title="手机控制次数分析（单位：次）" rotate="45" :result="allAppNum" style="height:400px; width:100%;"></simple-chart>
            <!-- <pie-chart id="pieChart111" title="手机控制次数分析（单位：次）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
          <el-col :span="12">
            <simple-chart id="chart12" title="手机控制人数分析（单位：个）" rotate="45" barColor="#68D388" :result="allAppUserNum" style="height:400px; width:100%;"></simple-chart>
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
            <line-chart id="phoneControlTimes" title="手机控制次数趋势图" rotate="0" :result="tendencyArray" style="height:400px; width:100%;"></line-chart>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 手机控制次数分析 && 手机控制人数分析 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col :span="12">
            <simple-chart id="voice-chart" title="语音控制次数分析（单位：次）" rotate="45" :result="allRouterNum" style="height:400px; width:100%;"></simple-chart>
            <!-- <pie-chart id="pieChart113sss1" title="语音控制次数分析（单位：次）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
          <el-col :span="12">
            <simple-chart id="voice-chart1" title="语音控制人数分析（单位：个）" rotate="45" barColor="#68D388" :result="allRouterUserNum" style="height:400px; width:100%;"></simple-chart>
            <!-- <pie-chart id="pieChart113fff31" title="语音控制人数分析（单位：个）" style="height:400px; width:100%;"></pie-chart> -->
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import CityPicker from "../../components/cityPicker.vue"
import PieChart from './charts/pieChart.vue'
import CircularChart from './charts/circularChart.vue'
import SimpleChart from './charts/simpleChart.vue'
import LineChart from './charts/lineChart.vue'
import axios from "axios"
import * as URL from "~/lib/api"
export default {
  components: {
    CityPicker,
    PieChart,
    CircularChart,
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
      pickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '最近7天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
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
      }
    }
  },
  mounted () {
    this.getControlAnalysis()
  },
  methods: {
    // 获取数据
    getControlAnalysis () {
      axios.post(URL.ControlAnalysisURL).then(res => {
        if (res.data.code === 200) {
          let result = res.data.result.data
          console.log(result, 'allRouterUserNum')
          this.equipmentAnalyzer.totalCount = result.summary.F_device
          this.userAnalyzer.totalCount = result.summary.F_usr
          this.controlAnalyzer.totalCount = result.summary.F_total
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
        }
      })
    },
    // 选择开始结束日后 决定是否显示留存筛选的周月
    changeDate(date) {
      const start = date ? date[0].getTime() : "";
      const end = date ? date[1].getTime() : "";
      const diff = end - start;
      // 至少2个月才显示月 至少2周才显示周
      this.isShowUnitMon = diff > 1000 * 3600 * 24 * 30 + 1000 * 3600 * 24 * 31;
      this.isShowUnitWeek = diff > 1000 * 3600 * 24 * 7 * 2;
    },
    onCitySelect(val) {
      this.formdata.province = val[0];
      this.formdata.city = val[1];
    },
    search () {
      console.log(111)
    }
  }
}
</script>

<style lang="less" scoped>
.page-content{
  .col-280{
    width: 280px;
    .box-card{
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
  .network-equipment{
    margin-top: 20px;
  }
}
</style>
<template>
  <div class="page-content config-page">
        <!-- 数据头部展示 -->
    <el-row>
      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>日唤醒次数</span>
							</el-col>
						</el-row>
						<div>{{ summary.F_wakeup_cnt }}</div>
						<div>截止到 {{ equipmentAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>日唤醒路由数</span>
							</el-col>
						</el-row>
						<div>{{ summary.F_wakeup_router }}</div>
						<div>截止到 {{ userAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>日语音交互数</span>
							</el-col>
						</el-row>
						<div>{{ summary.F_voice_interact }}</div>
						<div>截止到 {{ controlAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 过滤条件 -->
		<el-row style="margin-top: 20px;">
			<el-col>
				<el-form :inline="true">
					<el-form-item>
						<el-date-picker placeholder="请选择时间段" v-model="dateRange" @change="changeDate" type="daterange" align="left" unlink-panels range-separator="至" :clearable="false" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
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

    <!-- 手机控制次数趋势图 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col :span="12">
            <line-chart id="phoneControlTimes" ref="chart1" title="唤醒次数" rotate="0" :xAxisData="xAxisData" :chartData="chartData1" style="height:400px; width:100%;"></line-chart>
          </el-col>
          <el-col :span="12">
            <line-chart id="phoneControlTimes6" ref='chart2' title="唤醒路由数" rotate="0" :xAxisData="xAxisData" :chartData="chartData2" style="height:400px; width:100%;"></line-chart>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 手机控制次数趋势图 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col>
            <line-chart id="phoneControlTimes1" ref="chart3" title="语音交互次数" :xAxisData="xAxisData" :chartData="chartData3" rotate="0" style="height:400px; width:100%;"></line-chart>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import CityPicker from "../../components/cityPicker.vue"
import LineChart from './charts/lineChart.vue'
import axios from "axios"
import * as URL from "~/lib/api"
export default {
  components: {
    CityPicker,
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
        lastDate: '昨天 2019-03-27',
        text: '累计入网设备数'
      },
      userAnalyzer: {
        totalCount: 0,
        lastDate: '昨天 2019-03-27',
        text: '总控制用户数'
      },
      controlAnalyzer: {
        totalCount: 0,
        lastDate: '昨天 2019-03-27',
        text: '总控制次数'
      },
	  summary: {
      	F_wakeup_cnt: 2,
		F_wakeup_router: 3,
		F_voice_interact: 5
	  },
	  detail_data: '',
	  xAxisData: [],
	  chartData1: [],
	  chartData2: [],
	  chartData3: [],
	  dateRange: ''
    }
  },
  mounted () {
    this.getControlAnalysis()
  },
  methods: {
    // 获取数据
    getControlAnalysis (params) {
    	axios.post(URL.RouterAnalysisURL, params).then(res => {
    		if (res.data.code == 200) {
    			const data = res.data.result.data
    			this.summary = data.summary
				this.fitterEchartData(data.detail_data)
				this.$refs.chart1.initChart()
				this.$refs.chart2.initChart()
				this.$refs.chart3.initChart()
				console.log(777, res)
			}
		})
      //
      console.log(1)
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
	// 过滤echart图表需要的数据
	fitterEchartData (val) {
      for (let item in val) {
    	this.xAxisData.push(item)
		this.chartData1.push(val[item][0].F_wakeup_cnt)
		this.chartData2.push(val[item][0].F_wakeup_router)
		this.chartData3.push(val[item][0].F_voice_interact)
		  console.log(89989, val[item][0].F_voice_interact)
	  }
	},
    search () {
      this.reset()
      const param = {
      	start_time: this.dateRange[0].Format('yyyy-MM-dd'),
		end_time: this.dateRange[1].Format('yyyy-MM-dd')
	  }
	  this.getControlAnalysis(param)
      console.log(111, this.dateRange[0].Format('yyyy-MM-dd'))
    },
	reset () {
      this.xAxisData = []
	  this.chartData1 = []
	  this.chartData2 = []
	  this.chartData3 = []
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

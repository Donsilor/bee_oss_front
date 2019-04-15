<template>
  <div class="page-content config-page">
        <!-- 数据头部展示 -->
    <el-row>
      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>{{ DAUS.text }}</span>
							</el-col>
						</el-row>
						<div>{{ DAUS.totalCount }}</div>
						<div>截止到 {{ DAUS.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>{{ MAUS.text }}</span>
							</el-col>
						</el-row>
						<div>{{ MAUS.totalCount }}</div>
						<div>截止到 {{ MAUS.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>{{ DAFS.text }}</span>
							</el-col>
						</el-row>
						<div>{{ DAFS.totalCount }}</div>
						<div>截止到 {{ DAFS.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
							<el-col :span="16">
								<span>{{ MAFS.text }}</span>
							</el-col>
						</el-row>
						<div>{{ MAFS.totalCount }}</div>
						<div>截止到 {{ MAFS.lastDate }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 过滤条件 -->
		<el-row style="margin-top: 20px;">
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

    <!-- 手机控制次数趋势图 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col>
            <line-chart id="phoneControlTimes" title="手机控制次数趋势图" rotate="0" :result="activeUser" style="height:400px; width:100%;"></line-chart>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 手机控制次数趋势图 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row :gutter="24">
          <el-col>
            <line-chart id="phoneControlTimes1" title="手机控制次数趋势图" rotate="0" :result="activeFamily" style="height:400px; width:100%;"></line-chart>
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
      formdata: {
        date: ''
      },
      DAUS: {
        totalCount: 0,
        lastDate: null,
        text: '日活跃用户数'
      },
      MAUS: {
        totalCount: 0,
        lastDate: null,
        text: '30日活跃用户数'
      },
      DAFS: {
        totalCount: 0,
        lastDate: null,
        text: '日活跃家庭数'
      },
      MAFS: {
        totalCount: 0,
        lastDate: null,
        text: '30日活跃家庭数'
      },
      xAxisData: [],
      activeUser: [{
        name:'单日',
        type:'line',
        data:[3, 45]
      }, {
        name:'30日',
        type:'line',
        data:[2, 16]
      }],
      activeFamily: [{
        name:'单日',
        type:'line',
        data:[1, 10]
      }, {
        name:'30日',
        type:'line',
        data:[6, 17]
      }]
    }
  },
  mounted () {
    let end = new Date()
    let start = new Date()
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formdata.date = [start, end]
    this.DAUS.lastDate = this.formatDate(this.formdata.date[1])
    this.MAUS.lastDate = this.formatDate(this.formdata.date[1])
    this.DAFS.lastDate = this.formatDate(this.formdata.date[1])
    this.MAFS.lastDate = this.formatDate(this.formdata.date[1])
    this.getActiveAnalysis()
  },
  methods: {
    // 获取数据
    getActiveAnalysis () {
      axios.post(URL.ActiveAnalysisURL).then(res => {
        let obj = {}, activeList = {}
        if (res.data.code === 200) {
          let result = res.data.result.data
          // console.log(result, 'result')
          this.DAUS.totalCount = result.summary.F_dau
          this.MAUS.totalCount = result.summary.F_mau
          this.DAFS.totalCount = result.summary.F_daf
          this.MAFS.totalCount = result.summary.F_maf
          activeList = result.detail_data
          
          for (let key in activeList) {
            this.xAxisData.push(key)
            activeList[key].forEach((element, index) => {
              // if (element.F_dau)
              console.log(element)
            })
          }
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
    },
    // 格式化时间
    formatDate(d) {
      let padZero = num => {
          num = num + ''
          return num.length == 1 ? '0' + num : num
      }
      return d ? d.getFullYear() + '-' + padZero(d.getMonth() + 1) + '-' + padZero(d.getDate()) : ''
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
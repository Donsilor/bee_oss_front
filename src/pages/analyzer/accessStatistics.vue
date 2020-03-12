<template>
  <div class="page-content config-page">
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
                <span>{{ homeAnalyzer.text }}</span>
              </el-col>
            </el-row>
            <div>{{ homeAnalyzer.totalCount }}</div>
            <div>截止到 {{ homeAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col class="col-280">
        <el-card class="box-card">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>{{ familyAnalyzer.text }}</span>
              </el-col>
            </el-row>
            <div>{{ familyAnalyzer.totalCount }}</div>
            <div>截止到 {{ familyAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 累计入网设备数 && 新增入网设备数 -->
    <div class="network-equipment">
      <el-card shadow="hover">
        <el-row>
          <el-col
            :span="24"
            class="datePicker"
          >
            <el-date-picker
              v-model="dateRange"
              :picker-options="pickerOptions"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <simple-chart
              id="chart1"
              :result="allEquipmentNum"
              title="累计入网设备数（单位:个）"
              rotate="45"
              style="height:400px; width:100%;"
            />
          </el-col>
          <el-col :span="12">
            <mix-bar-chart
              id="chart2"
              :result="newAddEquipmentNum"
              style="height:400px; width:100%;"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 房间分布设备数 && 设备分布房间数 -->
    <!--<div class="network-equipment">-->
    <!--<el-card shadow="hover">-->
    <!--<el-row :gutter="24">-->
    <!--<el-col :span="12">-->
    <!--<div class="sizer">-->
    <!--<el-select v-model="room" placeholder="请选择">-->
    <!--<el-option-->
    <!--v-for="item in roomOptions"-->
    <!--:key="item.F_category_id_map"-->
    <!--:label="item.F_category_id_map"-->
    <!--:value="item.F_category_id_map">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <!--<simple-chart id="chart3" title="房间分布设备数（单位:个）" barColor="#68D388" style="height:400px; width:100%;" rotate="45" :result="allRoomEquipmentNum"></simple-chart>-->
    <!--</el-col>-->
    <!--<el-col :span="12">-->
    <!--<div class="sizer">-->
    <!--<el-select v-model="equipment" placeholder="请选择">-->
    <!--<el-option-->
    <!--v-for="item in equipmentOptions"-->
    <!--:key="item.value"-->
    <!--:label="item.F_category_id_map"-->
    <!--:value="item.F_category_id">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <!--<simple-chart id="chart4" title="设备分布房间数（单位:个）" style="height:400px; width:100%;"></simple-chart>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-card>-->
    <!--</div>-->
  </div>
</template>

<script>
import MixBarChart from './charts/mixBarChart.vue'
import SimpleChart from './charts/simpleChart.vue'
import axios from 'axios'
import * as URL from '~/lib/api'
export default {
  components: {
    SimpleChart,
    MixBarChart
  },
  data () {
    return {
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
      value7: '',
      equipmentAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '累计入网设备数'
      },
      homeAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '累计家居用户数'
      },
      familyAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '累计入网家庭数'
      },
      formdata: {
        date: ''
      },
      dateRange: '',
      equipment: '0',
      room: '0',
      roomOptions: [],
      equipmentOptions: [],
      allEquipmentNum: [],
      newAddEquipmentNum: {},
      allRoomEquipmentNum: []
    }
  },
  watch: {
    dateRange (val) {
      console.log(8989, val)
      const param = {
        'new_cat:start_time': val[0].Format('yyyy-MM-dd'),
        'new_cat:end_time': val[1].Format('yyyy-MM-dd')
      }
      this.getAccessStatistics(param)
    }
  },
  mounted () {
    let end = new Date()
    let start = new Date()
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formdata.date = [start, end]
    this.equipmentAnalyzer.lastDate = this.formatDate(this.formdata.date[1])
    this.homeAnalyzer.lastDate = this.formatDate(this.formdata.date[1])
    this.familyAnalyzer.lastDate = this.formatDate(this.formdata.date[1])
    this.getAccessStatistics()
  },
  methods: {
    // 获取数据
    getAccessStatistics (param) {
      axios.post(URL.AccessStatisticsURL, param).then(res => {
        if (res.data.code === 200) {
          // this.roomOptions = res.data.result.data.all_room
          // this.equipmentOptions = res.data.result.data.all_device
          let result = res.data.result.data
          console.log(result, 'res')
          this.equipmentAnalyzer.totalCount = result.summary.F_device
          this.homeAnalyzer.totalCount = result.summary.F_family_member
          this.familyAnalyzer.totalCount = result.summary.F_family
          this.allEquipmentNum = result.all_cat
          this.newAddEquipmentNum = result.new_cat
          this.allRoomEquipmentNum = result.all_room
        }
      })
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
    .datePicker {
      text-align: right;
      margin-bottom: 20px;
    }
    .sizer {
      text-align: right;
      margin-bottom: 20px;
    }
  }
}
</style>

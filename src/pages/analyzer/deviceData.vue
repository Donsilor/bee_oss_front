<template>
  <div class="page-content config-page">
    <el-row>
      <el-col>
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker
              v-model="formdata.date"
              :clearable="false"
              :picker-options="pickerOptions"
              placeholder="请选择时间段"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formdata.platform"
              placeholder="请选择平台"
            >
              <el-option
                label="Android_Pad"
                value="Android_Pad"
              />
              <el-option
                label="IOS"
                value="IOS"
              />
              <el-option
                label="Android"
                value="Android"
              />
              <el-option
                label="IOS_Pad"
                value="IOS_Pad"
              />
              <el-option
                label="合计"
                value=""
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <city-picker @change="onCitySelect" />
          </el-form-item>
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

    <div style="margin: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>
              <span>控制设备家庭户数</span>
              <span
                :class="[(chartSettings1.type === 'histogram') ? 'histogram-active' : 'histogram']"
                class="type-icon"
                @click="changeCharType('chartSettings1', 'histogram')"
              />
              <span
                :class="[(chartSettings1.type === 'line') ? 'line-active' : 'line']"
                class="type-icon"
                @click="changeCharType('chartSettings1', 'line')"
              />
            </div>
            <div>单位: 户</div>
          </el-col>
        </el-row>
        <ve-chart
          :data-empty="showFamilyCategoryEmpty"
          :legend-visible="false"
          :data="operFamilyCategoryCharData"
          :extend="chartExtend1"
          :settings="chartSettings1"
        />
        <!-- <ve-histogram :data="operFamilyCategoryCharData" :extend="chartExtend" :settings="chartSettings"></ve-histogram> -->
      </el-card>
    </div>
    <div style="margin: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>
              <span>控制设备家庭比重</span>
              <span
                :class="[(chartSettings2.type === 'histogram') ? 'histogram-active' : 'histogram']"
                class="type-icon"
                @click="changeCharType('chartSettings2', 'histogram')"
              />
              <span
                :class="[(chartSettings2.type === 'line') ? 'line-active' : 'line']"
                class="type-icon"
                @click="changeCharType('chartSettings2', 'line')"
              />
            </div>
            <div>单位: %</div>
          </el-col>
        </el-row>
        <ve-chart
          :data-empty="showFamilyCategoryRateEmpty"
          :legend-visible="false"
          :data="operFamilyCategoryRateCharData"
          :extend="chartExtend2"
          :settings="chartSettings2"
        />
        <!-- <ve-histogram :data="operFamilyCategoryCharData" :extend="chartExtend" :settings="chartSettings"></ve-histogram> -->
      </el-card>
    </div>
    <div style="margin: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>
              <span>控制设备次数</span>
              <span
                :class="[(chartSettings3.type === 'histogram') ? 'histogram-active' : 'histogram']"
                class="type-icon"
                @click="changeCharType('chartSettings3', 'histogram')"
              />
              <span
                :class="[(chartSettings3.type === 'line') ? 'line-active' : 'line']"
                class="type-icon"
                @click="changeCharType('chartSettings3', 'line')"
              />
            </div>
            <div>单位: 次</div>
          </el-col>
        </el-row>
        <ve-chart
          :data-empty="showStatEmpty"
          :legend-visible="false"
          :data="operStatCharData"
          :extend="chartExtend3"
          :settings="chartSettings3"
        />
        <!-- <ve-histogram :data="operStatCharData" :extend="chartExtend" :settings="chartSettings"></ve-histogram> -->
      </el-card>
    </div>
  </div>
</template>

<script>
import CityPicker from '../../components/cityPicker.vue'
import axios from 'axios'
import * as URL from '~/lib/api'

const padZero = num => {
  num = num + ''
  return num.length === 1 ? '0' + num : num
}

const formatDate = d => {
  return d.getFullYear() + '-' + padZero(d.getMonth() + 1) + '-' + padZero(d.getDate())
}

export default {
  components: {
    CityPicker
  },
  data () {
    return {
      area: '',
      formdata: {
        date: '',
        platform: '',
        province: '',
        city: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 93)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      operFamilyCategoryCharData: {
        columns: ['category_title', 'family_num'],
        rows: []
      },
      operFamilyCategoryRateCharData: {
        columns: ['category_title', 'family_rate'],
        rows: []
      },
      operStatCharData: {
        columns: ['category_title', 'oper_num'],
        rows: []
      },
      chartSettings1: {
        type: 'histogram',
        labelMap: {
          family_num: '户数'
        }
      },
      chartSettings2: {
        yAxisType: ['percent'],
        type: 'histogram',
        labelMap: {
          family_rate: '比重'
        }
      },
      chartSettings3: {
        type: 'histogram',
        labelMap: {
          oper_num: '次数'
        }
      },
      chartExtend1: {
        // label设置查看echarts 2.x文档
        series: {
          barWidth: 40,
          itemStyle: {
            normal: {
              label: { show: true, position: 'top' }
            }
          }
        }
      },
      chartExtend2: {
        series: {
          barWidth: 40,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
                formatter (a) {
                  // echarts配置文档中
                  // line value是数组
                  // histogram value是number
                  let value = ''
                  if (a.componentSubType === 'line') {
                    value = a.value[1]
                  } else {
                    value = a.value
                  }
                  return value * 100 + '%'
                }
              }
            }
          }
        }
      },
      chartExtend3: {
        series: {
          barWidth: 40,
          itemStyle: {
            normal: {
              label: { show: true, position: 'top' }
            }
          }
        }
      },
      showFamilyCategoryEmpty: false,
      showFamilyCategoryRateEmpty: false,
      showStatEmpty: false
    }
  },
  mounted () {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.formdata.date = [start, end]
    this.getDeviceAnalyzeData({
      start_date: formatDate(start),
      end_date: formatDate(end),
      city: ''
    })
  },
  methods: {
    onCitySelect (val) {
      this.formdata.province = val[0]
      this.formdata.city = val[1]
    },
    search () {
      const { date, platform, province, city } = this.formdata
      this.getDeviceAnalyzeData({
        start_date: formatDate(date[0]),
        end_date: formatDate(date[1]),
        province,
        city,
        os_type: platform || '',
        app_version: ''
      })
    },
    getDeviceAnalyzeData (params) {
      // console.log(params);
      axios.all([this.getOperFamilyCategoryData(params), this.getOperStatData(params)]).then(
        axios.spread((operFamilyCategoryData, operStatData) => {
          this.operFamilyCategoryCharData.rows = operFamilyCategoryData.data.result.list || []
          this.showFamilyCategoryEmpty = !this.operFamilyCategoryCharData.rows.length
          this.operFamilyCategoryRateCharData.rows = operFamilyCategoryData.data.result.list || []
          this.showFamilyCategoryRateEmpty = !this.operFamilyCategoryRateCharData.rows.length
          this.operStatCharData.rows = operStatData.data.result.list || []
          this.showStatEmpty = !this.operStatCharData.rows.length
        })
      )
    },
    getOperFamilyCategoryData (params) {
      return axios.post(URL.operFamilyCategory, params)
    },
    getOperStatData (params) {
      return axios.post(URL.operStat, params)
    },
    // 点击图标转换图标类型
    changeCharType (key, type) {
      this[key].type = type
    }
  }
}
</script>

<style lang="less" scoped>
.analyzer-data {
  .select {
    cursor: pointer;
  }
  .data-list > div {
    margin: 15px 0;
    font-size: 14px;
    &:nth-child(2) {
      color: #409eff;
      font-size: 18px;
    }
  }
}
.icon-information {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url(../../images/icn_explain.png);
  background-size: 100% 100%;
}
.icon-tendency {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url(../../images/tendency.png);
  background-size: 100% 100%;
}
.type-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  cursor: pointer;
}
.histogram {
  background-image: url(../../images/icn_histogram.png);
  margin: 0 10px;
}
.histogram-active {
  background-image: url(../../images/icn_histogram_active.png);
  margin: 0 10px;
}
.line {
  background-image: url(../../images/icn_line.png);
}
.line-active {
  background-image: url(../../images/icn_line_active.png);
}
</style>

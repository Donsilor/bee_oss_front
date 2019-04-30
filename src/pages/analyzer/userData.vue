<template>
  <div class="page-content config-page">
    <el-row>
      <el-col>
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker
              v-model="form.date"
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

          <el-form-item>
            <el-select
              v-model="form.platform"
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

    <el-row
      :gutter="24"
      class="analyzer-data"
    >
      <el-col>
        <el-card
          :class="{active:currentCard=='registerUser'}"
          shadow="hover"
          class="select-item"
          @click.native="setChartData('registerUser')"
        >
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>
                  {{ registerUserAnalyzer.text }}
                </span>
                <!-- <el-tooltip class="item" effect="dark" content="统计截止到某一天，在各个端App中注册的用户总数" placement="bottom">
                        <i class="el-icon-information"></i>
                    </el-tooltip>   -->
                <i class="icon-tendency" />
              </el-col>
              <el-col
                :span="4"
                :offset="4"
              />
            </el-row>
            <div>{{ registerUserAnalyzer.totalCount }}</div>
            <div>截止到{{ registerUserAnalyzer.lastDate }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col>
        <el-card
          :class="{active:currentCard=='loginUser'}"
          shadow="hover"
          class="select-item"
          @click.native="setChartData('loginUser')"
        >
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>
                  {{ loginUserAnalyzer.text }}
                </span>

                <i class="icon-tendency" />
              </el-col>
              <el-col
                :span="4"
                :offset="4"
              />
            </el-row>
            <div>{{ loginUserAnalyzer.lastDateNum }}</div>
            <div>{{ loginUserAnalyzer.lastDate }}当天</div>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card
          :class="{active:currentCard=='activeUser'}"
          shadow="hover"
          class="select-item"
          @click.native="setChartData('activeUser')"
        >
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">
                <span>{{ activeUserAnalyzer.text }}</span>
                <i class="icon-tendency" />
              </el-col>
              <el-col
                :span="4"
                :offset="4"
              />
            </el-row>
            <div>{{ activeUserAnalyzer.lastDateNum }}</div>
            <div>{{ activeUserAnalyzer.lastDate }}当天</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="margin-top: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>
              <span>{{ chartData.columns && chartData.columns[1] }}</span>
              <el-tooltip placement="right">
                <div slot="content">
                  统计截止到某一天，在各<br>个端App中注册的用户总数
                </div>
                <i class="el-icon-info" />
              </el-tooltip>
            </div>
            <div>单位: 个</div>
          </el-col>
        </el-row>
        <ve-line
          :data="chartData"
          :settings="chartSettings"
          :legend-visible="false"
          :data-empty="showEmpty"
        />
      </el-card>
    </div>

    <div style="margin-top: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="pull-left">
              用户留存率统计
            </div>
            <div class="pull-right retain-filters">
              <el-button
                :class="{'active': showRetainUnit === 0}"
                type="text"
                class="btn"
                @click="searchRetainByUnit(0)"
              >
                日
              </el-button>
              <el-button
                v-if="isShowUnitWeek"
                :class="{'active': showRetainUnit === 1}"
                type="text"
                class="btn"
                @click="searchRetainByUnit(1)"
              >
                周
              </el-button>
              <el-button
                v-if="isShowUnitMon"
                :class="{'active': showRetainUnit === 2}"
                type="text"
                class="btn"
                @click="searchRetainByUnit(2)"
              >
                月
              </el-button>
              <el-button
                :class="{'active': showRetainNum}"
                type="text"
                class="btn"
                style="margin-left: 30px"
                @click="showRetainNum=true"
              >
                #
              </el-button>
              <el-button
                :class="{'active': !showRetainNum}"
                type="text"
                class="btn"
                @click="showRetainNum=false"
              >
                %
              </el-button>
            </div>
          </el-col>
        </el-row>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="stat_day"
              label="日期"
              width="180"
            />
            <el-table-column
              prop="active_user_num"
              label="新增用户数"
              width="150"
            />
            <el-table-column
              v-for="(item, index) in colunmName"
              :key="index"
              :label="item"
            >
              <template slot-scope="scope">
                <span v-if="showRetainNum">{{ scope.row.retain_list[index] && scope.row.retain_list[index].retain_num }}</span>
                <span v-else>{{ scope.row.retain_list[index] && scope.row.retain_list[index].retain_percent }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import CityPicker from "../../components/cityPicker.vue"
import API from "../../service/index.js"
import axios from "axios"
import * as URL from "~/lib/api"

const padZero = num => {
  num = num + ""
  return num.length == 1 ? "0" + num : num
}

export default {
  components: {
    CityPicker
  },
  data() {
    this.chartSettings = {
      // stack: { '用户': ['访问用户', '下单用户'] },
      // area: true
    }
    return {
      showEmpty: false,
      // 是否显示留存按周月筛选的按钮
      isShowUnitWeek: true,
      isShowUnitMon: false,
      // 留存展示类型（0日,1周,2月）
      showRetainUnit: 0,
      // 留存展示数字还是百分比
      showRetainNum: true,
      colunmName: [],
      tableData: [],
      area: "",
      form: {
        date: "",
        platform: "",
        province: "",
        city: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 93)
              picker.$emit("pick", [start, end])
            }
          }
        ]
      },
      onlineUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: "实时在线用户数"
      },
      activeUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        lastDateNum: 0,
        text: "活跃用户数"
      },
      registerUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: "累计注册用户数"
      },
      loginUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        lastDateNum: 0,
        text: "登录用户数"
      },
      onlineUserChartData: {
        columns: ["日期", "实时在线用户数"],
        rows: []
      },
      activeUserChartData: {
        columns: ["日期", "活跃用户数"],
        rows: []
      },
      registerUserChartData: {
        columns: ["日期", "累计注册用户数"],
        rows: []
      },
      loginUserChartData: {
        columns: ["日期", "登录用户数"],
        rows: []
      },
      chartData: {},
      currentCard: "registerUser"
    }
  },
  mounted() {
    const end = new Date()
    const start = new Date()
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    this.form.date = [start, end]
    this.getUserAnalyzeData({
      start_date: this.formatDate(start),
      end_date: this.formatDate(end),
      province: "",
      city: ""
    })
    this.getAnalyzerRetainDate({
      start_date: this.formatDate(start),
      end_date: this.formatDate(end),
      province: "",
      city: ""
    })
  },
  methods: {
    onCitySelect(val) {
      this.form.province = val[0]
      this.form.city = val[1]
    },
    setChartData(type) {
      let data
      switch (type) {
      case "registerUser":
        data = this.registerUserChartData
        break
      case "loginUser":
        data = this.loginUserChartData
        break
      case "activeUser":
        data = this.activeUserChartData
        break
      }
      this.currentCard = type
      this.showEmpty = !data || !data.rows.length
      this.chartData = data
    },
    bindChart(list, name) {
      const result = {}
      const text = this[name].columns[1]
      const key = {
        loginUserChartData: "login_user_num",
        registerUserChartData: "reg_user_num",
        activeUserChartData: "active_user_num"
      }[name]
      const temp = list.map(item => {
        return {
          日期: item.stat_date,
          [text]: item[key] || 0
        }
      })
      Object.assign(this[name], {
        rows: temp
      })
    },
    // 点击查询按钮
    search() {
      const { date, platform, province, city } = this.form
      if (this.checkIsSameDate(date)) {
        return this.$message({ message: "日期不能选择同一天", type: "warning", showClose: true })
      }
      this.getUserAnalyzeData({
        start_date: this.formatDate(date[0]),
        end_date: this.formatDate(date[1]),
        province,
        city,
        os_type: platform || "",
        app_version: ""
      })
      // 留存展示重置为按日
      this.showRetainUnit = 0
      this.getAnalyzerRetainDate({
        start_date: this.formatDate(date[0]),
        end_date: this.formatDate(date[1]),
        province,
        city,
        os_type: platform || "",
        app_version: "",
        show_type: this.showRetainUnit
      })
    },
    // 注册登录活跃用户数
    getUserAnalyzeData(params) {
      API.getUserAnalyzeData(params).then(
        axios.spread((onlineUserData, registerUserData, activeUserData, loginUserData, activePercentData) => {
          Object.assign(this.registerUserAnalyzer, {
            totalCount: registerUserData.data.result.total_register_num,
            lastDate: this.formatDate(this.form.date[1])
          })
          this.bindChart(registerUserData.data.result.list || [], "registerUserChartData")

          Object.assign(this.activeUserAnalyzer, {
            totalCount: activeUserData.data.result,
            lastDate: this.formatDate(this.form.date[1]),
            lastDateNum: activeUserData.data.result.list
              ? activeUserData.data.result.list[activeUserData.data.result.list.length - 1]
                .active_user_num
              : 0
          })
          this.bindChart(activeUserData.data.result.list || [], "activeUserChartData")

          Object.assign(this.loginUserAnalyzer, {
            totalCount: loginUserData.data.result.total_login_user_num,
            lastDate: this.formatDate(this.form.date[1]),
            lastDateNum: loginUserData.data.result.list
              ? loginUserData.data.result.list[loginUserData.data.result.list.length - 1].login_user_num
              : 0
          })
          this.bindChart(loginUserData.data.result.list || [], "loginUserChartData")

          this.setChartData("registerUser")
        })
      )
    },
    // 用户留存统计
    getAnalyzerRetainDate(params) {
      axios.post(URL.analyzerRetain, params).then(res => {
        const result = res.data.result.list
        this.tableData = result
        // 通过colunmName构造table
        this.colunmName = []
        if (this.tableData.length) {
          this.tableData[0].retain_list.forEach(obj => {
            this.colunmName.push(obj.day)
          })
        }
      })
    },
    // 用户留存点击日周月
    searchRetainByUnit(unit) {
      const { date, platform, city } = this.form
      if (this.checkIsSameDate(date)) {
        return this.$message({ message: "日期不能选择同一天", type: "warning", showClose: true })
      }
      this.showRetainUnit = unit
      this.getAnalyzerRetainDate({
        start_date: this.formatDate(date[0]),
        end_date: this.formatDate(date[1]),
        city,
        os_type: platform || "",
        app_version: "",
        show_type: this.showRetainUnit
      })
    },
    // 选择开始结束日后 决定是否显示留存筛选的周月
    changeDate(date) {
      const start = date ? date[0].getTime() : ""
      const end = date ? date[1].getTime() : ""
      const diff = end - start
      // 至少2个月才显示月 至少2周才显示周
      this.isShowUnitMon = diff > 1000 * 3600 * 24 * 30 + 1000 * 3600 * 24 * 31
      this.isShowUnitWeek = diff > 1000 * 3600 * 24 * 7 * 2
    },
    // 是否选择了同一天
    checkIsSameDate(date) {
      const start = date ? date[0].getTime() : ""
      const end = date ? date[1].getTime() : ""
      const diff = end - start
      return !diff
    },
    formatDate(d) {
      return d ? d.getFullYear() + "-" + padZero(d.getMonth() + 1) + "-" + padZero(d.getDate()) : ""
    }
  }
}
</script>

<style lang="less" scoped>
.analyzer-data {
  .el-col {
    width: 280px;
  }
  .select-item {
    cursor: pointer;
    position: relative;
    width: 260px;
    overflow: inherit;
  }
  .active {
    background: #ffbb44;
    .data-list > div {
      color: #fff !important;
    }
  }
  .active:after {
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid #ffbb44;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    bottom: -10px;
    left: 50%;
    margin-left: -4px;
  }
  .data-list > div {
    // margin-bottom: 5px;
    font-size: 12px;
    &:nth-child(2) {
      color: #409eff;
      font-size: 30px;
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
.retain-filters > .btn {
  margin: 0 3px;
  padding: 0px 7px;
  cursor: pointer;
  font-size: 16px;
  color: #444;
}
.retain-filters > .active {
  color: #409eff;
}
</style>

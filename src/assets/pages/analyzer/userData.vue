<template>
  <div class="page-content config-page">
    <el-row>
      <el-col>
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker placeholder="请选择时间段" v-model="formdata.date" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formdata.platform" placeholder="请选择平台">
              <el-option label="Pad" value="pad"></el-option>
              <el-option label="iOS" value="ios"></el-option>
              <el-option label="android" value="android"></el-option>
              <el-option label="合计"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <city-picker v-model="area"></city-picker>{{area}}
          </el-form-item>

          <el-form-item>
            <el-select v-model="formdata.project" placeholder="请选择项目">
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom:0">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="analyzer-data">
      <el-col :span="4">
        <el-card shadow="never">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">累计下载用户数</el-col>
              <el-col :span="4" offset="4"></el-col>
            </el-row>
            <div>{{downloadUserAnalyzer.totalCount}}</div>
            <div>截止到{{downloadUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">累计注册用户数</el-col>
              <el-col :span="4" offset="4"></el-col>
            </el-row>
            <div>{{registerUserAnalyzer.totalCount}}</div>
            <div>截止到{{registerUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">实时在线用户数</el-col>
              <el-col :span="4" offset="4"></el-col>
            </el-row>
            <div>{{onlineUserAnalyzer.totalCount}}</div>
            <div>截止到{{onlineUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">登陆用户数</el-col>
              <el-col :span="4" offset="4"></el-col>
            </el-row>
            <div>{{loginUserAnalyzer.totalCount}}</div>
            <div>截止到{{loginUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="never">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">活跃用户数</el-col>
              <el-col :span="4" offset="4"></el-col>
            </el-row>
            <div>{{activeUserAnalyzer.totalCount}}</div>
            <div>截止到{{activeUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="margin-top: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>活跃用户数</div>
            <div>单位: 个</div>
            </el-col>
          <el-col :span="4" offset="4" style="text-align: right;">
            <ul>
              <li>
                <a href="">日</a>
                <a href="">周</a>
                <a href="">月</a>
              </li>
            </ul>
          </el-col>
        </el-row>
        <ve-line :data="activeUserChartData" :settings="chartSettings"></ve-line>
      </el-card>
    </div>

    <div style="margin-top: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>活跃度统计</div>
            <div>单位: %</div>
          </el-col>
          <el-col :span="4" offset="4" style="text-align: right;">
            <ul>
              <li>
                <a href="">日</a>
                <a href="">周</a>
                <a href="">月</a>
              </li>
            </ul>
          </el-col>
        </el-row>
        <ve-line :data="activePercentChartData" :settings="chartSettings"></ve-line>
      </el-card>
    </div>
  </div>
</template>

<style lang="less">
.analyzer-data {
  .data-list>div {
    margin: 15px 0;
    font-size: 14px;
    &:nth-child(2) {
      color: #409EFF;
      font-size: 18px;
    }
  }
}
</style>
<script>
import CityPicker from '../../components/cityPicker.vue'
import API from "../../service/index.js";
import axios from 'axios';

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
      area: '',
      formdata: {
        date: "",
        platform: "",
        project: "",
        city: ""
      },
      downloadUserAnalyzer: {
        totalCount: 0,
        lastDate: null
      },
      onlineUserAnalyzer: {
        totalCount: 0,
        lastDate: null
      },
      activeUserAnalyzer: {
        totalCount: 0,
        lastDate: null
      },
      registerUserAnalyzer: {
        totalCount: 0,
        lastDate: null
      },
      loginUserAnalyzer: {
        totalCount: 0,
        lastDate: null
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      chartData: {
        columns: ['日期', '活跃用户数'],
        rows: [
          { '日期': '2018-06-07', '活跃用户数': 1393},
          { '日期': '2018-06-06', '活跃用户数': 3530},
          { '日期': '2018-06-05', '活跃用户数': 2923},
          { '日期': '2018-06-04', '活跃用户数': 1723},
          { '日期': '2018-06-03', '活跃用户数': 3792},
          { '日期': '2018-06-02', '活跃用户数': 4593}
        ]
      },
      activeUserChartData: {
        columns: ['日期', '活跃用户数'],
        rows: []
      },
      activePercentChartData: {
        columns: ['日期', '活跃度'],
        rows: []
      },
      onlineUserChartData: {
        columns: ['日期', '活跃用户数'],
        rows: [

        ]
      }
    };
  },
  methods: {
    bindChart(list, name) {
      const result = {};
      if (list && list.length > 0) {
          list.map(item => {
          if (result[item.stat_date]) {
            result[item.stat_date] += item.online_num;
          } else {
            result[item.stat_date] = item.online_num;
          }
        });
        Object.assign(this[name], {
          rows: Object.keys(result).map(key => {
            return {
              '日期': key,
              '活跃用户数': result[key]
            }
          })
        });
      } else {
        Object.assign(this[name], {
          rows: []
        });
      }
    },
    search: function() {
      const { date, platform } = this.formdata;
      const city = this.area && this.area[1] || '';
      const start_date = date && date[0] && date[0].toLocaleDateString() || null;
      const end_date = date && date[1] && date[1].toLocaleDateString() || new Date().toLocaleDateString()
      this.getUserAnalyzeData({
        start_date,
        end_date,
        city,
        os_type: platform || '',
        app_version: ''
      })
    },
    getUserAnalyzeData: function(params) {
      API.getUserAnalyzeData(params).then(axios.spread((onlineUserData, registerUserData , activeUserData, loginUserData, activePercentData) => {
        if (onlineUserData.status === 200) {
          Object.assign(this.onlineUserAnalyzer, {
            totalCount: onlineUserData.data.result.total_online_num,
            lastDate: onlineUserData.data.result.list && onlineUserData.data.result.list[0] && onlineUserData.data.result.list[0].stat_date
          });
          this.bindChart(onlineUserData.data.result.data.list, 'onlineUserChartData');
        }
        if (registerUserData.status === 200) {
          Object.assign(this.registerUserAnalyzer, {
            totalCount: registerUserData.data.result.total_register_num,
            lastDate: registerUserData.data.result.list && registerUserData.data.result.list[0] && registerUserData.data.result.list[0].stat_date
          });
        }
        if (activeUserData.status === 200) {
          Object.assign(this.activeUserAnalyzer, {
            totalCount: activeUserData.data.result.total_active_user_num,
            lastDate: activeUserData.data.result.list && activeUserData.data.result.list[0] && activeUserData.data.result.list[0].stat_date
          });
          this.bindChart(activeUserData.data.result.list, 'activeUserChartData');
        }
        if (activePercentData.status === 200) {
          this.bindChart(activePercentData.data.result.list, 'activePercentChartData');
        }
        if (loginUserData.status === 200) {
          Object.assign(this.loginUserAnalyzer, {
            totalCount: loginUserData.data.result.total_login_user_num,
            lastDate: loginUserData.data.result.list && loginUserData.data.result.list[0] && loginUserData.data.result.list[0].stat_date
          });
        }
      }));
    }
  },
  mounted() {
    this.getUserAnalyzeData({
      start_date: null,
      end_date: new Date().toLocaleDateString(),
      city: ''
    });
  }
};
</script>

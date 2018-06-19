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
              <el-option label="Android_Pad" value="Android_Pad"></el-option>
              <el-option label="IOS" value="IOS"></el-option>
              <el-option label="Android" value="Android"></el-option>
              <el-option label="IOS_Pad" value="IOS_Pad"></el-option>
              <el-option label="合计" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <city-picker v-model="formdata.city"></city-picker>
          </el-form-item>

          <!-- <el-form-item>
            <el-select v-model="formdata.project" placeholder="请选择项目">
            </el-select>
          </el-form-item> -->
          <el-form-item style="margin-bottom:0">
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="analyzer-data">

      <el-col :span="4">
        <el-card shadow="hover" @click.native="setChartData(registerUserChartData)" class="select">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">{{registerUserAnalyzer.text}}</el-col>
              <el-col :span="4" :offset="4"></el-col>
            </el-row>
            <div>{{registerUserAnalyzer.totalCount}}</div>
            <div>截止到{{registerUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="4">
        <el-card shadow="never" @click.native="setChartData(onlineUserChartData)">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">{{onlineUserAnalyzer.text}}</el-col>
              <el-col :span="4" :offset="4"></el-col>
            </el-row>
            <div>{{onlineUserAnalyzer.totalCount}}</div>
            <div>截止到{{onlineUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="4">
        <el-card shadow="hover" @click.native="setChartData(loginUserChartData)" class="select">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">{{loginUserAnalyzer.text}}</el-col>
              <el-col :span="4" :offset="4"></el-col>
            </el-row>
            <div>{{loginUserAnalyzer.totalCount}}</div>
            <div>截止到{{loginUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="4">
        <el-card shadow="never" @click.native="setChartData(activeUserChartData)">
          <div class="data-list">
            <el-row :gutter="24">
              <el-col :span="16">{{activeUserAnalyzer.text}}</el-col>
              <el-col :span="4" :offset="4"></el-col>
            </el-row>
            <div>{{activeUserAnalyzer.totalCount}}</div>
            <div>截止到{{activeUserAnalyzer.lastDate}}</div>
          </div>
        </el-card>
      </el-col> -->
    </el-row>

    <div style="margin-top: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>{{chartData.columns && chartData.columns[1]}}</div>
            <div>单位: 个</div>
          </el-col>
          <!-- <el-col :span="4" :offset="4" style="text-align: right;">
            <ul>
              <li>
                <a href="">日</a>
                <a href="">周</a>
                <a href="">月</a>
              </li>
            </ul>
          </el-col> -->
        </el-row>
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </el-card>
    </div>

    <!-- <div style="margin-top: 20px">
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="16">
            <div>活跃度统计</div>
            <div>单位: %</div>
          </el-col>
          <el-col :span="4" :offset="4" style="text-align: right;">
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
    </div> -->
  </div>
</template>

<style lang="less">
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
</style>
<script>
import CityPicker from '../../components/cityPicker.vue'
import API from "../../service/index.js";
import axios from 'axios';

const padZero = (num) => {
  num = num + ''
  return num.length == 1 ? '0' + num : num
}

const formatDate = (d) => {  
  return d.getFullYear() + '-' + padZero(d.getMonth() + 1) + '-' + padZero(d.getDate())
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
      area: '',
      formdata: {
        date: "",
        platform: "",
        project: "",
        city: ""
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
      onlineUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '实时在线用户数'
      },
      activeUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '活跃用户数'
      },
      registerUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '累计注册用户数'
      },
      loginUserAnalyzer: {
        totalCount: 0,
        lastDate: null,
        text: '登录用户数'
      },
      
      onlineUserChartData: {
        columns: ['日期', '实时在线用户数'],
        rows: []
      },
      activeUserChartData: {
        columns: ['日期', '活跃用户数'],
        rows: []
      },
      registerUserChartData: {
        columns: ['日期', '累计注册用户数'],
        rows: []
      },
      loginUserChartData: {
        columns: ['日期', '登录用户数'],
        rows: []
      },
      chartData: {}
    };
  },
  methods: {
    setChartData(data) {  
      this.chartData = data
    },
    bindChart(list, name) {
      const result = {};
      const text = this[name].columns[1]

      const key = {
        loginUserChartData: "login_user_num",
        registerUserChartData: "reg_user_num",
      }[name]

      const temp = list.map(item => {
        return {
          '日期': item.stat_date,
          [text]: item[key] 
        }
      })
      
      Object.assign(this[name], {
        rows: temp
      });
    },
    search: function() {
      const { date, platform, city } = this.formdata;
      
      this.getUserAnalyzeData({
        start_date: formatDate(date[0]),
        end_date: formatDate(date[1]),
        city,
        os_type: platform || '',
        app_version: ''
      })
    },
    getUserAnalyzeData: function(params) {
      API.getUserAnalyzeData(params).then(axios.spread((onlineUserData, registerUserData , activeUserData, loginUserData, activePercentData) => {

        // Object.assign(this.onlineUserAnalyzer, {
        //   totalCount: onlineUserData.data.result.total_online_num,
        //   lastDate: onlineUserData.data.result.list && onlineUserData.data.result.list[0] && onlineUserData.data.result.list[0].stat_date
        // });
        // this.bindChart(onlineUserData.data.result.list, 'onlineUserChartData');


        Object.assign(this.registerUserAnalyzer, {
          totalCount: registerUserData.data.result.total_register_num,
          lastDate: registerUserData.data.result.list && registerUserData.data.result.list[0] && registerUserData.data.result.list[0].stat_date
        });
        this.bindChart(registerUserData.data.result.list || [], 'registerUserChartData');

        // Object.assign(this.activeUserAnalyzer, {
        //   totalCount: activeUserData.data.result.total_active_user_num,
        //   lastDate: activeUserData.data.result.list && activeUserData.data.result.list[0] && activeUserData.data.result.list[0].stat_date
        // });
        // this.bindChart(activeUserData.data.result.list, 'activeUserChartData');

        Object.assign(this.loginUserAnalyzer, {
          totalCount: loginUserData.data.result.total_login_user_num,
          lastDate: loginUserData.data.result.list && loginUserData.data.result.list[0] && loginUserData.data.result.list[0].stat_date
        });
        this.bindChart(loginUserData.data.result.list || [], 'loginUserChartData');

        this.setChartData(this.registerUserChartData)

      }));
    }
  },
  mounted() {

    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    this.formdata.date = [start, end]

    this.getUserAnalyzeData({
      start_date: formatDate(start),
      end_date: formatDate(end),
      city: ''
    });
  }
};
</script>

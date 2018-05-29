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
              <el-option label="合计" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-cascader :options="cityData" :props="cityForProps" placeholder="请选择地区">
            </el-cascader>
          </el-form-item>

          <el-form-item style="margin-bottom:0">
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


    <div style="margin-top: 20px">

      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </div>

  </div>
</template>

<script>
import CityData from "../../json/city.json";

export default {
  data() {
    this.chartSettings = {
        stack: { '用户': ['访问用户', '下单用户'] },
        area: true
      }
    return {
      cityData: CityData,
      cityForProps : { 
        value: 'name',
        label: 'name',
        children: 'list'
      },
      formdata: {
        date: "",
        platform: "",
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
      chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
    };
  }
};
</script>

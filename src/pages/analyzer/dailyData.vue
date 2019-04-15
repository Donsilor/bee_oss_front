<template>
  <div class="page-content config-page">
    <!-- 过滤条件 -->
		<el-row style="margin-top: 20px;">
			<el-col>
				<el-form :inline="true">
					<el-form-item>
						<el-date-picker
              v-model="fromDate.select_time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
					</el-form-item>

					<el-form-item style="margin-bottom:0">
						<el-button type="primary" @click="searchdDilyData">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

    <!-- 手机控制次数趋势图 -->
    <div class="network-equipment">
      <el-row :gutter="24">
        <el-col style="text-align: right;">
          <el-button type="warning" size="medium" @click="exportData">导出数据</el-button>
        </el-col>
        <el-col>
          <el-table
            :data="tableData1"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px">
            <el-table-column
              prop="category"
              label="统计类别">
            </el-table-column>
            <el-table-column
              prop="title"
              label="统计指标项">
            </el-table-column>
            <el-table-column
              prop="today"
              label="当日">
            </el-table-column>
            <el-table-column
              prop="yesterday"
              label="昨日">
            </el-table-column>
            <el-table-column
              prop="lastweek"
              label="上周">
            </el-table-column>
            <el-table-column
              prop="compare_yday"
              label="同比昨日">
            </el-table-column>
            <el-table-column
              prop="compare_lw"
              label="环比上周">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import * as URL from "~/lib/api"
export default {
  data () {
    return {
      tableData1: [],
      fromDate: {
        select_time: null
      },
      spanArr: [],
      position: 0
    }
  },
  mounted () {
    let preDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    this.fromDate.select_time = preDate
    this.getdailyData()
  },
  methods: {
    // 查询数据
    searchdDilyData () {
      this.getdailyData({select_time: this.fromDate.select_time})
    },
    // 获取数据
    getdailyData (params) {
      axios.post(URL.dailyDataURL, params).then(res => {
        if (res.data.code === 200) {
          let result = res.data.result.data
          console.log(result, 'res....')
          this.tableData1 = result
          this.rowspan()
          console.log(this.spanArr, 'this.spanArr')
        }
      })
    },
    // 导出数据
    exportData () {
      axios.get(URL.ExportURL, {select_time: this.fromDate}).then(res => {
        alert(1)
        console.log(res, '导出数据')
      }).catch(error => {
        console.log(error)
      })
    },
    rowspan() {
      this.tableData1.forEach((item,index) => {
        if( index === 0){
          this.spanArr.push(1)
          this.position = 0
        } else if (this.tableData1[index].category === this.tableData1[index-1].category) {
          this.spanArr.push(0)
          this.spanArr[this.position] += 1
        } else {
          this.spanArr.push(1)
          this.position = index
        }
      })
    },


    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex === 0){
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row, //行
          colspan: _col  //列
        }

      }
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
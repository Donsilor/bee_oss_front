<template>
  <div class="page-content">
    <el-form :inline="true">
      <el-form-item label="请选择日期">
        <el-date-picker
          v-model="dateRange"
          :clearable="false"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
        >
          查询
        </el-button>
        <el-button @click="exportData">
          导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="searchResult"
      style="width: 100%"
    >
      <el-table-column
        prop="sn"
        label="sn"
      />
      <el-table-column
        prop="mac"
        label="mac"
      />
      <el-table-column
        prop="product_name"
        label="product_name"
      />
      <el-table-column
        prop="product_type"
        label="product_type"
      />
    </el-table>

    <div class="page-line">
      <el-pagination
        :total="total"
        :page-size="pageSize"
        :current-page.sync="page"
        small
        layout="prev, pager, next"
        @current-change="onPageChange"
      />
    </div>

    <!-- 导出 -->
    <form
      ref="exportForm"
      :action="exportUrl"
      method="POST"
      target="exportFrame"
      name="exportForm"
    >
      <input
        type="hidden"
        name="start_time"
      >
      <input
        type="hidden"
        name="end_time"
      >
      <input
        v-model="userToken"
        type="hidden"
        name="token"
      >
    </form>
    <iframe
      src=""
      name="exportFrame"
      frameborder="0"
    />
  </div>
</template>


<script>
import {
  switchProductHistory,
  switchProductHistoryExport
} from "../../lib/api.js"
import axios from "../../lib/http.js"

export default {
  data() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)

    return {
      searchResult: [],
      dateRange: [start, end],
      total: 0,
      pageSize: 20,
      page: 1,
      exportUrl: switchProductHistoryExport,
      userToken: JSON.parse(localStorage.getItem("localData")).user.info.token
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    getHistoryList() {
      axios
        .post(switchProductHistory, {
          ...this.getParams(),
          page: this.page,
          limit: this.pageSize
        })
        .then(res => {
          this.searchResult = res.data.result.data || []
          this.total = res.data.result.total || 0
        })
    },
    exportData() {
      const form = this.$refs.exportForm
      const params = this.getParams()
      form.querySelector('[name="start_time"]').value = params.start_time
      form.querySelector('[name="end_time"]').value = params.end_time
      form.submit()
      // axios
      //     .post(switchProductHistoryExport, this.getParams())
      //     .then(res => {
      //         this.$message({
      //             message: "导出成功！",
      //             type: "success"
      //         });
      //     });
    },
    search() {
      this.page = 1
      this.getHistoryList()
    },
    onPageChange(page) {
      this.getHistoryList()
    },
    // 2018-09-21 09:50
    formatTime(time, end) {
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      m = m < 10 ? "0" + m : m
      d = d < 10 ? "0" + d : d
      return `${y}-${m}-${d} ${end ? "23:59" : "00:00"}`
    },
    getParams() {
      return {
        start_time: this.formatTime(this.dateRange[0]),
        end_time: this.formatTime(this.dateRange[1], true)
      }
    }
  }
}
</script>
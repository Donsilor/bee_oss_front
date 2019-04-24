<template>
  <div class="page-content">
    <div class="filter">
      <div class="left">
        <el-date-picker
          v-model="search.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />

        <el-input
          v-model="search.name"
          placeholder="请输入姓名"
        />

        <el-input
          v-model="search.phone"
          placeholder="请输入联系方式"
        />

        <el-input
          v-model="search.type"
          placeholder="购买套餐"
        />

        <el-button
          type="primary"
          @click="doSearch"
        >查询</el-button>
      </div>
      <div class="right">
        <el-button @click="exportExel">导出数据</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column
          prop="content"
          label="购买套餐"
          width="180"
        />
        <el-table-column
          prop="name"
          label="用户姓名"
        />
        <el-table-column
          prop="tel"
          label="联系方式"
        />
        <el-table-column
          prop="account"
          label="填写账号"
        />
        <el-table-column
          prop="updated_at"
          label="提交时间"
        />
      </el-table>
      <div class="block">
        <el-pagination
          :total="+pages.total"
          :page-size="+pages.limit"
          :current-page="+pages.page"
          background
          layout="prev, pager, next"
          @current-change="handPageChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.filter {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding-bottom: 30px;
  .left {
    display: flex;
    * {
      margin: 0 5px;
    }
    .el-input {
      flex: 1;
    }
  }
}
.block {
  text-align: right;
  margin: 30px 0;
}
</style>

<script>
import { PREFIX } from "../../lib/util"
export default {
  data() {
    return {
      pages: {
        page: '1',
        limit: '10',
        total: ''
      },
      search: {
        daterange: [],
        name: '',
        phone: '',
        type: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let param = this.getParam()
      this.$http
        .post(PREFIX + "mall_record/lists", param)
        .then(res => {
          const json = res.data
          if (json.code === 200) {
            this.tableData = res.data.result.data
            this.pages.total = res.data.result.total
          } else {
            this.$message.error(json.msg)
          }
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
        })
    },
    getParam() {
      let param = {
        page: this.pages.page,
        limit: this.pages.limit
      }
      if (this.search.daterange) {
        param.start_time = this.search.daterange[0]
        param.end_time = this.search.daterange[1]
      }
      if (this.search.name) {
        param.name = this.search.name
      }
      if (this.search.type) {
        param.content = this.search.type
      }
      if (this.search.phone) {
        param.tel = this.search.phone
      }
      return param
    },
    doSearch() {
      this.pages = {
        page: '0',
        limit: '10',
      }
      this.getList()
    },
    handPageChange(val) {
      this.pages.page = val
      this.getList()
    },
    exportExel() {
      let token = JSON.parse(localStorage.getItem("localData")).user.info.token
      window.location.href = `${PREFIX}mall_record/export?token=${token}`
    }
  }
}
</script>

<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div class="filter">
      <span>启动模式管理</span>
      <el-button
        type="primary"
        @click="showConfig('add')">添加模式</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        :data="list"
        border>
        <el-table-column
          prop="mode_name"
          label="模式名称" />
        <el-table-column
          prop="created_at"
          label="添加时间" />

        <el-table-column
          prop="state"
          label="是否启用">
          <template slot-scope="scope">
            {{ scope.row.enable ? '启用':'禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showConfig('modify', scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handeStateClick(scope.row)">
              {{ scope.row.enable ? '禁用':'启用' }}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handeDeleteClick(scope.row.mode_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- <div class="block">
      <el-pagination
        :total="+pages.total"
        :page-size="+pages.limit"
        :current-page="+pages.page"
        background
        layout="prev, pager, next"
        @current-change="handPageChange"/>
    </div> -->
    <!-- config -->
    <Config
      :config="config"
      @refresh="refresh" />
  </div>
</template>
<style lang="less" scoped>
.filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.block {
  text-align: right;
  margin: 30px 0;
}
</style>
<script>
import { PREFIX } from "../../lib/util"
import Config from './components/config.vue'
export default {
  components: {
    Config
  },
  data() {
    return {
      pages: {
        page: '10',
        limit: '3',
        total: '40'
      },
      list: [],
      config: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 根据order排序
    compare(property){
      return function(a,b){
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    getList() {
      this.$http
        .post(PREFIX + "iotscenemode/lists", {})
        .then(res => {
          this.list = res.data.result.list
          this.list = this.list.sort(this.compare('order'))
        })
    },
    handeStateClick(state) {
      let enable = state.enable
      let type = '启用'
      if (enable) {
        type = '禁用'
      }
      this.$confirm(`您是否确定${type}该模式？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .post(PREFIX + "iotscenemode/save", {
            mode_id: state.mode_id,
            mode_name: state.mode_name,
            order: state.order,
            enable: Number(!enable)
          })
          .then(res => {
            this.$message({
              type: 'success',
              message: '处理成功!'
            })
            this.getList()
          })
      })
    },
    handeDeleteClick(enable) {
      this.$confirm(`您是否确定删除该模式？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delStatus(enable)
      })
    },
    delStatus(enable) {
      this.$http
        .post(PREFIX + "iotscenemode/del", {
          mode_id: enable
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '处理成功!'
          })
          this.getList()
        })
    },
    handPageChange(val) {
      this.pages.page = val
      this.getList()
    },
    indexMethod(index) {
      return index + 1
    },
    showConfig(type, item) {
      if (type == 'add') {
        this.config = {
          type: type,
          show: true,
          enable: 1,
          name: ''
        }
      } else {
        this.config = {
          type: type,
          show: true,
          ...item
        }
      }
    },
    refresh(val) {
      if (val) this.getList()
    }
  }
}
</script>

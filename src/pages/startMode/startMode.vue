<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div class="filter">
      <el-button
        type="primary"
        @click="showConfig('add')">添加模式</el-button>
    </div>
    <!-- 列表 -->
    <div style="margin-top: 60px">
      <el-table
        :data="list"
        border>
        <el-table-column
          prop="mode_name"
          label="模式名称"/>
        <el-table-column
          prop="created_at"
          label="添加时间"/>
        <el-table-column
          label="操作">
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
    <div class="block">
      <el-pagination
        :total="+pages.total"
        :page-size="+pages.limit"
        :current-page="+pages.page"
        background
        layout="prev, pager, next"
        @current-change="handPageChange"/>
    </div>
    <!-- config -->
    <Config
      :config="config"
      @son="call"
    />
  </div>
</template>
<style lang="less" scoped>
.filter{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 10px;
  border-bottom: 2px solid #ccc;
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
        page: '1',
        limit: '3',
        total: '40'
      },
      list: [],
      config : {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    call() {
      this.getList()
    },
    getList() {
      this.$http
        .post(PREFIX + "iotscenemode/lists", {
          limit: this.pages.limit,
          page: this.pages.page
        })
        .then(res => {
          const json = res.data
          if (json.code === 0) {
            this.list = res.data.result.list
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
    handeStateClick(state) {
      let enable = state.enable
      let type = '启用'
      if(enable){
        type = '禁用'
      }
      this.$confirm(`您是否确定${type}该模式？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .post(PREFIX+ "iotscenemode/save", {
            mode_id: state.mode_id,
            mode_name: state.mode_name,
            order: state.order,
            enable: Number(!enable)
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '处理成功!'
              })
            } else {
              this.$message.error(res.data.msg)
            }
            this.getList()
          })
          .catch(res => {
            if (res && res.msg) {
              this.$message.error(res.msg)
            } else {
              this.$message.error(res)
            }
          })
      }).catch(() => {
      })
    },
    handeDeleteClick(enable) {
      this.$confirm(`您是否确定删除该模式？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delStatus(enable)
      }).catch(() => {
      })
    },
    delStatus(enable) {
      this.$http
        .post(PREFIX + "iotscenemode/del", {
          mode_id: enable
        })
        .then(res => {
          if(res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '处理成功!'
            })
          } else {
            this.$message.error(res.data.code)
          }
          this.getList()
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
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
      if(type == 'add'){
        this.config ={
          type: type,
          show: true,
          name: ''
        }
      } else {
        this.config = {
          type: type,
          show: true,
          ...item
        }
      }
    }
  }
}
</script>

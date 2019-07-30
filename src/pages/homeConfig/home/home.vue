<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div class="filter">
      <span>首页模块配置</span>
      <el-button
        type="primary"
        @click="showConfig('add')">添加</el-button>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        :data="list"
        border>
        <el-table-column
          prop="F_picture"
          label="图片" >
          <template slot-scope="scope">
            <img 
              :src="scope.row.F_picture" 
              class="f-img" >
          </template>
        </el-table-column>

        <el-table-column
          prop="F_title"
          label="主标题" />

        <el-table-column
          prop="F_stitle"
          label="副标题"/>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showConfig('modify', scope.row)">编辑</el-button>

            <el-button
              type="text"
              size="small"
              @click="handeDeleteClick(scope.row.F_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <Config
      ref="configDialog"
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
.f-img{
  width: 200px;
  max-height: 240px;
}
</style>
<script>
import { PREFIX } from "../../../lib/util"
import Config from './config.vue'
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
    getList() {
      this.$http
        .post(PREFIX + "music_config/lists", {})
        .then(res => {
          this.list = res.data.result.data
        })
    },
    handeDeleteClick(F_id) {
      this.$confirm(`您是否确定删除？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delStatus(F_id)
      })
    },
    delStatus(F_id) {
      this.$http
        .post(PREFIX + "music_config/del", {
          F_id: F_id
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '处理成功!'
          })
          this.getList()
        })
    },
    showConfig(type, item) {
      console.log(type)
      if (type == 'add') {
        this.$refs.configDialog.config = {
          type: type,
          show: true,
          F_picture: '',
          F_title: '',
          F_stitle: '',
        }
      } else {
        this.$refs.configDialog.config = {
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

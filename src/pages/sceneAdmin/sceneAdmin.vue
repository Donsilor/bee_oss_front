<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div class="filter">
      <span>场景管理</span>
      <el-button
        type="primary"
        @click="showConfig('add')">添加场景</el-button>
    </div>
    <!-- 列表 -->
    <div style="margin-top: 60px">
      <el-table
        :data="list"
        border>
        <el-table-column
          :index="indexMethod"
          type="index"
          label="序号"
          width="80"/>
        <el-table-column
          prop="scene_name"
          label="场景名称"/>
        <el-table-column
          prop="mode_name"
          label="启动方式"/>
        <el-table-column
          prop="created_at"
          label="添加时间"/>
        <el-table-column
          prop="enable"
          label="是否启用">
          <template slot-scope="scope">
            {{ scope.row.enable ? '禁用':'启用' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="showConfig('look', scope.row)">查看</el-button>
            <el-button
              type="text"
              size="small"
              @click="showConfig('modify', scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handeEnableClick(scope.$index,scope.row.enable)">
              {{ scope.row.enable ? '启用':'禁用' }}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handeDeleteClick(scope.row.scene_id)">删除</el-button>
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
      ref="configDialog" 
      @refresh="refresh"/>
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
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http
        .post(PREFIX + 'iotscene/lists', {})
        .then(res => {
          this.list = res.data.result.list
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
        })
    },
    submitEdit(param) {
      this.$http
        .post(PREFIX + 'iotscene/save', param)
        .then(res => {
          this.$message.info('操作成功')
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
        })
    },
    delete(cId) {
      this.$http
        .post(PREFIX + 'iotscene/del', {
          scene_id: cId
        })
        .then(res => {
          this.$message.info('删除成功')
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
        })
    },
    handeEnableClick(index,enable) {
      let type = '禁用'
      if(enable){
        type = '启用'
      }
      this.$confirm(`您是否确定${type}该场景？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = this.list[index]
        param.enable = +!+enable
        this.submitEdit(param)
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    handeDeleteClick(cId) {
      this.$confirm(`您是否确定删除该场景？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(cId)
      }).catch(() => {
        this.$message.info('已取消')
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
      let defaultConfig = {
        type: type,
        show: true,
        scene_name: '',
        list_pic: {
          normal: ''
        },
        detail_pic: '',
        mode_id: '',
        enable: 1,
        content: {
          list: []
        }
      }
      if(type == 'add'){
        this.$refs.configDialog.config = defaultConfig
      } else {
        this.$refs.configDialog.config = Object.assign({}, defaultConfig, item)
      }
      // 处理分类设备选中状态
      this.$refs.configDialog.dealList()
    },
    // 子组件传过来的 列表图片信息
    refresh(val) {
      if(val) this.getList()
    }
  }
}
</script>

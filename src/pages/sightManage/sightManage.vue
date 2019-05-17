<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div class="filter">          
      <span>情景管理</span>
      <el-button
        type="primary" 
        @click="showConfig('add')">添加情景</el-button>
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
          prop="name"
          label="情景名称"/>
        <el-table-column
          prop="time"
          label="添加时间"/>
        <el-table-column
          prop="state"
          label="是否启用">
          <template slot-scope="scope">
            {{ scope.row.state ? '禁用':'启用' }}
          </template>
        </el-table-column>
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
              @click="handeStateClick(scope.row.state)">
              {{ scope.row.state ? '禁用':'启用' }}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handeDeleteClick(scope.row.state)">删除</el-button>
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
    <Config :config="config"/>
  </div>
</template>
<style lang="less" scoped>
.filter{
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
import Config from './components/config.vue'
export default {
  components: {
    Config
  },
  data() {
    return {
      pages: {
        page: '1',
        limit: '10',
        total: '40'
      },
      list: [{
        date: '01',
        name: '离家',
        upmode: "手动点击",
        time: '2019-01-09 15:21:21',
        state: 0,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '02',
        name: '回家',
        upmode: "进入wifi",
        time: '2019-01-09 15:21:21',
        state: 0,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '03',
        name: '睡觉',
        upmode: "定时启动",
        time: '2019-01-09 15:21:21',
        state: 0,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '04',
        name: '影院',
        upmode: "手动点击",
        time: '2019-02-09 15:21:21',
        state: 1,
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '05',
        name: '排队',
        upmode: "语音命令",
        time: '2019-03-09 15:21:21',
        state: 1,
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      config : {}
    }
  },
  methods: {
    getList() {
    },
    handeStateClick(state) {
      let type = '启用'
      if(state){
        type = '禁用'
      }
      this.$confirm(`您是否确定${type}该情景？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
    },
    handeDeleteClick() {
      this.$confirm(`您是否确定删除该情景？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
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

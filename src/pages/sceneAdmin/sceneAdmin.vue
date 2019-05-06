<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div>
      <el-row :gutter="24">
        <el-col :span="2">
          <span>场景管理</span>
          <el-button
            type="primary"
            style="position:absolute;right:0px;">添加场景</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 列表 -->
    <div style="margin-top: 60px">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          :index="indexMethod"
          type="index"
          label="序号"
          width="180"/>
        <el-table-column
          prop="name"
          label="场景名称"
          width="180"/>
        <el-table-column
          prop="upmode"
          label="启动方式"
          width="180"/>
        <el-table-column
          prop="time"
          label="添加时间"
          width="180"/>
        <el-table-column
          prop="state"
          label="是否启用"
          width="180"/>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)">查看</el-button>
            <el-button
              type="text"
              size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="changeState(scope.$index,tableData)">{{ tableData[scope.$index].state }}</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteRow(scope.$index,tableData)">删除</el-button>
          </template>
        </el-table-column>



      </el-table>
    </div>
    <!-- 启用/禁用 -->
    <!-- <div>
      <el-dialog
        title="禁用场景提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>您是否确定禁用该场景？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ok(index)">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="删除场景提示"
        :visible.sync="deleteVisible"
        width="30%"
      >
        <span>您是否确定删除该场景？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteOK123()">确 定</el-button>
        </span>
      </el-dialog>
    </div> -->
    <!-- 分页 -->
    <div
      class="block"
      style="position:absolute;right:0px;">
      <!-- <span class="demonstration">显示总数</span> -->
      <el-pagination
        :current-page.sync="currentPage1"
        :page-size="5"
        :total="153"
        background
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '01',
        name: '离家',
        upmode: "手动点击",
        time: '2019-01-09 15:21:21',
        state: false,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '02',
        name: '回家',
        upmode: "进入wifi",
        time: '2019-01-09 15:21:21',
        state: '禁用',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '03',
        name: '睡觉',
        upmode: "定时启动",
        time: '2019-01-09 15:21:21',
        state: '禁用',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '04',
        name: '影院',
        upmode: "手动点击",
        time: '2019-02-09 15:21:21',
        state: '禁用',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '05',
        name: '排队',
        upmode: "语音命令",
        time: '2019-03-09 15:21:21',
        state: '禁用',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage1: 5,
      dialogVisible: false,
      deleteVisible: false,
      deleteOK: false,
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    changeState(index, rows) {
      console.log(index,rows)
      // this.tableData[index].state = "启用";
      this.tableData[index].state = !this.tableData[index].state
      // this.dialogVisible = true;

      console.log(this.tableData[index].state)
    },
    indexMethod(index) {
      return ("0"+(index+1))
    },

    // deleteOK123(index, rows) {
    //   this.deleteOK = true;
    //   this.deleteVisible = false;
    //   rows.splice(index, 1)
    // },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },

  }
}
</script>

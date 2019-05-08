<template>
  <div class="page-content">
    <!-- 顶部tab -->
    <div class="filter">
      <span>商城预定</span>
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
          prop="goods"
          label="预定设备"/>
        <el-table-column
          prop="name"
          label="用户姓名"/>
        <el-table-column
          prop="phone"
          label="联系方式"/>
        <el-table-column
          prop="address"
          label="收货地址"/>
        <el-table-column
          prop="time"
          label="预定时间"/>
        <el-table-column
          prop="state"
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.state ? '已发货':'未处理' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="!!scope.row.state"
              type="text"
              size="small"
              @click="handeStateClick(scope.$index,scope.row.state)">
              处理
            </el-button>
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
export default {
  data() {
    return {
      pages: {
        page: '1',
        limit: '10',
        total: '40'
      },
      list: [{
        goods: '路由器  电视  立式空调  挂式空调  电动窗帘  开关',
        name: '蔡高泽',
        phone: "13631631226",
        address: '深圳市罗湖区文锦路爱国大厦1203',
        time: '2019-01-09 15:21:21',
        state: 0
      },
      {
        goods: '路由器  电视  立式空调  挂式空调  电动窗帘  开关',
        name: '蔡高泽',
        phone: "13631631226",
        address: '深圳市罗湖区文锦路爱国大厦1203',
        time: '2019-01-09 15:21:21',
        state: 0
      },
      {
        goods: '路由器  电视  立式空调  挂式空调  电动窗帘  开关',
        name: '蔡高泽',
        phone: "13631631226",
        address: '深圳市罗湖区文锦路爱国大厦1203',
        time: '2019-01-09 15:21:21',
        state: 0
      },
      {
        goods: '路由器  电视  立式空调  挂式空调  电动窗帘  开关',
        name: '蔡高泽',
        phone: "13631631226",
        address: '深圳市罗湖区文锦路爱国大厦1203',
        time: '2019-01-09 15:21:21',
        state: 1
      },
      {
        goods: '路由器  电视  立式空调  挂式空调  电动窗帘  开关',
        name: '蔡高泽',
        phone: "13631631226",
        address: '深圳市罗湖区文锦路爱国大厦1203',
        time: '2019-01-09 15:21:21',
        state: 1
      } ]
    }
  },
  methods: {
    getList() {
    },
    handeStateClick(index,state) {
      if(state==0) {
        const h = this.$createElement
        this.$msgbox({
          title: '处理',
          message: h('p', null, [
            h('p', null, '当前状态： 未发货'),
            h('span', null, '确定将此预订信息设为'),
            h('span', { style: 'color: red;font-size: 18px' }, '已发货'),
            h('span', null, '状态？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            done()
          }
        }).then(action => {
          if(state==0){
            this.list[index].state = 1
          }
          this.$message({
            type: 'success',
            message: '处理成功，已发货'
          })
        }).catch()
      }
    },
    handPageChange(val) {
      this.pages.page = val
      this.getList()
    },
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>

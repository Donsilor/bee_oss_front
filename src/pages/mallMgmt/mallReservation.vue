<template>
  <div class="page-content">
    <!-- 顶部tab -->
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
        >
          查询
        </el-button>
      </div>
      <div class="right">
        <el-button @click="exportExel">
          导出数据
        </el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div>
      <el-table
        :data="list"
        border>
        <el-table-column
          :index="indexMethod"
          type="index"
          label="序号"
          width="80"/>
        <el-table-column
          prop="content"
          label="购买套餐"/>
        <el-table-column
          prop="name"
          label="用户姓名"/>
        <el-table-column
          prop="tel"
          label="联系方式"/>
        <el-table-column
          prop="address"
          label="收货地址"/>
        <el-table-column
          prop="updated_at"
          label="预定时间"/>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status ? '已发货':'未处理' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              :disabled="!!scope.row.status"
              type="text"
              size="small"
              @click="handestatusClick(scope.$index, scope.row.status, scope.row.id)">
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
.filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
        total: '40'
      },
      search: {
        daterange: [],
        name: '',
        phone: '',
        type: ''
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let param = this.getParam()
      return this.$http
        .post(PREFIX + "mall_record/lists", param)
        .then(res => {
          const json = res.data
          if (json.code === 200) {
            this.list = res.data.result.data
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
        page: '1',
        limit: '10',
      }
      this.getList()
    },
    exportExel() {
      let token = JSON.parse(localStorage.getItem("localData")).user.info.token
      let param = {
        token: token,
        page: '1',
        limit: '10000'
      }
      if (this.search.daterange && this.search.daterange.length > 0) {
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
      var query = ""
      for (var o in param) {
        if (param[o] != -1) {
          query += o + "=" + param[o] + "&"
        }
      }
      query = query.substring(0, query.length - 1)
      console.log(query)
      window.open(`${PREFIX}mall_record/export?${query}`)
    },
    handestatusClick(index,status,id) {
      console.log(status)
      if(status ==0 ) {
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
          this.changeStatus('1', id)
        })
      }
    },
    changeStatus(status, selectId){
      let param = {
        id: selectId,
        status: status
      }
      this.$http
        .post(PREFIX + "mall_record/save_status", param)
        .then(res => {
          if (res.data.code === 200) {
            this.getList()
            this.$message({
              type: 'success',
              message: '处理成功!'
            })
          } else {
            this.$message.error(res.data.msg)
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
    handPageChange(val) {
      this.pages.page = val
      this.getList()
    },
    indexMethod(index) {
      return (this.pages.page - 1) * this.pages.limit + index + 1
    }
  }
}
</script>

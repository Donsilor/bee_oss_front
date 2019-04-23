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

        <el-button type="primary">查询</el-button>
      </div>
      <div class="right">
        <el-button>导出数据</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="tableData"
        height="650"
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
          prop="time"
          label="提交时间"
        />
      </el-table>
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
    el-input {
      flex: 1;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      search: {
        daterange: [],
        name: '',
        phone: '',
        type: ''
      },
      tableData: [{
        time: '2016-05-03',
        name: '王小虎',
        account: 'this is account',
        tel: '18666594641',
        content: '套餐一'
      }, {
        time: '2016-05-03',
        name: '王小虎',
        account: 'this is account',
        tel: '18666594641',
        content: '套餐一'
      }, {
        time: '2016-05-03',
        name: '王小虎',
        account: 'this is account',
        tel: '18666594641',
        content: '套餐一'
      }, {
        time: '2016-05-03',
        name: '王小虎',
        account: 'this is account',
        tel: '18666594641',
        content: '套餐一'
      },]
    }
  },
}
</script>

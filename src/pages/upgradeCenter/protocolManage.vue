<template>
  <div>
    <div class="form-header">
      <el-button type="primary">新增协议</el-button>
      <el-button type="primary">协议更新记录</el-button>
    </div>
    <List
      :table-items="tableItems"
      :table-data="tableData">
      <template slot="handle">
        <el-button type="text">更新</el-button>
        <el-button type="text">删除</el-button>
      </template>
    </List>
  </div>
</template>

<script>
import List from './component/List.vue'
export default {
  name: "ProtocolManage",
  components: {List},
  data() {
    return {
      tableData: [{id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      },{id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      },{id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      },{id: '01',
        name: '家居服务协议',
        url: 'https://router.vuejs.org/zh/guide/#html',
        remark: '这是10月份协议',
        version: 'v1.0.0',
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableItems: [
        {label: '协议Id', prop: 'id', width:'70'},
        {label: '协议名称', prop: 'name', width:''},
        {label: '协议连接', prop: 'url', width:'350'},
        {label: '备注', prop: 'remark', width:''},
        {label: '版本号', prop: 'version', width:'90'},
        {label: '更新时间', prop: 'date', width:'160'},
        {label: '操作', prop: 'handle', width:'', shouldCustom: true},
      ]
    }
  }
}
</script>

<style scoped>
.form-header{
	margin-bottom: 30px;
}
</style>

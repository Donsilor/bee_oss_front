<template>
  <div>
    <div class="form-header">
      <el-button
        type="primary"
        @click="addProtocal">新增协议</el-button>
    </div>
    <List
      :table-items="tableItems"
      :table-data="tableData">
      <template
        slot="handle"
        slot-scope="scope">
        <el-button
          type="text"
          @click="refresh(scope.row)">更新</el-button>
        <el-button
          type="text"
          @click="deleteProtocal(scope.row)">删除</el-button>
      </template>
    </List>
    <add-new-protocal
      v-if="dialogFormVisible"
      :type="type"
      :info="info"
      :dialog-form-visible.sync="dialogFormVisible"/>
  </div>
</template>

<script>
import Bus from '@/assets/EventBus.js'
import List from './component/List.vue'
import addNewProtocal from './component/addNewProtocal.vue'
import Api from '@/service/upgrade.js'
export default {
  name: "ProtocolManage",
  components: {List,addNewProtocal},
  data() {
    return {
      info: {},
      type: 'add',
      recordVisible: false,
      dialogFormVisible: false,
      tableData: [],
      tableItems: [
        {label: '协议Id', prop: 'id', width:'70'},
        {label: '协议名称', prop: 'name', width:''},
        {label: '协议连接', prop: 'url', width:'350'},
        {label: '备注', prop: 'remark', width:''},
        {label: '版本号', prop: 'version', width:'90'},
        {label: '更新时间', prop: 'updated_at', width:'160'},
        {label: '操作', prop: 'handle', width:'', shouldCustom: true},
      ]
    }
  },
  mounted(){
    this.getList()
    Bus.$on('refreshData', this.getList)
  },
  methods:{
  	getList(){
      Api.getAgreementList().then(res=>{
        this.tableData = res.result.data
      })
    },
    addProtocal(){
    	this.type = 'add'
      this.info = {}
      this.dialogFormVisible = true
    },
    refresh(row){
      this.dialogFormVisible = true
      this.info = row
      this.type = 'refresh'
    },
    deleteProtocal(row){
      this.$confirm('确认删除此协议, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Api.agreementdel({id:row.id}).then(res=>{
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.form-header{
	margin-bottom: 30px;
}
</style>

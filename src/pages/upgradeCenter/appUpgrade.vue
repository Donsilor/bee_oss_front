<template>
  <div class="page-content config-page">
    <el-row>
      <el-col :span="24">
        <el-button
          type="primary"
          @click="addApp">新增应用</el-button>
      </el-col>
    </el-row>

    <el-table :data="list">
      <el-table-column
        label="应用名称"
        prop="app_name"/>
      <el-table-column
        :formatter="getOSTypeText"
        label="终端类型"
        prop="os_type"/>
      <el-table-column
        label="版本号"
        prop="version"/>
      <el-table-column
        label="版本信息"
        prop="title"/>
      <el-table-column
        :formatter="(row, col, val)=>formatValue('force', val)"
		label="强制升级"
        prop="force"/>
      <el-table-column
        label="发布时间"
        prop="release_time"/>
      <el-table-column
        width="260px"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="view(scope.row)">查看版本</el-button>
          <el-button
            size="mini"
            @click="edit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-line">
      <el-pagination
        :total="total"
        :page-size="10"
        :current-page.sync="currentPage"
        small
        layout="prev, pager, next"
        @current-change="onPageChange"/>
    </div>

    <el-dialog
      :title="isEdit?'编辑':'新增'"
      :visible.sync="dialogVisible">
      <el-form label-width="100px">
        <el-form-item label="应用名称">
          <el-input v-model="form.app_name"/>
        </el-form-item>
        <el-form-item label="终端类型">
          <el-select
            v-model="form.os_type"
            :disabled="isEdit">
            <el-option
              :value="1"
              label="android"/>
            <el-option
              :value="2"
              label="iOS"/>
            <el-option
              :value="3"
              label="ipad"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveApp">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import API from '../../service/index'
import {formatValue} from './util.js'
export default {
  data() {
    return {
      list: [],
      total: 0,
	  currentPage: 1,
	  limit: 10,
	  form: {
		  app_name: '',
		  os_type: 1
	  },
	  isEdit: false,
	  dialogVisible: false
    }
  },
  mounted() {
	  this.getList()
  },
  methods: {
	  getOSTypeText(row, column, value, index) {
		  return {
			  '1': 'android',
			  '2': 'ios',
			  '3': 'ipad'
		  }[value]
	  },
	  getList() {
		  API.getAppList({
		  page: this.currentPage,
		  limit: this.limit
      }).then(res => {
		this.total = res.data.result.total
        this.currentPage = res.data.result.current_page
        this.list = res.data.result.data
      })
	  },
	  addApp() {
		  this.isEdit = false
		  this.dialogVisible = true
		  this.form = {
			app_name: '',
		  	os_type: 1
		  }
	  },
	  onPageChange(page) {
		  this.currentPage = page
		  this.getList()
	  },
	  saveApp() {
		  API.saveApp(this.form).then(res => {
			  this.dialogVisible = false
			  this.$message.success('保存成功')
			  this.getList()
		  })
	  },
	  view(row) {
		  this.$router.push({
			  path: `appUpgrade/${row.id}`
		  })
		  localStorage.setItem('CurrentAppVerInfo', JSON.stringify(row))
	  },
	  edit(row) {
		  this.isEdit = true
		  this.dialogVisible = true
		  this.form = Object.assign({},row)
	  },
	  del(row) {
		 this.$confirm('确定删除？').then(() => {
			 API.delApp({id: row.id}).then(() => {
				 this.$message.success('删除成功')
				 this.getList()
			 })
		 })
	  },
	  formatValue
  }
}
</script>


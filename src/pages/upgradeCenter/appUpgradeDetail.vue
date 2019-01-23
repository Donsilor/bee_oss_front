<template>
  <div class="page-content config-page">
    <el-row>
      <el-col :span="24">
        <el-button @click="back">返回</el-button>
        <el-button @click="addAppVer">录入版本</el-button>

    </el-col></el-row>

    <el-table :data="list">
      <el-table-column
        label="版本标题"
        prop="title"/>
      <el-table-column
        label="版本号"
        prop="version"/>
      <el-table-column
        label="强制升级"
        prop="force"/>
      <el-table-column
        label="升级数量限制"
        prop="upgrade_limit"/>
      <el-table-column
        label="发布类型"
        prop="release_type"/>
      <el-table-column
        label="升级成功数"
        prop="current_upgrade_count"/>
      <el-table-column
        label="创建时间"
        prop="created_at"/>
      <el-table-column
        label="更新时间"
        prop="updated_at"/>
      <el-table-column
        width="300px"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="view(scope.row)">查看</el-button>

          <el-button
            size="mini"
            @click="edit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="del(scope.row)">删除</el-button><br>
          <el-button
            size="mini"
            @click="setConf(scope.row)">升级设置</el-button>
          <el-button
            size="mini"
            @click="setStatus(scope.row)">{{ scope.row.status===1?'禁用':'启用' }}</el-button>
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
      :visible.sync="dialogVisible"
      :title="isEdit?'编辑':'新增'">
      <el-form
        label-width="100px">

        <el-row>
          <!-- <el-col :span="12"> -->
          <el-form-item
            label="版本Title"
            prop="title">
            <el-input
              v-model="form.title"
              placeholder=""/>
          </el-form-item>

          <el-form-item
            label="版本号"
            prop="version">
            <el-input
              v-model="form.version"
              placeholder=""/>
          </el-form-item>


          <el-form-item
            label="概略描述"
            prop="description">
            <el-input
              v-model="form.description"
              placeholder=""/>
          </el-form-item>

          <!-- </el-col>
          <el-col :span="12"> -->

          <!-- </el-col> -->
        </el-row>

        <el-form-item
          v-if="appInfo.os_type!=1"
          label="appstore链接"
          prop="download_url_object">
          <el-input
            v-model="form.download_url_object"
            type="text" />
        </el-form-item>

        <el-form-item
          v-if="appInfo.os_type==1"
          label="上传固件包"
          prop="download_url_object">
          <upload-file
            ref="uploadFile"
            :file-list="fileListObj"
            class="newButtonStyle"
            @uploadSuccess="getSuccessNews"/>
          <span
            v-show="fileTipsIfShow"
            class="fileObjectTips">请先上传文件</span>
        </el-form-item>

        <el-form-item
          label="上传img图片"
          prop="img_url_object">
          <el-upload
            ref="uploadFileImg"
            :action="corsUrls"
            :on-success="getUploadDataImg"
            :data="uploadObj"
            :limit="1"
            :file-list="fileListImg"
            class="upload-demo">
            <el-button
              size="small"
              type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="是否强制升级"
          prop="force">
          <el-select
            v-model="form.force"
            placeholder="请选择">
            <el-option
              :value="1"
              label="是"/>
            <el-option
              :value="0"
              label="否"/>
          </el-select>
        </el-form-item>

        <el-form-item
          label="版本状态"
          prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择">
            <el-option
              :value="1"
              label="启用"/>
            <el-option
              :value="0"
              label="停用"/>
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="note">
          <el-input
            v-model="form.note"
            placeholder=""/>
        </el-form-item>

        <el-form-item>
          <el-button @click="saveAppVer">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="pushBoxFlag"
      title="推送升级">
      <push-update
        ref="pushUpdates"
        @pushUpdateParent="pushUpdate"
        @closePushBox="pushBoxFlag = false;"/>
    </el-dialog>
  </div>
</template>

<script>
import API from '../../service/index'
import uploadFile from "../../components/uploadFile.vue";
import push_update from "./component/pushUpdateLayer.vue";
import getCorsUrl from "../../lib/corsconfig";

export default {
	components: {
		uploadFile,
		"push-update": push_update,
	},
  data() {
    return {
      list: [],
      total: 0,
	  currentPage: 1,
	  limit: 10,
	  form: {},
	  isEdit: false,
	  dialogVisible: false,
	  fileListObj: [],
	  fileListImg: [],
	  fileTipsIfShow: false,
	  corsUrls: getCorsUrl() + "/oss_file_upload",
	  uploadObj: {
		token: JSON.parse(localStorage.getItem("localData")).user.info.token
	  },
	  appInfo: JSON.parse(localStorage.getItem('CurrentAppVerInfo')),
	  pushBoxFlag: false,
	  pushDataObj: {}
    }
  },
  mounted() {
	  this.getList()
  },
  methods: {
	  back() {
		  this.$router.go(-1)
	  },
	  getList() {
		  API.getAppVerList({
		  page: this.currentPage,
		  app_id: this.appInfo.app_id
      }).then(res => {
        this.currentPage = res.data.result.current_page
        this.list = res.data.result.data
      })
	  },
	  addAppVer() {
		  this.isEdit = false
		  this.dialogVisible = true
		  this.form = {}
		  this.fileListImg = []
		  this.fileListObj = []
	  },
	  onPageChange(page) {
		  this.currentPage = page
		  this.getList()
	  },
	  saveAppVer() {
		  let params = Object.assign({},this.form, {
			  app_id: this.appInfo.app_id,
			  user_id: ""
		  })
		  API.saveAppVer(params).then(res => {
			  this.dialogVisible = false
			  this.$message.success('保存成功')
			  this.getList()
		  })
	  },
	  edit(row) {
		  this.isEdit = true
		  this.dialogVisible = true
		  this.form = Object.assign({},row)
		  console.log(row)
		  let imgName = row["img_url_object"];
		  this.fileListImg = [{ name: imgName, url: imgName }];
		  if (this.appInfo.os_type === 1) {
			let objName = row["download_url_object"];
			this.fileListObj = [{ name: objName, url: objName }];
		}
	  },
	  del(row) {
		 this.$confirm('确定删除？').then(() => {
			 API.delAppVer({version_id: row.version_id}).then(() => {
				 this.$message.success('删除成功')
				 this.getList()
			 })
		 })
	 },
	 view(row) {

	 },

		getUploadDataImg(val) {
			let data = val.result;
			this.form.img_url_object = data.object;
		},
		getSuccessNews: function(val) {
			if (val) {
				this.form.download_url_object = val.download_url_object;
				this.form.download_file_md5 = val.download_file_md5;
				this.form.size = val.size;
				if (this.form.download_url_object) {
					this.fileTipsIfShow = false;
				} else {
					this.fileTipsIfShow = true;
				}
			}
		},
		setConf(row) {
			this.currentRow = row
			this.pushBoxFlag = true
			console.log(this.currentRow)
		},
		setStatus(row) {
			API.setAppVerStatus({
				version_id: row.version_id,
				status: row.status === 1 ? 0 : 1
			}).then(() => {
				this.$message.success('操作成功')
				this.getList()
			})
		},
		pushUpdate(params) {
			let retParams = {
				version_id: this.currentRow.version_id,
				uuid_list: params.uuid_list,
				release_type: params.push_type === 1 ? (params.is_black ? 2 : 1) : params.push_type
			}
            API.setAppVerUuids(retParams).then(result => {
                if (result.code === 0) {
                    this.$message.success("推送成功");
                    this.pushBoxFlag = false;
                    this.getVersionList(1);
                }
            });
        },
  }
}
</script>


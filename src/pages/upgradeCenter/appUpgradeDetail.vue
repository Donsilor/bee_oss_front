<template>
  <div class="page-content config-page">
    <el-row>
      <el-col :span="24">
        <el-button @click="back">
          返回
        </el-button>
        <el-button 
          type="primary"
          @click="addAppVer">
          录入版本
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="list">
      <el-table-column 
        label="版本标题"
        prop="title" />
      <el-table-column 
        label="版本号"
        prop="version" />
      <el-table-column 
        :formatter="(row, col, val)=>formatValue('force', val)"
        label="强制升级"
        prop="force" />
      <el-table-column 
        :formatter="(row, col, val)=>formatValue('release_type', val)"
        label="发布类型"
        prop="release_type" />
      <el-table-column 
        label="升级数量限制"
        prop="upgrade_limit" />
      <el-table-column 
        label="升级成功数"
        prop="current_upgrade_count" />
      <el-table-column 
        label="创建时间"
        prop="created_at" />
      <el-table-column 
        label="更新时间"
        prop="updated_at" />
      <el-table-column 
        width="300px"
        label="操作">
        <template slot-scope="scope">
          <p style="margin-bottom: 5px;">
            <el-button 
              size="mini"
              @click="view(scope.row)">
              查看
            </el-button>

            <el-button 
              size="mini"
              @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button 
              size="mini"
              @click="del(scope.row)">
              删除
            </el-button>
          </p>
          <el-button 
            size="mini"
            @click="setConf(scope.row)">
            升级设置
          </el-button>
          <el-button 
            size="mini"
            @click="setStatus(scope.row)">
            {{ scope.row.status===1?'禁用':'启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-line">
      <el-pagination 
        :total="total"
        :page-size="limit"
        :current-page.sync="currentPage"
        small
        layout="prev, pager, next"
        @current-change="onPageChange" />
    </div>

    <!-- 新增,编辑 -->
    <el-dialog 
      :visible.sync="dialogVisible"
      :title="isEdit?'编辑':'新增'"
      @close="onClose">
      <el-form 
        ref="ruleForm"
        :model="form"
        :rules="rules"
        label-width="150px">
        <el-row>
          <!-- <el-col :span="12"> -->
          <el-form-item 
            label="版本Title"
            prop="title">
            <el-input 
              v-model="form.title"
              placeholder="" />
          </el-form-item>

          <el-form-item 
            label="版本号"
            prop="version">
            <el-input 
              v-model="form.version"
              :disabled="isEdit"
              placeholder="" />
          </el-form-item>

          <el-form-item 
            label="升级描述"
            prop="description">
            <el-input 
              :rows="3"
              v-model="form.description"
              type="textarea"
              placeholder="" />
          </el-form-item>
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
            @uploadSuccess="getSuccessNews" />
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
              type="primary">
              点击上传
            </el-button>
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
              label="是" />
            <el-option 
              :value="0"
              label="否" />
          </el-select>
        </el-form-item>

        <el-form-item 
          label="升级数量限制"
          prop="upgrade_limit">
          <el-input v-model="form.upgrade_limit" />
        </el-form-item>

        <el-form-item 
          label="版本状态"
          prop="status">
          <el-select 
            v-model="form.status"
            placeholder="请选择">
            <el-option 
              :value="1"
              label="启用" />
            <el-option 
              :value="0"
              label="停用" />
          </el-select>
        </el-form-item>
        <el-form-item 
          label="备注"
          prop="note">
          <el-input 
            v-model="form.note"
            placeholder="" />
        </el-form-item>

        <el-form-item>
          <el-button @click="saveAppVer">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 升级设置 -->
    <el-dialog 
      :visible.sync="pushBoxFlag"
      title="升级设置">
      <el-form label-width="100px">
        <el-form-item 
          label="升级类型"
          prop="push_type">
          <el-select 
            v-model="pushForm.release_type"
            placeholder="选择类型">
            <el-option 
              :value="0"
              label="全量升级" />
            <el-option 
              :value="1"
              label="白名单" />
            <el-option 
              :value="2"
              label="黑名单" />
          </el-select>
        </el-form-item>

        <el-row v-if="pushForm.release_type">
          <el-form-item 
            label="推送客户端"
            prop="push_type">
            <el-radio-group v-model="pushForm.terminal_type">
              <el-radio :label="1">
                输入uuid
              </el-radio>
              <el-radio :label="0">
                上传csv压缩包
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-form-item 
          v-if="pushForm.release_type && pushForm.terminal_type"
          label="uuid_list"
          prop="uuid_list">
          <el-row :gutter="24">
            <el-col 
              :span="17"
              style="padding-left:0">
              <el-input v-model="pushForm.uuid_list" />
            </el-col>
          </el-row>
          <el-row>
            <span style="font-size: 12px; color: #999">可输入多个uuid，用逗号隔开</span>
          </el-row>
        </el-form-item>
        <el-form-item 
          v-if="pushForm.release_type && !pushForm.terminal_type"
          label="uuid_csv"
          prop="uuid_csv">
          <el-row :gutter="24">
            <el-col 
              :span="17"
              style="padding-left:0">
              <el-upload 
                ref="uploadFile"
                :action="uuid_upload"
                :data="uploadObj"
                :on-success="getUploadDataUUid"
                :limit="1"
                class="upload-demo">
                <el-button 
                  size="small"
                  type="primary">
                  点击上传
                </el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary"
            @click="pushUpdateForm('pushForm')">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog 
      :visible.sync="detailDialogVisible"
      :title="'详情 - '+currentRow.title">
      <el-row>
        <el-col :span="12">
          <p>版本号：{{ currentRow.version }}</p>
          <p>APP_ID：{{ currentRow.app_id }}</p>
          <p>描述：{{ currentRow.description }}</p>
          <p>固件URL：{{ currentRow.download_url_object }}</p>
          <p>固件MD5：{{ currentRow.download_file_md5 }}</p>
          <p>固件大小：{{ currentRow.size }}</p>
        </el-col>
        <el-col :span="12">
          <p>强制升级：{{ formatValue('force', currentRow.force) }}</p>
          <p>升级类型：{{ formatValue('release_type', currentRow.release_type) }}</p>
          <p>升级限制数量：{{ currentRow.upgrade_limit }}</p>
          <p>升级成功数量：{{ currentRow.current_upgrade_count }}</p>
          <p>状态：{{ formatValue('status', currentRow.status) }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          创建时间：{{ currentRow.created_at }}
        </el-col>
        <el-col :span="12">
          更新时间：{{ currentRow.updated_at }}
        </el-col>
      </el-row>
      <el-row style="padding: 20px 0">
        <el-table :data="uuidList">
          <el-table-column 
            prop="app_uuid"
            label="app_uuid" />
        </el-table>
        <div class="page-line">
          <el-pagination 
            :total="uuidsTotal"
            :page-size="5"
            :current-page.sync="uuidsCurrentPage"
            small
            layout="prev, pager, next"
            @current-change="onUuidPageChange" />
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import API from '../../service/index'
import uploadFile from "../../components/uploadFile.vue"
import getCorsUrl from "../../lib/corsconfig"
import { formatValue } from './util.js'

export default {
  components: {
    uploadFile
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
      detailDialogVisible: false,
      fileListObj: [],
      fileListImg: [],
      corsUrls: getCorsUrl() + "/oss_file_upload",
      uuid_upload: getCorsUrl() + "/uuid_upload",
      uploadObj: {
        token: ''
      },
      appInfo: JSON.parse(localStorage.getItem('CurrentAppVerInfo')),
      pushBoxFlag: false,
      pushForm: {
        release_type: 0,
        terminal_type: 1,
        uuid_csv: '',
        uuid_list: ''
      },
      currentRow: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入升级描述', trigger: 'blur' }
        ],
        download_url_object: [
          { required: true, message: '请上传固件包或appstore链接', trigger: 'blur' }
        ],
        img_url_object: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        force: [
          { required: true, message: '请选择是否强制升级', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择版本状态', trigger: 'blur' }
        ]
      },
      pushFormRules: {

      },
      uuidList: [],
      uuidsTotal: 0,
      uuidsCurrentPage: 1
    }
  },
  mounted() {
    try {
      this.uploadObj.token = JSON.parse(localStorage.getItem("localData")).user.info.token
    } catch (e) { console.log(e) }
    this.getList()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getList() {
      API.getAppVerList({
        page: this.currentPage,
        limit: this.limit,
        app_id: this.appInfo.app_id
      }).then(res => {
        this.total = res.data.result.total
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
      try {
        this.$refs.uploadFile.clearFiles()
      } catch (e) {
        console.log(e)
      }
    },
    onPageChange(page) {
      this.currentPage = page
      this.getList()
    },
    saveAppVer() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.form, {
            app_id: this.appInfo.app_id,
            user_id: ""
          })
          API.saveAppVer(params).then(res => {
            this.dialogVisible = false
            this.$message.success('保存成功')
            this.getList()
          })
        }
      })

    },
    edit(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.form = Object.assign({}, row)
      console.log(row)
      let imgName = row["img_url_object"]
      this.fileListImg = [{ name: imgName, url: imgName }]
      if (this.appInfo.os_type === 1) {
        let objName = row["download_url_object"]
        this.fileListObj = [{ name: objName, url: objName }]
      }
    },
    del(row) {
      this.$confirm('确定删除？').then(() => {
        API.delAppVer({ version_id: row.version_id }).then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
      })
    },
    view(row) {
      this.currentRow = row
      this.detailDialogVisible = true
      this.getUuidList()
    },

    getUploadDataImg(val) {
      let data = val.result
      this.form.img_url_object = data.object
      this.$refs.ruleForm.validateField('img_url_object')
    },
    getUploadDataUUid(val) {
      this.pushForm.uuid_csv = val.result
    },
    getSuccessNews: function(val) {
      if (val) {
        this.form.download_url_object = val.download_url_object
        this.form.download_file_md5 = val.download_file_md5
        this.form.size = val.size
        this.$refs.ruleForm.validateField('download_url_object')
      }
    },
    setConf(row) {
      this.currentRow = row
      this.pushBoxFlag = true
      this.pushForm.release_type = row.release_type
      this.pushForm.uuid_list = ''
      this.pushForm.uuid_csv = ''
      // API.getAppVerUuids({version_id: row.version_id}).then(res => {
      // 	 this.pushForm.uuid_list = res.data.result;
      // })
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
    pushUpdateForm() {
      let retParams = {
        version_id: this.currentRow.version_id,
        release_type: this.pushForm.release_type
      }
      if (this.pushForm.release_type) {
        if (this.pushForm.terminal_type === 1) {
          retParams.uuid_list = this.pushForm.uuid_list.split(',')
        } else if (this.pushForm.terminal_type === 0) {
          retParams.uuid_list = this.pushForm.uuid_csv
        }
      }
      API.setAppVerUuids(retParams).then(() => {
        this.$message.success("设置成功")
        this.pushBoxFlag = false
      })
    },
    onClose() {
      this.$refs.ruleForm.clearValidate()
    },
    formatValue,
    getUuidList() {
      API.getAppVerUuids({
        page: this.uuidsCurrentPage,
        limit: 5,
        version_id: this.currentRow.version_id
      }).then(res => {
        this.uuidsTotal = res.data.result.total
        this.uuidsCurrentPage = res.data.result.current_page
        this.uuidList = res.data.result.data
      })
    },
    onUuidPageChange(page) {
      this.uuidsCurrentPage = page
      this.getUuidList()
    }
  }
}
</script>

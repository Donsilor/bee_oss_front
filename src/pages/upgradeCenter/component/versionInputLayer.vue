<template>
  <el-form
    ref="importForm"
    :model="importForm"
    :rules="rulesImport"
    label-width="10em"
  >
    <el-form-item
      v-if="!releasedFlag && inputType == 13"
      label="版本号"
      prop="version"
    >
      <div>
        <el-input
          v-model="versionList[0]"
          :disabled="!addEditFlag"
          class="unit"
          min="0"
          type="number"
          @change="setVersion"
        />
        .
        <el-input
          v-model="versionList[1]"
          :disabled="!addEditFlag"
          class="unit"
          min="0"
          type="number"
          @change="setVersion"
        />
        .
        <el-input
          v-model="versionList[2]"
          :disabled="!addEditFlag"
          class="unit"
          min="0"
          type="number"
          @change="setVersion"
        />
      </div>
    </el-form-item>

    <el-form-item
      label="版本title"
      prop="title"
    >
      <el-input
        v-model="importForm.title"
        type="text"
      />
    </el-form-item>
    <el-form-item
      v-if="inputType === 2 && addEditFlag"
      label="路由器pid"
      prop="router_pid"
    >
      <el-input
        v-model="importForm.router_pid"
        type="text"
      />
    </el-form-item>
    <el-form-item
      v-if="(inputType === 3 || inputType === 8 || inputType === 5) && addEditFlag"
      label="product_id"
      prop="product_id"
    >
      <el-input
        v-model="importForm.product_id"
        type="text"
      />
    </el-form-item>
    <el-form-item
      v-if="inputType === 5"
      label="os_type"
      prop="os_type"
    >
      <el-select
        v-model="importForm.os_type"
        placeholder="os_type"
      >
        <el-option
          v-for="item in os_type_list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- H5，社区不显示 -->
    <el-form-item
      v-if="inputType !== 5 && inputType !== 9 && inputType !== 10 && inputType !== 13"
      label="升级数量限制"
    >
      <el-input v-model="importForm.upgrade_limit" />
      0或者空为不限制
    </el-form-item>
    <el-form-item
      v-if="inputType!==9 && !releasedFlag && inputType !== 13"
      label="是否限制规则"
    >
      <el-radio-group
        v-model="importForm.selectRule"
      >
        <el-radio :label="1">
          是
        </el-radio>
        <el-radio :label="0">
          否
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 路由器版本 -->
    <el-form-item
      v-if="(inputType !== 2 && inputType!==9 && inputType!==10 && inputType!==12 && inputType!==13) && !releasedFlag && importForm.selectRule"
      label="路由pid"
    >
      <el-select
        v-model="importForm.router_pid"
        :disabled="inputType == 7"
        style="width: 100%;"
        placeholder="路由pid"
        @change="routerPidChange"
      >
        <el-option
          v-for="item in routerPidList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 路由器版本 -->
    <el-form-item
      v-if="(inputType !== 2 && inputType!==9 && inputType!==10 && inputType!==12 && inputType!==13) && !releasedFlag && importForm.selectRule"
      label="支持路由"
      prop="routersList"
    >
      <el-select
        v-model="importForm.routersList"
        style="width: 100%;"
        multiple
        placeholder="路由"
      >
        <el-option
          v-for="item in router"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 语音版APP，系统版本 -->
    <el-form-item
      v-if="inputType === 12 && !releasedFlag && importForm.selectRule"
      label="系统版本"
    >
      <el-select
        v-model="importForm.rule"
        style="width: 100%;"
        multiple
        placeholder="系统版本"
      >
        <el-option
          v-for="item in osVersionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 路由器升级，依赖子设备版本 -->
    <el-form-item
      v-if="inputType === 2 && !releasedFlag && importForm.selectRule"
      label="子设备"
    >
      <el-row>
        <el-col :span="8">
          <el-select
            v-model="importForm.brand_id"
            placeholder="品牌"
          >
            <el-option
              v-for="item in brandIDOptionsChild"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col
          :span="7"
          :offset="1"
        >
          <el-select
            v-model="importForm.type_id"
            placeholder="类型"
          >
            <el-option
              v-for="item in typeIDOptionsChild"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col
          :span="7"
          :offset="1"
        >
          <el-select
            v-model="product_id"
            placeholder="产品"
            @change="productChange"
          >
            <el-option
              v-for="item in productIDOptionsChild"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
    <!-- 路由器升级，依赖子设备版本 -->
    <el-form-item
      v-if="inputType === 2 && !releasedFlag && importForm.selectRule"
      label="支持版本"
      prop="productsList"
    >
      <el-select
        v-model="importForm.productsList"
        style="width: 100%;"
        multiple
        placeholder="子设备"
      >
        <el-option
          v-for="item in subsetProduct"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 社区插件升级，依赖app版本 -->
    <el-form-item
      v-show="inputType === 10 && !releasedFlag && importForm.selectRule"
      label="支持APP版本"
      prop="appList"
    >
      <el-select
        v-model="importForm.appList"
        style="width: 100%;"
        multiple
        placeholder="APP版本"
      >
        <el-option
          v-for="item in appVersionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item
      v-if="!releasedFlag && inputType !== 13"
      label="版本号"
      prop="version"
    >
      <el-input
        v-model="importForm.version"
        :disabled="!addEditFlag"
        type="text"
      />
    </el-form-item>

    <el-form-item
      label="概要描述"
      prop="note"
    >
      <el-input
        v-model="importForm.note"
        type="textarea"
        rows="3"
      />
    </el-form-item>

    <el-form-item
      v-if="inputType === 13"
      label="适用语音app版本"
      prop="enableVersion"
    >
      <div>
        <el-input
          v-model="enableVersionList[0]"
          class="unit"
          min="0"
          type="number"
          @change="setEnableVersion"
        />
        .
        <el-input
          v-model="enableVersionList[1]"
          class="unit"
          min="0"
          type="number"
          @change="setEnableVersion"
        />
        .
        <el-input
          v-model="enableVersionList[2]"
          class="unit"
          min="0"
          type="number"
          @change="setEnableVersion"
        />
        及以上
      </div>

    </el-form-item>

    <el-form-item
      v-if="inputType === 13"
      prop="status"
      label="是否启用">
      <el-radio-group v-model="importForm.status">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item
      v-if="inputType !== 13"
      label="详细事项"
      prop="description"
    >
      <el-input
        v-model="importForm.description"
        type="text"
      />
    </el-form-item>
    <el-form-item
      v-if="inputType !== 13"
      label="备注"
      prop="extra_note"
    >
      <el-input
        v-model="importForm.extra_note"
        type="textarea"
        rows="3"
      />
    </el-form-item>
    <el-form-item
      v-if="os_type === 'ios' && !releasedFlag"
      label="appstore链接"
      prop="download_url_object"
    >
      <el-input
        v-model="importForm.download_url_object"
        type="text"
      />
    </el-form-item>
    <el-form-item
      v-if="os_type !== 'ios' && !releasedFlag"
      label="上传固件包"
      prop="download_url_object"
      class="is-required"
    >
      <!--<el-input type="text" v-model="importForm.download_url_object" />-->
      <!-- <el-upload ref="uploadFile" class="upload-demo" :action="corsUrls" :data="uploadObj" :before-upload="beforeAvatarUpload" :on-success="getUploadData" :on-preview="handlePreview" :limit="1" :file-list="fileListObj" :on-remove="handleRemove">
                <el-button size="small" type="primary">点击上传</el-button>
             </el-upload> -->
      <upload-file
        ref="uploadFile"
        :file-list="fileListObj"
        class="newButtonStyle"
        @uploadSuccess="getSuccessNews"
      />
      <span
        v-show="fileTipsIfShow"
        class="fileObjectTips"
      >请先上传文件</span>
    </el-form-item>
    <el-form-item
      v-if="inputType !== 13"
      label="上传img图片"
      prop="img_url_object"
    >
      <el-upload
        ref="uploadFileImg"
        :action="corsUrls"
        :before-upload="beforeAvatarUploadImg"
        :on-success="getUploadDataImg"
        :data="uploadObj"
        :on-preview="handlePreviewImg"
        :limit="1"
        :file-list="fileListImg"
        :on-remove="handleRemoveImg"
        class="upload-demo"
      >
        <el-button
          size="small"
          type="primary"
        >
          点击上传
        </el-button>
      </el-upload>
    </el-form-item>
    <el-form-item
      label="是否强制升级"
      prop="force"
    >
      <el-select
        v-model="importForm.force"
        style="width: 100%;"
        placeholder="请选择"
      >
        <el-option
          :value="0"
          label="否"
        />
        <el-option
          :value="1"
          label="是"
        />
        <el-option
          :value="3"
          label="不弹窗升级"
        />
      </el-select>
    </el-form-item>

    <!-- iOS版本配置 -->
    <el-form-item
      v-if="os_type === 'ios'"
      label="审核开关"
    >
      <el-switch
        v-model="importForm.audit_switch"
        :active-value="1"
        :inactive-value="0"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="importSubmitForm('importForm')"
      >
        确定
      </el-button>
      <el-button @click="closeParentFlow">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import * as namespace from "../../../store/namespace"
import { mapGetters, mapActions } from "vuex"
import getCorsUrl from "../../../lib/corsconfig"
import API from "../../../service/index"
import uploadFile from "../../../components/uploadFile.vue"
export default {
  components: {
    uploadFile
  },
  props: [
    "brandIDOptions",
    "type",
    "typeIDOptions",
    "productIDOptions",
    "routerPidList",
    "inputType",
    "product",
    "router_pid",
    "addEditFlag",
    "editDataObj",
    "releasedFlag",
    "os_type",
    "activeName",
    "osVersionList"
  ],
  data() {
    return {
      brandIDOptionsChild: this.brandIDOptions,
      typeIDOptionsChild: this.typeIDOptions,
      productIDOptionsChild: this.productIDOptions,
      typeOptions: [
        {
          value: 1,
          label: "APP"
        },
        {
          value: 2,
          label: "路由器"
        },
        {
          value: 3,
          label: "子设备"
        }
      ],
      systemOptions: [
        {
          value: "IOS",
          label: "IOS"
        },
        {
          value: "Android",
          label: "Android"
        }
      ],
      uploadObj: {
        token: JSON.parse(localStorage.getItem("localData")).user.info.token
      },
      fileListObj: [],
      fileListImg: [],
      importForm: {
        router_pid: "",
        method: "",
        title: "",
        version: "",
        //release_time: '',
        routersList: [],
        productsList: [],
        download_url_object: "",
        img_url_object: "",
        download_file_md5: "",
        size: "",
        force: 0,
        brand_id: "",
        type_id: "",
        product_id: "",
        description: "",
        note: "",
        extra_note: "",
        selectRule: 1,
        os_type: "",
        appList: [],
        upgrade_limit: "",
        status: 1, // 1 启用 0 禁用
        rule: []
      },
      versionList: ['', '', ''], // 拆分的版本号
      enableVersionList: ['', '', ''],// 拆分的适用版本号

      rulesImport: {
        router_pid: [{ required: true, message: "请输入路由器pid" }],
        os_type: [{ required: true, message: "请选择os_type" }],
        version: [{ required: true, message: "请输入版本号", trigger: 'blur' }],
        title: [{ required: true, message: "请输入版本标题" }],
        description: [{ required: true, message: "请输入概要描述" }],
        note: [{ required: true, message: "请输入详细事项" }],
        enableVersion: [{ required: true, message: "请输入适用语音app版本", trigger: 'blur'}],
        status: [{ required: true, message: "请选择是否启用" }],

        extra_note: [{ required: false, message: "请输入详细事项" }],
        product_id: [{ required: true, message: "请输入子设备" }],
        routersList: [{ required: true, message: "请选择支持版本" }],
        productsList: [{ required: true, message: "请选择支持版本" }],
        // download_url_object: [{ required: true, message: '请上传固件包' }],
        download_url_object: [],
        img_url_object: [{ required: true, message: "请上传img图片" }],
        force: [{ required: true, message: "请选择是否强制升级" }]
      },
      appVersionList: [],
      subsetProduct: [],
      router: [],
      // router_pid: "",
      corsUrls: getCorsUrl() + "/oss_file_upload",
      editData: {
        user_id: "",
        status: "",
        id: ""
      },
      product_id: "",
      os_type_list: [
        {
          label: "android_app",
          value: "android_app"
        },
        {
          label: "ios_app",
          value: "ios_app"
        },
        {
          label: "android_pad",
          value: "android_pad"
        }
      ],
      os_type_text: {
        1: "android_app",
        4: "ios_app",
        6: "android_pad",
        13: "lua_app"
      },
      fileTipsIfShow: false //文件未上传的提示：上传文件不能为空
    }
  },
  computed: {

  },
  watch: {
    "importForm.brand_id"(curVal, oldVal) {
      this.importForm.type_id = ""
      this.importForm.product_id = ""
      this.typeIDOptionsChild = this.type.filter(x => x.brand_ids.indexOf(curVal * 1) >= 0).map(x => {
        return {
          label: x.type_name,
          value: x.type_id
        }
      })
    },
    "importForm.type_id"(curVal, oldVal) {
      this.importForm.product_id = ""
      const brandKey = this.importForm.brand_id * 1
      const typeKey = curVal * 1
      this.productIDOptionsChild = this.product
        .filter(x => x.brand_id === brandKey && x.type_id === typeKey)
        .map(x => {
          return {
            label: x.product_id,
            value: x.product_id
          }
        })
    }
  },
  mounted() {
    console.log(this.inputType)
  },
  methods: {
    setVersion() {
      if(this.versionList[0].trim() === ''  || this.versionList[1].trim() === '' || this.versionList[2].trim() === ''){
        this.importForm.version = ''
      } else {
        this.importForm.version = this.versionList.join('.')
      }
    },
    setEnableVersion() {
      if(this.enableVersionList[0].trim() === ''  || this.enableVersionList[1].trim() === '' || this.enableVersionList[2].trim() === ''){
        this.importForm.enableVersion = ''
      } else {
        this.importForm.enableVersion = this.enableVersionList.join('.')
      }
    },
    getSuccessNews: function(val) {
      if (val) {
        this.importForm.download_url_object = val.download_url_object
        this.importForm.download_file_md5 = val.download_file_md5
        this.importForm.size = val.size
        this.$refs["importForm"].validate(valid => { })
        if (this.importForm.download_url_object) {
          this.fileTipsIfShow = false
        } else {
          this.fileTipsIfShow = true
        }
      }
    },
    ruleChange(val) {
      //            if (val) {
      //                this.rulesImport.productsList =  [
      //                    { required: true, message: '请选择支持版本' }
      //                ]
      //                this.rulesImport.routersList =  [
      //                    { required: true, message: '请选择支持版本' }
      //                ]
      //			} else {
      //                this.rulesImport.productsList =  [
      //                    { required: false }
      //                ]
      //                this.rulesImport.routersList =  [
      //                    { required: false }
      //                ]
      //			}
    },
    renderEditData() {
      let attrObj = {
        title: "",
        download_file_md5: "",
        force: "",
        version: "",
        description: "",
        img_url_object: "",
        note: "",
        extra_note: "",
        size: "",
        download_url_object: "",
        audit_switch: 0,
        upgrade_limit: "",
        status: ""
      }
      if (this.inputType === 2) {
        attrObj["router_pid"] = ""
      }
      if (this.inputType === 3 || this.inputType === 8 || this.inputType === 5) {
        attrObj["product_id"] = ""
      }
      if (this.inputType === 5) {
        attrObj["os_type"] = this.os_type_text[this.editDataObj["os_type"]]
      }
      let thisForm = this.importForm
      for (let attr in attrObj) {
        let value = this.editDataObj[attr]
        thisForm[attr] = value || value === 0 ? value : ""
      }
      // thisForm['release_time'] = new Date(this.editDataObj['release_time']*1000)
      let imgName = this.editDataObj["img_url_object"]
      this.fileListImg = [{ name: imgName, url: imgName }]
      if (this.os_type !== "ios") {
        let objName = this.editDataObj["download_url_object"]
        this.fileListObj = [{ name: objName, url: objName }]
      }
      if (this.inputType === 2) {
        let currentProducts = this.editDataObj["rules"]
        if (currentProducts.length === 1 && currentProducts[0].rule === "*") {
          thisForm["selectRule"] = 0
        } else {
          currentProducts.forEach(item => {
            thisForm["productsList"].push(item.product_id + "--" + item.rule)
          })
        }
      } else if (this.inputType === 10) {
        let currentRouters = this.editDataObj["rules"] || []
        if (currentRouters.length === 1 && currentRouters[0].rule === "*") {
          thisForm["selectRule"] = 0
        } else {
          thisForm["appList"] = this.editDataObj["rules"].map(item => {
            return item.rule
          })
        }
      } else {
        let currentRouters = this.editDataObj["rules"] || []
        if (currentRouters.length === 1 && currentRouters[0].rule === "*") {
          thisForm["selectRule"] = 0
        } else {
          currentRouters.forEach(item => {
            thisForm["routersList"].push(item.router_pid + "--" + item.rule)
          })
        }
      }

      thisForm.rule = thisForm.rule || []
      // 版本号拆分
      if (this.inputType === 13) {
        thisForm.enableVersion = this.editDataObj.rule
        this.enableVersionList = this.editDataObj.rule.split('.')

        thisForm.version = this.editDataObj.version
        this.versionList = this.editDataObj.version.split('.')
      }

      console.log('------editData--------')
      console.log(this.editData)
      // 由于接口设计，要求编辑的时候带上详情的几个字段
      for (let attr in this.editData) {
        this.editData[attr] = this.editDataObj[attr]
      }
    },
    resetImportForm() {
      if (this.inputType === 3 || this.inputType === 8 || this.inputType === 5) {
        // 此处尚未找到具体原因，暂时先这样修复
        this.$refs["importForm"].fields.forEach((field, index) => {
          if (field.prop === undefined) {
            this.$refs["importForm"].fields.splice(index, 1)
          }
        })
        this.rulesImport["product_id"] = [{ required: true, message: "请输入子设备" }]
      }
      // if (this.os_type !== "ios" && !this.releasedFlag) {
      try {
        if(this.$refs["importForm"]) this.$refs["importForm"].resetFields()
        if(this.$refs["uploadFileImg"]) this.$refs["uploadFileImg"].clearFiles()
        this.fileTipsIfShow = false
        if(this.$refs["uploadFile"]) this.$refs["uploadFile"].clearFiles()
      } catch (e) { console.log(e) }
      // }

      let form = this.importForm
      for (let attr in form) {
        switch (attr) {
        case "routersList":
        case "productsList":
        case "appList":
        case "rule":
          form[attr] = []
          break
        case "force":
          form[attr] = 0
          break
        case "selectRule":
          form[attr] = 1
          break
        case "status":
          form[attr] = 1
          break
        default:
          form[attr] = ""
          break
        }
      }
      if(this.inputType === 13 ) {
        this.enableVersionList = ['', '', '']
        form.enableVersion = ''
      }
      if(this.inputType === 7) {
        this.importForm.router_pid = this.router_pid
        this.routerPidChange(this.router_pid)
      }
      this.getAppReleasedVersionList()
      this.fileListObj = []
    },
    closeParentFlow() {
      this.$emit("closeImportBox")
    },
    productChange(val) {
      let obj = this
      if (this.inputType === 3 || this.inputType === 8) {
        return
      }
      API.pubilcCorsAction({
        method: "released_versions",
        type: 3,
        product_id: val
      }).then(res => {
        if (res.code === 0) {
          let list = res.result
          if (list && list.length) {
            obj.currentProductId = val
            obj.subsetProduct = list.map(x => {
              return {
                label: x.version,
                product_id: x.product_id,
                value: `${x.product_id}--${x.version}`
              }
            })
          } else {
            obj.subsetProduct = []
          }
        }
      })
    },
    getAppReleasedVersionList() {
      if (this.inputType !== 10) {
        return
      }
      API.pubilcCorsAction({
        method: "released_versions",
        type: 10,
        os_type: this.os_type
      }).then(res => {
        if (res.code === 0) {
          let list = res.result
          if (list && list.length) {
            this.appVersionList = list.map(item => {
              return {
                label: item.version,
                value: item.version
              }
            })
          } else {
            this.appVersionList = []
          }
        }
      })
    },
    //录入
    importSubmitForm(formName) {
      if (!this.importForm.download_url_object) {
        this.fileTipsIfShow = true
      }
      const obj = this
      obj.$refs[formName].validate(valid => {
        if (valid) {
          if (!obj.importForm["selectRule"]) {
            obj.importForm["routersList"] = [{ router_pid: "*", rule: "*" }]
            obj.importForm["productsList"] = [{ product_id: "*", rule: "*" }]
          }
          let params = Object.assign({}, obj.importForm)
          let currentType = obj.inputType
          // params.release_time = params.release_time && params.release_time.Format('yyyy-MM-dd hh:mm:ss')
          delete params.brand_id
          delete params.type_id

          let attrName = currentType === 2 ? "product_id" : "router_pid"
          let ruleName = currentType === 2 ? "productsList" : "routersList"
          if( currentType === 13 ){
            params.rules = [{ router_pid: "*", rule: this.enableVersionList.join('.') }]
          } else {
            if (params.selectRule) {
              if (currentType === 10) {
                params.rules = params.appList.map(item => {
                  return {
                    rule: item
                  }
                })
              } else {
                params.rules = params[ruleName].map(item => {
                  let arr = item.split("--")
                  return {
                    [attrName]: arr[0],
                    rule: arr[1]
                  }
                })
              }
            } else {
              if (currentType === 10) {
                delete params.rules
              } else {
                params.rules = params[ruleName]
              }
            }
          }


          if( currentType === 7 && !obj.importForm["selectRule"]){
            params.rules = [{ router_pid: this.router_pid, rule: "*" }]
          }

          if (currentType !== 5) {
            delete params.os_type
          }
          switch (currentType) {
          case 1:
          case 11:
          case 13:
            params.os_type = this.os_type
            params.method = this.addEditFlag ? "create_app_version" : "update_app_version"
            delete params.enableVersion
            break
          case 12:
            if (currentType == 12) {
              delete params.router_pid
            }
            params.os_type = this.os_type
            params.method = this.addEditFlag ? "create_app_version" : "update_app_version"
            break
          case 2:
            params.method = this.addEditFlag ? "create_router_version" : "update_router_version"
            break
          case 3:
            params.method = this.addEditFlag ? "create_device_version" : "update_device_version"
            break
          case 5:
            params.method = this.addEditFlag ? "create_h5_version" : "update_h5_version"
            break
          case 7:
            params.method = this.addEditFlag
              ? "create_android_system_version"
              : "update_android_system_version"
            break
          case 8:
            params.method = this.addEditFlag
              ? "create_device_android_system_version"
              : "update_device_android_system_version"
            break
          case 9:
            params.os_type = this.os_type
            params.method = this.addEditFlag
              ? "create_app_community_version"
              : "update_app_community_version"
            break
          case 10:
            params.os_type = this.os_type
            params.method = this.addEditFlag
              ? "create_app_community_plugin_version"
              : "update_app_community_plugin_version"
            break
          default:
            break
          }

          if (currentType !== 3 && currentType !== 8 && currentType !== 5) {
            delete params.product_id
          }
          if (currentType !== 2) {
            delete params.router_pid
          }
          delete params.productsList
          delete params.routersList
          delete params.selectRule

          if (!this.addEditFlag) {
            for (let attr in this.editData) {
              if(attr == 'status' && this.inputType == 13) continue
              params[attr] = this.editData[attr]
            }
          }
          if (this.inputType === 1 && this.os_type === "ios") {
            params.size = 0
            params.download_file_md5 = "default"
          }
          if (!this.importForm.download_url_object) {
            //如果文件还没有上传，则不发送请求，直接退出
            this.fileTipsIfShow = true
            return
          }
          console.log('------------submit----------')
          console.log(params)
          obj.$emit("importSubmitParent", params)
        } else {
          return false
        }
      })
    },
    routerPidChange(val) {
      if (!val) {
        return
      }
      let param = {
        method: "released_versions",
        router_pid: val,
        type: 2
      }
      const obj = this
      API.getChoseList(param).then(result => {
        if (result.code === 0) {
          obj.router = result.result.map(x => {
            return {
              label: x.version,
              value: `${x.router_pid}--${x.version}`,
              product_id: x.product_id
            }
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) { },
    handleRemoveImg(file, fileList) { },
    handlePreviewImg(file) { },
    // getUploadData(val) {
    //     let data = val.result;
    //     this.importForm.download_url_object = data.object;
    //     this.importForm.download_file_md5 = data.md5;
    //     this.importForm.size = data.file_size;
    //     this.$refs['importForm'].validate(valid => {});
    // },
    getUploadDataImg(val) {
      let data = val.result
      this.importForm.img_url_object = data.object
      this.$refs["importForm"].validate(valid => { })
    },
    beforeAvatarUpload(file) {
      // const isRight = (file.type === 'application/zip' || file.type === 'application/rar');
      //const isLt2M = file.size / 1024 / 1024 < 100;
      //            if (!isRight) {
      //                this.$message.error('上传只能是 zip|rar 格式!');
      //            }
      //            if (!isLt2M) {
      //                this.$message.error('上传文件大小不能超过 100MB!');
      //            }
      //            return isLt2M;
    },
    beforeAvatarUploadImg(file) {
      //            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
      //const isLt2M = file.size / 1024 / 1024 < 100;
      //            if (!isJPG) {
      //                this.$message.error('上传头像图片只能是 JPG|PNG 格式!');
      //            }
      //            if (!isLt2M) {
      //                this.$message.error('上传头像图片大小不能超过 100MB!');
      //            }
      //            return isLt2M;
    }
  },
}
</script>
<style lang="less">
.newButtonStyle {
  .chooseFileButton {
    background-color: #409eff;
    width: 80px;
    height: 32px;
    border-radius: 3px;
    font-size: 12px;
    line-height: 32px;
    span {
      line-height: 32px;
    }
  }
}
.fileObjectTips {
  color: #f56c6c;
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  margin-top: 0;
  display: block;
}
.unit{
  width: 100px;
}
</style>

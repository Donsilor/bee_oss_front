<template>
  <div class="page-content config-page">
    <!--顶部tab-->
    <el-row
      type="flex"
      justify="space-between"
    >
      <el-col :span="12">
        <el-button-group>
          <el-button @click="openImportLayer">
            录入版本
            <i class="el-icon-caret-bottom" />
          </el-button>
          <el-button @click="openFilterFormLayer">
            匹配搜索
            <i class="el-icon-caret-bottom" />
          </el-button>
          <!--<el-button @click="openPushLayer">推送升级 <i class="el-icon-caret-bottom"></i></el-button>-->
        </el-button-group>
      </el-col>
    </el-row>
    <div
      class="p-r"
      style="height: 40px; padding-top: 10px"
    >
      <!--<div style="line-height: 40px; height: 40px">{{secondTitle}}</div>-->
      <el-button
        type="text"
        class="btn-back"
        @click="backToList"
      >
        返回上一级
      </el-button>
      <template v-if="inputType === 3 || inputType === 8">
        <el-tabs
          v-model="activeName"
          @tab-click="deviceRouterChange"
        >
          <el-tab-pane
            label="子设备列表"
            name="devices"
          />
          <el-tab-pane
            label="子路由列表"
            name="routers"
          />
        </el-tabs>
      </template>
    </div>
    <!--子设备列表-->
    <el-table
      :data="versionList.tableData"
      style="width: 100%; border-top:0 none"
    >
      <el-table-column
        v-for="item in versionList.tableColumn"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="'auto'"
        align="center"
      >
        <template slot-scope="scope" >
          <div v-if="item.prop == 'type'">
            {{ getTypeText(scope.row.type, scope.row.os_type) }}
          </div>
          <div v-else-if="item.prop == 'status'">
            {{ getStatusText(scope.row.status) }}
          </div>
          <div v-else-if="item.prop == 'force'">
            {{ getForceText(scope.row.force) }}
          </div>
          <div v-else-if="item.prop == 'is_pre_release'">
            {{ getPreReleaseText(scope.row.is_pre_release) }}
          </div>
          <div v-else-if="item.prop == 'gray'">
            {{ getGrayStatus[scope.row.gray] }}
          </div>
          <div v-else-if="item.prop === 'release_time'">
            {{ formatTime(scope.row['created_at']) }}
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="inputType == 13"
        :width="'auto'"
        prop="rule"
        align="center"
        label="适用语音APP版本">
        <template slot-scope="scope">
          {{ scope.row['rule'] }}
        </template>
      </el-table-column>
      <el-table-column
        :width="250"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="getVersionDetail(scope.row)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="openSupportLayer(scope.row)"
          >
            支持版本
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="openVersionEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="startStopVerion(scope.row)"
          >
            {{ scope.row['status']?'禁用':'启用' }}
          </el-button>
          <br>
          <el-button
            v-if="scope.row.type!='8'"
            type="text"
            size="small"
            @click="openPushLayer(scope.row)"
          >
            推送
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="getOperateLog(scope.row)"
          >
            操作日志
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="rollBackVersion(scope.row)"
          >
            回滚
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteVersion(scope.row)"
          >
            删除
          </el-button>
          <el-button
            v-if="scope.row.type!='8'"
            type="text"
            size="small"
            @click="deleteUUID(scope.row)"
          >
            清空UUID
          </el-button>

          <!-- <el-button type="text" size="small" @click="getVersionHistory(scope.row,1)">查看版本列表</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="page-line">
      <el-pagination
        :total="totalItem_two"
        :page-size="10"
        :current-page.sync="currentPage_two"
        small
        layout="prev, pager, next"
        @current-change="pageChange_two"
      />
    </div>
    <!--版本匹配搜索-->
    <el-dialog
      :visible.sync="filterPopoverFlag"
      title="版本匹配搜索"
    >
      <filter-form
        key="filterForms"
        ref="filterForms"
        :type="type"
        :brand-idoptions="brandIDOptions"
        :type-idoptions="typeIDOptions"
        :product-idoptions="productIDOptions"
        :input-type="inputType"
        :product="product"
        :router="router"
        @filterVersionsParent="filterVersions"
        @closeFilterBox="filterPopoverFlag = false;"
      />
    </el-dialog>
    <!--版本详情-->
    <el-dialog
      :visible.sync="infoBoxFlag"
      title="版本详情"
    >
      <version_detail
        ref="versionDetails"
        :rule-form-detail="ruleFormDetail"
        :device-obj="currentDetailObj"
      />
      <div style="text-align: right; margin: 0">
        <el-button
          type="primary"
          @click="infoBoxFlag=false"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
    <!--版本录入-->
    <el-dialog
      :title="addEditFlag?'录入版本':'编辑版本'"
      :visible.sync="importBoxFlag"
    >
      <version-input
        key="versionInputs"
        ref="versionInputs"
        :flag="flag"
        :brand-idoptions="brandIDOptions"
        :type-idoptions="typeIDOptions"
        :product-idoptions="productIDOptions"
        :os-version-list="osVersionList"
        :input-type="inputType"
        :product="product"
        :type="type"
        :router_pid="router_pid"
        :os_type="os_type"
        :add-edit-flag="addEditFlag"
        :edit-data-obj="editDataObj"
        :released-flag="releasedFlag"
        :router-pid-list="routerPidList"
        :active-name="activeName"
        @importSubmitParent="importSubmit"
        @closeImportBox="importBoxFlag = false;"
      />
    </el-dialog>
    <!--推送升级-->
    <el-dialog
      :visible.sync="pushBoxFlag"
      title="推送升级"
    >
      <push-update
        ref="pushUpdates"
        :type="type"
        :input-type="inputType"
        :push-data-obj="pushDataObj"
        @pushUpdateParent="pushUpdate"
        @closePushBox="pushBoxFlag = false;"
      />
    </el-dialog>
    <!--操作日志-->
    <el-dialog
      :visible.sync="operateLogLayer"
      title="操作日志"
    >
      <operate_log :operate-log-list="operateLogList" />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          style="border:none;"
          @click="operateLogLayer = false"
        >取 消</el-button>
      </span>
    </el-dialog>
    <!--支持版本-->
    <el-dialog
      :visible.sync="supportLayer"
      title="支持版本"
    >
      <version-mapping
        ref="supportLayer"
        :input-type="inputType"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          style="border:none;"
          @click="supportLayer = false"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/*
设备类型：
1、android_app，2、router，3、子设备，4、ios，5、H5，6、android_pad，7、android_system，8、device_android_system，9、community_app，10、community_app_plugin

os_type:
1、android_app, 4、ios, 6、android_pad

新增force类型：
3，不弹窗升级（当前共有：0：非强制，1：强制，3：不弹窗升级）2已被占用
*/
import * as namespace from '../../store/namespace'
import { mapGetters, mapActions } from 'vuex'
import '../../lib/util.js'
import versions_children_json from '../../json/versionsChildren.json'
import operation_log_json from '../../json/operateLogList.json'
import version_input from './component/versionInputLayer.vue'
import push_update from './component/pushUpdateLayer.vue'
// import version_edit from "./component/versionEdit.vue";
import version_detail from './component/versionDetail.vue'
import operate_log from './component/operateLogs.vue'
import filter_form from './component/filterLayer.vue'
import version_mapping from './component/versionMapping.vue'
import API from '../../service/index'
export default {
  components: {
    'version-input': version_input,
    'push-update': push_update,
    // version_edit: version_edit,
    version_detail: version_detail,
    operate_log: operate_log,
    'filter-form': filter_form,
    'version-mapping': version_mapping
  },
  filters: {
    typeToString (x) {
      if (x * 1 === 1) {
        return 'APP'
      } else if (x * 1 === 2) {
        return '路由器'
      } else if (x * 1 === 3) {
        return '子设备'
      } else {
        return '未知'
      }
    },
    forceToString (x) {
      return x ? '是' : '否'
    },
    statusToString (x) {
      return x ? '启用' : '停用'
    }
  },
  data () {
    return {
      supportLayer: false,
      firstTableShow: true,
      pushBoxFlag: false,
      info: {},
      importBoxFlag: false,
      filterPopoverFlag: false,
      infoBoxFlag: false,
      totalItem: 0,
      totalItem_two: 0,
      currentPage: 1,
      currentPage_two: 1,
      filterTypeOptions: [
        {
          value: 2,
          label: '路由器'
        },
        {
          value: 3,
          label: '子设备'
        }
      ],
      brandIDOptions: [],
      typeIDOptions: [],
      productIDOptions: [],
      listParams: {
        method: 'list_versions',
        page: 1,
        limit: 10,
        level: 1
      },
      terminalOptions: [
        {
          value: '1',
          lable: '选项一'
        }
      ],
      versionOptions: [
        {
          value: '1',
          lable: '选项一'
        }
      ],
      osOptions: [
        {
          value: '1',
          lable: '选项一'
        }
      ],
      osVersionList: [],
      versionsFirst: {},
      versionList: {},
      inputType: '',
      ruleFormDetail: {
        title: '',
        description: '',
        version: '',
        type: '',
        force: '',
        size: '',
        note: '',
        status: '',
        download_file_md5: '',
        download_url_object: '',
        img_url_object: '',
        created_at: '',
        updated_at: '',
        release_time: ''
      },
      rulesDetail: {},
      suportDevice: [],
      pushHistoryList: {},
      pushDataObj: {},
      secondTitle: '',
      currentDataObj: {},
      currentDetailObj: {},
      operateLogLayer: false,
      operateLogList: {},
      addEditFlag: true,
      editDataObj: {},
      releasedFlag: false, // 已发布/未发布标识 || 版本编辑，已发布版本只能编辑几个字段
      mappingData: {}, // 各设备对应映射关系
      router: [],
      os_type: '',
      routerPidList: [],
      os_type_text: {
        1: 'android_app',
        4: 'ios_app',
        6: 'android_pad',
        11: 'route_app',
        12: 'video_app',
        13: 'lua_app'
      },
      device_type_text: {
        2: '路由器',
        3: '子设备',
        5: 'H5',
        7: 'Android system'
      },
      getGrayStatus: {
        0: '无',
        1: '白名单',
        2: '黑名单',
        3: '全量'
      },
      activeName: 'devices',
      router_pid: '',
      flag: false
    }
  },
  ...mapActions([
    'getVersions',
    'selectVersion',
    'importSubmitAction',
    'pushUpdateAction',
    'getVersionDetailAction',
    'pubilcCorsAction'
  ]),
  computed: {
    ...mapGetters({
      brand: namespace.BRAND,
      type: namespace.TYPE,
      product: namespace.PRODUCT
    })
    // currentName() {
    //   let name = this.getTypeText(this.currentDataObj.type, this.currentDataObj.os_type) + " "
    //   if (this.currentDataObj.product_id) {
    //     name += this.currentDataObj.product_id
    //   }
    //   if (this.currentDataObj.router_pid) {
    //     name += this.currentDataObj.router_pid
    //   }
    //   return name
    // }
  },
  watch: {
    filterPopoverFlag (curVal, oldVal) {
      if (curVal) {
        if (!this.brandIDOptions.length) {
          this.brandIDOptions = this.brand.map(x => {
            return {
              label: x.brand_name,
              value: x.brand_id
            }
          })
        }
        this.versionOptions = this.router
      }
    }
  },
  mounted () {
    this.$store.dispatch({
      type: namespace.INITPRODUCT
    })

    try {
      const dataObj = JSON.parse(sessionStorage.getItem('CurrentAppInfo'))
      this.router_pid = dataObj.router_pid || ''
      this.getVersionHistory(dataObj)
    } catch (e) {
      this.$router.push({ path: '/main/versionManager' })
    }

    this.getVersionList()
    this.getOsVersionList()
  },
  methods: {
    getOsVersionList () {
      API.pubilcCorsAction({
        'method': 'released_versions',
        'type': 7
      }).then(res => {
        this.osVersionList = res.result.map(item => {
          return {
            label: item.version,
            value: item.version
          }
        })
      })
    },
    // 获取所有版本列表
    getVersionList () {
      const obj = this
      API.getVersions(obj.listParams).then(result => {
        if (result.code === 0) {
          obj.$nextTick(() => {
            let currentData = result.result
            obj.setFirstVersionList(currentData)
          })
        }
      })
    },
    // 渲染首列数据
    setFirstVersionList (dataObj) {
      for (let attr in dataObj) {
        if (attr === 'router') {
          this.routerPidList = []
          for (let routerAttr in dataObj[attr]) {
            this.routerPidList.push({
              label: routerAttr,
              value: routerAttr
            })
          }
        }
      }
    },
    openSupportLayer (dataObj) {
      this.supportLayer = true
      this.$nextTick(() => {
        this.$refs['supportLayer'].renderData(dataObj)
      })
    },
    openFilterFormLayer () {
      this.filterPopoverFlag = true
      this.$nextTick(() => {
        this.$refs['filterForms'].resetFilterForm()
      })
    },
    formatTime (val) {
      if (!val) {
        return '------'
      } else {
        return val
        //                let date = new Date(val*1000)
        //                return date.Format('yyyy-MM-dd hh:mm:ss')
      }
    },
    openVersionEdit (dataObj) {
      this.initBrandIDOptions()
      this.filterPopoverFlag = false
      let cur_os_type = ''
      if (dataObj.os_type) {
        switch (dataObj.os_type) {
          case 1:
            cur_os_type = 'android_app'
            break
          case 4:
            cur_os_type = 'ios_app'
            break
          case 6:
            cur_os_type = 'android_pad'
            break
          case 11:
            cur_os_type = 'route_app'
            break
          case 12:
            cur_os_type = 'video_app'
            break
          case 13:
            cur_os_type = 'lua_app'
            break
          default:
            cur_os_type = dataObj.os_type
            break
        }
      }

      let param = {
        method: 'version_detail',
        type: dataObj.type,
        version: dataObj.version,
        product_id: dataObj.product_id || '',
        os_type: cur_os_type,
        router_pid: dataObj.router_pid || ''
      }
      let obj = this
      API.pubilcCorsAction(param).then(result => {
        let currentData = result.result
        obj.releasedFlag = currentData.status === 1
        obj.addEditFlag = false
        obj.editDataObj = currentData
        obj.importBoxFlag = true
        obj.$nextTick(() => {
          obj.$refs['versionInputs'].resetImportForm()
          obj.$refs['versionInputs'].renderEditData()
        })
      })
    },
    // 禁用、启用
    startStopVerion (dataObj) {
      let obj = this
      obj
        .$confirm('确定此操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let param = {
            type: dataObj.type,
            version: dataObj.version,
            os_type: obj.os_type_text[dataObj.os_type] || '',
            user_id: dataObj.user_id,
            product_id: dataObj.product_id,
            router_pid: dataObj.router_pid,
            method: dataObj['status'] ? 'disable' : 'enable'
          }

          API.pubilcCorsAction(param).then(result => {
            if (result.code === 0) {
              obj.$message({
                type: 'success',
                message: '操作成功!'
              })
              obj.getVersionHistory(obj.currentDataObj, 1)
            }
          })
        })
    },
    // 操作日志
    getOperateLog (dataObj) {
      this.operateLogLayer = true
      this.operateLogList = operation_log_json
      let obj = this
      let param = {
        type: dataObj.type,
        version: dataObj.version,
        product_id: dataObj.product_id,
        method: 'history_operation_logs'
      }
      API.pubilcCorsAction(param).then(result => {
        if (result.code === 0) {
          obj.operateLogList.tableData = result.result.items
        }
      })
    },
    // 删除
    deleteVersion (dataObj) {
      let obj = this
      obj
        .$confirm('确定此操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let param = {
            type: dataObj.type,
            version: dataObj.version,
            user_id: dataObj.user_id,
            product_id: dataObj.product_id || '',
            os_type: obj.os_type_text[dataObj.os_type] || '',
            router_pid: dataObj.router_pid || '',
            method: 'del_version'
          }

          API.pubilcCorsAction(param).then(result => {
            if (result.code === 0) {
              obj.$message({
                type: 'success',
                message: '删除成功!'
              })
              obj.getVersionHistory(obj.currentDataObj, 1)
            }
          })
        })
    },
    // 回滚
    rollBackVersion (dataObj) {
      let obj = this
      obj
        .$confirm('确定此操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let param = {
            type: dataObj.type,
            version: dataObj.version,
            user_id: dataObj.user_id,
            product_id: dataObj.product_id,
            method: 'rollback',
            os_type: obj.os_type_text[dataObj.os_type] || ''
          }

          API.pubilcCorsAction(param).then(result => {
            if (result.code === 0) {
              obj.$message({
                type: 'success',
                message: '回滚成功!'
              })
              obj.getVersionHistory(obj.currentDataObj, 1)
            }
          })
        })
    },
    deleteUUID (row) {
      this.$confirm('确定此操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const param = {
            type: row.type,
            version: row.version,
            user_id: row.user_id,
            product_id: row.product_id,
            os_type: this.os_type_text[row.os_type] || '',
            router_pid: row.router_pid,
            method: 'uuid_del'
          }

          API.pubilcCorsAction(param).then(result => {
            if (result.code === 0) {
              this.$message({
                type: 'success',
                message: '清空UUID成功!'
              })
            }
          })
        })
    },
    // 获取详情
    getVersionDetail (dataObj) {
      this.infoBoxFlag = true
      this.currentDetailObj = dataObj
      let param = {
        method: 'version_detail',
        type: dataObj.type,
        version: dataObj.version,
        product_id: dataObj.product_id || '',
        os_type: this.os_type_text[dataObj.os_type] || '',
        router_pid: dataObj.router_pid || ''
      }
      let obj = this
      API.pubilcCorsAction(param).then(result => {
        obj.ruleFormDetail = result.result
        // let datas = result.result;
        // let form = obj.ruleFormDetail;
        // for (let attr in form) {
        //     form[attr] = datas[attr];
        // }
      })
      obj.$nextTick(() => {
        obj.$refs['versionDetails'].resetList()
      })
    },
    filterClearAll () {
      // for (let name in this.filterForm) {
      // this.filterForm[name] = '';
      // }
    },
    rowChosed (scope) {
      this.infoBoxFlag = true
      this.info = scope.row
    },
    initBrandIDOptions () {
      try {
        if (!this.brandIDOptions.length) {
          this.brandIDOptions = this.brand.map(x => {
            return {
              label: x.brand_name,
              value: x.brand_id
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    openImportLayer () {
      this.addEditFlag = true
      this.releasedFlag = false
      this.initBrandIDOptions()
      this.importBoxFlag = true
      this.filterPopoverFlag = false
      this.$nextTick(() => {
        this.$refs['versionInputs'].resetImportForm()
      })
    },
    openPushLayer (dataObj) {
      this.pushDataObj = dataObj
      this.initBrandIDOptions()
      this.pushBoxFlag = true
      this.$nextTick(() => {
        this.$refs['pushUpdates'].resetPushForm()
      })
    },
    // 版本录入
    importSubmit (params) {
      API.pubilcCorsAction(params)
        .then(result => {
          if (result.code === 0) {
            this.$message.success(this.addEditFlag ? '录入成功' : '编辑成功')
            this.importBoxFlag = false
            this.pageChange_two(1)
          }
        })
        .catch(result => {
          if (result.message === '该版本信息已存在') {
            this.flag = true
          }
        })
        .then(() => {
          this.flag = false
        })
    },
    // 推送升级
    pushUpdate (params) {
      API.pubilcCorsAction(params).then(result => {
        if (result.code === 0) {
          this.$message.success('推送成功')
          this.pushBoxFlag = false
          this.pageChange_two(1)
        }
      })
    },
    pageChange_two (page) {
      if (page) {
        this.currentPage_two = page
      }
      this.getVersionHistory(this.currentDataObj, this.currentPage_two)
    },
    // 版本匹配搜索
    filterVersions (params) {
      let obj = this
      API.pubilcCorsAction(params).then(result => {
        if (result.code === 0) {
          obj.filterPopoverFlag = false
          obj.firstTableShow = false
          let currentData = result.result
          obj.versionList.tableData = currentData.items
          obj.versionList = versions_children_json
          obj.totalItem = currentData.page.total
        }
      })
    },
    getTypeText (type, os_type) {
      let text = ''
      if (type === 1) {
        text = os_type
      } else {
        text = this.device_type_text[type]
      }
      return text
    },
    getStatusTextPush (type) {
      let text = ''
      switch (type) {
        case 1:
          text = '成功'
          break
        case 0:
          text = '失败'
          break
        default:
          break
      }
      return text
    },
    getStatusText (type) {
      let text = ''
      switch (type) {
        case 1:
          text = '有效'
          break
        case 0:
          text = '无效'
          break
        default:
          break
      }
      return text
    },
    getForceText (type) {
      let text = ''
      switch (type) {
        case 3:
          text = '不弹窗升级'
          break
        case 1:
          text = '强制升级'
          break
        case 0:
          text = '不强制'
          break
        default:
          break
      }
      return text
    },
    getPreReleaseText (type) {
      let text = ''
      switch (type) {
        case 1:
          text = '灰度版本'
          break
        case 0:
          text = '正式版本'
          break
        default:
          break
      }
      return text
    },
    // 历史版本
    getVersionHistoryList (page, dataObj) {
      // this.listParams.page = page
      let param = {
        page: page,
        limit: 10,
        level: 2,
        os_type: dataObj.os_type || '',
        router_pid: dataObj.router_pid || '',
        type: dataObj.type,
        product_id: dataObj.product_id || ''
      }
      const obj = this
      API.getVersions(param).then(result => {
        if (result.code === 0) {
          let currentData = result.result
          obj.firstTableShow = false
          if (Array.isArray(currentData.items)) {
            versions_children_json.tableData = currentData.items
          } else {
            let temp = []
            Object.keys(currentData.items).forEach(k => {
              temp.push(currentData.items[k])
            })
            versions_children_json.tableData = temp
          }
          obj.versionList = Object.assign({}, versions_children_json)
          // 适用版app 字段显隐
          // if(this.inputType === 13 && obj.versionList.tableColumn.length == 6){
          //   obj.versionList.tableColumn.push({ "prop": "rule", "label": "适用语音APP版本" })
          // }else if(obj.versionList.tableColumn.length > 6) {
          //   obj.versionList.tableColumn.pop()
          // }
          obj.totalItem_two = currentData.page.total
        }
      })
    },
    getVersionHistory (dataObj, page) {
      this.currentDataObj = dataObj // 此操作是为了进入列表，进行各种操作时需要重新刷新列表
      this.inputType = dataObj.type
      this.os_type = dataObj.os_type || ''
      this.secondTitle = this.getVersionTitle(dataObj)
      this.getVersionHistoryList(page, dataObj)
    },
    getVersionTitle (dataObj) {
      let title = ''
      if (dataObj.name) {
        title = dataObj.name + '-版本历史'
      } else {
        if (dataObj.type === 3) {
          title = '子设备-' + dataObj.product_id + '-版本历史'
        } else if (dataObj.type === 5) {
          title = 'H5-' + dataObj.product_id + '-版本历史'
        }
      }
      return title
    },
    backToList () {
      this.$router.go(-1)
    },
    getPidName (dataObj) {
      if (dataObj.type === 3 || dataObj.type === 8 || dataObj.type === 5) {
        if (dataObj.product_id) {
          return '--' + dataObj.product_id
        } else {
          return ''
        }
      } else if (dataObj.type === 2) {
        if (dataObj.router_pid) {
          return '--' + dataObj.router_pid
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    // 子设备/子路由切换
    deviceRouterChange () {
      this.currentDataObj.type = this.activeName === 'devices' ? 3 : 8
      this.getVersionHistory(this.currentDataObj, 1)
    }
  }
}
</script>
<style lang="less">
.cp-filterFormBox {
  padding: 20px;
  label {
    line-height: 36px;
  }
  .cpf-line {
    margin-bottom: 20px;
  }
}
.config-page {
  .el-tabs__active-bar {
    height: 2px;
  }
  .h3_pp {
    height: 30px;
    line-height: 30px;
    margin: 30px 0 15px;
  }
  .cpsr-line {
    margin-bottom: 80px;
  }
  .infoBox {
    font-size: 1rem;
    > div {
      margin-bottom: 18px;
    }
  }

  .p-r {
    position: relative;
  }
  .btn-back {
    position: absolute;
    right: 10px;
    z-index: 999;
    top: 10px;
  }
  .support-routers {
    border: 1px solid #d8d8d8;
    li {
      line-height: 35px;
      padding-left: 30px;
      height: 35px;
      list-style: none;
      border-bottom: 1px solid #d8d8d8;
    }
    li:last-of-type {
      border-bottom: 0;
    }
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>

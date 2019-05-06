<template>
  <div class="page-content rootLog-page">
    <div style="padding-bottom: 30px;">
      <!--搜索框-->
      <el-row
        :gutter="24"
        style="margin-right: 0"
      >
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.uuid"
            placeholder="uuid"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.msg_tag"
            placeholder="msg_tag"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.session_id"
            placeholder="session_id"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.method"
            placeholder="method"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.svr_id"
            placeholder="svr_id"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.user_id"
            placeholder="user_id"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.router_id"
            placeholder="router_id"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-input
            v-model="rootLogForm.code"
            type="number"
            placeholder="code"
          />
        </el-col>
      </el-row>
      <el-row
        :gutter="24"
        style="margin-top: 15px"
      >
        <el-col
          :span="3"
          style="padding-right: 0; "
        >
          <el-date-picker
            v-model="rootLogForm.select_date"
            style="width: 100%"
            placeholder="今天"
          />
        </el-col>
        <el-col
          :span="3"
          style="padding-right: 0; "
          class="time-box-col"
        >
          <el-time-picker
            v-model="rootLogForm.start_end_time"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          />
        </el-col>
        <el-col
          :span="2"
          style="padding-right: 0; "
        >
          <el-button
            type="primary"
            @click="getRootLogs(1)"
          >
            &nbsp;&nbsp;查询&nbsp;&nbsp;
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="rootLogData.tableData"
        style="width: 100%"
      >
        <el-table-column
          :width="60"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="getDetail(scope.row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in rootLogData.tableColumn"
          :key="item.prop"
          :prop="item.prop"
          :show-overflow-tooltip="true"
          :label="item.label"
          :width="getWidth(item.prop)"
          sortable
        >
          <template slot-scope="scope">
            <div :title="scope.row[item.prop]">
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--width="auto"-->
        <!--label="日志">-->
        <!--<template scope="scope">-->
        <!--<el-button  type="text" size="small" @click="openLogOutLayer(scope.row)">登录登出日志</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
      <div class="page-line">
        <el-pagination
          :total="totalItem"
          :page-size="15"
          :current-page.sync="currentPage"
          small
          layout="prev, pager, next"
          @current-change="pageChange"
        />
      </div>
    </div>
    <el-dialog
      :visible.sync="detailFlag"
      title="日志详情"
      class="rootLogDetail"
    >
      <div class="edit_form">
        <el-form label-width="125px">
          <el-row>
            <el-col
              v-for="(value, key) in logDetail"
              :key="key"
              :span="12"
            >
              <el-form-item :label="key">
                <span>{{ value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button
          type="primary"
          @click="detailFlag=false"
        >
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex"
import rootLogJson from "../../json/rootLogs.json"
import "../../lib/util"
import API from "../../service/index"
export default {
  components: {},
  data() {
    let startTime = new Date().setHours(0, 0, 0)
    return {
      detailFlag: false,
      rootLogForm: {
        inner: "",
        uuid: "",
        select_date: new Date(),
        user_id: "",
        svr_id: "",
        router_id: "",
        msg_tag: "",
        method: "",
        code: "",
        session_id: "",
        limit: 15,
        start_end_time: [new Date(startTime), new Date()]
      },
      totalItem: 0,
      currentPage: 1,
      rootLogData: {},
      logDetail: {
        log_type: "",
        channel: "",
        method: "",
        msg_tag: "",
        session_id: "",
        host_name: "",
        client_info: "",
        svr_id: "",
        dst_id: "",
        uuid: "",
        user_id: "",
        family_id: "",
        room_id: "",
        router_id: "",
        device_id: "",
        msg: "",
        req_time: "",
        process_time: "",
        rcv_time: "",
        rsp_time: "",
        queue_cost_time: "",
        process_cost_time: "",
        net_cost_time: "",
        code: "",
        cost_time: "",
        created_time: "",
        req_id: "",
        req: ""
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getRootLogs(1)
  },
  methods: {
    getDetail(dataObj) {
      this.detailFlag = true
      let obj = this.logDetail
      for (let attr in obj) {
        obj[attr] = dataObj[attr]
      }
    },
    getRootLogs(page) {
      let obj = this
      let param = {}
      let currentForm = {}
      for (let attr in obj.rootLogForm) {
        currentForm[attr] = obj.rootLogForm[attr]
      }
      if (currentForm.code) {
        currentForm.code = parseInt(currentForm.code)
      } else {
        delete currentForm.code
      }

      currentForm.page = page
      for (let attr in currentForm) {
        if (attr === "start_end_time") {
          if (currentForm["start_end_time"].length) {
            param.start_time = currentForm["start_end_time"][0].Format("hh:mm:ss")
            param.end_time = currentForm["start_end_time"][1].Format("hh:mm:ss")
          }
        } else {
          param[attr] = currentForm[attr]
        }
      }
      API.rootLogs(param).then(result => {
        // obj.terminalList = result
        rootLogJson.tableData = result.data
        this.rootLogData = rootLogJson
        this.totalItem = result.total
      })
    },
    pageChange() {
      this.getRootLogs(this.currentPage)
    },
    getWidth(prop) {
      let val = 0
      switch (prop) {
      case "method":
        val = 100
        break
      case "user_id":
      case "msg_tag":
        val = 100
        break
      case "router_id":
      case "cost_time":
        val = 110
        break
      case "host_name":
        val = 120
        break
      case "created_time":
        val = 130
        break
      default:
        val = "auto"
        break
      }
      return val
    }
  },
  ...mapActions(["rootLogs"])
}
</script>
<style lang="less">
.rootLog-page {
  .el-table td > .cell > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }
  .el-table .cell,
  .el-table th > div {
    padding-right: 0;
  }
  .el-date-editor.el-input {
    width: auto;
  }
}
.rootLogDetail {
  .el-form-item__content {
    word-wrap: break-word;
    line-height: 30px;
  }
  .el-form-item {
    margin-bottom: 3px;
  }
  .el-form-item__label {
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    color: #999;
  }
}
.time-box-col {
  .el-date-editor {
    width: 100%;
  }
}
</style>

<template>
  <div class="page-content rootLog-page">
    <div style="padding-bottom: 30px;">
      <!--搜索框-->
      <el-row :gutter="24">
        <el-col :span="22">
          <el-row :gutter="24">
            <el-col
              :span="3"
              style="padding-right: 0"
            >
              <el-input
                v-model="rootLogForm.log_type"
                placeholder="日志类型"
              />
            </el-col>
            <el-col
              :span="3"
              style="padding-right: 0"
            >
              <el-input
                v-model="rootLogForm.host_name"
                placeholder="host_name"
              />
            </el-col>
            <el-col
              :span="3"
              style="padding-right: 0"
            >
              <el-input
                v-model="rootLogForm.svr_id"
                placeholder="服务器ID"
              />
            </el-col>
            <el-col
              :span="3"
              style="padding-right: 0"
            >
              <el-input
                v-model="rootLogForm.monitor_name"
                placeholder="告警名称"
              />
            </el-col>
            <el-col
              :span="3"
              style="padding-right: 0"
            >
              <el-date-picker
                v-model="rootLogForm.select_date"
                style="width: 100%"
                placeholder="今天"
              />
            </el-col>
            <el-col :span="3">
              <el-time-picker
                v-model="rootLogForm.start_end_time"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
              />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
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
          v-for="item in rootLogData.tableColumn"
          :key="item.prop"
          :prop="item.prop"
          :show-overflow-tooltip="true"
          :label="item.label"
          :width="'auto'"
          sortable
        >
          <template slot-scope="scope">
            <div v-if="scope.row[item.prop]==='created_time'">
              {{ scope.row[item.prop].Format('yyyy/MM/dd hh:mm') }}
            </div>
            <div
              v-else
              :title="scope.row[item.prop]"
            >
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
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
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import rootLogJson from '../../json/warnList.json'
import '../../lib/util'
import API from '../../service/index'
export default {
  components: {},
  data () {
    let startTime = new Date().setHours(0, 0, 0)
    return {
      rootLogForm: {
        log_type: '',
        host_name: '',
        select_date: new Date(),
        svr_id: '',
        monitor_name: '',
        limit: 15,
        start_end_time: [new Date(startTime), new Date()]
      },
      totalItem: 0,
      currentPage: 1,
      rootLogData: {}
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.getRootLogs(1)
  },
  methods: {
    getDetail (dataObj) {
      this.detailFlag = true
      let obj = this.logDetail
      for (let attr in obj) {
        obj[attr] = dataObj[attr]
      }
    },
    getRootLogs (page) {
      let obj = this
      let param = {}
      let currentForm = obj.rootLogForm
      currentForm.page = page
      for (let attr in currentForm) {
        if (attr === 'start_end_time') {
          if (currentForm['start_end_time'].length) {
            param.start_time = currentForm['start_end_time'][0].Format('hh:mm:ss')
            param.end_time = currentForm['start_end_time'][1].Format('hh:mm:ss')
          }
        } else {
          param[attr] = currentForm[attr]
        }
      }
      API.getwarnDataList(param).then(result => {
        // obj.terminalList = result
        rootLogJson.tableData = result.data.result.data
        this.rootLogData = rootLogJson
        this.totalItem = result.data.result.total
      })
    },
    pageChange () {
      this.getRootLogs(this.currentPage)
    }
  },
  ...mapActions(['getwarnDataList'])
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
        width: 150px;
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
</style>

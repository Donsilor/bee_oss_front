<template>
  <div class="page-content deviceList-page">
    <div style="padding-bottom: 30px;"  class="search">
      <!--搜索框-->
      <el-row :gutter="24">
        <el-col :span="3" style="padding-right: 0">
          <el-input v-model="familyDeviceForm.family_id" placeholder="请输入家庭id" />
        </el-col>
        <el-col :span="3" style="padding-right: 0">
          <el-input v-model="familyDeviceForm.device_uuid" placeholder="设备uuid" />
        </el-col>
        <el-col :span="3" style="padding-right: 0">
          <el-input v-model="familyDeviceForm.device_name" placeholder="请输入设备名" />
        </el-col>
        <el-col :span="3" style="padding-right: 0" class="time-box-col">
           <el-date-picker
            v-model="familyDeviceForm.beg_mtime"
            type="datetime"
            placeholder="请选择起始更新时间">
          </el-date-picker>
        </el-col>
        <el-col :span="3" style="padding-right: 0" class="time-box-col">
           <el-date-picker
            v-model="familyDeviceForm.end_mtime"
            type="datetime"
            placeholder="请选择结束更新时间">
          </el-date-picker>
        </el-col>
        <el-col :span="3" style="padding-right: 0" class="time-box-col">
          <el-select v-model="familyDeviceForm.device_category" placeholder="请选择设备类型">
            <el-option
              v-for="item in device_category_option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
         <el-row>
            <el-col :span="6" >
              <el-button type="primary" @click="getFamilyDeviceList(1)">
                &nbsp;&nbsp;查询&nbsp;&nbsp;
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button  @click="reset()">
                &nbsp;&nbsp;重置&nbsp;&nbsp;
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="familyDeviceList.tableData" style="width: 100%">
        <el-table-column
          v-for="item in familyDeviceList.tableColumn"
          :prop="item.prop"
          :label="item.label"
          :width="'auto'"
        >
          <template slot-scope="scope">
            <div :title="scope.row[item.prop]">
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openLayer(scope.row)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-line">
        <el-pagination
          :total="totalItem"
          :page-size="page_size"
          :current-page.sync="currentPage"
          small
          layout="prev, pager, next"
          @current-change="pageChange"
        />
      </div>
    </div>
    <el-dialog
      :visible.sync="infoModel"
      :lock-scroll="false"
      title="设备详情"
      width="60%"
      class="deviceDettailPage"
    >
      <el-collapse v-model="activeNames" class="el-detail">
        <el-collapse-item title="列表数据详情" name="1" class="el-collapse-item-height">
          <el-form >
          <el-row>
            <el-col
              v-for="(value, key) in familyDeviceList.currentDetail"
              :key="key"
              :span="12"
            >
              <el-form-item v-if="(key != 'params')" :label="familyDeviceList.detailKey2Chinese[key]">
                <span>{{ value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        </el-collapse-item>
        <el-collapse-item title="params详情" name="2" class="el-collapse-item-height">
          <el-form>
          <el-row v-if="familyDeviceList.currentParams">
            <el-col
              v-for="(value, key) in familyDeviceList.currentParams"
              :key="key"
              :span="12"
            >
              <el-form-item :label="key">
                <span>{{ value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col>暂无params数据</el-col>
          </el-row>
        </el-form>
        </el-collapse-item>
        <el-collapse-item title="告警信息" name="3" class="el-collapse-item-height">
          <el-form>
          <el-row v-if="familyDeviceList.currentDetailAlert">
            <el-col
              v-for="(value, key) in familyDeviceList.currentDetailAlert"
              :key="key"
              :span="12"
            >
              <el-form-item :label="familyDeviceList.alertKey2Chinese[key]">
                <span>{{ value }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
          暂时无告警信息
          </el-row>
        </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>
<script>
import '../lib/util'
import API from '../service/index'

export default {
  components: {},
  data() {
    return {
      familyDeviceForm: {
        family_id: '',
        device_uuid: '',
        device_name: '',
        beg_mtime: '',
        end_mtime: '',
        device_category: ''
      },
      // 设备类型相对应得中文名字，用于组装成顶部得设备类型选择所需要得数据
      device_category_type2name: {
        '-1': '总开关',
        '-2': '全屋灯',
        '0': '无效',
        '1': '空调',
        '2': '窗帘',
        '3': '电视',
        '4': '电饭煲',
        '5': '灯',
        '6': '电子秤',
        '7': '摄像头',
        '8': '智能开关',
        '9': '空气质量检测仪',
        '10': '温湿度计',
        '11': '路由器',
        '12': '门窗传感器',
        '13': '人体传感器',
        '14': '可视对讲机',
        '15': '音箱',
        '16': '晾衣机',
        '17': '洗衣机',
        '18': '空气净化器',
        '19': '净水器',
        '20': '可视门铃',
        '21': '信号放大器',
        '22': '智能路由器',
        '23': '门锁',
        '24': '电烤箱',
        '25': '电热水器',
        '138': '人体移动传感器',
        '139': '门窗开关传感器',
        '159': '智能面板',
        '160': '智能魔镜'
      },
      infoModel: false,
      totalItem: 0,
      currentPage: 1,
      page_size: 10,
      listParams: {},
      detailParams: {},
      familyDeviceList: {
        tableColumn: [
          { prop: 'family_id', label: '家庭id' },
          { prop: 'device_name', label: '设备名称' },
          { prop: 'device_uuid', label: '设备唯一uuid' },
          { prop: 'access_type', label: '设备接入类型' },
          { prop: 'online', label: '设备状态' },
          { prop: 'mode', label: '开启状态' },
          { prop: 'update_time', label: '更新时间' }
        ],
        detailKey2Chinese: {
          'did': '家庭设备id',
          'family_id': '家庭id',
          'room_id': '家庭里房间id',
          'device_name': '设备名称',
          'category_id': '设备类别',
          'category_sub_id': '设备子类别',
          'device_uuid': '设备唯一uuid',
          'access_type': '设备接入类型',
          'bussiness_name': '渠道厂商名称',
          'parent_uuid': '父中控uuid',
          'online': '设备状态',
          'create_time': '绑定时间',
          'update_time': '更新时间',
          'mode': '开启状态'
        },
        // 调用getDeviceDetail接口获取回来的数据中alert中key对应的中文名
        alertKey2Chinese: {
          'family_id': '家庭ID',
          'device_uuid': '设备唯一uuid',
          'alert_code': '设备错误码',
          'alert_level': '告警级别',
          'alert_status': '告警状态',
          'create_time': '创建时间',
          'alert_title': '推送标题',
          'alert_text': '推送内容'
        },
        access_type_list: ['本地中控', '云云对接', '直连设备', '其他'],
        tableData: [],
        currentDetail: {},
        currentParams: null,
        currentDetailAlert: {}
      },
      // 配置手风琴面板
      activeNames: ['1', '2', '3']
    }
  },
  computed: {
    device_category_option() {
      let optionList = []
      for (let key in this.device_category_type2name) {
        optionList.push({ value: key, label: this.device_category_type2name[key] })
      }
      return optionList
    }
  },
  watch: {},
  mounted() {
    this.getFamilyDeviceList(1)
  },
  methods: {
    getFamilyDeviceList(page) {
      this.listParams.size = this.page_size// 一页的数据条数为page_siee固定
      this.listParams.family_id = this.familyDeviceForm.family_id
      this.listParams.device_uuid = this.familyDeviceForm.device_uuid
      this.listParams.device_name = this.familyDeviceForm.device_name
      // beg_mtime和end_mtime请求的参数以 秒 为单位转换
      this.listParams.beg_mtime = this.familyDeviceForm.beg_mtime ? Date.parse(this.familyDeviceForm.beg_mtime) / 1000 : ''
      this.listParams.end_mtime = this.familyDeviceForm.end_mtime ? Date.parse(this.familyDeviceForm.end_mtime) / 1000 : ''
      this.listParams.page = page
      this.listParams.device_category = this.familyDeviceForm.device_category
      API.getFamilyDeviceList(this.listParams).then(result => {
        console.log('result:', result)
        if (result && result.data && result.data.length) {
          this.familyDeviceList.tableData = result.data
          this.totalItem = result.page_info.total || 0
          for (let i = 0; i < this.familyDeviceList.tableData.length; i++) {
            this.familyDeviceList.tableData[i].online = this.familyDeviceList.tableData[i].online === 0 ? '离线' : '在线'
            this.familyDeviceList.tableData[i].create_time = this.getDate(this.familyDeviceList.tableData[i].create_time)
            this.familyDeviceList.tableData[i].update_time = this.getDate(this.familyDeviceList.tableData[i].update_time)
            this.familyDeviceList.tableData[i].access_type = this.familyDeviceList.access_type_list[this.familyDeviceList.tableData[i].access_type]
            this.familyDeviceList.tableData[i].category_id = this.device_category_type2name[this.familyDeviceList.tableData[i].category_id]
            if (this.familyDeviceList.tableData[i].mode) {
              if (this.familyDeviceList.tableData[i].mode === 'on') {
                this.familyDeviceList.tableData[i].mode = '开启'
              } else {
                this.familyDeviceList.tableData[i].mode = '关闭'
              }
            } else {
              this.familyDeviceList.tableData[i].mode = ''
            }
          }
          console.log('familyDeviceList.tableData:', this.familyDeviceList.tableData)
        } else {
          this.familyDeviceList.tableData = []
        }
      })
    },
    getDeviceDetail(params) {
      API.getDeviceDetail(params).then(result => {
        if (result.code === 0) {
          this.familyDeviceList.currentDetailAlert = result.data.alert
        }
      })
      this.infoModel = true
    },
    pageChange() {
      this.getFamilyDeviceList(this.currentPage)
    },
    openLayer(row) {
      this.familyDeviceList.currentParams = row.params && row.params !== '{}' ? JSON.parse(row.params) : null
      this.familyDeviceList.currentDetail = row
      this.detailParams.family_id = row.family_id
      this.detailParams.device_uuid = row.device_uuid
      this.getDeviceDetail(this.detailParams)
    },
    getDate(time) {
      let timestamp = new Date(1472048779952)
      return timestamp.toLocaleDateString().replace(/\//g, '-') + ' ' + timestamp.toTimeString().substr(0, 8)
    },
    // 清空顶部得搜索条件
    reset() {
      for (let key in this.familyDeviceForm) {
        this.familyDeviceForm[key] = ''
      }
    }
  }
}

</script>
<style lang="less">
.deviceList-page {
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
  .el-date-editor.el-input{
    width:auto
  }
}
.deviceDettailPage{
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__content{
     overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }
  .el-collapse-item__header{
    font-weight:bold;
    font-size:17px;
    height:50px;
    line-height:50px;
  }
}
</style>

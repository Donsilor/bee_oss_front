<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="config.show"
    :title="title">
    <el-form
      ref="form"
      :model="config"
      :rules="rules"
      :disabled="config.type === 'look'"
      label-width="100px">
      <el-form-item
        prop="scene_name"
        label="场景名称">
        <el-input v-model="config.scene_name" />
      </el-form-item>

      <el-form-item
        prop="list_pic.normal"
        label="列表配图">
        <el-input
          v-model="config.list_pic.normal"
          class="hide" />
        <!-- Upload -->
        <Upload
          :class="{'is-disabled': config.type === 'look'}"
          :image-file="config.list_pic.normal"
          :type="config.type"
          :valid="validList"
          path= "scene/"
          @emitImageData="emitListData" />
      </el-form-item>

      <el-form-item
        prop="detail_pic"
        label="详情页配图">
        <el-input
          v-model="config.detail_pic"
          class="hide" />
        <!-- Upload -->
        <Upload
          :class="{'is-disabled': config.type === 'look'}"
          :image-file="config.detail_pic"
          :type="config.type"
          :valid="validDetail"
          path= "scene/"
          @emitImageData="emitDetailData"/>
      </el-form-item>

      <el-form-item
        prop="mode_id"
        label="启动模式">
        <el-select
          v-model="config.mode_id"
          clearable
          placeholder="请选择">
          <template v-for="it in startModeList">
            <el-option
              v-if="+it.enable === 1"
              :key="it.mode_id"
              :label="it.mode_name"
              :value="it.mode_id" />
          </template>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="checkList"
        label="选择设备">

        <el-checkbox-group
          v-model="config.checkList"
          @change="handleCheckedChange">
          <div
            v-for="(it, index) in categoryList"
            :key="index"
            class="item">

            <el-checkbox
              :label="it.category_id">选择</el-checkbox>

            <img
              :src="it.category_icon"
              class="icon"
              alt="">
            <span class="name">{{ it.category_name }}</span>
            <el-select
              v-model="it.category_status"
              clearable
              @change="handleSelectChange">
              <el-option
                v-for="(i, idx) in it.status"
                :key="idx"
                :label="i"
                :value="idx" />
            </el-select>
            <div class="link">
              <label>预定链接:</label>
              <el-input
                v-model="it.purchace_link"
                @change="reg(it, index)"
              />
            </div>
          </div>
        </el-checkbox-group>
        <div
          v-show="judgeData === 'off'"
          class="tis">勾选的设备状态必填</div>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="config.enable">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button
        type="primary"
        @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style lang="less" scoped>
.item {
  display: flex;
  margin-bottom: 40px;
  .icon {
    margin: 0 10px;
  }
  .name {
    margin: 0 20px;
    font-size: 14px;
  }
  .link {
    margin-left: 20px;
    display: flex;
    label {
      font-size: 14px;
      width: 100px;
    }
  }
}
.tis {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
.hide {
  display: none;
}
</style>
<script>
import { PREFIX, deepClone } from '../../../lib/util'
// import getCorsUrl from '../../../lib/corsconfig'
import Upload from '../../../components/upload.vue'
// import { Message } from 'element-ui'
export default {
  components: {
    Upload
  },
  data () {
    return {
      validList: {
        type: 2, // 验证图片尺寸
        // width: 850,
        // height: 450,
        // tips: '尺寸：850*450， 支持jpg，png'
        width: [1125, 1005, 670, 750],
        height: [528, 471, 314, 352],
        tips: '尺寸：1125*528，1005*471，670*314，750*352， 支持jpg，png'
      },
      validDetail: {
        type: 2, // 验证图片尺寸
        // width: 1123,
        // height: 633,
        // tips: '尺寸：1123*633， 支持jpg，png'
        width: [1125, 1005, 670, 750],
        height: [528, 471, 314, 352],
        tips: '尺寸：1125*528，1005*471，670*314，750*352， 支持jpg，png'
      },

      categoryList: [],
      startModeList: [],
      judgeData: '', // 判断勾选的设备的状态是否有选择
      // 配置内容
      config: {
        checkList: [],
        content: {
          list: []
        },
        list_pic: {
          normal: '',
          normal_object: ''
        }
      },
      rules: {
        scene_name: [
          { required: true, message: '请输入场景名称', trigger: 'blur' }
        ],
        'list_pic.normal': [
          { required: true, message: '请选择列表配图', trigger: 'change' }
        ],
        detail_pic: [
          { required: true, message: '请选择详情页配图', trigger: 'change' }
        ],
        mode_id: [
          { required: true, message: '请选择启动模式' }
        ],
        enable: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        checkList: [
          { type: 'array', required: true, message: '至少选择一个设备', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    title () {
      let title = ''
      switch (this.config.type) {
        case 'add':
          title = '添加场景'
          break
        case 'modify':
          title = '编辑场景'
          break
        case 'look':
          title = '查看场景'
          break
        default:
          title = '查看场景'
      }
      return title
    }
  },
  watch: {
    'config.show' (val) {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    }
  },
  mounted () {
    this.getCategoryList()
    this.getStartModeList()
  },
  methods: {
    reg (it, index) {
      let val = it.purchace_link.trim()
      this.categoryList[index].purchace_link = val
    },
    // 根据order排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    // 子组件传过来的 列表图片信息
    emitListData (data) {
      this.config.list_pic.normal = data.download_url
      this.config.list_pic.normal_object = data.object
    },
    // 子组件传过来的 详情图片信息
    emitDetailData (data) {
      this.config.detail_pic = data.download_url
      this.config.detail_pic_object = data.object
    },
    // 获取启动模式列表
    getStartModeList () {
      this.$http
        .post(PREFIX + 'iotscenemode/lists', {})
        .then(res => {
          let orderList = res.data.result.list.sort(this.compare('order'))
          this.startModeList = []
          orderList.forEach(el => {
            if (+el.enable === 1) {
              this.startModeList.push(el)
            }
          })
        })
    },
    // 获取设备分类列表
    getCategoryList () {
      this.$http
        .post(PREFIX + 'iotscene/catelists', {})
        .then(res => {
          this.allList = res.data.result.list
        })
    },
    // 处理分类设备选中状态
    dealList () {
      let allList = deepClone(this.allList)
      if (this.config.type === 'add') {
        this.categoryList = allList
        this.config.checkList = []
        this.config.enable = 0
        return
      }
      let newArr = []
      let arr = allList
      let selectArr = this.config.content.list
      arr.forEach(el => {
        const result = selectArr.findIndex(ol => { return el.category_id === ol.category_id })
        if (result === -1) { // 新的
          newArr.push(el)
        } else { // 已存在
          el.category_status = selectArr[result].status === '-1' ? '' : selectArr[result].status + ''
          el.purchace_link = selectArr[result].purchace_link
          newArr.push(el)
        }
      })
      this.categoryList = newArr
      this.config.checkList = []
      this.config.content.list.forEach(el => {
        this.config.checkList.push(el.category_id)
      })
    },
    cancel () {
      this.config.show = false
      this.judgeData = ''
    },
    // 点击确定按钮
    submit () {
      if (this.config.type === 'look') {
        this.config.show = false
        return
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          let param = this.getParam()
          if (this.judgeData === '') {
            this.$http
              .post(PREFIX + 'iotscene/save', param)
              .then(res => {
                this.$emit('refresh', true)
                this.config.show = false
              })
          }
        } else {
          return false
        }
      })
    },
    // 获取保存到后台的参数
    getParam () {
      let param = deepClone(this.config)
      delete param['type']
      delete param['show']
      param.list_pic.normal = param.list_pic.normal_object
      delete param['list_pic']['normal_object']

      param.detail_pic = param.detail_pic_object
      delete param['detail_pic_object']

      param.content.list = []
      this.config.checkList.forEach(el => {
        Object.values(this.categoryList).forEach(val => {
          if (val.category_id === el) {
            let copyeEl = deepClone(val)

            if (!copyeEl['category_status'] && copyeEl['category_status'] !== 0) {
              copyeEl['status'] = -1
            } else {
              copyeEl['status'] = +copyeEl['category_status']
            }

            delete copyeEl['category_status']
            param.content.list.push(copyeEl)
          }
        })
      })
      delete param['checkList']
      delete param['mode_name']
      return param
    },
    // 选择和取消设备
    handleCheckedChange () {
      // 对象属性改变，才会更新dom， 需创建新对象重新赋值
      this.config = Object.assign({}, this.config)
      this.judgmentMethod()
    },
    // 勾选设备的状态下拉框的回调
    handleSelectChange () {
      this.judgmentMethod()
    },
    // 设备验证的判断
    judgmentMethod () {
      let param = this.getParam()
      let jud = ''
      // 遍历勾选的设备是否有状态没选的
      param.content.list.map(val => {
        if (val.status === '-1') {
          jud = 'off'
        }
      })
      if (jud === 'off') {
        this.judgeData = 'off'
        return
      }
      this.judgeData = ''
    }
  }
}
</script>

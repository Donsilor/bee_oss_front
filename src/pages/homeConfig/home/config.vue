<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加' : '编辑'"
    width="560px">
    <el-form
      ref="ruleForm"
      :model="config"
      label-width="80px">

      <el-form-item
        prop="F_picture"
        label="图片">
        <el-input
          v-model="config.F_picture"
          class="hide" />
        <!-- Upload -->
        <Upload
          :class="{'is-disabled': config.type === 'look'}"
          :image-file="config.F_picture"
          :type="config.type"
          :valid="validList"
          path= "scene/"
          @emitImageData="emitListData" />
      </el-form-item>

      <el-form-item
        prop="F_title"
        label="主标题">
        <el-input v-model="config.F_title" />
      </el-form-item>

      <el-form-item
        prop="F_stitle"
        label="副标题">
        <el-input v-model="config.F_stitle" />
      </el-form-item>

    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="config.show = false">取 消</el-button>
      <el-button
        type="primary"
        @click="submit(config.type, 'ruleForm')">确 定</el-button>
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
.hide {
  display: none;
}
</style>
<script>
import { PREFIX, deepClone } from "../../../lib/util"
import getCorsUrl from "../../../lib/corsconfig"
import Upload from "../../../components/upload.vue"
export default {
  components: {
    Upload
  },
  data() {
    return {
      validList: {
        type: 2, // 验证图片尺寸
        width: 850,
        height: 450,
        tips: '尺寸：850*450， 支持jpg，png'
      },

      // 配置内容
      config: {
        F_picture: [],
        F_title: '',
        F_stitle: ''
      }
    }
  },
  computed: {
    title() {
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
  mounted() {
    console.log(this.config)
  },
  methods: {
    // 子组件传过来的 列表图片信息
    emitListData(data) {
      this.config.list_pic.normal = data.download_url
      this.config.list_pic.normal_object = data.object
    },
    // 子组件传过来的 详情图片信息
    emitDetailData(data) {
      this.config.detail_pic = data.download_url
      this.config.detail_pic_object = data.object
    },
    cancel() {
      this.config.show = false
    },
    // 点击确定按钮
    submit() {
      if (this.config.type === 'look') return this.config.show = false

      this.$refs['form'].validate((valid) => {
        if (valid) {
          let param = {}
          this.$http
            .post(PREFIX + 'iotscene/save', param)
            .then(res => {
              console.log(param)
              this.$emit('refresh', true)
              this.config.show = false
            })
        } else {
          return false
        }
      })
    }
  },
}
</script>

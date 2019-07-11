<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加' : '编辑'"
    width="560px">
    <el-form
      ref="ruleForm"
      :rules="rules"
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
          :valid="validList"
          :type="config.type"
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
        type: '', // 不做验证
        tips: ''
      },

      // 配置内容
      config: {
        F_picture: [],
        F_title: '',
        F_stitle: ''
      },
      rules: {
        F_title: [
          { required: true, message: '请输入主标题', trigger: 'blur' },
        ],
        F_stitle: [
          { required: true, message: '请输入副标题', trigger: 'blur' },
        ],
        F_picture: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ]
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
  watch: {
    'config.show'(val) {
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    }
  },
  mounted() {
    console.log(this.config)
  },
  methods: {
    // 子组件传过来的 列表图片信息
    emitListData(data) {
      this.config.F_picture = data.download_url
      this.config.F_picture_object = data.object
    },
    cancel() {
      this.config.show = false
    },
    // 点击确定按钮
    submit() {
      if (this.config.type === 'look') return this.config.show = false

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log(this.config.type)
          if(this.config.type == 'add'){
            this.add()
          } else {
            this.edit()
          }
        } else {
          return false
        }
      })
    },
    add() {
      let param = {
        F_title: this.config.F_title,
        F_stitle: this.config.F_stitle,
        F_picture: this.config.F_picture_object,
      }
      this.$http
        .post(PREFIX + 'music_config/add', param)
        .then(res => {
          this.$emit('refresh', true)
          this.config.show = false
        })
    },
    edit() {
      let param = {
        F_id: this.config.F_id,
        F_title: this.config.F_title,
        F_stitle: this.config.F_stitle,
        F_picture: this.config.F_picture_object,
      }
      this.$http
        .post(PREFIX + 'music_config/edit', param)
        .then(res => {
          this.$emit('refresh', true)
          this.config.show = false
        })
    }
  },
}
</script>

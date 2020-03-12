<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    :before-close="close"
    :title="type==='add'? '新增协议': '更新协议'"
    center>
    <el-form
      :rules="rules"
      :model="form"
      :label-width="formLabelWidth">
      <el-form-item
        prop="name"
        label="协议名称:">
        <el-input
          :maxlength="50"
          v-model="form.name"/>
      </el-form-item>
      <el-form-item
        prop="url"
        label="协议连接:">
        <el-input v-model="form.url"/>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          :maxlength="50"
          v-model="form.remark"/>
      </el-form-item>
      <el-form-item label="版本号:">
        {{ form.version }}
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button
        type="primary"
        @click="confirm">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Api from '@/service/upgrade.js'

export default {
  name: 'AddNewProtocal',
  props: {
    type: {
      type: String,
      default: 'add'
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    function validateUrl (rule, value, callback) {
      // eslint-disable-next-line no-useless-escape
      let reg = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%$#_]*)?/
      if (!reg.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('请输入正确的url地址')
      } else {
        callback()
      }
    }

    return {
      formLabelWidth: '120px',
      form: Object.assign({
        name: '',
        url: '',
        remark: '',
        version: ''
      }, this.info),
      rules: {
        name: [
          { required: true, message: '请输入协议名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入协议链接', trigger: 'blur' },
          { validator: validateUrl, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    info (value) {
      this.form = Object.assign({}, value)
    }
  },
  methods: {
    close () {
      this.$emit('update:dialogFormVisible', false)
    },
    confirm () {
      Api.agreementSave(this.form).then(res => {
        this.$emit('refreshData')
        this.$message.success(`${this.type === 'add' ? '新增' : '更新'}协议成功`)
        this.close()
      })
    }
  }
}
</script>

<style scoped>

</style>

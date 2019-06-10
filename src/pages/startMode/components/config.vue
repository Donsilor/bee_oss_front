<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加模式' : '编辑模式'"
    width="560px">
    <el-form
      ref="ruleForm"
      :model="config"
      :rules="rules"
      label-width="80px">
      <el-form-item
        prop="mode_name"
        label="模式名称">
        <el-input
          v-model="config.mode_name"
          auto-complete="off"/>
      </el-form-item>
      <el-form-item
        prop="enable"
        label="状态">
        <el-radio-group v-model="config.enable">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="order"
        label="排序">
        <el-input
          v-model="config.order"
          auto-complete="off"/>
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
<style lang="less">
  .tips {
    color: #999;
  }
</style>
<script>
import { PREFIX } from "../../../lib/util"
export default {
  props: ['config'],
  data() {
    return {
      rules: {
        mode_name: [
          { required: true, message: '请输入模式名称', trigger: 'blur' }
        ],
        enable: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        order: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'config.show'(val){
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    }
  },
  methods: {
    submit(type, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(type == 'add') {
            this.add()
          } else {
            this.modify()
          }
        } else {
          return false
        }
      })
    },
    add() {
      this.$http
        .post(PREFIX + 'iotscenemode/save', {
          mode_id: 0,
          mode_name: this.config.mode_name,
          enable: this.config.enable,
          order: this.config.order
        })
        .then(res => {
          this.callSuccess()
        })
    },
    modify() {
      this.$http
        .post(PREFIX + 'iotscenemode/save', {
          mode_id: this.config.mode_id,
          mode_name: this.config.mode_name,
          enable: this.config.enable,
          order: this.config.order
        })
        .then(res => {
          this.callSuccess()
        })
    },
    callSuccess() {
      this.config.show = false
      this.$message({
        type: 'success',
        message: '处理成功!'
      })
      this.$emit('refresh', 'true')
    }
  }
}
</script>

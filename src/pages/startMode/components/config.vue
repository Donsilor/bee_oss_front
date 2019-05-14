<template>
  <el-dialog
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加模式' : '编辑模式'"
    width="560px">
    <el-form
      :model="config"
      label-width="80px">
      <el-form-item
        label="模式名称">
        <el-input
          v-model="config.mode_name"
          auto-complete="off"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="config.enable">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
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
        @click="determine(config.type)">确 定</el-button>
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
    }
  },
  methods: {
    determine(type) {
      if(type == 'add') {
        this.$http
          .post(PREFIX + "iotscenemode/save", {
            mode_id: 0,
            mode_name: this.$props.config.mode_name,
            enable: this.$props.config.enable,
            order: this.$props.config.order
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '处理成功!'
              })
            } else {
              this.$message.error(res.data.msg)
            }
            this.$emit("son")
          })
          .catch(res => {
            if (res && res.msg) {
              this.$message.error(res.msg)
            } else {
              this.$message.error(res)
            }
          })
        this.$props.config.show = false
      } else {
        this.$http
          .post(PREFIX + "iotscenemode/save", {
            mode_id: this.$props.config.mode_id,
            mode_name: this.$props.config.mode_name,
            enable: this.$props.config.enable,
            order: this.$props.config.order
          })
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '处理成功!'
              })
            } else {
              this.$message.error(res.data.msg)
            }
            this.$emit("son")
          })
          .catch(res => {
            if (res && res.msg) {
              this.$message.error(res.msg)
            } else {
              this.$message.error(res)
            }
          })
        this.$props.config.show = false
      }
    }
  }
}
</script>

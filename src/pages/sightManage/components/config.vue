<template>
  <el-dialog
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加情景' : '编辑情景'">
    <el-form
      :model="config"
      label-width="100px">
      <el-form-item
        label="情景名称">
        <el-input
          v-model="config.name"
          autocomplete="off"/>
      </el-form-item>
      <el-form-item label="情景icon">
        <Upload :upload="upload"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="config.state">
          <el-radio label="启用"/>
          <el-radio label="禁用"/>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click="config.show = false">取 消</el-button>
      <el-button
        type="primary"
        @click="config.show = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    .clear {
      position: absolute;
      top: 0;
      right: -20px;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .tips {
    color: #999;
  }
</style>
<script>
import { PREFIX } from "../../../lib/util"
import getCorsUrl from "../../../lib/corsconfig"
import Upload from "../../../components/upload.vue"
export default {
  components: {
    Upload
  },
  props: ['config'],
  data() {
    return {
      upload: {}
    }
  },
  methods: {
  }
}
</script>

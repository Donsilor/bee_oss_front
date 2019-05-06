<template>
  <el-dialog
    :visible.sync="config.show"
    :title="config.type === 'add' ? '添加模式' : '编辑模式'">
    <el-form
      :model="config"
      label-width="100px">
      <el-form-item
        label="模式名称">
        <el-input
          v-model="config.upmode"
          autocomplete="off"/>
      </el-form-item>
      <!-- <el-form-item label="情景icon">
        <el-upload
          :action="corsUrls"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uploadObj"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader">
          <img
            v-if="image_file"
            :src="image_file"
            class="avatar">
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"/>
          <i
            class="clear el-icon-remove"
            @click.stop="clearImg"/>
        </el-upload>
        <div class="tips">
          只能上传jpg/png格式文件，单个文件不能超过500kb
        </div>
      </el-form-item> -->
      <el-form-item label="状态">
        <el-radio-group v-model="config.state">
          <el-radio label="启用"/>
          <el-radio label="禁用"/>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="排序">
        <el-input
          autocomplete="off"/>
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
export default {
  props: ['config'],
  data() {
    return {
      corsUrls: getCorsUrl() + "/oss_file_upload",
      uploadObj: {
        token: JSON.parse(localStorage.getItem("localData")).user.info.token
      },
      image_file: ''
    }
  },
  methods: {
    handleAvatarSuccess(val) {
      let data = val.result
      this.config.image_url = data.object
      this.image_file = data.download_url
    },
    beforeAvatarUpload(file) {
      const isType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 < 500
      if (!isType) {
        this.$message.error('只能上传jpg或者png格式!')
      }
      if (!isLt2M) {
        this.$message.error('大小不能超过 500kb!')
      }
      return isType && isLt2M
    }
  }
}
</script>

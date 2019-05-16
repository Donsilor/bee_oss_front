<template>
  <div>
    <el-upload
      :action="corsUrls"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :data="uploadObj"
      :before-upload="beforeAvatarUpload"
      class="avatar-uploader"
    >
      <img
        v-if="imageFile"
        :src="imageFile"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
      <i
        class="clear el-icon-remove"
        @click.stop="clearImg"
      />
    </el-upload>
    <div class="tips">
      只能上传jpg/png格式文件，单个文件不能超过500kb
    </div>
  </div>
</template>

<script>
import getCorsUrl from "../lib/corsconfig.js"
export default {
  props: ['imageFile'],
  data() {
    return {
      corsUrls: getCorsUrl() + "/oss_file_upload",
      uploadObj: {
        token: JSON.parse(localStorage.getItem("localData")).user.info.token
      }
    }
  },
  methods: {
    handleAvatarSuccess(val) {
      this.$emit('emitImageData', val.result)
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
    },
    clearImg() {
      this.$emit('emitImageData', {})
    }
  }
}
</script>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tips {
    color: #999;
  }

  .is-disabled .avatar-uploader-icon{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
</style>


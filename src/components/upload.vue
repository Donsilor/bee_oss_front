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
      <!-- 只能上传jpg/png格式文件，单个文件不能超过500kb -->
      {{ valid.tips }}
    </div>
  </div>
</template>

<script>
import getCorsUrl from "../lib/corsconfig.js"
export default {
  props: ['imageFile','type', 'valid', 'path'],
  data() {
    let uploadObj = {
      token: JSON.parse(localStorage.getItem("localData")).user.info.token
    }
    if (this.path) {
      uploadObj.path = this.path
    }
    return {
      corsUrls: getCorsUrl() + "/oss_file_upload",
      uploadObj: uploadObj
    }
  },
  methods: {
    handleAvatarSuccess(val) {
      this.$emit('emitImageData', val.result)
    },
    beforeAvatarUpload(file) {
      const isType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      if(this.valid.type == '1'){
        const isLt2M = file.size / 1024 < 500
        if (!isType) {
          this.$message.error('只能上传jpg或者png格式!')
        }
        if (!isLt2M) {
          this.$message.error('大小不能超过 500kb!')
        }
        return isType && isLt2M
      } else{
        const isSize = new Promise((resolve, reject) =>{
          let width = this.valid.width // 限制图片尺寸为654X270
          let height = this.valid.height
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = function() {
            let valid = img.width === width && img.height === height
            valid ? resolve() : reject()
          }
          img.src = _URL.createObjectURL(file)
        }).then(() => {
          return file
        }, () => {
          this.$message.error(`图片尺寸限制为${this.valid.width} x ${this.valid.height}`)
          return Promise.reject()
        })
        return isType && isSize
      }
    },
    clearImg() {
      if(this.$props.type === 'look') {
        return false
      } else {
        this.$emit('emitImageData', {})
      }
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
  .is-disabled .el-upload:hover{
    cursor: not-allowed;
  }
</style>


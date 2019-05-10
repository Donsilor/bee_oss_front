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
        v-if="image_file"
        :src="image_file"
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
  data() {
    return {
      corsUrls: getCorsUrl() + "/oss_file_upload",
      uploadObj: {
        token: JSON.parse(localStorage.getItem("localData")).user.info.token
      },
      image_file: '',
      config: {
        content: "",
        image_url: "",
        status: 1,
        url: "www.baidu.com"
      },
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
    },
    clearImg() {
      this.image_file = ''
      this.config.image_url = ''
    }
  }
}
</script>

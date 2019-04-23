<template>
  <div class="page-content">
    <div class="title">入口配置</div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form-config"
      label-position="left"
      label-width="200px"
    >
      <el-form-item
        label="开启家具商城"
        prop="isOpen"
      >
        <el-switch v-model="form.isOpen" />
      </el-form-item>

      <div v-show="form.isOpen">
        <el-form-item
          label="按钮文案"
          prop="btnTxt"
        >
          <el-input v-model="form.btnTxt" />
        </el-form-item>
        <el-form-item
          label="链接地址"
          prop="btnUrl"
        >
          <el-input v-model="form.btnUrl" />
        </el-form-item>
        <el-form-item
          label="按钮图标"
          prop="btnIcon"
        >
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            action="https://jsonplaceholder.typicode.com/posts/"
            class="avatar-uploader"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >确定并生效</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less">
.page-content {
  padding: 20px 35px;
  .title {
    font-size: 20px;
  }
  .form-config {
    margin: auto;
    width: 40%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
}
</style>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      form: {
        isOpen: false,
        btnTxt: '',
        btnUrl: '',
        btnIcon: ''
      },
      rules: {
        isOpen: [
          { required: true, message: '', trigger: 'blur' }
        ],
        btnTxt: [
          { required: true, message: '请输入按钮文案', trigger: 'blur' },
          { min: 1, max: 10, message: '按钮文案最长为10个中文字符', trigger: 'blur' }
        ],
        btnUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
          { min: 1, max: 200, message: '链接地址限制长度为200字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.isOpen': function(val) {
      console.log(val)
    }
  },
  mounted() {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

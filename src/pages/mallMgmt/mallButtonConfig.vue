<template>
  <div class="page-content">
    <div class="title">
      入口配置
    </div>
    <el-form
      ref="form"
      :model="config"
      :rules="rules"
      class="form-config"
      label-position="left"
      label-width="200px"
    >
      <el-form-item
        label="开启家居商城"
        prop="status"
      >
        <el-switch
          v-model="config.status"
          active-value="1"
          inactive-value="0"
        />
        <div class="tips">
          开启商城将在星络App的家居页面开放按钮，可以点击进入H5商城
        </div>
      </el-form-item>

      <div v-show="+config.status === 1">
        <el-form-item
          label="按钮文案"
          prop="content"
        >
          <el-input v-model="config.content" />
        </el-form-item>
        <el-form-item
          label="链接地址"
          prop="url"
        >
          <el-input v-model="config.url" />
        </el-form-item>
        <el-form-item label="按钮图标">
          <!-- Upload -->
          <Upload 
            :image-file="imageFile"
            :valid="valid" 
            @emitImageData="emitImageData" />
        </el-form-item>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >
          确定并生效
        </el-button>
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
}
</style>

<script>
import { PREFIX } from "../../lib/util"
import getCorsUrl from "../../lib/corsconfig"
import Upload from "../../components/upload.vue"
export default {
  components: {
    Upload
  },
  data() {
    return {
      valid: {
        type: 1, // 验证图片大小
        tips: '只能上传jpg/png格式文件，单个文件不能超过500kb'
      },
      imageFile: '',
      config: {
        content: "",
        image_url: "",
        status: 1,
        url: "www.baidu.com"
      },
      rules: {
        status: [
          { required: true, message: '', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入按钮文案', trigger: 'blur' },
          { min: 2, max: 6, message: '按钮文案文字限制为2-6个中文', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
          { min: 1, max: 200, message: '链接地址限制长度为200字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getConfigInfo()
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.saveConfig()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getConfigInfo() {
      return this.$http
        .post(PREFIX + "mall_record/info_config", {})
        .then(res => {
          const json = res.data
          if (json.code === 200) {
            this.config.content = res.data.result.content
            this.config.status = res.data.result.status + '' // number 转string
            this.config.url = res.data.result.url
            this.config.image_url = res.data.result.image_url_object
            this.imageFile = res.data.result.image_url
          } else {
            this.$message.error(json.msg)
          }
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
        })
    },
    saveConfig() {
      console.log(this.config)
      this.$http
        .post(PREFIX + "mall_record/save_config", this.config)
        .then(res => {
          const json = res.data
          if (json.code === 200) {
            return this.getConfigInfo()
          }
        })
        .then(() => {
          this.$message.success('保存成功')
        })
        .catch(res => {
          if (res && res.msg) {
            this.$message.error(res.msg)
          } else {
            this.$message.error(res)
          }
        })
    },
    emitImageData(data) {
      this.config.image_url = data.object
      this.imageFile = data.download_url
    }
  }
}
</script>

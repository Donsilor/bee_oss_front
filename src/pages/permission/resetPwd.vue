<template>
  <div class="page-content">
    <el-form
      ref="form"
      :model="formdata"
      :rules="rules"
      style="width:500px;"
    >
      <el-form-item
        label="手机号"
        prop="mobile"
      >
        <el-input v-model="formdata.mobile" />
      </el-form-item>

      <el-form-item
        label="新密码"
        prop="password"
      >
        <el-input
          v-model="formdata.password"
          type="password"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          重置密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from "../../service/index.js"

export default {
  data() {
    return {
      formdata: {
        mobile: "",
        password: ""
      },
      rules: {
        mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          API.resetPwd(this.formdata).then(res => {
            this.$message("密码重置成功")
          })
        }
      })
    }
  }
}
</script>

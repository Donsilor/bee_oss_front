<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="showDialog"
  >
    <el-form
      :model="formdata"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        label="手机号码"
        prop="tel"
      >
        <el-input v-model="formdata.tel" />
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeDialog">取 消</el-button>
      <el-button
        type="primary"
        @click="formSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from "../../../service/index.js"
export default {
  props: ["dialogVisible", "dataChanged"],
  data() {
    return {
      formdata: {
        name: "",
        tel: ""
      },
      rules: {
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }]
      },
      dialogTitle: "新增重点用户",
      showDialog: this.dialogVisible
    }
  },
  watch: {
    dialogVisible(status) {
      this.showDialog = status
    }
  },
  methods: {
    formSubmit() {
      const userData = this.formdata
      API.addMUser({
        phone_num: userData.tel
      }).then(res => {
        this.$message("添加成功")
        this.$emit("setDataChanged")
        this.closeDialog()
      })
    },
    closeDialog() {
      this.showDialog = false
      this.$emit("setDialog", false)
    }
  }
}
</script>

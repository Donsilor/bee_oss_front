<template>
  <div class="page-content">
    <el-upload :action="uploadUrl" multiple accept=“text/txt” :data="uploadParams" :on-success="handleSuccess">
      <el-button size="small" type="primary">导入文件</el-button>
      <span slot="tip" class="el-upload__tip" style="margin-left: 10px;">请上传txt文件</span>
    </el-upload>
  </div>
</template>


<script>
import { switchProductImport } from "../../lib/api.js";
export default {
    data() {
        return {
            uploadUrl: switchProductImport,
            uploadParams: { 
              token: JSON.parse(localStorage.getItem("localData")).user.info.token
            }
        };
    },
    methods: {
        handleSuccess() {
          this.$message({
            message: '导入成功！',
            type: 'success'
          })
        }
    }
};
</script>
<template>
    <div class="page-content">
        <el-form ref="form" :model="formdata" :rules="rules" style="width:500px;">
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="formdata.mobile"></el-input>
            </el-form-item>

            <el-form-item label="旧密码" prop="old_password">
                <el-input v-model="formdata.old_password" type="password"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="password">
                <el-input v-model="formdata.password" type="password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import API from '../../service/index.js'

export default {
    data() {    
        return {    
            formdata: { 
                mobile: '',
                password: '',
                old_password: ''
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                old_password: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {  
        onSubmit() {  
            this.$refs.form.validate((valid) => {
                if (valid) {
                    API.updatePwd(this.formdata).then(res => {
                        this.$message('密码修改成功')
                    })
                }
            });  
            
        }
    }
};
</script>

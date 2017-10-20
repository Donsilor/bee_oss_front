<template>
    <div class="container">
        <div class="content">
            <section class="login-box">
                <header>
                    <h1>登录</h1>
                </header>
                <article>
                    <el-form :model="loginForm" ref="loginForm" :rules="rules">
                        <ol class="login-form">
                            <li>
                                <el-form-item prop="name" required>
                                    <el-input v-model="loginForm.name" type="text" size="large" placeholder="手机/登录邮箱" />
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item prop="password" required>
                                    <el-input v-model="loginForm.password" type="password" size="large" placeholder="登录密码" />
                                 </el-form-item>
                            </li>
                            <li>
                                <el-form-item>
                                    <el-button @click="login" :disabled="loginForm.name === '' || loginForm.password === ''" type="primary" size="large">登录</el-button>
                                 </el-form-item>
                            </li>
                        </ol>
                    </el-form>
                </article>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        const checkName = (rule, value, callback) => {
            if (/^1\d{10}$/.test(value) || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                callback()
            } else {
                callback(new Error('请输入正确的手机号码或邮箱'));
            }
        };
        return {
            
            loginForm: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入手机或邮箱',
                        trigger: 'change'
                    },
                    {
                        validator: checkName,
                        trigger: 'change'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'change' 
                    }
                ]
            }
        }
    },
    mounted () {},
    methods: {
        login () {
            this.$message.success('登录成功');
            this.$router.push('main');
            
        }
    }
}
</script>
<style lang="less">
.container{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.content{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box{
        width: 400px;
        padding: 40px 50px;
        border: 1px solid #cccccc;
        header{
            margin-bottom: 30px;
            font-size: 1.25em;
            text-align: center;
        }
    }
    .login-form {
        li{
            margin-bottom: 30px;
        }
        button{
            width: 100%;
        }
    }
    
}
</style>